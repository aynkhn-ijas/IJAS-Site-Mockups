import { Link } from "react-router-dom";

const className =
  "font-semibold text-ijas-navy underline decoration-ijas-sky underline-offset-2 hover:text-[#0a2f63]";

export default function TextLink({ to, href, children, external = false }) {
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
