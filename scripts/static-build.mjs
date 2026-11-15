// Builds the static GitHub Pages export without the server-only Update Awards feature.
// The real source is never modified: a staging copy is made in .static-build/, where
//  - app/api is removed (route handlers can't be exported),
//  - the admin page is replaced with a static notice,
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
if (existsSync(adminPage)) {
  writeFileSync(
    adminPage,
    `import PageHero from "@/components/PageHero";

export const metadata = { title: "Update Awards", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <>
      <PageHero title="Update Awards" />
      <div className="mx-auto max-w-[760px] px-5 py-10 text-[16px] text-[#374151] md:px-8 md:py-12">
        Award updates only work on the local server. Run the site locally (npm run dev), open
        /admin/update-awards, and press Update Awards, then publish the site again.
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
