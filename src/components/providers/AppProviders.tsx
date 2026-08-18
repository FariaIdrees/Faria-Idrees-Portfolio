"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "./ThemeProvider";

/**
 * Client boundary for the whole app.
 *
 * `reducedMotion="user"` makes every `motion` component drop transform and
 * layout animation when the OS asks for reduced motion, so individual
 * components only need to opt out of the extras (parallax, cursor, tilt).
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
