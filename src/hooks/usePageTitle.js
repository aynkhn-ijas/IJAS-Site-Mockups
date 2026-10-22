import { useEffect } from "react";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | Illinois Junior Academy of Science`
      : "Illinois Junior Academy of Science";
  }, [title]);
}
