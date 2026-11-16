import { studentLine, visibleAwards } from "../data/projects.js";
import { asset } from "./asset.js";
import { INT8_SCALE, SEARCH_DTYPE, SEMANTIC_MARGIN, SEMANTIC_THRESHOLD, TRANSFORMERS_BROWSER_URL } from "./searchConfig.js";

export { INT8_SCALE, SEARCH_DIMS, SEARCH_DTYPE, SEARCH_MODEL, SEARCH_QUERY_PREFIX, SEMANTIC_MARGIN, SEMANTIC_THRESHOLD } from "./searchConfig.js";

const TITLE_BOOST = 0.75;
const NAME_BOOST = 0.72;
const SCHOOL_BOOST = 0.7;
const FIELD_BOOST = 0.45;

let indexPromise = null;
let extractorPromise = null;
let searchFailed = false;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function textHasQuery(text, needle) {
  const hay = String(text || "").toLowerCase();
  if (!needle || !hay) return false;
  if (needle.length <= 3 && /^[a-z0-9]+$/i.test(needle)) {
    return new RegExp(`(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:[^a-z0-9]|$)`, "i").test(hay);
  }
  return hay.includes(needle);
}

export function keywordBoost(project, needle, awardName = "") {
  if (!needle) return 0;
  const awards = [...visibleAwards(project.awards), awardName].join("\n");
  let boost = 0;
  if (textHasQuery(project.title, needle)) boost = Math.max(boost, TITLE_BOOST);
  if (textHasQuery(studentLine(project), needle)) boost = Math.max(boost, NAME_BOOST);
  if (textHasQuery(project.school, needle)) boost = Math.max(boost, SCHOOL_BOOST);
  if (
    textHasQuery(project.category, needle) ||
    textHasQuery(project.region, needle) ||
    textHasQuery(awards, needle)
  ) {
    boost = Math.max(boost, FIELD_BOOST);
  }
  return boost;
}

export function orderBySmartSearch(projects, query, scores, { includeAbstract = false, awardName = "" } = {}) {
  const needle = query.trim().toLowerCase();
  if (!needle || !scores) return projects;
  let best = Number.NEGATIVE_INFINITY;
  for (const project of projects) {
    const semantic = scores.get(project.id);
    if (semantic != null && semantic > best) best = semantic;
  }
  const cutoff = Number.isFinite(best) ? Math.max(SEMANTIC_THRESHOLD, best - SEMANTIC_MARGIN) : SEMANTIC_THRESHOLD;
  const ranked = [];
  for (const project of projects) {
    const boost = keywordBoost(project, needle, awardName);
    const abstractHit = includeAbstract && textHasQuery(project.abstract, needle);
    const semantic = scores.get(project.id);
    const keyword = boost > 0 || abstractHit;
    if (!keyword && (semantic == null || semantic < cutoff)) continue;
    ranked.push({ project, score: (semantic ?? 0) + boost });
  }
  ranked.sort((a, b) => b.score - a.score);
  return ranked.map((item) => item.project);
}

export function scoreVector(queryVector, ids, vectors, dims) {
  const byId = new Map();
  for (let i = 0; i < ids.length; i++) {
    let dot = 0;
    const offset = i * dims;
    for (let d = 0; d < dims; d++) dot += queryVector[d] * vectors[offset + d];
    byId.set(ids[i], dot / INT8_SCALE);
  }
  return byId;
}

async function loadIndex() {
  if (!indexPromise) {
    indexPromise = (async () => {
      const indexResponse = await fetch(asset("/search/index.json"));
      if (!indexResponse.ok) throw new Error("Search index request failed");
      const index = await indexResponse.json();
      const vectorsResponse = await fetch(asset("/search/embeddings.bin"));
      if (!vectorsResponse.ok) throw new Error("Search vectors request failed");
      const vectors = new Int8Array(await vectorsResponse.arrayBuffer());
      if (!Array.isArray(index.ids) || vectors.length !== index.ids.length * index.dims) {
        throw new Error("Search index does not match the vector file");
      }
      return { index, vectors };
    })().catch((error) => {
      indexPromise = null;
      throw error;
    });
  }
  return indexPromise;
}

async function loadExtractor(index) {
  if (!extractorPromise) {
    extractorPromise = (async () => {
      // Loaded from the jsDelivr CDN at runtime (pinned version) instead of being bundled into the
      // static export: keeps ~400 KB out of the site and out of the gh-pages repo, whose push
      // protection falsely flags a token-like string inside the minified library.
      const { pipeline, env } = await import(/* webpackIgnore: true */ TRANSFORMERS_BROWSER_URL);
      env.allowLocalModels = false;
      env.useBrowserCache = true;
      env.backends.onnx.wasm.numThreads = 1;
      return pipeline("feature-extraction", index.model, {
        dtype: index.dtype || SEARCH_DTYPE,
        device: "wasm",
      });
    })().catch((error) => {
      extractorPromise = null;
      throw error;
    });
  }
  return extractorPromise;
}

export function smartSearchUnavailable() {
  return searchFailed;
}

/** Embed one query and return cosine similarity for every indexed project id. */
export async function embedQuery(text) {
  if (searchFailed) throw new Error("Smart search unavailable");
  try {
    const { index, vectors } = await loadIndex();
    const extractor = await loadExtractor(index);
    const prefix = typeof index.queryPrefix === "string" ? index.queryPrefix : "";
    const output = await extractor(`${prefix}${text}`, { pooling: index.pooling || "mean", normalize: index.normalize !== false });
    const dims = index.dims;
    const data = output.data;
    const queryVector = data.length === dims ? data : data.subarray(data.length - dims);
    return scoreVector(queryVector, index.ids, vectors, dims);
  } catch (error) {
    searchFailed = true;
    throw error;
  }
}
