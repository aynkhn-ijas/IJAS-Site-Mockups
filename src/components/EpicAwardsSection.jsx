import DivisionColumn from "./DivisionColumn";

export default function EpicAwardsSection({ highSchool = [], middleSchool = [] }) {
  const columns = [
    highSchool.length ? { title: "High School Division", entries: highSchool } : null,
    middleSchool.length ? { title: "Middle School Division", entries: middleSchool } : null,
  ].filter(Boolean);

  if (columns.length === 0) return null;

  return (
    <section aria-label="EPIC awards">
      <h4 className="text-[15px] font-bold text-ijas-maroon">EPIC Awards</h4>
      <div className={`category-columns mt-2 grid gap-4 ${columns.length > 1 ? "cols-2 sm:grid-cols-2" : ""}`}>
        {columns.map((column) => (
          <DivisionColumn key={column.title} title={column.title} entries={column.entries} />
        ))}
      </div>
    </section>
  );
}
