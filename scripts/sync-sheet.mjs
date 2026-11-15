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
const stateTarget = process.env.IJAS_SHEET_STATE_PATH || path.join(root, "data", "sheet-state.json");

function summary(text) {
  console.log(text);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${text}\n`);
}

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function writeJsonAtomic(file, data) {
  mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.${process.pid}.tmp`;
  writeFileSync(temp, JSON.stringify(data));
  renameSync(temp, file);
}

const esc = (value) => String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ").slice(0, 120);

try {
  const { fetchAwardSheets } = await import(pathToFileURL(path.join(root, "src/lib/googleSheets.js")).href);
  const { importSheetValues } = await import(pathToFileURL(path.join(root, "src/lib/sheetImport.js")).href);
  const { projects: bundledProjects } = await import(pathToFileURL(path.join(root, "src/data/projects.js")).href);

  const previous = readJson(target);
  const previousState = readJson(stateTarget);

  const sheets = await fetchAwardSheets();
  const imported = importSheetValues({
    awardsValues: sheets.awardsValues,
    projectsValues: sheets.projectsValues,
    archive: bundledProjects,
    previousState,
  });

  summary("## Google Sheet sync");
  summary(
    `- Rows read: **Awards 2026** ${Math.max(0, sheets.awardsValues.length - 1)} (${imported.rowCounts.awards} projects), **Projects Database** ${Math.max(0, sheets.projectsValues.length - 1)} (${imported.rowCounts.database} projects)`,
  );

  if (!Array.isArray(imported.projects) || imported.sheetProjectCount < MIN_PROJECTS) {
    throw new Error(
      `Only ${imported.sheetProjectCount ?? 0} projects came from the sheet (minimum ${MIN_PROJECTS}). Keeping the previous data and site.`,
    );
  }

  const content = {
    projectCount: imported.projects.length,
    sheetYears: imported.sheetYears,
    warnings: imported.warnings,
    projects: imported.projects,
  };

  // Which projects changed compared with the data currently on the site?
  const before = new Map((previous?.projects || []).map((project) => [project.id, JSON.stringify(project)]));
  const after = new Map(imported.projects.map((project) => [project.id, JSON.stringify(project)]));
  const added = [...after.keys()].filter((id) => !before.has(id));
  const removed = [...before.keys()].filter((id) => !after.has(id));
  const edited = [...after.keys()].filter((id) => before.has(id) && before.get(id) !== after.get(id));

  const strip = (data) => (data ? JSON.stringify({ ...data, updatedAt: undefined }) : "");
  const changed = strip(previous) !== strip(content);
  const stateChanged = JSON.stringify(previousState) !== JSON.stringify(imported.state);

  if (changed) writeJsonAtomic(target, { updatedAt: new Date().toISOString(), ...content });
  if (stateChanged) writeJsonAtomic(stateTarget, imported.state);

  summary(`- Projects published: **${imported.projects.length}** (${imported.sheetProjectCount} from the sheet)`);
  summary(`- Changed vs. live data: **${edited.length} edited, ${added.length} added, ${removed.length} removed**`);
  const titleOf = (id) => imported.projects.find((project) => project.id === id)?.title || id;
  for (const id of edited.slice(0, 30)) summary(`  - edited: ${esc(titleOf(id))} (\`${id}\`)`);
  for (const id of added.slice(0, 30)) summary(`  - added: ${esc(titleOf(id))} (\`${id}\`)`);
  for (const id of removed.slice(0, 30)) summary(`  - removed: \`${id}\``);
  if (imported.conflicts.length) {
    summary(`\n**Tabs disagree on ${imported.conflicts.length} value(s)** (the tab edited most recently wins; Awards 2026 if unsure):\n`);
    summary("| Project | Field | Awards 2026 | Projects Database | Used |\n|---|---|---|---|---|");
    for (const c of imported.conflicts.slice(0, 40)) {
      summary(`| ${esc(c.project)} | ${c.field} | ${esc(c.awards2026)} | ${esc(c.projectsDatabase)} | ${c.used} |`);
    }
  }
  if (imported.warningCount) {
    summary(`\n<details><summary>${imported.warningCount} sheet warning(s)</summary>\n\n- ${imported.warnings.map(esc).join("\n- ")}\n\n</details>`);
  }
  summary(`- Data file: ${changed ? "**updated**" : "unchanged"}`);

  setOutput("changed", changed || stateChanged ? "true" : "false");
  setOutput("count", imported.projects.length);
} catch (error) {
  summary(`\n**Sheet sync failed:** ${error.message}\nThe live site was not changed.`);
  console.error(`::error::Sheet sync failed: ${error.message}`);
  if (error.details?.length) console.error(error.details.join("\n"));
  process.exit(1);
}
