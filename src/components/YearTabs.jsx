const YEARS = [2025, 2026];

export default function YearTabs({ year, onChange }) {
  return (
    <div className="no-print border-b border-[#e5e7eb] bg-white">
      <div
        className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-2 px-5 py-4"
        role="tablist"
        aria-label="Exposition year"
      >
        {YEARS.map((item) => {
          const active = year === item;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              id={`year-tab-${item}`}
              aria-selected={active}
              aria-controls="awards"
              onClick={() => onChange(item)}
              className={`rounded-md px-6 py-2 text-[16px] font-bold transition-colors duration-200 ease-out ${
                active ? "bg-ijas-navy text-white" : "border border-[#d1d5db] bg-white text-ijas-navy"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
