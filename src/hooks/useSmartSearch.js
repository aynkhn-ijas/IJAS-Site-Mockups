"use client";

import { embedQuery, smartSearchUnavailable } from "@/lib/smartSearch";
import { useEffect, useRef, useState } from "react";

const DEBOUNCE_MS = 300;

export default function useSmartSearch(query) {
  const trimmed = query.trim();
  const [status, setStatus] = useState("idle");
  const [scores, setScores] = useState(null);
  const failedRef = useRef(false);

  useEffect(() => {
    if (!trimmed || failedRef.current || smartSearchUnavailable()) return undefined;
    let cancelled = false;
    setStatus((current) => (current === "ready" ? current : "loading"));
    const timer = setTimeout(() => {
      embedQuery(trimmed)
        .then((byId) => {
          if (cancelled) return;
          setScores({ query: trimmed, byId });
          setStatus("ready");
        })
        .catch(() => {
          if (cancelled) return;
          failedRef.current = true;
          setStatus("failed");
        });
    }, DEBOUNCE_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [trimmed]);

  const ready = status === "ready" && scores && scores.query === trimmed ? scores.byId : null;
  return { scores: ready, loading: Boolean(trimmed) && status === "loading" };
}
