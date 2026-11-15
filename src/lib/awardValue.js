import { displayAward } from "../data/projects.js";

const PLAIN_AWARDS = new Set(["gold", "silver", "bronze", "participation"]);

export function parseDollars(name) {
  const match = String(name).match(/\$\s*([\d,]+)\s*(k)?/i);
  if (!match) return null;
  const amount = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(amount)) return null;
  return match[2] ? amount * 1000 : amount;
}

export function headingValue(name) {
  const dollars = parseDollars(name);
  if (dollars == null || String(name).includes("$")) return "";
  return ` · $${dollars.toLocaleString("en-US")}`;
}

function cleanAward(name) {
  return String(name || "").replace(/\s+/g, " ").trim();
}

function isPlainAward(name) {
  return PLAIN_AWARDS.has(cleanAward(name).toLowerCase());
}

function prestige(name) {
  const rules = [
    [/scarf future health/i, 2600],
    [/research scholar/i, 2400],
    [/distinguished scholar|travel award/i, 2200],
    [/president/i, 2000],
    [/physics luncheon|^luncheon$/i, 1800],
    [/science coach/i, 1600],
    [/exceptional|execptional|outstanding/i, 1400],
    [/nasa|noaa|ricoh|yale|air force|psychological|in vitro|geoscientist|asce|hanson|ameren|perfection|maurer|association/i, 1000],
    [/essay/i, 500],
    [/t-shirt/i, 400],
    [/swag/i, 200],
  ];
  for (const [pattern, score] of rules) {
    if (pattern.test(name)) return score;
  }
  return 800;
}

export function awardBand(name) {
  if (/thermo fisher/i.test(name)) return null;
  const dollars = parseDollars(name);
  if (/isef/i.test(name)) return { band: 2, sort: 0, dollars: null };
  if (dollars != null && dollars >= 1000) return { band: 1, sort: -dollars, dollars };
  if (dollars != null) return { band: 4, sort: -dollars, dollars };
  if (/epic/i.test(name)) return { band: 8, sort: 0, dollars: null };
  return { band: 6, sort: -prestige(name), dollars: null };
}

function regionNumber(region) {
  const match = String(region || "").match(/(\d+)/);
  return match ? Number(match[1]) : 99;
}

function compareText(a, b) {
  return String(a || "").localeCompare(String(b || ""), undefined, { numeric: true, sensitivity: "base" });
}

export function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    const region = regionNumber(a.region) - regionNumber(b.region);
    if (region !== 0) return region;
    return compareText(a.school, b.school) || compareText(a.category, b.category) || compareText(a.title, b.title);
  });
}

function sectionId(name) {
  const slug = String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "award";
}

function specialLabels(project) {
  const labels = [];
  for (const award of project.awards || []) {
    const cleaned = cleanAward(award);
    if (!cleaned || isPlainAward(cleaned)) continue;
    const label = displayAward(cleaned);
    if (!labels.includes(label)) labels.push(label);
  }
  return labels;
}

function isRecipientOnly(project) {
  const flag = project.awardRecipient;
  return flag === true || String(flag || "").toLowerCase() === "yes";
}

function isBlank(project) {
  return !cleanAward(project.title) || !project.students?.length;
}

export function buildAwardSections(projects) {
  const groups = new Map();
  const unnamed = [];

  for (const project of projects) {
    if (isBlank(project)) continue;
    const specials = specialLabels(project);
    if (specials.length === 0) {
      if (isRecipientOnly(project)) unnamed.push(project);
      continue;
    }
    for (const award of specials) {
      if (!groups.has(award)) groups.set(award, []);
      groups.get(award).push(project);
    }
  }

  const usedIds = new Map();
  const sections = [];
  for (const [name, entries] of groups.entries()) {
    const band = awardBand(name);
    if (!band) continue;
    const base = sectionId(name);
    const seen = usedIds.get(base) || 0;
    usedIds.set(base, seen + 1);
    sections.push({
      id: seen === 0 ? base : `${base}-${seen + 1}`,
      name,
      projects: sortProjects(entries),
      ...band,
    });
  }

  if (unnamed.length) {
    sections.push({
      id: "special-award-recipient",
      name: "Special Award Recipient",
      projects: sortProjects(unnamed),
      band: 7,
      sort: 0,
      dollars: null,
    });
  }

  sections.sort((a, b) => a.band - b.band || a.sort - b.sort || a.name.localeCompare(b.name));
  return sections;
}
