import { cn } from "@/lib/utils";
import RichText from "./RichText";

type Props = { sections: { id?: string; markdown: string }[] };

export default function StripedSections({ sections }: Props) {
  return (
    <div className="mt-8">
      {sections.map((section, i) => (
        <section
          key={section.id ?? i}
          id={section.id}
          className={cn("scroll-mt-28 px-6 pb-8 pt-2", i % 2 === 0 && "bg-ijas-wash")}
        >
          <RichText markdown={section.markdown} centered />
        </section>
      ))}
    </div>
  );
}