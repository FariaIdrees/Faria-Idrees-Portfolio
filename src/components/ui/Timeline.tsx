"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { Check } from "lucide-react";
import type { TimelineItem } from "@/content/education";
import { DURATION, EASE_OUT_EXPO, VIEWPORT_EARLY, staggerContainer } from "@/lib/motion";
import { TechBadge } from "./TechBadge";
import { cn } from "@/lib/utils";

/**
 * Rail that draws itself as the section scrolls past. The fill is a scaled
 * gradient rather than an animated height, so it stays on the compositor.
 */
export function TimelineTrack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-line sm:left-[23px]"
      >
        <motion.div
          style={{ scaleY }}
          className="h-full w-full origin-top bg-gradient-to-b from-accent via-accent to-accent/20"
        />
      </div>
      <div className="space-y-12">{children}</div>
    </div>
  );
}

/** A single entry: node, header card, then its details beneath. */
export function TimelineEntry({ item }: { item: TimelineItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { amount: 0.35, margin: "-20% 0px -40% 0px" });
  const Icon = item.icon;

  return (
    <div ref={ref} className="relative pl-14 sm:pl-[4.5rem]">
      {/* node */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEWPORT_EARLY}
        transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO }}
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border bg-bg transition-colors duration-300 sm:h-12 sm:w-12",
          active ? "border-accent text-accent" : "border-line text-fg-subtle",
        )}
      >
        <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={1.75} />
        <span
          className={cn(
            "absolute inset-0 rounded-full transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0",
          )}
          style={{ boxShadow: "0 0 0 6px var(--accent-soft)" }}
        />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_EARLY}
        transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO }}
        className={cn(
          "rounded-2xl border bg-surface/50 p-5 backdrop-blur-sm transition-colors duration-300 sm:p-7",
          active ? "border-line-strong" : "border-line",
        )}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
            {item.title}
          </h3>
          {item.period ? (
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
              {item.period}
            </span>
          ) : null}
        </div>

        <p className="mt-1 text-sm font-medium text-accent sm:text-base">
          {item.organisation}
          {item.location ? (
            <span className="text-fg-subtle"> · {item.location}</span>
          ) : null}
        </p>

        <p className="mt-4 text-[0.95rem] leading-relaxed text-fg-muted">
          {item.summary}
        </p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
          variants={staggerContainer(0.04, 0.08)}
          className="mt-6 grid gap-2.5 sm:grid-cols-2"
        >
          {item.highlights.map((highlight) => (
            <motion.li
              key={highlight}
              variants={{
                hidden: { opacity: 0, x: -12 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
                },
              }}
              className="group flex gap-3 rounded-xl border border-transparent px-3 py-2 transition-colors duration-300 hover:border-line hover:bg-bg/50"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              <span className="text-sm leading-relaxed text-fg-muted transition-colors duration-300 group-hover:text-fg">
                {highlight}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
          {item.stack.map((tech) => (
            <TechBadge key={tech} label={tech} size="sm" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
