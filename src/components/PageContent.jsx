import { NavLink } from "react-router-dom";

export function Subnav({ items }) {
  return (
    <nav className="mb-8 flex flex-wrap gap-x-4 gap-y-2 border-b border-[#e5e7eb] pb-3 text-[14px]" aria-label="Section">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) =>
            `border-b-2 pb-1 ${isActive ? "border-ijas-navy font-semibold text-ijas-navy" : "border-transparent text-[#4b5563] hover:border-ijas-navy hover:text-ijas-navy"}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function PageContent({ children, subnav }) {
  return (
    <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-12">
      {subnav ? <Subnav items={subnav} /> : null}
      <div className="prose-ijas">{children}</div>
    </div>
  );
}
