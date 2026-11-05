import { useLayoutEffect } from "react";

export default function usePageTitle(title) {
  const full = title
    ? `${title} | Illinois Junior Academy of Science`
    : "Illinois Junior Academy of Science";

  // Next's metadata title is applied after layout effects and would otherwise
  // replace the page title. Reapply if that title node changes.
  useLayoutEffect(() => {
    const apply = () => {
      if (document.title !== full) document.title = full;
    };
    apply();
    const titleEl = document.querySelector("title");
    const observer = new MutationObserver(apply);
    if (titleEl) observer.observe(titleEl, { childList: true, subtree: true, characterData: true });
    const timer = setTimeout(apply, 0);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [full]);
}
