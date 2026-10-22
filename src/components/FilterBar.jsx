const DIVISIONS = [
  { id: "all", label: "All" },
  { id: "senior", label: "Senior (9–12)" },
  { id: "junior", label: "Junior (7–8)" },
];

const AWARD_TYPES = [
  { id: "epic", label: "EPIC" },
  { id: "special", label: "Special awards" },
  { id: "gold", label: "Gold" },
];

function countLabel(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export default function FilterBar({
  division,
  onDivision,
  query,
  onQuery,
  category,
  onCategory,
  categories,
  awardTypes,
  onToggleAward,
  projectCount,
  specialCount,
}) {
  return (
    <div className="no-print sticky top-[95px] z-30 -mx-5 mt-4 border-y border-[#e5e7eb] bg-white px-5 py-3 sm:-mx-8 sm:px-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <fieldset className="min-w-0 border-0 p-0">
          <legend className="text-[12px] font-semibold text-ijas-navy">Division</legend>
          <div className="mt-1 flex flex-wrap gap-1.5" role="group" aria-label="Division">
            {DIVISIONS.map((item) => {
              const active = division === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onDivision(item.id)}
                  className={`rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors duration-200 ease-out ${
                    active ? "bg-ijas-navy text-white" : "border border-[#d1d5db] bg-white text-ijas-navy"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="block min-w-0 flex-1 text-[12px] font-semibold text-ijas-navy" htmlFor="award-search">
          Search
          <input
            id="award-search"
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Search name, school, project, or award"
            className="mt-1 w-full rounded-md border border-[#d1d5db] bg-ijas-wash px-3 py-1.5 text-base font-normal text-ijas-ink"
          />
        </label>

        <label className="block min-w-0 text-[12px] font-semibold text-ijas-navy lg:w-64" htmlFor="award-category">
          Category
          <select
            id="award-category"
            value={category}
            onChange={(event) => onCategory(event.target.value)}
            className="mt-1 w-full rounded-md border border-[#d1d5db] bg-white px-3 py-1.5 text-base font-normal text-ijas-ink"
          >
            <option value="all">All categories</option>
            {categories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="mt-3 border-0 p-0">
        <legend className="sr-only">Award type</legend>
        <div className="flex flex-wrap gap-1.5">
          {AWARD_TYPES.map((item) => {
            const checked = awardTypes.includes(item.id);
            return (
              <label
                key={item.id}
                className={`inline-flex cursor-pointer items-center rounded-full border px-3 py-1 text-[13px] font-semibold transition-colors duration-200 ease-out ${
                  checked ? "border-ijas-navy bg-ijas-navy text-white" : "border-[#d1d5db] bg-white text-ijas-navy"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => onToggleAward(item.id)}
                />
                {item.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-2 text-[13px] text-ijas-muted" aria-live="polite">
        {countLabel(projectCount, "project", "projects")}, {specialCount} with special{" "}
        {specialCount === 1 ? "honor" : "honors"}
      </p>
    </div>
  );
}
