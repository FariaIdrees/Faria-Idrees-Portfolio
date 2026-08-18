"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { principles } from "@/content/about";
import { DURATION, EASE_OUT_EXPO, VIEWPORT_EARLY } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Engineering principles, laid out as an index rather than another card grid —
 * the change of rhythm keeps the page from reading as one long deck of tiles.
 */
export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const railScale = useTransform(scrollYProgress, [0.1, 0.75], [0, 1]);

  return (
    <Section id="philosophy" aria-labelledby="philosophy-heading">
      <SectionHeading
        id="philosophy-heading"
        eyebrow="Philosophy"
        title="How I decide what good looks like."
        description="Six things I check before calling a feature finished."
        accentWords={["good"]}
      />

      <div ref={ref} className="relative mt-12">
        <motion.span
          aria-hidden="true"
          style={{ scaleX: reduced ? 1 : railScale }}
          className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-accent via-accent/40 to-transparent"
        />

        {/* gap-px over a line-coloured background renders the dividers, so the
            grid stays correct at every breakpoint without nth-child rules. */}
        <ol className="grid grid-cols-1 gap-px overflow-hidden border-x border-b border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => (
            <motion.li
              key={principle.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_EARLY}
              transition={{
                duration: DURATION.slow,
                ease: EASE_OUT_EXPO,
                delay: (index % 3) * 0.08,
              }}
              className="group relative isolate bg-bg px-5 py-8 transition-colors duration-500 sm:px-6 lg:px-7 lg:py-10"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-b from-accent-soft to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <span className="font-mono text-xs text-fg-subtle/70">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                {principle.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {principle.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
