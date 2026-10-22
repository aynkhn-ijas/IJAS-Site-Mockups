import { footerPageLinks, socialLinks } from "@/data/nav";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ijas-navy text-white">
      <div className="mx-auto grid max-w-[1100px] gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-3">
          <img src={import.meta.env.BASE_URL + "ijas-seal.png"} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
          <p className="max-w-[14ch] text-[15px] font-medium leading-snug text-white">
            Illinois Junior Academy of Science
          </p>
        </div>

        <nav className="flex flex-col gap-1.5 text-[14px]" aria-label="Footer">
          {footerPageLinks.map((link) => (
            <Link key={link.label} to={link.to} className="w-fit text-white/90 hover:text-white hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-1.5 text-[14px]" aria-label="Social">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="w-fit text-white/90 hover:text-white hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="text-[14px] leading-relaxed">
          <p>
            Contact:{" "}
            <a href="mailto:info@ijas.org" className="text-white hover:underline">
              info@ijas.org
            </a>
          </p>
          <a
            href="mailto:info@ijas.org?subject=Website%20Issues%20and%20Suggestions"
            className="mt-1 inline-block text-white underline"
          >
            Website Issues and Suggestions
          </a>
        </div>
      </div>

      <div className="border-t border-white/15 bg-[#0A2F63]">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-2 px-6 py-4 text-[12px] text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>Designed by the IJAS Webmasters</p>
          <p>© 2026 by Illinois Junior Academy of Science</p>
        </div>
      </div>
    </footer>
  );
}
