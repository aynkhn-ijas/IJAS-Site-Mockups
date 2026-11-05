"use client";

import AwardCard from "@/components/AwardCard";
import PageHero from "@/components/PageHero";
import YearTabs from "@/components/YearTabs";
import { projectsForYear } from "@/data/exposition";
import { buildAwardSections, displayName, parseDollars } from "@/lib/awardValue";
import usePageTitle from "@/hooks/usePageTitle";
import useSettledClosed from "@/hooks/useSettledClosed";
import { useId, useMemo, useRef, useState } from "react";

function headingValue(name) {
  const dollars = parseDollars(name);
  if (dollars == null || name.includes("$")) return "";
  return ` · $${dollars.toLocaleString("en-US")}`;
}

function displayAwardName(name) {
  return String(name)
    .replace(/execptional project/gi, "EPIC")
    .replace(/exceptional project/gi, "EPIC");
}

function isThermoName(name) {
  return /thermo fisher/i.test(name);
}

function isThermoRegionName(name) {
  return isThermoName(name) && /region\s*\d+/i.test(name);
}

function isThermoStateName(name) {
  return isThermoName(name) && /state/i.test(name) && !/region/i.test(name);
}

function sectionKind(section) {
  if (section.id === "gold-award") return "gold";
  if (section.band === 8.75) return "epic";
  return "special";
}

function awardMatches(name, needle) {
  const raw = String(name).toLowerCase();
  const shown = displayAwardName(name).toLowerCase();
  const alias = raw.replace(/execptional project/g, "exceptional project");
  return raw.includes(needle) || shown.includes(needle) || alias.includes(needle);
}

function projectBlob(project) {
  return [displayName(project), project.title, project.school, project.category, ...(project.students || []).map((student) => student.name)]
    .filter(Boolean)
    .join("\n")
    .toLowerCase();
}

function recipientCount(section) {
  const nested = (section.regions || []).reduce((sum, region) => sum + region.projects.length, 0);
  return section.projects.length + nested;
}

function previewLabel(section) {
  const count = recipientCount(section);
  const people = `${count} ${count === 1 ? "recipient" : "recipients"}`;
  const regions = section.regions?.length || 0;
  if (!regions) return people;
  return `${people} · ${regions} ${regions === 1 ? "region" : "regions"}`;
}

function groupThermo(sections) {
  const regions = sections.filter((section) => isThermoRegionName(section.name));
  const state = sections.find((section) => isThermoStateName(section.name));
  if (!state && regions.length === 0) return sections;
  const parent = {
    ...(state || {
      id: "thermo-fisher-state",
      name: "Thermo Fisher - State",
      projects: [],
      band: 8.5,
      sort: 0,
      dollars: null,
    }),
    regions,
  };
  const rest = sections.filter((section) => section !== state && !isThermoRegionName(section.name));
  rest.push(parent);
  rest.sort((a, b) => a.band - b.band || a.sort - b.sort || a.name.localeCompare(b.name));
  return rest;
}

function toEntry(project, section, kind) {
  const awardName = displayAwardName(section.name);
  return {
    title: project.title || "Title not listed",
    students: displayName(project) || "Name not listed",
    awards: kind === "gold" ? [] : [awardName],
    medal: String(project.finalAward || "").toLowerCase(),
    highlight: kind === "epic" ? "epic" : kind === "gold" ? null : "special",
    variant: kind === "gold" ? "medal" : "special",
  };
}

function RecipientList({ section, kind }) {
  if (!section.projects.length) return null;
  return (
    <ul className="flex list-none flex-col gap-2">
      {section.projects.map((project, index) => (
        <li key={`${section.id}-${project.projectNumber}-${project.title}-${displayName(project)}-${index}`}>
          <AwardCard {...toEntry(project, section, kind)} />
        </li>
      ))}
    </ul>
  );
}

function RegionGroup({ section }) {
  const count = section.projects.length;
  return (
    <div className="border-l-2 border-[#75A8ED] pl-3">
      <h4 className="text-[15px] font-bold leading-snug text-ijas-navy">{displayAwardName(section.name)}</h4>
      <p className="mt-0.5 text-[13px] font-normal text-ijas-muted">
        {count} {count === 1 ? "recipient" : "recipients"}
      </p>
      <div className="mt-2">
        <RecipientList section={section} kind="special" />
      </div>
    </div>
  );
}

function AwardBlock({ section, forceOpen }) {
  const [open, setOpen] = useState(false);
  const expanded = forceOpen || open;
  const panelRef = useRef(null);
  const settledClosed = useSettledClosed(expanded, panelRef);
  const panelId = useId();
  const headingId = useId();
  const kind = sectionKind(section);
  const label = displayAwardName(section.name);
  const frame =
    kind === "gold"
      ? "rounded-md border border-[#e5e7eb] border-l-2 border-l-ijas-sky bg-white px-3 py-2"
      : kind === "epic"
        ? "rounded-md border border-[#e5e7eb] border-l-2 border-l-ijas-maroon bg-white px-3 py-2"
        : "rounded-md border border-[#75A8ED] bg-[#f3f7fd] px-3 py-2";
  const headingClass = kind === "epic" ? "text-ijas-maroon" : "text-ijas-navy";
  const regions = section.regions || [];

  return (
    <section aria-labelledby={headingId} className={frame}>
      <h3 id={headingId} className={`text-base font-bold leading-snug ${headingClass}`}>
        <button
          type="button"
          className="flex w-full items-start justify-between gap-3 text-left"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>
            <span className="block">
              {label}
              {headingValue(section.name)}
            </span>
            <span className="mt-0.5 block text-[13px] font-normal text-ijas-muted">{previewLabel(section)}</span>
          </span>
          <svg
            viewBox="0 0 20 20"
            className={`mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        aria-hidden={expanded ? undefined : true}
        ref={panelRef}
        className={`accordion-panel ${expanded ? "is-open" : ""} ${settledClosed ? "is-settled" : ""}`}
      >
        <div>
          <div className="flex flex-col gap-3 pt-2">
            <RecipientList section={section} kind={kind} />
            {regions.length ? (
              <div className="flex flex-col gap-3">
                {regions.map((region) => (
                  <RegionGroup key={region.id} section={region} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function filterSections(sections, needle) {
  if (!needle) return sections;
  return sections
    .map((section) => {
      if (awardMatches(section.name, needle)) return section;
      const projects = section.projects.filter((project) => projectBlob(project).includes(needle));
      const regions = (section.regions || [])
        .map((region) => {
          if (awardMatches(region.name, needle)) return region;
          const regionProjects = region.projects.filter((project) => projectBlob(project).includes(needle));
          return regionProjects.length ? { ...region, projects: regionProjects } : null;
        })
        .filter(Boolean);
      if (!projects.length && !regions.length) return null;
      return { ...section, projects, regions };
    })
    .filter(Boolean);
}

export default function AwardsByValue() {
  const [year, setYear] = useState(2026);
  const [query, setQuery] = useState("");
  const [listVersion, setListVersion] = useState(0);
  usePageTitle("Awards by Value");
  const sections = useMemo(() => groupThermo(buildAwardSections(projectsForYear(year))), [year]);
  const needle = query.trim().toLowerCase();

  function updateQuery(value) {
    setQuery(value);
    if (!String(value).trim()) setListVersion((version) => version + 1);
  }

  const visible = useMemo(() => filterSections(sections, needle), [sections, needle]);
  const matchCount = visible.reduce((sum, section) => sum + recipientCount(section), 0);

  return (
    <>
      <PageHero title="Awards by Value" />
      <YearTabs
        year={year}
        onChange={(next) => {
          setYear(next);
          updateQuery("");
        }}
        controlsId="awards-by-value"
      />
      <section id="awards-by-value" className="bg-white px-5 py-6 sm:px-8 md:py-8">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-2xl font-bold text-ijas-navy md:text-3xl">Awards by Value</h2>

          <div className="mt-4 max-w-xl">
            <label htmlFor="award-value-search" className="text-[12px] font-semibold text-ijas-navy">
              Search awards
            </label>
            <div className="relative mt-1">
              <input
                id="award-value-search"
                type="search"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="Name, title, school, category, or award"
                className="w-full rounded-md border border-[#d1d5db] bg-ijas-wash py-1.5 pl-3 pr-10 text-base font-normal text-ijas-ink [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => updateQuery("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-lg leading-none text-ijas-navy transition-colors duration-200 hover:bg-white"
                >
                  ×
                </button>
              ) : null}
            </div>
          </div>
          <p className="mt-2 text-[13px] text-ijas-muted" aria-live="polite">
            {needle
              ? `${matchCount} matching ${matchCount === 1 ? "recipient" : "recipients"}`
              : "All awards are collapsed. Open a section to see recipients."}
          </p>

          <div className="award-value-list mt-3 flex flex-col gap-2">
            {visible.length === 0 ? (
              <p className="py-8 text-[#374151]">No awards match this search.</p>
            ) : (
              visible.map((section) => (
                <AwardBlock key={`${year}-${listVersion}-${section.id}`} section={section} forceOpen={needle.length > 0} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
