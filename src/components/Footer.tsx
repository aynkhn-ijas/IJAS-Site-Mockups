const pageLinks = ["Home", "Students", "Teachers", "Contact"];
const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/IJASorg" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/illinois-junior-academy-of-science-a02159365",
  },
  { label: "Instagram", href: "https://www.instagram.com/ijas_il" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="h-[6px] w-full bg-ijas-navy" />
      <div className="mx-auto grid max-w-[1100px] gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-3">
          <img src="/assets/ijas-seal.png" alt="" className="h-14 w-14 rounded-full object-cover" />
          <p className="max-w-[12ch] text-[15px] font-medium leading-snug">
            Illinois Junior Academy of Science
          </p>
        </div>

        <nav className="flex flex-col gap-1 text-[14px]" aria-label="Footer navigation">
          {pageLinks.map((link) => (
            <a key={link} href="#" className="w-fit hover:underline">
              {link}
            </a>
          ))}
        </nav>

        <nav className="flex flex-col gap-1 text-[14px]" aria-label="Social links">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} className="w-fit underline">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="text-[14px]">
          <p>
            Contact:{" "}
            <a href="mailto:info@ijas.org" className="underline">
              info@ijas.org
            </a>
          </p>
          <a href="#" className="mt-1 inline-block underline">
            Website Issues and Suggestions
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1100px] flex-col gap-1 px-6 pb-8 text-[12px] text-neutral-500 sm:flex-row sm:justify-between">
        <p>Designed by the IJAS Webmasters</p>
        <p>© 2026 by Illinois Junior Academy of Science</p>
      </div>
    </footer>
  );
}
