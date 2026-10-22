import type { ScheduleItem } from "@/content/types";

export default function Schedule({ items }: { items: ScheduleItem[] }) {
  return (
    <div className="mt-6 space-y-8 text-center text-ijas-ink">
      {items.map((item) => (
        <div key={item.title}>
          <p className="font-bold">{item.title}</p>
          <p>{item.date}</p>
          {item.details?.map((line) => (
            <p key={line}>{line}</p>
          ))}
          {item.link && (
            <a href={item.link.href} className="underline hover:text-ijas-navy">
              {item.link.label}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}