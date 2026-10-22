import { primaryNav, searchPages } from "@/data/nav";
import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

function Chevron() {
  return (
    <svg className="ml-0.5 inline-block h-[7px] w-[10px] shrink-0" viewBox="0 0 10 7" fill="none" aria-hidden="true">
      <path d="M1 1.2 5 5.2 9 1.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 16.5 20.5 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function isItemActive(item, pathname) {
  if (item.to) {
    return item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
  }
  return item.children?.some((child) => pathname === child.to || pathname.startsWith(`${child.to}/`));
}

function linkClass(active) {
  return `relative inline-flex items-center whitespace-nowrap pb-1 text-[14px] text-[#1f2937] ${
    active ? "font-medium" : "font-normal"
  }`;
}

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const headerRef = useRef(null);
  const searchRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    const onPointer = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const results = searchPages.filter((page) => {
    const haystack = `${page.label} ${page.keywords}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-black/5 bg-white print:static">
      <div className="h-[4px] bg-ijas-navy" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex min-h-[78px] max-w-[1240px] items-center justify-between gap-3 px-4 lg:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="IJAS home" onClick={closeAll}>
          <img src={import.meta.env.BASE_URL + "ijas-seal.png"} alt="" className="h-[52px] w-[52px] rounded-full object-cover" />
          <span className="text-[20px] font-medium tracking-[0.08em] text-[#1f2937]">IJAS</span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-end gap-x-4 pr-1 xl:flex" aria-label="Site navigation">
          {primaryNav.map((item) => {
            const active = isItemActive(item, pathname);
            const isOpen = openMenu === item.label;
            return (
              <div
                key={item.label}
                className="relative py-3"
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                {item.children ? (
                  <button
                    type="button"
                    className={linkClass(active)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                  >
                    {item.label}
                    <Chevron />
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-full bg-ijas-navy ${active || isOpen ? "opacity-100" : "opacity-0"}`}
                    />
                  </button>
                ) : (
                  <NavLink to={item.to} end={item.to === "/"} className={linkClass(active)}>
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-full bg-ijas-navy ${active ? "opacity-100" : "opacity-0"}`}
                    />
                  </NavLink>
                )}
                {item.children && isOpen ? (
                  <ul
                    className="absolute left-1/2 top-full z-30 min-w-[230px] -translate-x-1/2 rounded-sm border border-black/10 bg-white py-2 shadow-lg"
                    role="menu"
                  >
                    {item.children.map((child) => (
                      <li key={child.to} role="none">
                        <Link
                          to={child.to}
                          role="menuitem"
                          className="block px-4 py-2 text-[13.5px] text-[#1f2937] hover:bg-[#F8F9FA]"
                          onClick={closeAll}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/login"
            className="inline-flex h-[38px] items-center justify-center border-[1.5px] border-[#222] px-4 text-sm text-[#1f2937] sm:h-[40px] sm:px-5 sm:text-[15px]"
          >
            Login
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-[#1f2937]"
            aria-label="Search the site"
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            className="no-print inline-flex h-10 w-10 items-center justify-center text-[#1f2937] xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            onClick={() => {
              setMobileOpen((open) => !open);
              setOpenMenu(null);
            }}
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            <span className="flex flex-col gap-1.5">
              <span className={`block h-px w-5 bg-[#1f2937] transition ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-[#1f2937] transition ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-[#1f2937] transition ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav id={menuId} className="no-print border-t border-black/5 bg-white xl:hidden" aria-label="Mobile navigation">
          <div className="flex max-h-[calc(100vh-82px)] flex-col gap-1 overflow-y-auto px-5 py-3 text-[15px]">
            {primaryNav.map((item) => {
              const isOpen = openMenu === item.label;
              const active = isItemActive(item, pathname);
              return (
                <div key={item.label}>
                  {item.children ? (
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-between py-2 text-left text-[#1f2937]"
                      aria-expanded={isOpen}
                      onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    >
                      <span className={active ? "font-semibold" : ""}>
                        {item.label}
                        <Chevron />
                      </span>
                    </button>
                  ) : (
                    <Link to={item.to} className={`block py-2 ${active ? "font-semibold text-ijas-navy" : "text-[#1f2937]"}`} onClick={closeAll}>
                      {item.label}
                    </Link>
                  )}
                  {item.children && isOpen ? (
                    <ul className="pb-2 pl-3 text-[14px] text-[#4b5563]">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <Link to={child.to} className="block py-1.5" onClick={closeAll}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>
        </nav>
      ) : null}

      {searchOpen ? (
        <div className="no-print fixed inset-0 z-[60] bg-black/40" onClick={() => setSearchOpen(false)}>
          <div
            className="mx-auto mt-20 max-w-xl rounded-md bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
          >
            <label htmlFor="site-search" className="text-sm font-medium text-[#1f2937]">
              Search
            </label>
            <input
              id="site-search"
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && results[0]) {
                  navigate(results[0].to);
                  setSearchOpen(false);
                }
              }}
              placeholder="Search pages, awards, membership…"
              className="mt-2 w-full rounded border border-[#d1d5db] px-3 py-2 text-[15px]"
            />
            <ul className="mt-3 max-h-72 overflow-auto">
              {results.map((page) => (
                <li key={page.to}>
                  <Link
                    to={page.to}
                    className="block rounded px-2 py-2 text-[15px] text-ijas-navy hover:bg-[#F8F9FA]"
                    onClick={() => setSearchOpen(false)}
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
              {results.length === 0 ? <li className="px-2 py-3 text-sm text-[#6b7280]">No matching pages.</li> : null}
            </ul>
          </div>
        </div>
      ) : null}
    </header>
  );
}
