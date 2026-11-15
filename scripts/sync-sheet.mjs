// Pulls the public Google Sheet and writes data/live-projects.json, outside Next.js.
// Used by .github/workflows/update-from-sheet.yml (runs in GitHub Actions, not on anyone's computer).
// Fails safely: on any fetch/parse problem, or if too few projects come back, it exits non-zero
// and leaves the existing data file untouched, so the workflow stops before deploying.
import { registerHooks } from "node:module";
import { existsSync, readFileSync, writeFileSync, renameSync, mkdirSync, appendFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MIN_PROJECTS = Number(process.env.MIN_SHEET_PROJECTS || 100);

// Let Node load the app's source as-is: extensionless relative imports, "@/..." alias, and JSON imports.
registerHooks({
  resolve(specifier, context, nextResolve) {
    let spec = specifier;
    if (spec.startsWith("@/")) spec = pathToFileURL(path.join(root, "src", spec.slice(2))).href;
    const isPath = spec.startsWith(".") || spec.startsWith("file:");
    if (isPath && !/\.(m?js|jsx|json)$/.test(spec)) {
      const base = spec.startsWith("file:") ? fileURLToPath(spec) : fileURLToPath(new URL(spec, context.parentURL));
      for (const ext of [".js", ".mjs", "/index.js"]) {
        if (existsSync(base + ext)) return nextResolve(pathToFileURL(base + ext).href, context);
      }
    }
    if (spec.endsWith(".json")) {
      const resolved = nextResolve(spec, context);
      return { ...resolved, importAttributes: { ...resolved.importAttributes, type: "json" } };
    }
    return nextResolve(spec, context);
  },
});

function setOutput(name, value) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

const target = process.env.IJAS_LIVE_PROJECTS_PATH || path.join(root, "data", "live-projects.json");

try {
  const { fetchAwardSheets } = await import(pathToFileURL(path.join(root, "src/lib/googleSheets.js")).href);
  const { importSheetValues } = await import(pathToFileURL(path.join(root, "src/lib/sheetImport.js")).href);
  const { projects: bundledProjects } = await import(pathToFileURL(path.join(root, "src/data/projects.js")).href);

  const sheets = await fetchAwardSheets();
  const imported = importSheetValues({
    awardsValues: sheets.awardsValues,
    projectsValues: sheets.projectsValues,
    archive: bundledProjects,
  });

  if (!Array.isArray(imported.projects) || imported.sheetProjectCount < MIN_PROJECTS) {
    throw new Error(
      `Only ${imported.sheetProjectCount ?? 0} projects came from the sheet (minimum ${MIN_PROJECTS}). Keeping the previous data.`,
    );
  }

  const content = {
    projectCount: imported.projects.length,
    sheetYears: imported.sheetYears,
    warnings: imported.warnings,
    projects: imported.projects,
  };

  let previous = null;
  try {
    previous = JSON.parse(readFileSync(target, "utf8"));
  } catch {}
  const strip = (data) => (data ? JSON.stringify({ ...data, updatedAt: undefined }) : "");
  const changed = strip(previous) !== strip(content);

  if (changed) {
    mkdirSync(path.dirname(target), { recursive: true });
    const temp = `${target}.${process.pid}.tmp`;
    writeFileSync(temp, JSON.stringify({ updatedAt: new Date().toISOString(), ...content }));
    renameSync(temp, target);
  }
  console.log(
    `Sheet sync OK: ${imported.sheetProjectCount} sheet projects, ${imported.projects.length} total. ${changed ? "Data changed." : "No change."}`,
  );
  if (imported.warningCount) console.log(`${imported.warningCount} warning(s); first ones:\n- ${imported.warnings.join("\n- ")}`);
  setOutput("changed", changed ? "true" : "false");
  setOutput("count", imported.projects.length);
} catch (error) {
  console.error(`::error::Sheet sync failed: ${error.message}`);
  if (error.details?.length) console.error(error.details.join("\n"));
  process.exit(1);
}
