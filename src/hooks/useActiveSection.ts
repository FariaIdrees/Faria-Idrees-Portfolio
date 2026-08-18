"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently framed in the viewport.
 *
 * Uses a single IntersectionObserver with a band-shaped root margin rather
 * than scroll listeners, so it costs nothing during scrolling.
 */
export function useActiveSection(ids: readonly string[], fallback = ids[0]): string {
  const [active, setActive] = useState<string>(fallback);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size === 0) return;

        // Prefer the section occupying the most of the observation band.
        let best = "";
        let bestRatio = -1;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActive(best);
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));

    // Anchored at the very top of the document, nothing is in the band yet.
    const onScroll = () => {
      if (window.scrollY < 120) setActive(fallback);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids, fallback]);

  return active;
}
