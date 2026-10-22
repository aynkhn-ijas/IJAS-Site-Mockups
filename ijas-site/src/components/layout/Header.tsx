"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { navItems, hasChildren, type NavItem } from "@/config/nav";

function Chevron() {
  return (
    <svg className="ml-0.5 inline-block h-[7px] w-[10px] shrink-0" viewBox="0 0 10 7" fill="none" aria-hidden="true">
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
    return active ? <span className="absolute bottom-0 left-0 h-px w-full bg-current" /> : null;
  }
  return (
    <motion.span
      className={`absolute bottom-0 left-0 h-px w-full bg-current ${align === "left" ? "origin-left" : "origin-center"}`}
      initial={false}
      animate={{ scaleX: shown ? 1 : 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    />
  );
}

// A top-level item is "active" if it's the current page, or one of its dropdown pages is.
function isActive(item: NavItem, pathname: string) {
  if (hasChildren(item)) return item.children.some((child) => child.href === pathname);
  return item.href === pathname;
}

export default function Header() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeAll();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
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

  const panelTransition = reduced ? { duration: 0 } : { duration: 0.22, ease: "easeOut" as const };
  const panelExit = reduced ? { duration: 0 } : { duration: 0.18, ease: "easeOut" as const };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto flex min-h-[86px] max-w-[1180px] items-center justify-between gap-4 px-5 lg:px-6">
        <Link href="/" onClick={closeAll} className="flex shrink-0 items-center gap-3" aria-label="IJAS home">
          <img src="/assets/ijas-seal-small.png" alt="" className="h-[54px] w-[54px] rounded-full object-cover" />
          <span className="text-[20px] font-medium tracking-[0.08em] text-ijas-ink">IJAS</span>
        </Link>

        {/* ── Desktop ───────────────────────────────────────── */}
        <nav
          className="hidden min-w-0 flex-1 items-center justify-end gap-x-5 pr-2 text-[14.5px] text-ijas-ink xl:flex"
          aria-label="Site navigation"
        >
          {navItems.map((item) => {
            const isOpen = openMenu === item.label;
            const active = isActive(item, pathname);
            const triggerClass = "relative inline-flex items-center whitespace-nowrap pb-1";
            const hoverProps = {
              onMouseEnter: () => setHovered(item.label),
              onMouseLeave: () => setHovered(null),
            };

            if (!hasChildren(item)) {
              return (
                <div key={item.label} className="relative py-3">
                  <Link href={item.href} onClick={closeAll} className={triggerClass} aria-current={active ? "page" : undefined} {...hoverProps}>
                    {item.label}
                    <Underline active={active} hovered={hovered === item.label} reduced={reduced} />
                  </Link>
                </div>
              );
            }

            return (
              // Hover opens the menu on desktop; click/Enter also toggles it for touch and keyboard users.
              <div
                key={item.label}
                className="relative py-3"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  className={triggerClass}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => toggleMenu(item.label)}
                  {...hoverProps}
                >
                  {item.label}
                  <Chevron />
                  <Underline active={active} hovered={hovered === item.label} reduced={reduced} />
                </button>
                <AnimatePresence>
                  {isOpen ? (
                    <motion.div
                      key={item.label}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0, transition: panelExit }}
                      transition={panelTransition}
                      // pt-1.5 (not a gap) so the mouse never "leaves" the menu moving from button to panel
                      className="absolute left-1/2 top-full z-20 min-w-[220px] -translate-x-1/2 overflow-hidden pt-1.5"
                    >
                      <ul className="rounded-sm border border-black/10 bg-white py-2 shadow-lg">
                        {item.children.map((child) => (
                          <li key={child.href + child.label}>
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              aria-current={child.href === pathname ? "page" : undefined}
                              className="block px-4 py-2 text-[13.5px] hover:bg-ijas-wash aria-[current=page]:font-semibold"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* TODO: real login URL */}
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
            <span className="flex flex-col gap-1.5">
              <span className={`block h-px w-5 bg-ijas-ink ${mobileOpen ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-ijas-ink ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-ijas-ink ${mobileOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile ──────────────────────────────────────────── */}
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
                const active = isActive(item, pathname);
                const triggerClass = "relative inline-flex w-fit items-center pb-1";

                if (!hasChildren(item)) {
                  return (
                    <div key={item.label}>
                      <Link href={item.href} onClick={closeAll} className={triggerClass} aria-current={active ? "page" : undefined}>
                        {item.label}
                        <Underline active={active} hovered={false} reduced={reduced} align="left" />
                      </Link>
                    </div>
                  );
                }

                return (
                  <div key={item.label}>
                    <button type="button" className={triggerClass} aria-expanded={isOpen} onClick={() => toggleMenu(item.label)}>
                      {item.label}
                      <Chevron />
                      <Underline active={active} hovered={false} reduced={reduced} align="left" />
                    </button>
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
                            <li key={child.href + child.label}>
                              <Link href={child.href} onClick={closeAll} className="block py-1.5">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      ) : null}
                    </AnimatePresence>
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