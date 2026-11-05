"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Link({ to, href, children, ...rest }) {
  return (
    <NextLink href={href || to || "/"} {...rest}>
      {children}
    </NextLink>
  );
}

export function NavLink({ to, href, end = false, className, children, ...rest }) {
  const pathname = usePathname() || "/";
  const dest = href || to || "/";
  const active = end || dest === "/" ? pathname === dest : pathname === dest || pathname.startsWith(`${dest}/`);
  const resolved = typeof className === "function" ? className({ isActive: active }) : className;
  return (
    <NextLink href={dest} className={resolved} aria-current={active ? "page" : undefined} {...rest}>
      {children}
    </NextLink>
  );
}

export function useLocation() {
  const pathname = usePathname() || "/";
  return { pathname };
}

export function useNavigate() {
  const router = useRouter();
  return (to) => router.push(to);
}
