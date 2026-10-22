import Image from "next/image";
import type { Card } from "@/content/types";

export default function CardGrid({ cards }: { cards: Card[] }) {
  return (
    <ul className="mt-8 flex flex-wrap justify-center gap-8">
      {cards.map((card) => (
        <li key={card.href} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
          {/* The whole card is one link, so the image, title and label can never point to different files */}
          <a href={card.href} target="_blank" rel="noopener noreferrer" className="group block text-center">
            {card.image && (
              <Image
                src={card.image}
                alt=""
                width={600}
                height={450}
                className="h-auto w-full border border-ijas-gray transition-shadow group-hover:shadow-md"
              />
            )}
            <span className="mt-3 block text-lg font-medium text-ijas-ink group-hover:text-ijas-navy">{card.title}</span>
            <span className="block text-sm text-ijas-ink/70 underline">{card.linkLabel ?? "View"}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}