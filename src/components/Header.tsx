import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "#", active: true },
  {
    label: "About",
    children: ["About Us", "Membership", "Newsletter", "Contact Us"],
  },
  { label: "Students", href: "#students" },
  { label: "Teachers", href: "#teachers" },
  {
    label: "Support",
    children: ["Become a Sponsor", "Donate to IJAS", "Current Sponsors"],
  },
  {
    label: "Volunteer",
    children: ["Volunteer", "Student Runners"],
  },
  {
    label: "Resources",
    children: [
      "Resources",
      "Rules & Forms",
      "Office Hours/How-To-Videos",
      "Category Guide",
      "Find My School Number",
    ],
  },
  {
    label: "Competition",
    children: [
      "Regional Science Fairs",
      "State Exposition 2027",
      "Additional Contests",
      "IJAS - ISEF",
    ],
  },
];

function Chevron() {
  return (
    <svg
      className="ml-0.5 inline-block h-[7px] w-[10px] shrink-0"
      viewBox="0 0 10 7"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 1.2 5 5.2 9 1.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Underline({
  active,
  hovered,
  reduced,
  align = "center",
}: {
  active?: boolean;
  hovered: boolean;
  reduced: boolean | null;
  align?: "center" | "left";
}) {
  const shown = Boolean(active || hovered);
  if (reduced) {
    return active ? (
      <span className="absolute bottom-0 left-0 h-px w-full bg-current" />
    ) : null;
  }
  return (
    <motion.span
      className={`absolute bottom-0 left-0 h-px w-full bg-current ${
        align === "left" ? "origin-left" : "origin-center"
      }`}
      initial={false}
      animate={{ scaleX: shown ? 1 : 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    />
  );
}

export default function Header() {
  const reduced = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggleMenu = (label: string) => {
    setOpenMenu((current) => (current === label ? null : label));
  };

  const panelTransition = reduced
    ? { duration: 0 }
    : { duration: 0.22, ease: "easeOut" as const };
  const panelExit = reduced
    ? { duration: 0 }
    : { duration: 0.18, ease: "easeOut" as const };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto flex min-h-[86px] max-w-[1180px] items-center justify-between gap-4 px-5 lg:px-6">
        <a href="#" className="flex shrink-0 items-center gap-3" aria-label="IJAS home">
          <img
            src="/assets/ijas-seal.png"
            alt=""
            className="h-[54px] w-[54px] rounded-full object-cover"
          />
          <span className="text-[20px] font-medium tracking-[0.08em] text-ijas-ink">IJAS</span>
        </a>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-end gap-x-5 pr-2 text-[14.5px] text-ijas-ink xl:flex"
          aria-label="Site navigation"
        >
          {navItems.map((item) => {
            const isOpen = openMenu === item.label;
            return (
              <div key={item.label} className="relative py-3">
                <a
                  href={item.href || "#"}
                  className="relative inline-flex items-center whitespace-nowrap pb-1"
                  aria-expanded={item.children ? isOpen : undefined}
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(event) => {
                    if (item.children) {
                      event.preventDefault();
                      toggleMenu(item.label);
                    }
                  }}
                >
                  {item.label}
                  {item.children ? <Chevron /> : null}
                  <Underline
                    active={item.active}
                    hovered={hovered === item.label}
                    reduced={reduced}
                  />
                </a>
                {item.children ? (
                  <AnimatePresence>
                    {isOpen ? (
                      <motion.div
                        key={item.label}
                        initial={reduced ? false : { height: 0, opacity: 0, y: 0 }}
                        animate={{ height: "auto", opacity: 1, y: 6 }}
                        exit={{ height: 0, opacity: 0, y: 0, transition: panelExit }}
                        transition={panelTransition}
                        className="absolute left-1/2 top-full z-20 min-w-[220px] -translate-x-1/2 overflow-hidden"
                      >
                        <ul className="rounded-sm border border-black/10 bg-white py-2 shadow-lg">
                          {item.children.map((child) => (
                            <li key={child}>
                              <a href="#" className="block px-4 py-2 text-[13.5px] hover:bg-ijas-wash">
                                {child}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="#login"
            className="inline-flex h-[38px] shrink-0 items-center justify-center border-[1.5px] border-[#222] px-3 text-sm text-ijas-ink sm:h-[42px] sm:px-6 sm:text-[15px]"
          >
            Login
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center xl:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((open) => !open);
              setOpenMenu(null);
            }}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span className={`block h-px w-5 bg-ijas-ink ${mobileOpen ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-ijas-ink ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-ijas-ink ${mobileOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            key="mobile-nav"
            aria-label="Mobile navigation"
            className="overflow-hidden border-t border-black/5 xl:hidden"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0, transition: panelExit }}
            transition={panelTransition}
          >
            <div className="flex flex-col gap-1 px-5 py-3 text-[15px]">
              {navItems.map((item) => {
                const isOpen = openMenu === item.label;
                return (
                  <div key={item.label}>
                    <a
                      href={item.href || "#"}
                      className="relative inline-flex w-fit items-center pb-1"
                      onMouseEnter={() => setHovered(item.label)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={(event) => {
                        if (item.children) {
                          event.preventDefault();
                          toggleMenu(item.label);
                        } else {
                          setMobileOpen(false);
                        }
                      }}
                    >
                      {item.label}
                      {item.children ? <Chevron /> : null}
                      <Underline
                        active={item.active}
                        hovered={hovered === item.label}
                        reduced={reduced}
                        align="left"
                      />
                    </a>
                    {item.children ? (
                      <AnimatePresence>
                        {isOpen ? (
                          <motion.ul
                            initial={reduced ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={panelExit}
                            className="overflow-hidden pl-3 text-[13.5px] text-neutral-600"
                          >
                            {item.children.map((child) => (
                              <li key={child}>
                                <a href="#" className="block py-1.5" onClick={() => setMobileOpen(false)}>
                                  {child}
                                </a>
                              </li>
                            ))}
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
