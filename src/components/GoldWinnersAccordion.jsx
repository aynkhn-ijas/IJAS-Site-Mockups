import { useId, useState } from "react";
import DivisionColumn from "./DivisionColumn";

export default function GoldWinnersAccordion({
  label = "Gold Level Winners",
  highSchool = [],
  middleSchool = [],
  forceOpen = false,
  borderClass = "border-ijas-sky",
}) {
  const [open, setOpen] = useState(false);
  const expanded = forceOpen || open;
  const panelId = useId();
  const headingId = useId();
  const columns = [
    highSchool.length ? { title: "High School Division", entries: highSchool } : null,
    middleSchool.length ? { title: "Middle School Division", entries: middleSchool } : null,
  ].filter(Boolean);
  const count = highSchool.length + middleSchool.length;

  if (count === 0) return null;

  return (
    <section className={`mt-4 border-l-2 pl-3 ${borderClass}`}>
      <h4 id={headingId}>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-left text-[15px] font-bold text-ijas-navy"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{label}</span>
          <span className="flex items-center gap-2">
            <span className="text-[12px] font-normal text-ijas-muted">{count}</span>
            <svg
              viewBox="0 0 20 20"
              className={`h-4 w-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </span>
        </button>
      </h4>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        aria-hidden={expanded ? undefined : true}
        className={`accordion-panel ${expanded ? "is-open" : ""}`}
      >
        <div>
          <div className={`category-columns grid gap-4 pt-2 ${columns.length > 1 ? "cols-2 sm:grid-cols-2" : ""}`}>
            {columns.map((column) => (
              <DivisionColumn key={column.title} title={column.title} entries={column.entries} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
