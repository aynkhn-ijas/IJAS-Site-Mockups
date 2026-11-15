// Builds the static GitHub Pages export without the server-only Update Awards feature.
// The real source is never modified: a staging copy is made in .static-build/, where
//  - app/api is removed (route handlers can't be exported),
//  - the admin page is replaced with a static page explaining the daily Google Sheet sync,
//  - force-dynamic pages become force-static, so data/live-projects.json is baked in at build time.
// The export is copied to ./out.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stage = path.join(root, ".static-build");
const skip = new Set(["node_modules", ".next", "out", ".static-build", ".git"]);

rmSync(stage, { recursive: true, force: true });
mkdirSync(stage);
for (const entry of readdirSync(root)) {
  if (skip.has(entry) || /^\.env/.test(entry) && entry !== ".env.example") continue;
  cpSync(path.join(root, entry), path.join(stage, entry), { recursive: true });
}
symlinkSync(path.join(root, "node_modules"), path.join(stage, "node_modules"), "dir");

rmSync(path.join(stage, "app", "api"), { recursive: true, force: true });
const adminPage = path.join(stage, "app", "admin", "update-awards", "page.jsx");
function repoSlug() {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY;
  try {
    const url = execSync("git remote get-url origin", { cwd: root, encoding: "utf8" }).trim();
    const match = url.match(/github\.com[:/]([^/]+\/[^/]+?)(\.git)?$/);
    if (match) return match[1];
  } catch {}
  return "";
}
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1_Rnd4z6QSpr4iiONl-s0H5XSHkDV4VjBHhtA6RLYhDA/edit";
const slug = repoSlug();
const runUrl = slug ? `https://github.com/${slug}/actions/workflows/update-from-sheet.yml` : "";
if (existsSync(adminPage)) {
  writeFileSync(
    adminPage,
    `import PageHero from "@/components/PageHero";

export const metadata = { title: "Update Awards", robots: { index: false, follow: false } };

const linkClass = "font-semibold text-[#1d4ed8] underline underline-offset-2";

export default function Page() {
  return (
    <>
      <PageHero title="Update Awards" />
      <div className="mx-auto max-w-[760px] space-y-5 px-5 py-10 text-[16px] leading-relaxed text-[#374151] md:px-8 md:py-12">
        <p>
          The Awards page and the Project Database update automatically once a day (about 2 AM Central) from the
          IJAS Google Sheet. To change what the site shows, edit the sheet. No other steps are needed.
        </p>
        <p>
          <a className={linkClass} href="${SHEET_URL}" target="_blank" rel="noreferrer">
            Open the awards Google Sheet
          </a>{" "}
          (tabs "Awards 2026" and "Projects Database").
        </p>
${runUrl ? `        <p>
          Need it updated right away? Open{" "}
          <a className={linkClass} href="${runUrl}" target="_blank" rel="noreferrer">
            Update from Google Sheet on GitHub
          </a>
          , press "Run workflow", then "Run workflow" again. The site refreshes within a few minutes. This button needs
          a GitHub account with access to the site repository.
        </p>
` : ""}        <p className="text-[14px] text-[#6b7280]">
          If an update fails (for example the sheet can't be read or has far fewer projects than expected), the site keeps
          showing the last good version.
        </p>
      </div>
    </>
  );
}
`,
  );
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const file = path.join(dir, entry);
    if (statSync(file).isDirectory()) walk(file);
    else if (/\.(jsx?|tsx?)$/.test(entry)) {
      const src = readFileSync(file, "utf8");
      const out = src
        .replace(/export const dynamic = ["']force-dynamic["'];?/g, 'export const dynamic = "force-static";')
        .replace(/export const dynamicParams = true;?/g, "export const dynamicParams = false;");
      if (out !== src) writeFileSync(file, out);
    }
  }
}
walk(path.join(stage, "app"));

execSync("npx next build", { cwd: stage, stdio: "inherit", env: { ...process.env, STATIC_EXPORT: "1" } });

rmSync(path.join(root, "out"), { recursive: true, force: true });
cpSync(path.join(stage, "out"), path.join(root, "out"), { recursive: true });
rmSync(stage, { recursive: true, force: true });
console.log("Static export written to out/");
