"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { usePointerFine } from "@/hooks/usePointerFine";

const INTERACTIVE = 'a, button, [role="button"], [data-cursor="hover"]';

/**
 * Desktop-only cursor: a precise dot plus a lagging ring that swells over
 * anything clickable.
 *
 * Mounts nothing at all on touch devices or under reduced-motion, and the
 * native cursor is only hidden once this component is confirmed running — so
 * a failed hydration can never leave the page without a pointer.
 */
export function CustomCursor() {
  const pointerFine = usePointerFine();
  const reduced = useReducedMotion();
  const enabled = pointerFine && !reduced;

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.setAttribute("data-custom-cursor", "true");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE)));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      document.documentElement.removeAttribute("data-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed left-0 top-0 z-100 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="pointer-events-none fixed left-0 top-0 z-100 -ml-4 -mt-4 h-8 w-8 rounded-full border border-accent/60 bg-accent/5 backdrop-blur-[1px]"
      />
    </>
  );
}
