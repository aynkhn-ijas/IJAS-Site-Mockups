import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { projects as bundledProjects } from "@/data/projects";
import { adminPassword, passwordsMatch } from "@/lib/adminAuth";
import { fetchAwardSheets, GoogleSheetsError } from "@/lib/googleSheets";
import { saveLiveProjects } from "@/lib/liveProjects";
import { importSheetValues, SheetImportError } from "@/lib/sheetImport";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function json(body, status) {
  return NextResponse.json(body, { status });
}

function publishMessage(published, sheetYears) {
  const counts = new Map();
  for (const project of published) counts.set(project.year, (counts.get(project.year) || 0) + 1);
  const years = new Set(sheetYears);
  const supplied = [...years]
    .sort()
    .map((year) => `${counts.get(year) || 0} for ${year}`)
    .join(" and ");
  const archived = [...counts.keys()]
    .filter((year) => !years.has(year))
    .sort()
    .map((year) => `${counts.get(year)} from ${year}`)
    .join(" and ");
  let message = `Published ${published.length} projects. The sheet supplied ${supplied}.`;
  if (archived) message += ` The site archive still supplies ${archived}.`;
  message += " The Awards and Project Database pages are updated.";
  return message;
}

export async function POST(request) {
  const expected = adminPassword();
  if (!expected) {
    return json({ ok: false, message: "The admin password is not configured on the server. Add ADMIN_PASSWORD to .env.local and restart the site." }, 500);
  }

  let body = "";
  try {
    body = await request.text();
  } catch {
    return json({ ok: false, message: "The update request could not be read." }, 400);
  }
  if (body.length > 10000) return json({ ok: false, message: "The update request is too large." }, 400);

  let password = "";
  try {
    password = JSON.parse(body || "{}").password || "";
  } catch {
    return json({ ok: false, message: "The update request was not valid." }, 400);
  }
  if (!password || !passwordsMatch(password, expected)) {
    return json({ ok: false, message: "That password is not correct." }, 401);
  }

  try {
    const sheets = await fetchAwardSheets();
    const imported = importSheetValues({
      awardsValues: sheets.awardsValues,
      projectsValues: sheets.projectsValues,
      archive: bundledProjects,
    });
    saveLiveProjects(imported.projects, {
      sheetYears: imported.sheetYears,
      warnings: imported.warnings,
    });
    revalidatePath("/projects");
    revalidatePath("/awards-by-value");
    revalidatePath("/projects/[id]", "page");
    return json({
      ok: true,
      message: publishMessage(imported.projects, imported.sheetYears),
      warnings: imported.warnings,
      projectCount: imported.projects.length,
    });
  } catch (error) {
    const message =
      error instanceof SheetImportError || error instanceof GoogleSheetsError
        ? error.message
        : "The awards could not be published.";
    const errors = error instanceof SheetImportError ? error.details || [] : [];
    console.error("Award update failed:", message);
    return json({ ok: false, message, errors }, 500);
  }
}
