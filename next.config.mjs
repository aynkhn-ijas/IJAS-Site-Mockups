import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const basePath = process.env.NEXT_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export (GitHub Pages) is enabled only by scripts/static-build.mjs.
  // Plain `npm run dev` / `npm run build` keep the server features (Update Awards API).
  ...(process.env.STATIC_EXPORT === "1" ? { output: "export" } : {}),
  // Stable build id so an unchanged site produces an identical export (no empty deploys).
  generateBuildId: async () => process.env.NEXT_BUILD_ID || null,
  trailingSlash: true,
  images: { unoptimized: true },
  outputFileTracingRoot: projectRoot,
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
