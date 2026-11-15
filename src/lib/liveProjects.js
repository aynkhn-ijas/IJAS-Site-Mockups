import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { projects as bundledProjects } from "../data/projects.js";

function filePath() {
  return process.env.IJAS_LIVE_PROJECTS_PATH || path.join(process.cwd(), "data", "live-projects.json");
}

function readLive() {
  try {
    const parsed = JSON.parse(readFileSync(filePath(), "utf8"));
    if (Array.isArray(parsed?.projects) && parsed.projects.length > 0) return parsed.projects;
  } catch (error) {
    if (error?.code !== "ENOENT") console.error("Could not read live awards data:", error.message);
  }
  return null;
}

export function loadProjects() {
  return readLive() || bundledProjects;
}

export function getLiveProject(id) {
  const key = String(id || "");
  return loadProjects().find((project) => project.id === key) || null;
}

export function saveLiveProjects(projectList, meta = {}) {
  if (!Array.isArray(projectList) || projectList.length === 0) {
    throw new Error("Refusing to publish an empty project list.");
  }
  const target = filePath();
  mkdirSync(path.dirname(target), { recursive: true });
  const temp = `${target}.${process.pid}.tmp`;
  const payload = {
    updatedAt: new Date().toISOString(),
    projectCount: projectList.length,
    ...meta,
    projects: projectList,
  };
  writeFileSync(temp, JSON.stringify(payload));
  renameSync(temp, target);
  return payload;
}
