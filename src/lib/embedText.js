function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

/** Text embedded for one project: title, category, abstract, then school and region as light context. */
export function embedDocument(project) {
  const lines = [];
  const title = clean(project.title);
  const category = clean(project.category);
  const abstract = clean(project.abstract);
  const school = clean(project.school);
  const region = clean(project.region);
  if (title) lines.push(title);
  if (category) lines.push(category);
  if (abstract) lines.push(abstract);
  if (school) lines.push(`School: ${school}`);
  if (region) lines.push(`Region: ${region}`);
  return lines.join("\n");
}
