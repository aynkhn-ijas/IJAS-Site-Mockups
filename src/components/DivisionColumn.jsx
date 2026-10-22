import AwardCard from "./AwardCard";

export default function DivisionColumn({ title, entries }) {
  if (entries.length === 0) return null;

  return (
    <section>
      <h5 className="text-[12px] font-semibold uppercase tracking-wide text-ijas-navy">{title}</h5>
      <ul className="mt-2.5 flex list-none flex-col gap-2">
        {entries.map((entry, index) => (
          <li key={`${entry.medal}-${entry.students}-${entry.title}-${index}`}>
            <AwardCard {...entry} />
          </li>
        ))}
      </ul>
    </section>
  );
}
