import DivisionColumn from "./DivisionColumn";

export default function SpecialAwardsSection({ highSchool = [], middleSchool = [] }) {
  const columns = [
    highSchool.length ? { title: "High School Division", entries: highSchool } : null,
    middleSchool.length ? { title: "Middle School Division", entries: middleSchool } : null,
  ].filter(Boolean);

  if (columns.length === 0) return null;

  return (
    <section aria-label="Special and sponsored awards" className="mt-4 rounded-md border border-[#75A8ED] bg-[#f3f7fd] p-3">
      <h4 className="text-base font-bold text-ijas-navy">Special / Sponsored Awards</h4>
      <div className={`category-columns mt-2 grid gap-3 ${columns.length > 1 ? "cols-2 sm:grid-cols-2" : ""}`}>
        {columns.map((column) => (
          <DivisionColumn key={column.title} title={column.title} entries={column.entries} />
        ))}
      </div>
    </section>
  );
}
