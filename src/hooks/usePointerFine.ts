"use client";

import { useEffect, useState } from "react";

/**
 * True on devices with a precise pointer (mouse/trackpad). Gates every
 * cursor-driven effect so touch devices never pay for them.
 */
export function usePointerFine(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return fine;
}
