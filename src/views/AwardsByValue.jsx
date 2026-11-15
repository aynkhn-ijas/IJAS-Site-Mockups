"use client";

import Hero from "@/components/Hero";
import YearTabs from "@/components/YearTabs";
import { listed, presenterLine, projects as bundledProjects, studentLine } from "@/data/projects";
import usePageTitle from "@/hooks/usePageTitle";
import useSmartSearch from "@/hooks/useSmartSearch";
import { buildAwardSections, headingValue } from "@/lib/awardValue";
import { orderBySmartSearch } from "@/lib/smartSearch";
import Link from "next/link";
import { useMemo, useState } from "react";

function matchesQuery(project, awardName, query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [awardName, project.title, studentLine(project), project.category, project.school, project.region]
    .join("\n")
    .toLowerCase()
    .includes(needle);
}

export default function AwardsByValue({ projects = bundledProjects }) {
  const [year, setYear] = useState(2026);
  const [query, setQuery] = useState("");
  const { scores, loading } = useSmartSearch(query);
  usePageTitle("Awards");
  const sections = useMemo(
    () => buildAwardSections(projects.filter((project) => project.year === Number(year))),
    [projects, year],
  );
  const visible = useMemo(() => {
    const needle = query.trim();
    return sections
      .map((section) => {
        let sectionProjects = section.projects;
        if (needle && scores) {
          sectionProjects = orderBySmartSearch(section.projects, needle, scores, { awardName: section.name });
        } else if (needle) {
          sectionProjects = section.projects.filter((project) => matchesQuery(project, section.name, needle));
        }
        return { ...section, projects: sectionProjects };
      })
      .filter((section) => section.projects.length > 0);
  }, [sections, query, scores]);

  return (
    <>
      <Hero year={year} title="Awards" />
      <YearTabs year={year} onChange={setYear} controlsId="awards-by-value" />
      <div id="awards-by-value" className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-12">
        <p className="max-w-[760px] text-[16px] leading-relaxed text-[#374151]">
          Awards from the {year} State Exposition are ordered by award value. Within each award, projects are listed by
          region, school, and category.
        </p>
        <label htmlFor="award-value-search" className="mb-8 mt-6 block max-w-[760px] text-[13px] font-semibold text-ijas-navy">
          Search
          <input
            id="award-value-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Award, title, student, category, school, or region"
            className="mt-1 w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2 text-[15px] font-normal text-ijas-ink"
          />
          {loading ? (
            <span className="mt-1 block text-[12px] font-normal text-ijas-muted" role="status">
              Smart search loading…
            </span>
          ) : null}
        </label>
        <div className="space-y-10">
          {visible.length === 0 ? (
            <p className="text-[16px] leading-relaxed text-[#374151]">No projects match this search.</p>
          ) : null}
          {visible.map((section) => (
            <section key={section.id} aria-labelledby={`award-${section.id}`}>
              <h2
                id={`award-${section.id}`}
                className="rounded-xl bg-[#D6EAF8] px-4 py-3 text-[22px] font-bold leading-tight text-ijas-navy md:text-[26px]"
              >
                {section.name}
                {headingValue(section.name)}
                <span className="ml-2 text-[15px] font-medium text-[#374151]">
                  ({section.projects.length} {section.projects.length === 1 ? "project" : "projects"})
                </span>
              </h2>
              <ul className="mt-4 divide-y divide-[#e5e7eb] border-b border-[#e5e7eb]">
                {section.projects.map((project) => (
                  <li key={`${section.id}-${project.id}`} className="py-3">
                    <p className="text-[15px] leading-snug">
                      <ProjectTitle project={project} />
                      <span className="text-[14px] font-normal text-[#374151]">
                        {" "}
                        ⋅ {listed(project.category, "Category not listed")}
                      </span>
                    </p>
                    <div className="pl-5">
                      <p className="mt-0.5 text-[14px] text-[#374151]">{presenterLine(project) || "Name not listed"}</p>
                      <p className="mt-0.5 text-[14px] text-[#374151]">
                        {listed(project.school, "School not listed")} · {listed(project.region, "Region not listed")}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

function ProjectTitle({ project }) {
  const title = project.title || "Title not listed";
  const className = "font-semibold text-ijas-navy hover:underline";
  if (!project.id) return <span className={className}>{title}</span>;
  return (
    <Link href={`/projects/${project.id}`} className={className}>
      {title}
    </Link>
  );
}
