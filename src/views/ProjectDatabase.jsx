"use client";

import PageHero from "@/components/PageHero";
import { allProjects } from "@/data/exposition";
import { awardsWon, displayName, isExcludedStatus } from "@/lib/awardValue";
import usePageTitle from "@/hooks/usePageTitle";
import { useMemo, useState } from "react";

const PAGE_SIZES = [10, 25, 50, 100];
const COLUMNS = [
  { key: "year", label: "Year", className: "w-[6%]" },
  { key: "name", label: "Finalist Name(s)", className: "w-[14%]" },
  { key: "title", label: "Project Title", className: "w-[24%]" },
  { key: "category", label: "Category", className: "w-[12%]" },
  { key: "region", label: "Region", className: "w-[8%]" },
  { key: "school", label: "School", className: "w-[14%]" },
  { key: "awards", label: "Awards Won", className: "w-[22%]" },
];

const CELL = "px-5 py-5 align-top leading-relaxed";
const WIDE_CELL = "px-6 py-5 align-top leading-relaxed";

function rowModel(project) {
  return {
    project,
    year: project.year,
    name: displayName(project),
    title: project.title || "",
    category: project.category || "",
    region: project.region || "",
    school: project.school || "",
    awards: awardsWon(project),
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

export default function ProjectDatabase() {
  usePageTitle("Project Database");
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState("year");
  const [sortDir, setSortDir] = useState("asc");
  const [includeHidden, setIncludeHidden] = useState(false);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = allProjects()
      .filter((project) => includeHidden || !isExcludedStatus(project))
      .map(rowModel)
      .filter((row) => {
        if (!needle) return true;
        return [row.name, row.title, row.category, row.school, row.region, row.awards, String(row.year)]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      });
    filtered.sort((a, b) => {
      const base = compareValues(a, b, sortKey);
      if (base !== 0) return sortDir === "asc" ? base : -base;
      return compareValues(a, b, "name");
    });
    return filtered;
  }, [includeHidden, query, sortDir, sortKey]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = rows.length === 0 ? 0 : (currentPage - 1) * pageSize;
  const visible = rows.slice(start, start + pageSize);
  const showingFrom = rows.length === 0 ? 0 : start + 1;
  const showingTo = start + visible.length;

  function changeSort(key) {
    if (sortKey === key) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  const pages = pageWindow(currentPage, pageCount);
  const viewKey = `${query}|${pageSize}|${currentPage}|${sortKey}|${sortDir}|${includeHidden}`;

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
      <PageHero title="Project Database" />
      <div className="mx-auto max-w-[1560px] px-4 py-8 md:px-8 md:py-10">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 text-[15px] text-[#1f2937]">
            <span className="sr-only">Entries per page</span>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
              className="rounded border border-[#d1d5db] bg-white px-2.5 py-2 text-[15px] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
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
          <label className="flex items-center gap-2 text-[15px] text-[#1f2937]">
            <input
              type="checkbox"
              checked={includeHidden}
              onChange={(event) => {
                setIncludeHidden(event.target.checked);
                setPage(1);
              }}
            />
            Include canceled and no-shows
          </label>
          <label className="flex items-center gap-2 text-[15px] text-[#1f2937] sm:ml-auto">
            Search:
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              className="w-full rounded border border-[#d1d5db] px-3 py-2 text-[15px] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:w-72"
              aria-label="Search projects"
            />
          </label>
        </div>

        <div className="overflow-x-auto border border-[#e5e7eb]">
          <table className="w-full min-w-[1180px] table-fixed border-collapse text-left text-[16px] text-[#1f2937]">
            <colgroup>
              {COLUMNS.map((column) => (
                <col key={column.key} className={column.className} />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white">
                {COLUMNS.map((column) => {
                  const active = sortKey === column.key;
                  const ariaSort = active ? (sortDir === "asc" ? "ascending" : "descending") : "none";
                  const roomy = column.key === "title" || column.key === "awards";
                  return (
                    <th key={column.key} scope="col" aria-sort={ariaSort} className={`${roomy ? "px-6" : "px-5"} py-4 font-bold`}>
                      <button
                        type="button"
                        onClick={() => changeSort(column.key)}
                        className="inline-flex items-center gap-1.5 text-left transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-ijas-navy motion-reduce:transition-none"
                      >
                        {column.label}
                        <span
                          aria-hidden="true"
                          className={`inline-block text-[11px] text-[#6b7280] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                            active ? "opacity-100" : "opacity-35"
                          } ${active && sortDir === "desc" ? "rotate-180" : ""}`}
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
                  <td colSpan={COLUMNS.length} className="px-6 py-10 text-center text-[#6b7280]">
                    No matching projects.
                  </td>
                </tr>
              ) : (
                visible.map((row, index) => (
                  <tr
                    key={`${row.year}-${row.project.projectNumber}-${row.title}-${row.name}-${index}`}
                    className={`transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#e3eef8] motion-reduce:transition-none ${
                      index % 2 === 0 ? "bg-[#f3f4f6]" : "bg-white"
                    }`}
                  >
                    <td className={CELL}>{row.year}</td>
                    <td className={`${CELL} whitespace-pre-line`}>{row.name || "—"}</td>
                    <td className={`${WIDE_CELL} font-medium text-[#1d4ed8]`}>{row.title || "—"}</td>
                    <td className={CELL}>{row.category || "—"}</td>
                    <td className={CELL}>{row.region || "—"}</td>
                    <td className={CELL}>{row.school || "—"}</td>
                    <td className={WIDE_CELL}>{row.awards || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-3 text-[15px] text-[#1f2937] sm:flex-row sm:items-center sm:justify-between">
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
                  {gap ? <span className="px-1 text-[#6b7280]">…</span> : null}
                  <button
                    type="button"
                    onClick={() => setPage(item)}
                    aria-current={item === currentPage ? "page" : undefined}
                    className={`min-w-9 rounded border px-2.5 py-1.5 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      item === currentPage
                        ? "border-ijas-navy bg-ijas-navy text-white"
                        : "border-[#d1d5db] bg-white text-[#1f2937] hover:border-ijas-navy hover:text-ijas-navy"
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
      className="min-w-9 rounded border border-[#d1d5db] bg-white px-2.5 py-1.5 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-ijas-navy hover:text-ijas-navy disabled:opacity-40 disabled:hover:border-[#d1d5db] disabled:hover:text-inherit motion-reduce:transition-none"
    >
      {label}
    </button>
  );
}
