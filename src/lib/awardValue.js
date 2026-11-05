export function parseDollars(name) {
  const match = String(name).match(/\$\s*([\d,]+)\s*(k)?/i);
  if (!match) return null;
  const amount = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(amount)) return null;
  return match[2] ? amount * 1000 : amount;
}

function thermoSort(name) {
  if (/state/i.test(name) && !/region/i.test(name)) return 0;
  const region = name.match(/region\s*(\d+)/i);
  if (region) return Number(region[1]);
  return 80;
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

function isEpicName(name) {
  const text = String(name).trim();
  return /^(epic|exceptional project|execptional project)\b/i.test(text) || /epic/i.test(text);
}

export function awardBand(name) {
  const dollars = parseDollars(name);
  if (/isef/i.test(name)) return { band: 2, sort: 0, dollars: null };
  if (dollars != null && dollars >= 1000) return { band: 1, sort: -dollars, dollars };
  if (dollars != null) return { band: 4, sort: -dollars, dollars };
  if (/thermo fisher/i.test(name)) return { band: 8.5, sort: thermoSort(name), dollars: null };
  // EPIC sits after every other special, including Thermo Fisher, and before Gold.
  if (isEpicName(name)) return { band: 8.75, sort: 0, dollars: null };
  return { band: 6, sort: -prestige(name), dollars: null };
}

function regionNumber(region) {
  const match = String(region || "").match(/(\d+)/);
  return match ? Number(match[1]) : 99;
}

export function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    const region = regionNumber(a.region) - regionNumber(b.region);
    if (region !== 0) return region;
    return displayName(a).localeCompare(displayName(b));
  });
}

export function displayName(project) {
  if (project.exhibitors) return project.exhibitors;
  return project.students
    .map((student) => student.name)
    .filter(Boolean)
    .join(", ");
}

export function gradeLabel(project) {
  const grades = project.students.map((student) => student.grade).filter(Boolean);
  if (grades.length === 0) return "";
  if (grades.length === 1) return `Grade ${grades[0]}`;
  return `Grades ${grades.join(", ")}`;
}

export function isExcludedStatus(project) {
  return project.finalAward === "CANCEL" || project.finalAward === "NOSHOW";
}

export function awardsWon(project) {
  const parts = [];
  const medal = String(project.finalAward || "").trim();
  if (medal && medal !== "CANCEL" && medal !== "NOSHOW") {
    parts.push(medal.charAt(0) + medal.slice(1).toLowerCase());
  } else if (medal === "CANCEL") {
    parts.push("Canceled");
  } else if (medal === "NOSHOW") {
    parts.push("No show");
  }
  for (const award of project.specialAwards || []) {
    if (award) parts.push(award);
  }
  return parts.join("; ");
}

function cleanAward(name) {
  return String(name).replace(/\s+/g, " ").trim();
}

function sectionId(name) {
  const slug = String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "award";
}

export function buildAwardSections(projects) {
  const groups = new Map();
  const gold = [];
  const unnamed = [];

  for (const project of projects) {
    const specials = [...new Set((project.specialAwards || []).filter(Boolean).map(cleanAward))];
    const marked = String(project.awardRecipient || "").toLowerCase() === "yes";
    if (specials.length === 0) {
      if (marked) unnamed.push(project);
      else if (project.finalAward === "GOLD") gold.push(project);
      continue;
    }
    for (const award of specials) {
      if (!groups.has(award)) groups.set(award, []);
      groups.get(award).push(project);
    }
  }

  const usedIds = new Map();
  const sections = [...groups.entries()].map(([name, entries]) => {
    const base = sectionId(name);
    const seen = usedIds.get(base) || 0;
    usedIds.set(base, seen + 1);
    return {
      id: seen === 0 ? base : `${base}-${seen + 1}`,
      name,
      projects: sortProjects(entries),
      ...awardBand(name),
    };
  });

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
  if (gold.length) {
    sections.push({
      id: "gold-award",
      name: "Gold Award",
      projects: sortProjects(gold),
      band: 9,
      sort: 0,
      dollars: null,
    });
  }

  sections.sort((a, b) => a.band - b.band || a.sort - b.sort || a.name.localeCompare(b.name));
  return sections;
}
