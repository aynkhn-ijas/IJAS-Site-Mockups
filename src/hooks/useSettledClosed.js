"use client";

import { useEffect, useState } from "react";

export default function useSettledClosed(expanded, panelRef) {
  const [settledClosed, setSettledClosed] = useState(!expanded);

  useEffect(() => {
    if (expanded) {
      setSettledClosed(false);
      return;
    }
    const panel = panelRef.current;
    if (!panel) {
      setSettledClosed(true);
      return;
    }
    const duration = getComputedStyle(panel).transitionDuration;
    if (!duration || duration === "0s") {
      setSettledClosed(true);
      return;
    }
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setSettledClosed(true);
    };
    const onEnd = (event) => {
      if (event.target === panel) finish();
    };
    panel.addEventListener("transitionend", onEnd);
    const timer = window.setTimeout(finish, 480);
    return () => {
      panel.removeEventListener("transitionend", onEnd);
      window.clearTimeout(timer);
    };
  }, [expanded, panelRef]);

  return settledClosed;
}
