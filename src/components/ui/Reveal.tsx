"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import {
  DURATION,
  EASE_OUT_EXPO,
  VIEWPORT,
  VIEWPORT_EARLY,
  revealVariants,
  staggerContainer,
  type RevealDirection,
} from "@/lib/motion";

type RevealProps = Omit<HTMLMotionProps<"div">, "variants" | "initial"> & {
  direction?: RevealDirection;
  delay?: number;
  distance?: number;
  /** Start the reveal sooner — useful for tall sections. */
  early?: boolean;
};

/**
 * The workhorse scroll reveal. Every section composes this rather than
 * hand-rolling variants, which keeps the motion language identical site-wide.
 */
export function Reveal({
  direction = "up",
  delay = 0,
  distance,
  early = false,
  children,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={early ? VIEWPORT_EARLY : VIEWPORT}
      variants={revealVariants(direction, distance)}
      transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = HTMLMotionProps<"div"> & {
  stagger?: number;
  delayChildren?: number;
  early?: boolean;
};

/** Parent that releases `StaggerItem` children in sequence. */
export function Stagger({
  stagger = 0.05,
  delayChildren = 0,
  early = false,
  children,
  ...props
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={early ? VIEWPORT_EARLY : VIEWPORT}
      variants={staggerContainer(stagger, delayChildren)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = HTMLMotionProps<"div"> & {
  direction?: RevealDirection;
  distance?: number;
};

export function StaggerItem({
  direction = "up",
  distance,
  children,
  ...props
}: StaggerItemProps) {
  return (
    <motion.div variants={revealVariants(direction, distance)} {...props}>
      {children}
    </motion.div>
  );
}
