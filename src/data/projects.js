import { abstractsById } from "./abstracts";
import { awards2025 } from "./awards2025";
import projects2026 from "./projects2026.json";

const DROPPED_AWARDS = new Set(["CANCEL", "NOSHOW", "CANCELED", "NO SHOW", "NO-SHOW"]);
const HIDDEN_AWARD_LABELS = new Set(["SILVER", "BRONZE", "SILVER AWARD", "BRONZE AWARD", "NONE", "N/A", "NA", "NO AWARD", "NO AWARDS", "—", "-"]);

function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function medal(value) {
  return clean(value).toUpperCase();
}

export function displayAward(name) {
  return clean(name).replace(/execptional project/gi, "EPIC").replace(/exceptional project/gi, "EPIC");
}

function splitNames(value) {
  return clean(value)
    .split(/\s+&\s+|,\s+/)
    .map((name) => name.trim())
    .filter(Boolean);
}

function awardList(finalAward, specials) {
  const awards = [];
  const placement = medal(finalAward);
  if (placement === "GOLD") awards.push("Gold");
  if (placement === "PARTICIPATION") awards.push("Participation");
  for (const name of specials || []) {
    const cleaned = clean(name);
    if (cleaned && !isHiddenAwardLabel(cleaned) && !awards.includes(cleaned)) awards.push(cleaned);
  }
  return awards;
}

export function isDroppedAward(value) {
  return DROPPED_AWARDS.has(medal(value));
}

export function isHiddenAwardLabel(value) {
  return HIDDEN_AWARD_LABELS.has(medal(value));
}

/** Awards shown in the database, profiles, and the award filter. Silver and Bronze are never included. */
export function visibleAwards(awards) {
  const seen = new Set();
  const list = [];
  for (const award of awards || []) {
    const name = displayAward(award);
    if (!name || isHiddenAwardLabel(name)) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    list.push(name);
  }
  return list;
}

function legacyMedal(value) {
  const name = medal(value);
  return name === "SILVER" || name === "BRONZE" || DROPPED_AWARDS.has(name);
}

export function rowInclusion(finalAward, awards) {
  const shown = visibleAwards(awards);
  const dropped = isDroppedAward(finalAward) && shown.length === 0;
  return {
    awards: shown,
    dropped,
    newlyIncluded: !dropped && legacyMedal(finalAward),
  };
}

function slugPart(value) {
  return clean(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

function studentRecord(student) {
  if (student && typeof student === "object") {
    return { name: clean(student.name), grade: clean(student.grade) };
  }
  return { name: clean(student), grade: "" };
}

function from2026(row) {
  const fromRows = (row.students || []).map(studentRecord).filter((student) => student.name);
  const students = fromRows.length ? fromRows : splitNames(row.exhibitors).map((name) => ({ name, grade: "" }));
  return {
    year: 2026,
    ijasNumber: clean(row.ijasNumber),
    projectNumber: clean(row.projectNumber),
    title: clean(row.title),
    abstract: clean(row.abstract),
    students,
    school: clean(row.school),
    region: clean(row.region),
    category: clean(row.category),
    projectType: clean(row.projectType),
    ...rowInclusion(row.finalAward, awardList(row.finalAward, row.specialAwards)),
  };
}

function from2025(group, project) {
  const students = splitNames(project.students).map((name) => ({ name, grade: "" }));
  return {
    year: 2025,
    ijasNumber: "",
    projectNumber: "",
    title: clean(project.title),
    abstract: clean(project.abstract),
    students,
    school: "",
    region: "",
    category: clean(group.category),
    projectType: "",
    ...rowInclusion(project.medal, awardList(project.medal, project.awards)),
  };
}

function isBlank(row) {
  return !row.title || row.students.length === 0;
}

function assignIds(rows, used = new Set()) {
  const ijasCounts = new Map();
  for (const row of rows) {
    if (!row.ijasNumber) continue;
    const key = `${row.year}:${row.ijasNumber}`;
    ijasCounts.set(key, (ijasCounts.get(key) || 0) + 1);
  }
  return rows.map((row) => {
    let base;
    if (row.ijasNumber) {
      const key = `${row.year}:${row.ijasNumber}`;
      const numbered = `${row.year}-ijas-${row.ijasNumber}-${row.projectNumber}`;
      base = ijasCounts.get(key) === 1 ? `${row.year}-ijas-${row.ijasNumber}` : numbered;
      if (used.has(base) && row.projectNumber) base = numbered;
    } else if (row.projectNumber) {
      base = `${row.year}-project-${row.projectNumber}`;
    } else {
      base = `${row.year}-${slugPart(row.title) || "project"}`;
    }
    let id = base;
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    const project = {
      id,
      year: row.year,
      title: row.title,
      abstract: row.abstract,
      students: row.students,
      school: row.school,
      region: row.region,
      category: row.category,
      projectType: row.projectType,
      awards: visibleAwards(row.awards),
    };
    if (row.awardRecipient) project.awardRecipient = row.awardRecipient;
    return project;
  });
}

function withStoredAbstract(project) {
  if (project.abstract) return project;
  const abstract = abstractsById[project.id];
  return abstract ? { ...project, abstract } : project;
}

export function finalizeProjectRows(rows) {
  const kept = rows.filter((row) => !row.dropped && !isBlank(row));
  const legacy = kept.filter((row) => !row.newlyIncluded);
  const extra = kept.filter((row) => row.newlyIncluded);
  const legacyProjects = assignIds(legacy);
  const extraProjects = assignIds(extra, new Set(legacyProjects.map((project) => project.id)));
  const byRow = new Map();
  legacy.forEach((row, index) => byRow.set(row, legacyProjects[index]));
  extra.forEach((row, index) => byRow.set(row, extraProjects[index]));
  return kept.map((row) => withStoredAbstract(byRow.get(row)));
}

const sourceRows = [
  ...projects2026.map(from2026),
  ...awards2025.flatMap((group) => group.projects.map((project) => from2025(group, project))),
];

export const projects = finalizeProjectRows(sourceRows);

const byId = new Map(projects.map((project) => [project.id, project]));

export function getProject(id) {
  return byId.get(String(id || "")) || null;
}

export function projectsForYear(year) {
  return projects.filter((project) => project.year === Number(year));
}

export function allProjects() {
  return projects;
}

export const projectYears = [2026, 2025];

export function listed(value, emptyLabel) {
  return clean(value) || emptyLabel;
}

function studentName(student) {
  if (student && typeof student === "object") return clean(student.name);
  return clean(student);
}

export function studentLine(project) {
  return (project.students || []).map(studentName).filter(Boolean).join(", ");
}

export function presenterLine(project) {
  return (project.students || [])
    .map((student) => {
      const name = studentName(student);
      if (!name) return "";
      const grade = student && typeof student === "object" ? clean(student.grade) : "";
      return grade ? `${name} (${grade})` : name;
    })
    .filter(Boolean)
    .join(", ");
}

export function projectBlob(project) {
  return [
    project.title,
    studentLine(project),
    project.school,
    project.category,
    project.region,
    project.abstract,
    ...visibleAwards(project.awards),
  ]
    .join("\n")
    .toLowerCase();
}

export function matchesProject(project, { query = "", region = "", school = "", category = "", award = "" } = {}) {
  const needle = query.trim().toLowerCase();
  if (needle && !projectBlob(project).includes(needle)) return false;
  if (region && listed(project.region, "Not listed") !== region) return false;
  if (school && listed(project.school, "Not listed") !== school) return false;
  if (category && listed(project.category, "Not listed") !== category) return false;
  if (award && !visibleAwards(project.awards).some((name) => name === award)) return false;
  return true;
}

export function filterProjects(list, filters) {
  return list.filter((project) => matchesProject(project, filters));
}

export function uniqueOptions(list, pick) {
  return [...new Set(list.map(pick).filter(Boolean))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}
