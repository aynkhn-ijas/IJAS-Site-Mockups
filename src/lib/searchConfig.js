export const SEARCH_MODEL = "Xenova/bge-small-en-v1.5";
export const SEARCH_DTYPE = "q8";
export const SEARCH_DIMS = 384;
export const INT8_SCALE = 127;
export const SEARCH_QUERY_PREFIX = "Represent this sentence for searching relevant passages: ";
export const SEMANTIC_THRESHOLD = 0.55;
export const SEMANTIC_MARGIN = 0.14;
// Browser build of transformers.js; keep the version in step with @huggingface/transformers in package.json.
export const TRANSFORMERS_BROWSER_URL = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2/dist/transformers.min.js";
