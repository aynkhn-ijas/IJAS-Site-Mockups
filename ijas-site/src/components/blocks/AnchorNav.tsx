import type { Link } from "@/content/types";
import ButtonLink from "./ButtonLink";

export default function AnchorNav({ links }: { links: Link[] }) {
  return (
    <nav aria-label="On this page" className="mt-6 rounded-lg bg-ijas-light/30 p-3">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {links.map((link) => (
          <li key={link.href}>
            <ButtonLink {...link} className="w-full" />
          </li>
        ))}
      </ul>
    </nav>
  );
}