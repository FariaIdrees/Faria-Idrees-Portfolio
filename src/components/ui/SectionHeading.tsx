"use client";

import { motion } from "motion/react";
import { DURATION, EASE_OUT_EXPO, VIEWPORT_EARLY } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { TextReveal } from "./TextReveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  align?: "left" | "center";
  accentWords?: readonly string[];
  className?: string;
};

/**
 * The section header sequence: a hairline label draws in, the heading masks
 * up word by word, then the description settles. Identical timing everywhere
 * gives the page a recognisable rhythm as you scroll.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  accentWords,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_EARLY}
        transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO }}
        className="flex items-center gap-3"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_EARLY}
          transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO, delay: 0.05 }}
          className="h-px w-8 origin-left bg-accent"
          aria-hidden="true"
        />
        <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </span>
      </motion.div>

      <TextReveal
        as="h2"
        id={id}
        text={title}
        accentWords={accentWords}
        delay={0.08}
        className={cn(
          "max-w-3xl text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]",
          centered && "mx-auto",
        )}
      />

      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_EARLY}
          transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO, delay: 0.18 }}
          className={cn(
            "max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg",
            centered && "mx-auto",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
