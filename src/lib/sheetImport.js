import { finalizeProjectRows, isDroppedAward, isHiddenAwardLabel, rowInclusion } from "../data/projects.js";

export class SheetImportError extends Error {
  constructor(message, details = []) {
    super(message);
    this.name = "SheetImportError";
    this.details = details;
  }
}

const FIELD_ALIASES = {
  title: ["project title", "title", "project name"],
  students: [
    "finalist name(s)",
    "finalist names",
    "finalist name",
    "all exhibitors",
    "exhibitors",
    "exhibitor",
    "presenters",
    "presenter",
    "student name(s)",
    "student names",
    "student name",
    "students",
    "student",
    "name(s)",
    "names",
    "name",
  ],
  grade: ["grade", "grades", "grade level", "s1 grade"],
  school: ["school", "school name"],
  region: ["region", "fair region", "ijas region"],
  category: ["category"],
  projectType: ["project type", "type of project", "experimental or design"],
  finalAward: ["final award", "medal", "placement", "award placement"],
  awards: ["awards won", "special awards", "special award", "other awards", "awards"],
  ijasNumber: ["ijas number", "ijas #", "ijas no.", "ijas no", "ijas school number", "school number"],
  projectNumber: ["project number", "project #", "project no.", "project no", "exhibit number", "exhibit #"],
  year: ["year", "exposition year"],
  abstract: ["abstract", "project abstract"],
  awardRecipient: ["award recipient", "special award recipient"],
};

// Medal / status values that can appear inside an awards list.
const PLACEMENTS = new Set([
  "GOLD",
  "SILVER",
  "BRONZE",
  "PARTICIPATION",
  "CANCEL",
  "CANCELED",
  "NOSHOW",
  "NO SHOW",
  "NO-SHOW",
]);

// Filler values that are not real award names.
const PLACEHOLDER_AWARDS = new Set(["OTHER", "NONE", "N/A", "NA", "-"]);

const ALIAS_LIST = Object.entries(FIELD_ALIASES)
  .flatMap(([field, aliases]) => aliases.map((alias) => ({ field, alias })))
  .sort((a, b) => b.alias.length - a.alias.length);

function clean(value) {
  return String(value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeHeader(value) {
  return clean(value)
    .replace(/^\uFEFF/, "")
    .toLowerCase()
    .replace(/[_/]+/g, " ")
    .replace(/[^a-z0-9()+#.\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function mapHeaders(headerRow) {
  const fields = {};
  const extraAwards = [];
  const used = new Set();
  const headers = (headerRow || []).map((cell, index) => ({ index, label: normalizeHeader(cell) }));
  for (const { field, alias } of ALIAS_LIST) {
    if (fields[field] !== undefined) continue;
    const match = headers.find((header) => header.label === alias && !used.has(header.index));
    if (!match) continue;
    fields[field] = match.index;
    used.add(match.index);
  }
  for (const header of headers) {
    if (used.has(header.index) || !header.label) continue;
    const extra =
      /^other award(?: \d+)?$/.test(header.label) ||
      /^award \d+$/.test(header.label) ||
      header.label.includes("thermo fisher") ||
      header.label === "isef" ||
      header.label === "isef finalist";
    if (!extra) continue;
    extraAwards.push(header.index);
    used.add(header.index);
  }
  return { fields, extraAwards, labels: headers.map((header) => header.label).filter(Boolean) };
}

function findTable(values) {
  let best = null;
  const limit = Math.min(values.length, 8);
  for (let index = 0; index < limit; index += 1) {
    const mapping = mapHeaders(values[index]);
    const score = Object.keys(mapping.fields).length + mapping.extraAwards.length;
    if (!best || score > best.score) best = { index, score, mapping };
  }
  return best;
}

function cell(row, index) {
  if (index === undefined || index === null) return "";
  return row?.[index] ?? "";
}

function parseGrade(value) {
  return clean(value).replace(/^grade\s*/i, "");
}

function personName(value) {
  return clean(value).replace(/^(?:&|and)\s+/i, "");
}

function parseStudents(value) {
  return String(value ?? "")
    .split(/\s*(?:\r?\n|;|\s&\s)\s*|\s*,\s+/)
    .map((part) => {
      const text = personName(part);
      const match = text.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
      const name = personName(match ? match[1] : text);
      const grade = parseGrade(match ? match[2] : "");
      return name ? { name, grade } : null;
    })
    .filter(Boolean);
}

function studentSlots(headerRow) {
  const headers = (headerRow || []).map((value) => normalizeHeader(value));
  const slots = [];
  for (let number = 1; number <= 6; number += 1) {
    const nameIndex = headers.indexOf(`s${number} name`);
    if (nameIndex < 0) continue;
    const gradeIndex = headers.indexOf(`s${number} grade`);
    slots.push({ nameIndex, gradeIndex: gradeIndex < 0 ? undefined : gradeIndex });
  }
  return slots;
}

function studentsFromSlots(source, slots) {
  return slots
    .map((slot) => {
      const name = personName(cell(source, slot.nameIndex));
      if (!name) return null;
      return { name, grade: parseGrade(cell(source, slot.gradeIndex)) };
    })
    .filter(Boolean);
}

function applyGradeColumn(students, gradeCell) {
  const grades = String(gradeCell ?? "")
    .split(/\s*(?:\r?\n|;|\s*,\s*)\s*/)
    .map(parseGrade)
    .filter(Boolean);
  if (!grades.length || !students.length) return students;
  if (grades.length === 1 && students.length === 1 && !students[0].grade) {
    return [{ ...students[0], grade: grades[0] }];
  }
  if (grades.length === students.length) {
    return students.map((student, index) => ({ ...student, grade: student.grade || grades[index] }));
  }
  return students;
}

function splitAwards(value) {
  return String(value ?? "")
    .split(/\s*(?:\r?\n|;|\||•|·)\s*/g)
    .map(clean)
    .filter(Boolean);
}

function unionAwards(lists) {
  const awards = [];
  const seen = new Set();
  for (const list of lists) {
    for (const name of list || []) {
      const cleaned = clean(name);
      const key = cleaned.toLowerCase();
      if (!cleaned || seen.has(key) || isDroppedAward(cleaned) || isHiddenAwardLabel(cleaned)) continue;
      seen.add(key);
      awards.push(cleaned);
    }
  }
  return awards;
}

function placementAward(finalAward) {
  const medalName = clean(finalAward).toUpperCase();
  if (medalName === "GOLD") return "Gold";
  if (medalName === "PARTICIPATION") return "Participation";
  if (finalAward && !isDroppedAward(finalAward) && !/^(GOLD|SILVER|BRONZE|PARTICIPATION)$/i.test(clean(finalAward))) {
    return clean(finalAward);
  }
  return "";
}

function normalizeRegion(value) {
  const text = clean(value);
  const numbered = text.match(/^(?:region\s*)?(\d{1,2})$/i);
  if (numbered) return `Region ${Number(numbered[1])}`;
  return text;
}

function parseYear(value, fallback) {
  const match = String(value ?? "").match(/\b(20\d{2})\b/);
  return match ? Number(match[1]) : fallback;
}

function rowIsEmpty(row) {
  return !(row || []).some((value) => clean(value));
}

function parseTab(values, { tab, defaultYear }) {
  const table = findTable(values || []);
  if (!table || table.mapping.fields.title === undefined) {
    const found = table?.mapping.labels?.join(", ");
    throw new SheetImportError(
      `The “${tab}” tab needs a project title column. Headers found: ${found || "none"}.`,
    );
  }
  const { fields, extraAwards } = table.mapping;
  const slots = studentSlots(values[table.index]);
  const warnings = [];
  const rows = [];
  for (let index = table.index + 1; index < values.length; index += 1) {
    const source = values[index] || [];
    if (rowIsEmpty(source)) continue;
    const sheetRow = index + 1;
    const slotted = studentsFromSlots(source, slots);
    const students = slotted.length
      ? slotted
      : applyGradeColumn(parseStudents(cell(source, fields.students)), cell(source, fields.grade));
    let finalAward = clean(cell(source, fields.finalAward));
    let specials = [
      ...splitAwards(cell(source, fields.awards)),
      ...extraAwards.flatMap((column) => splitAwards(cell(source, column))),
    ].filter((name) => !PLACEHOLDER_AWARDS.has(name.toUpperCase()));
    // The Projects Database tab has no Final Award column. Its medal is listed inside
    // "Awards Won", so lift it out. Silver and Bronze stay in the database with the label removed.
    // Canceled and no-show rows stay only when another award remains.
    if (!finalAward) {
      const medalIndex = specials.findIndex((name) => PLACEMENTS.has(name.toUpperCase()));
      if (medalIndex >= 0) {
        finalAward = specials[medalIndex];
        specials = specials.filter((_, index) => index !== medalIndex);
      }
    }
    const awards = unionAwards([[placementAward(finalAward)], specials]);
    const title = clean(cell(source, fields.title));
    const inclusion = rowInclusion(finalAward, awards);
    if (!title || students.length === 0) {
      warnings.push(
        `${tab} row ${sheetRow} was skipped because it ${!title ? "has no project title" : "has no finalist names"}.`,
      );
      continue;
    }
    const recipient = clean(cell(source, fields.awardRecipient)).toLowerCase();
    rows.push({
      year: parseYear(cell(source, fields.year), defaultYear),
      ijasNumber: clean(cell(source, fields.ijasNumber)),
      projectNumber: clean(cell(source, fields.projectNumber)),
      title,
      abstract: clean(cell(source, fields.abstract)),
      students,
      school: clean(cell(source, fields.school)),
      region: normalizeRegion(cell(source, fields.region)),
      category: clean(cell(source, fields.category)),
      projectType: clean(cell(source, fields.projectType)),
      awards: inclusion.awards,
      awardRecipient: recipient === "yes" ? "yes" : "",
      finalAward,
      dropped: inclusion.dropped,
      newlyIncluded: inclusion.newlyIncluded,
      sheetRow,
      tab,
    });
  }
  if (fields.year === undefined) warnings.push(`The “${tab}” tab has no Year column, so those rows were saved as ${defaultYear}.`);
  if (rows.length === 0) throw new SheetImportError(`The “${tab}” tab has no project rows.`, warnings);
  return { rows, warnings };
}

function nameKey(students) {
  return students
    .map((student) => normalizeHeader(student.name).replace(/[^a-z0-9]/g, ""))
    .filter(Boolean)
    .sort()
    .join("+");
}

function rowKeys(row) {
  const title = normalizeHeader(row.title);
  const names = nameKey(row.students);
  const keys = [];
  if (row.ijasNumber && row.projectNumber) keys.push(`ijas-project:${row.year}:${row.ijasNumber}:${row.projectNumber}`);
  if (title && names) keys.push(`title-names:${row.year}:${title}:${names}`);
  if (row.ijasNumber) keys.push(`ijas:${row.year}:${row.ijasNumber}`);
  if (title) keys.push(`title:${row.year}:${title}`);
  return keys;
}

function uniqueIndex(rows) {
  const buckets = new Map();
  for (const row of rows) {
    for (const key of rowKeys(row)) {
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(row);
    }
  }
  const unique = new Map();
  for (const [key, list] of buckets) {
    if (list.length === 1) unique.set(key, list[0]);
  }
  return unique;
}

function findMatch(row, index) {
  const title = normalizeHeader(row.title);
  const names = nameKey(row.students);
  const strict = [];
  if (row.ijasNumber && row.projectNumber) strict.push(`ijas-project:${row.year}:${row.ijasNumber}:${row.projectNumber}`);
  if (title && names) strict.push(`title-names:${row.year}:${title}:${names}`);
  for (const key of strict) {
    const found = index.get(key);
    if (found) return found;
  }
  if (!names && row.ijasNumber) {
    const byNumber = index.get(`ijas:${row.year}:${row.ijasNumber}`);
    if (byNumber) return byNumber;
  }
  if (!names && title) {
    const byTitle = index.get(`title:${row.year}:${title}`);
    if (byTitle) return byTitle;
  }
  if (names && row.ijasNumber && !row.projectNumber) {
    const byNumber = index.get(`ijas:${row.year}:${row.ijasNumber}`);
    if (byNumber) return byNumber;
  }
  return null;
}

function preferStudents(current, incoming) {
  const score = (list) => list.reduce((total, student) => total + (student.grade ? 2 : 1), 0);
  if (!current.length) return incoming;
  if (!incoming.length) return current;
  return score(incoming) > score(current) ? incoming : current;
}

function mergeAward(project, award) {
  const awardHasAwards = Boolean(award.finalAward) || award.awards.length > 0;
  if (awardHasAwards) {
    const placement = award.finalAward || project.finalAward;
    project.finalAward = placement;
    const inclusion = rowInclusion(placement, unionAwards([award.awards, [placementAward(placement)]]));
    project.awards = inclusion.awards;
    project.dropped = inclusion.dropped;
    project.newlyIncluded = inclusion.newlyIncluded;
  }
  project.students = preferStudents(project.students, award.students);
  project.title = project.title || award.title;
  project.abstract = project.abstract || award.abstract;
  project.school = project.school || award.school;
  project.region = project.region || award.region;
  project.category = project.category || award.category;
  project.projectType = project.projectType || award.projectType;
  project.ijasNumber = project.ijasNumber || award.ijasNumber;
  project.projectNumber = project.projectNumber || award.projectNumber;
  project.year = project.year || award.year;
  if (award.awardRecipient === "yes" || project.awardRecipient === "yes") project.awardRecipient = "yes";
}

// ---------------------------------------------------------------------------
// Two tabs, one project: which value wins?
//
// 2026 projects appear on BOTH "Awards 2026" and "Projects Database". For each field
// (title, students, school, region, category, project type, awards):
//   1. If the tabs agree, or one is blank, the non-blank value is used.
//   2. If they disagree, the tab that was EDITED since the last update wins. Fingerprints of
//      both tabs are saved after every update (data/sheet-state.json), so an edit in either tab
//      shows up on the site.
//   3. If both tabs changed, or there is no saved state yet, "Awards 2026" wins.
//   4. If neither tab changed, the side picked last time is kept (no flip-flopping).
// Projects that are only on one tab (e.g. 2025 projects on Projects Database) use that tab.
// ---------------------------------------------------------------------------

function fingerprint(value) {
  let hash = 0x811c9dc5;
  const text = String(value ?? "");
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(36);
}

function compareText(value) {
  return clean(value).toLowerCase();
}

function awardsCompareKey(row) {
  const norm = (name) => clean(name).toLowerCase().replace(/[^a-z0-9]/g, "");
  const medal = norm(row.finalAward);
  const list = (row.awards || []).map(norm).filter(Boolean).sort();
  return [medal, ...list].join("|");
}

const RECONCILED_FIELDS = {
  title: { compare: (row) => compareText(row.title) },
  students: { compare: (row) => nameKey(row.students || []) },
  school: { compare: (row) => compareText(row.school) },
  region: { compare: (row) => compareText(row.region) },
  category: { compare: (row) => compareText(row.category) },
  projectType: { compare: (row) => compareText(row.projectType) },
  awards: { compare: (row) => (row.finalAward || (row.awards || []).length ? awardsCompareKey(row) : "") },
};

function stateKey(row) {
  if (row.ijasNumber && row.projectNumber) return `${row.year}:${row.ijasNumber}:${row.projectNumber}`;
  return `${row.year}:${normalizeHeader(row.title)}:${nameKey(row.students || [])}`;
}

function applyField(project, field, source, other) {
  if (field === "awards") {
    project.finalAward = source.finalAward;
    const inclusion = rowInclusion(source.finalAward, unionAwards([[placementAward(source.finalAward)], source.awards]));
    project.awards = inclusion.awards;
    project.dropped = inclusion.dropped;
    project.newlyIncluded = inclusion.newlyIncluded;
    return;
  }
  if (field === "students") {
    // Keep grades from the other tab when the chosen tab has the same student without a grade.
    const grades = new Map((other.students || []).map((s) => [normalizeHeader(s.name).replace(/[^a-z0-9]/g, ""), s.grade]));
    project.students = (source.students || []).map((s) => ({
      ...s,
      grade: s.grade || grades.get(normalizeHeader(s.name).replace(/[^a-z0-9]/g, "")) || "",
    }));
    return;
  }
  project[field] = source[field];
}

function reconcileTabs(project, award, previousState, state, conflicts) {
  const database = {
    title: project.title,
    students: project.students,
    school: project.school,
    region: project.region,
    category: project.category,
    projectType: project.projectType,
    awards: project.awards,
    finalAward: project.finalAward,
    dropped: project.dropped,
  };
  mergeAward(project, award); // fills ids, abstract, recipient flag and any blanks
  const key = stateKey(project);
  const previous = previousState?.projects?.[key] || null;
  const saved = {};
  for (const [field, { compare }] of Object.entries(RECONCILED_FIELDS)) {
    const a = compare(award);
    const d = compare(database);
    const fa = fingerprint(a);
    const fd = fingerprint(d);
    if (a === d || !a || !d) {
      // No conflict: mergeAward already used the shared / non-blank value (same as before).
      saved[field] = [fa, fd, previous?.[field]?.[2] || "a"];
      continue;
    }
    let side;
    {
      const before = previous?.[field];
      const aChanged = !before || before[0] !== fa;
      const dChanged = !before || before[1] !== fd;
      if (before && dChanged && !aChanged) side = "d";
      else if (before && aChanged && !dChanged) side = "a";
      else if (before && !aChanged && !dChanged) side = before[2] || "a";
      else side = "a";
      conflicts.push({
        project: key,
        field,
        used: side === "a" ? "Awards 2026" : "Projects Database",
        awards2026: field === "awards" ? award.awards.join(" | ") : clean(field === "students" ? award.students.map((s) => s.name).join(", ") : award[field]),
        projectsDatabase: field === "awards" ? (database.awards || []).join(" | ") : clean(field === "students" ? (database.students || []).map((s) => s.name).join(", ") : database[field]),
      });
    }
    applyField(project, field, side === "a" ? award : database, side === "a" ? database : award);
    saved[field] = [fa, fd, side];
  }
  state[key] = saved;
}

function dedupeKey(row) {
  return [row.year, normalizeHeader(row.title), nameKey(row.students), row.ijasNumber, row.projectNumber].join("|");
}

function dedupeProjects(rows, warnings) {
  const byKey = new Map();
  let combined = 0;
  for (const row of rows) {
    const key = dedupeKey(row);
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, row);
      continue;
    }
    mergeAward(existing, row);
    combined += 1;
  }
  if (combined) warnings.push(`Combined ${combined} duplicate project ${combined === 1 ? "row" : "rows"}.`);
  return [...byKey.values()];
}

export function mergeWithArchive(sheetProjects, archive, sheetYears) {
  const years = sheetYears instanceof Set ? sheetYears : new Set(sheetYears);
  const kept = (archive || []).filter((project) => !years.has(Number(project.year)));
  return [...sheetProjects, ...kept];
}

export function importSheetValues({ awardsValues, projectsValues, archive = [], previousState = null }) {
  const awards = parseTab(awardsValues, { tab: "Awards 2026", defaultYear: 2026 });
  const database = parseTab(projectsValues, { tab: "Projects Database", defaultYear: 2026 });
  const warnings = [...database.warnings, ...awards.warnings];
  const projects = dedupeProjects(database.rows, warnings);
  const index = uniqueIndex(projects);
  const unmatched = [];
  const state = {};
  const conflicts = [];
  for (const award of awards.rows) {
    const match = findMatch(award, index);
    if (match) reconcileTabs(match, award, previousState, state, conflicts);
    else unmatched.push(award);
  }
  const extras = dedupeProjects(unmatched, warnings).filter((row) => !row.dropped);
  projects.push(...extras);
  if (extras.length) {
    warnings.push(
      `Added ${extras.length} ${extras.length === 1 ? "project" : "projects"} that appeared on Awards 2026 and not on Projects Database.`,
    );
  }

  const sheetYears = new Set(projects.map((row) => row.year));
  const finalized = finalizeProjectRows(projects);
  if (finalized.length === 0) {
    throw new SheetImportError(
      "No projects left after checking the sheet. Canceled, no-show, and blank rows are skipped.",
      warnings.slice(0, 25),
    );
  }
  const published = archive.length ? mergeWithArchive(finalized, archive, sheetYears) : finalized;
  return {
    projects: published,
    sheetYears: [...sheetYears],
    warnings: warnings.slice(0, 25),
    warningCount: warnings.length,
    sheetProjectCount: finalized.length,
    // Per-project fingerprints of both tabs, saved between updates so the next update can tell
    // which tab was edited (see reconcileTabs).
    state: { version: 1, projects: state },
    conflicts,
    rowCounts: { awards: awards.rows.length, database: database.rows.length },
  };
}
