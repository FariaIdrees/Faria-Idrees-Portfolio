import type { Transition, Variants } from "motion/react";

/**
 * A single motion language for the whole site: one easing curve, three
 * durations, one spring. Every component pulls from here so the site reads as
 * one designed system rather than a pile of independent animations.
 */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.28,
  base: 0.55,
  slow: 0.8,
} as const;

export const SPRING: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

export const SOFT_SPRING: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 22,
  mass: 0.7,
};

/** Shared viewport config so sections reveal at a consistent scroll position. */
export const VIEWPORT = { once: true, amount: 0.25 } as const;
export const VIEWPORT_EARLY = { once: true, amount: 0.15 } as const;

export type RevealDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "fade"
  | "scale"
  | "blur";

const OFFSET = 28;

export function revealVariants(
  direction: RevealDirection = "up",
  distance = OFFSET,
): Variants {
  const hidden: Record<string, number | string> = { opacity: 0 };

  switch (direction) {
    case "up":
      hidden.y = distance;
      break;
    case "down":
      hidden.y = -distance;
      break;
    case "left":
      hidden.x = -distance;
      break;
    case "right":
      hidden.x = distance;
      break;
    case "scale":
      hidden.scale = 0.94;
      break;
    case "blur":
      hidden.filter = "blur(12px)";
      hidden.y = distance * 0.5;
      break;
  }

  return {
    hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
    },
  };
}

/** Parent container that releases its children one after another. */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Word/line mask reveal — the child slides up from behind a clipped parent. */
export const maskChild: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};
