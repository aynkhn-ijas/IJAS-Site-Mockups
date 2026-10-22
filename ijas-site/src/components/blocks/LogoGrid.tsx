import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Sponsor } from "@/content/types";

type Size = "sm" | "md" | "lg";
type Props = { title?: string; size?: Size; items: Sponsor[] };

// Card size per tier: bigger tiers get bigger cards. Rows wrap and center automatically.
const SIZES: Record<Size, string> = {
  lg: "h-36 w-full max-w-md",
  md: "h-32 w-[calc(50%-0.375rem)] sm:w-60",
  sm: "h-24 w-[calc(50%-0.375rem)] sm:w-44",
};

function CardContent({ sponsor }: { sponsor: Sponsor }) {
  if (sponsor.logo) {
    return <Image src={sponsor.logo} alt={sponsor.name} fill sizes="240px" className="object-contain p-4" />;
  }
  return <span className="px-3 text-center font-semibold text-ijas-ink/80">{sponsor.name}</span>;
}

export default function LogoGrid({ title, size = "md", items }: Props) {
  return (
    <div className="mt-6">
      {title && <p className="mb-3 text-center font-bold text-ijas-ink">{title}</p>}
      <ul className="flex flex-wrap justify-center gap-3">
        {items.map((sponsor) => {
          const card = cn(
            "relative flex items-center justify-center border border-ijas-gray bg-white",
            SIZES[size],
          );
          return (
            <li key={sponsor.name} className={card}>
              {sponsor.href ? (
                <a
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <CardContent sponsor={sponsor} />
                </a>
              ) : (
                <CardContent sponsor={sponsor} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}