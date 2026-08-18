"use client";

import { motion } from "motion/react";
import { DURATION, EASE_OUT_EXPO, VIEWPORT_EARLY, maskChild } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  className?: string;
  id?: string;
  /** Per-word offset. Lower values read as one continuous sweep. */
  stagger?: number;
  delay?: number;
  /** Play immediately (hero) instead of waiting for the viewport. */
  immediate?: boolean;
  /** Words rendered in the accent colour, matched case-insensitively. */
  accentWords?: readonly string[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Word-by-word mask reveal: each word sits inside a clipped wrapper and slides
 * up from behind it. Reads as one designed motion rather than a plain fade.
 *
 * The full string is kept in the a11y tree via `aria-label`, and the visual
 * word spans are hidden from screen readers.
 */
export function TextReveal({
  text,
  className,
  id,
  stagger = 0.055,
  delay = 0,
  immediate = false,
  accentWords,
  as = "span",
}: TextRevealProps) {
  const Wrapper = motion[as];
  const words = text.split(" ");
  const accents = new Set(
    (accentWords ?? []).map((word) => word.toLowerCase().replace(/[.,]/g, "")),
  );

  const animationProps = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: VIEWPORT_EARLY };

  return (
    <Wrapper
      id={id}
      aria-label={text}
      className={cn("inline-block", className)}
      initial="hidden"
      {...animationProps}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, index) => {
        const isAccent = accents.has(word.toLowerCase().replace(/[.,]/g, ""));

        return (
          <span
            key={`${word}-${index}`}
            aria-hidden="true"
            // `pb`/`-mb` give descenders room so the clip never shears a "g".
            className="inline-flex overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
          >
            <motion.span
              variants={maskChild}
              transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO }}
              className={cn(
                "inline-block whitespace-pre",
                isAccent && "text-accent",
              )}
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </Wrapper>
  );
}
