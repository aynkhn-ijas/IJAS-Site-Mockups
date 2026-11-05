import { awards2025 } from "./awards2025";
import projects2026 from "./projects2026.json";

function titleMedal(medal) {
  return String(medal || "").trim().toUpperCase();
}

function flatten2025() {
  const rows = [];
  for (const group of awards2025) {
    for (const project of group.projects) {
      const specials = (project.awards || []).filter(Boolean);
      rows.push({
        year: 2025,
        projectNumber: "",
        finalAward: titleMedal(project.medal),
        students: [{ name: project.students || "", grade: "" }],
        exhibitors: project.students || "",
        school: "",
        category: group.category || "",
        title: project.title || "",
        region: "",
        ijasNumber: "",
        studentCount: "",
        projectType: "",
        awardRecipient: specials.length ? "yes" : "",
        specialAwards: specials,
        division: project.division || "",
        fairState: "Illinois",
      });
    }
  }
  return rows;
}

const projects2025 = flatten2025();

export function projectsForYear(year) {
  if (Number(year) === 2025) return projects2025;
  return projects2026;
}

export function allProjects() {
  return [...projects2025, ...projects2026];
}

export const expositionYears = [2025, 2026];
