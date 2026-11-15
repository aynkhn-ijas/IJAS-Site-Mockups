"use client";

import Hero from "@/components/Hero";
import ProjectSearch from "@/components/ProjectSearch";
import { displayAward, filterProjects, listed, projects as bundledProjects, studentLine, uniqueOptions } from "@/data/projects";
import usePageTitle from "@/hooks/usePageTitle";
import useSmartSearch from "@/hooks/useSmartSearch";
import { orderBySmartSearch } from "@/lib/smartSearch";
import Link from "next/link";
import { useMemo, useState } from "react";

const PAGE_SIZES = [10, 25, 50, 100];
const COLUMNS = [
  { key: "year", label: "Year", className: "w-[6%]" },
  { key: "name", label: "Finalist Name(s)", className: "w-[14%]" },
  { key: "title", label: "Project Title", className: "w-[22%]" },
  { key: "category", label: "Category", className: "w-[12%]" },
  { key: "region", label: "Region", className: "w-[8%]" },
  { key: "school", label: "School", className: "w-[14%]" },
  { key: "awards", label: "Awards Won", className: "w-[24%]" },
];

const CELL = "px-5 py-5 align-top leading-relaxed";
const WIDE_CELL = "px-6 py-5 align-top leading-relaxed";

function rowModel(project) {
  return {
    project,
    year: project.year,
    name: studentLine(project),
    title: project.title,
    category: project.category,
    region: project.region,
    school: project.school,
    awards: project.awards.map(displayAward).join("\n"),
  };
}

function compareValues(a, b, key) {
  if (key === "year") return Number(a.year) - Number(b.year);
  return String(a[key] || "").localeCompare(String(b[key] || ""), undefined, { numeric: true, sensitivity: "base" });
}

function pageWindow(current, total) {
  const wanted = new Set([1, total, current - 2, current - 1, current, current + 1, current + 2]);
  return [...wanted].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
}

export default function ProjectDatabase({ projects = bundledProjects }) {
  usePageTitle("Project Database");
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [award, setAward] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState("year");
  const [sortDir, setSortDir] = useState("asc");
  const { scores, loading } = useSmartSearch(query);

  const regions = useMemo(() => uniqueOptions(projects, (project) => listed(project.region, "Not listed")), [projects]);
  const categories = useMemo(() => uniqueOptions(projects, (project) => listed(project.category, "Not listed")), [projects]);
  const awardOptions = useMemo(
    () => [...new Set(projects.flatMap((project) => project.awards.map(displayAward)))].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" })),
    [projects],
  );

  const rows = useMemo(() => {
    const sortRows = (list) => {
      list.sort((a, b) => {
        const base = compareValues(a, b, sortKey);
        if (base !== 0) return sortDir === "asc" ? base : -base;
        return compareValues(a, b, "title");
      });
      return list;
    };
    const narrowed = filterProjects(projects, { region, category, award });
    const needle = query.trim();
    if (!needle) return sortRows(narrowed.map(rowModel));
    if (!scores) return sortRows(filterProjects(narrowed, { query }).map(rowModel));
    return orderBySmartSearch(narrowed, needle, scores, { includeAbstract: true }).map(rowModel);
  }, [award, category, projects, query, region, scores, sortDir, sortKey]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = rows.length === 0 ? 0 : (currentPage - 1) * pageSize;
  const visible = rows.slice(start, start + pageSize);
  const showingFrom = rows.length === 0 ? 0 : start + 1;
  const showingTo = start + visible.length;
  const active = Boolean(query.trim() || region || category || award);

  function changeSort(key) {
    if (sortKey === key) setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  function clearFilters() {
    setQuery("");
    setRegion("");
    setCategory("");
    setAward("");
    setPage(1);
  }

  const pages = pageWindow(currentPage, pageCount);
  const viewKey = `${query}|${region}|${category}|${award}|${pageSize}|${currentPage}|${sortKey}|${sortDir}`;

  return (
    <>
      <style>{`
        @keyframes project-db-rows {
          from { opacity: 0.4; }
          to { opacity: 1; }
        }
        .project-db-rows {
          animation: project-db-rows 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .project-db-rows { animation: none; }
        }
      `}</style>
      <Hero year={2026} title="Project Database" />
      <div className="mx-auto max-w-[1560px] px-4 py-8 md:px-8 md:py-10">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 text-[15px] text-ijas-ink">
            <span className="sr-only">Entries per page</span>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
              className="rounded-md border border-[#d1d5db] bg-white px-2.5 py-2 text-[15px]"
              aria-label="Entries per page"
            >
              {PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            entries per page
          </label>
        </div>
        <ProjectSearch
          idPrefix="project-db"
          query={query}
          onQuery={(value) => {
            setQuery(value);
            setPage(1);
          }}
          region={region}
          onRegion={(value) => {
            setRegion(value);
            setPage(1);
          }}
          regions={regions}
          category={category}
          onCategory={(value) => {
            setCategory(value);
            setPage(1);
          }}
          categories={categories}
          award={award}
          onAward={(value) => {
            setAward(value);
            setPage(1);
          }}
          awards={awardOptions}
          onClear={clearFilters}
          active={active}
          loading={loading}
        />
        <p className="mt-3 text-[13px] text-ijas-muted" aria-live="polite">
          {active ? `${rows.length} matching ${rows.length === 1 ? "project" : "projects"}` : `${projects.length} projects`}
        </p>

        <div className="mt-4 overflow-x-auto border border-[#e5e7eb]">
          <table className="w-full min-w-[1180px] table-fixed border-collapse text-left text-[16px] text-ijas-ink">
            <colgroup>
              {COLUMNS.map((column) => (
                <col key={column.key} className={column.className} />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white">
                {COLUMNS.map((column) => {
                  const activeSort = sortKey === column.key;
                  const ariaSort = activeSort ? (sortDir === "asc" ? "ascending" : "descending") : "none";
                  const roomy = column.key === "title" || column.key === "awards";
                  return (
                    <th key={column.key} scope="col" aria-sort={ariaSort} className={`${roomy ? "px-6" : "px-5"} py-4 font-bold`}>
                      <button
                        type="button"
                        onClick={() => changeSort(column.key)}
                        className="inline-flex items-center gap-1.5 text-left transition-colors duration-200 hover:text-ijas-navy"
                      >
                        {column.label}
                        <span
                          aria-hidden="true"
                          className={`inline-block text-[11px] text-ijas-muted transition-transform duration-200 ${activeSort ? "opacity-100" : "opacity-35"} ${
                            activeSort && sortDir === "desc" ? "rotate-180" : ""
                          }`}
                        >
                          ▲
                        </span>
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody key={viewKey} className="project-db-rows">
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="px-6 py-10 text-center text-ijas-muted">
                    No projects match this search.
                  </td>
                </tr>
              ) : (
                visible.map((row, index) => (
                  <tr
                    key={row.project.id}
                    className={`transition-colors duration-200 hover:bg-[#e3eef8] ${index % 2 === 0 ? "bg-[#f3f4f6]" : "bg-white"}`}
                  >
                    <td className={CELL}>{row.year}</td>
                    <td className={CELL}>{row.name}</td>
                    <td className={WIDE_CELL}>
                      <Link href={`/projects/${row.project.id}`} className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline">
                        {row.title}
                      </Link>
                    </td>
                    <td className={CELL}>{row.category || "Not listed"}</td>
                    <td className={CELL}>{row.region || "Not listed"}</td>
                    <td className={CELL}>{row.school || "Not listed"}</td>
                    <td className={WIDE_CELL}>
                      <ul className="flex list-none flex-col gap-1">
                        {row.project.awards.map((item) => (
                          <li key={item}>{displayAward(item)}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-3 text-[15px] text-ijas-ink sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing {showingFrom} to {showingTo} of {rows.length} entries
          </p>
          <nav aria-label="Pagination" className="flex flex-wrap items-center gap-1">
            <PagerButton label="«" disabled={currentPage === 1} onClick={() => setPage(1)} />
            <PagerButton label="‹" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} />
            {pages.map((item, index) => {
              const previous = pages[index - 1];
              const gap = previous && item - previous > 1;
              return (
                <span key={item} className="contents">
                  {gap ? <span className="px-1 text-ijas-muted">…</span> : null}
                  <button
                    type="button"
                    onClick={() => setPage(item)}
                    aria-current={item === currentPage ? "page" : undefined}
                    className={`min-w-9 rounded border px-2.5 py-1.5 transition-colors duration-200 ${
                      item === currentPage ? "border-ijas-navy bg-ijas-navy text-white" : "border-[#d1d5db] bg-white text-ijas-ink hover:border-ijas-navy hover:text-ijas-navy"
                    }`}
                  >
                    {item}
                  </button>
                </span>
              );
            })}
            <PagerButton label="›" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} />
            <PagerButton label="»" disabled={currentPage === pageCount} onClick={() => setPage(pageCount)} />
          </nav>
        </div>
      </div>
    </>
  );
}

function PagerButton({ label, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="min-w-9 rounded border border-[#d1d5db] bg-white px-2.5 py-1.5 transition-colors duration-200 hover:border-ijas-navy hover:text-ijas-navy disabled:opacity-40 disabled:hover:border-[#d1d5db] disabled:hover:text-inherit"
    >
      {label}
    </button>
  );
}
