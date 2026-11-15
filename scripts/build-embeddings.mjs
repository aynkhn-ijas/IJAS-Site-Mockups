import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { embedDocument } from "../src/lib/embedText.js";
import { SEARCH_DIMS, SEARCH_DTYPE, SEARCH_MODEL, SEARCH_QUERY_PREFIX } from "../src/lib/searchConfig.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const livePath = path.join(root, "data/live-projects.json");
const bundledPath = path.join(root, "src/data/projects.js");
const cachePath = path.join(root, "data/embedding-cache.json");
const searchDir = path.join(root, "public/search");
const binPath = path.join(searchDir, "embeddings.bin");
const indexPath = path.join(searchDir, "index.json");
const BATCH = 64;

function loadProjects() {
  if (fs.existsSync(livePath)) {
    const payload = JSON.parse(fs.readFileSync(livePath, "utf8"));
    const projects = Array.isArray(payload) ? payload : payload.projects;
    if (Array.isArray(projects) && projects.length > 0) {
      console.log(`Reading ${projects.length} projects from data/live-projects.json`);
      return projects;
    }
  }
  return null;
}

function quantize(values) {
  const out = new Int8Array(values.length);
  for (let i = 0; i < values.length; i++) {
    const clamped = Math.max(-1, Math.min(1, values[i]));
    out[i] = Math.max(-127, Math.min(127, Math.round(clamped * 127)));
  }
  return out;
}

function encodeVector(vector) {
  return Buffer.from(vector.buffer, vector.byteOffset, vector.byteLength).toString("base64");
}

function decodeVector(value) {
  const buffer = Buffer.from(value, "base64");
  return new Int8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}

function hashText(text) {
  return crypto.createHash("sha256").update(`${SEARCH_MODEL}\n${SEARCH_DTYPE}\n${text}`).digest("hex");
}

function readCache() {
  if (!fs.existsSync(cachePath)) return { entries: {} };
  try {
    const cache = JSON.parse(fs.readFileSync(cachePath, "utf8"));
    if (cache.model !== SEARCH_MODEL || cache.dtype !== SEARCH_DTYPE || cache.dims !== SEARCH_DIMS) {
      console.log("Embedding cache is for a different model. Rebuilding.");
      return { entries: {} };
    }
    return { entries: cache.entries || {} };
  } catch {
    console.log("Embedding cache could not be read. Rebuilding.");
    return { entries: {} };
  }
}

function writeCache(entries) {
  const payload = {
    model: SEARCH_MODEL,
    dtype: SEARCH_DTYPE,
    dims: SEARCH_DIMS,
    quantization: "int8",
    entries,
  };
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  const temporary = `${cachePath}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(payload));
  fs.renameSync(temporary, cachePath);
}

async function embedMissing(missing, entries) {
  const { pipeline, env } = await import("@huggingface/transformers");
  env.cacheDir = path.join(root, "node_modules/.cache/transformers");
  env.allowLocalModels = false;
  console.log(`Loading ${SEARCH_MODEL} (${SEARCH_DTYPE}) for ${missing.length} projects.`);
  const extractor = await pipeline("feature-extraction", SEARCH_MODEL, { dtype: SEARCH_DTYPE });
  for (let start = 0; start < missing.length; start += BATCH) {
    const batch = missing.slice(start, start + BATCH);
    const output = await extractor(
      batch.map((item) => item.text),
      { pooling: "mean", normalize: true },
    );
    const dims = output.dims[output.dims.length - 1];
    if (dims !== SEARCH_DIMS) {
      throw new Error(`Expected ${SEARCH_DIMS} dimensions, received ${dims}`);
    }
    const data = output.data;
    batch.forEach((item, index) => {
      const row = data.subarray(index * dims, (index + 1) * dims);
      const vector = quantize(row);
      item.vector = vector;
      entries[item.id] = { hash: item.hash, v: encodeVector(vector) };
    });
    writeCache(entries);
    console.log(`Embedded ${Math.min(start + batch.length, missing.length)} / ${missing.length}`);
  }
}

async function main() {
  let projects = loadProjects();
  if (!projects) {
    const bundled = await import(bundledPath);
    projects = bundled.projects;
    console.log(`data/live-projects.json is missing. Using ${projects.length} bundled projects.`);
  }

  const cache = readCache();
  const entries = {};
  const missing = [];
  const ordered = projects.map((project) => {
    const text = embedDocument(project) || project.id || "project";
    const hash = hashText(text);
    const cached = cache.entries[project.id];
    if (cached && cached.hash === hash && cached.v) {
      entries[project.id] = cached;
      return { id: project.id, vector: decodeVector(cached.v) };
    }
    const item = { id: project.id, text, hash, vector: null };
    missing.push(item);
    return item;
  });

  if (missing.length > 0) await embedMissing(missing, entries);
  else console.log("Embedding cache is current. Skipping the model.");

  const dims = SEARCH_DIMS;
  const bytes = new Int8Array(ordered.length * dims);
  ordered.forEach((item, index) => {
    if (!item.vector || item.vector.length !== dims) {
      throw new Error(`Missing embedding for ${item.id}`);
    }
    bytes.set(item.vector, index * dims);
  });

  fs.mkdirSync(searchDir, { recursive: true });
  const index = {
    model: SEARCH_MODEL,
    dtype: SEARCH_DTYPE,
    dims,
    pooling: "mean",
    normalize: true,
    quantization: "int8",
    scale: 127,
    queryPrefix: SEARCH_QUERY_PREFIX,
    ids: ordered.map((item) => item.id),
  };
  const binTemp = `${binPath}.tmp`;
  const indexTemp = `${indexPath}.tmp`;
  fs.writeFileSync(binTemp, Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength));
  fs.writeFileSync(indexTemp, `${JSON.stringify(index, null, 2)}\n`);
  fs.renameSync(binTemp, binPath);
  fs.renameSync(indexTemp, indexPath);
  writeCache(entries);
  console.log(
    `Wrote ${bytes.byteLength} bytes (${ordered.length} x ${dims} int8) to public/search/embeddings.bin. Embedded ${missing.length}, cached ${ordered.length - missing.length}.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
