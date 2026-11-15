"use client";

const FIELD = "rounded-md border border-[#d1d5db] bg-white px-3 py-2 text-[15px] text-ijas-ink";

function SelectFilter({ id, label, value, options, onChange }) {
  return (
    <label htmlFor={id} className="flex min-w-[160px] flex-1 flex-col gap-1 text-[13px] font-semibold text-ijas-navy">
      {label}
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className={FIELD}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function ProjectSearch({
  idPrefix,
  query,
  onQuery,
  region,
  onRegion,
  regions,
  category,
  onCategory,
  categories,
  award,
  onAward,
  awards,
  onClear,
  active,
}) {
  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <label htmlFor={`${idPrefix}-search`} className="flex min-w-0 flex-1 flex-col gap-1 text-[13px] font-semibold text-ijas-navy">
          Search
          <input
            id={`${idPrefix}-search`}
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Title, student, school, category, award, region, or abstract"
            className={`${FIELD} w-full [&::-webkit-search-cancel-button]:appearance-none`}
          />
        </label>
        {active ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="h-[42px] rounded-md border border-[#d1d5db] px-3 text-[15px] font-semibold text-ijas-navy transition-colors duration-200 hover:bg-[#f3f7fd]"
          >
            Clear
          </button>
        ) : null}
      </div>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <SelectFilter id={`${idPrefix}-region`} label="Region" value={region} options={regions} onChange={onRegion} />
        <SelectFilter id={`${idPrefix}-category`} label="Category" value={category} options={categories} onChange={onCategory} />
        <SelectFilter id={`${idPrefix}-award`} label="Award" value={award} options={awards} onChange={onAward} />
      </div>
    </div>
  );
}
