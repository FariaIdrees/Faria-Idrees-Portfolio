"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { usePointerFine } from "@/hooks/usePointerFine";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximum travel in px. Kept small — the effect should be felt, not seen. */
  strength?: number;
};

/**
 * Pulls its child a few pixels toward the cursor. Disabled entirely on touch
 * devices and when the user prefers reduced motion, in which case it renders
 * a plain wrapper with no listeners attached.
 */
export function Magnetic({ children, className, strength = 8 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const pointerFine = usePointerFine();
  const reduced = useReducedMotion();
  const enabled = pointerFine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  if (!enabled) {
    return <span className={cn("inline-flex", className)}>{children}</span>;
  }

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set((offsetX / (rect.width / 2)) * strength);
    y.set((offsetY / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.span>
  );
}
