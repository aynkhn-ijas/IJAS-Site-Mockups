import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = { label: string; href: string; className?: string };

export default function ButtonLink({ label, href, className }: Props) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full bg-ijas-blue px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ijas-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ijas-navy",
    className,
  );

  // Internal pages and on-page anchors use Next's Link; everything else is a plain <a>.
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={classes}>{label}</Link>;
  }
  const external = href.startsWith("http");
  return (
    <a href={href} className={classes} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
      {label}
    </a>
  );
}