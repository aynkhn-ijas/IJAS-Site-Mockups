/** Prefix a root-absolute public path with NEXT_PUBLIC_BASE_PATH (GitHub Pages subpath). */
export function asset(path) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path) return base || "/";
  if (/^(https?:|mailto:|tel:|data:|#)/i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
