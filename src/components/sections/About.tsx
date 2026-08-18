"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { aboutParagraphs, capabilities } from "@/content/about";
import { DURATION, EASE_OUT_EXPO, VIEWPORT_EARLY } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Slow counter-drift on the decorative glow only — text never moves.
  const glowY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <Section id="about" aria-labelledby="about-heading">
      <div ref={ref} className="relative">
        <motion.div
          aria-hidden="true"
          style={{ y: reduced ? 0 : glowY }}
          className="pointer-events-none absolute -left-40 top-10 -z-10 h-80 w-80 rounded-full bg-[var(--glow-a)] blur-[130px]"
        />

        <SectionHeading
          id="about-heading"
          eyebrow="About"
          title="Engineering across the whole stack, not just the surface."
          accentWords={["stack,"]}
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* -------- narrative -------- */}
          <div className="lg:col-span-7">
            <Stagger stagger={0.12} className="space-y-5">
              {aboutParagraphs.map((paragraph, index) => (
                <StaggerItem
                  key={index}
                  direction="left"
                  className="text-base leading-[1.75] text-fg-muted sm:text-[1.0625rem]"
                >
                  <p>{paragraph}</p>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal direction="left" delay={0.25} className="mt-8">
              <blockquote className="relative rounded-2xl border border-line bg-surface/50 p-5 sm:p-6">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-5 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-accent to-transparent"
                />
                <p className="text-[0.95rem] leading-relaxed text-fg sm:text-base">
                  &ldquo;Write the version you can explain in a sentence. If it
                  needs a paragraph, the boundaries are in the wrong place.&rdquo;
                </p>
                <footer className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                  How I approach architecture
                </footer>
              </blockquote>
            </Reveal>
          </div>

          {/* -------- capability card -------- */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_EARLY}
              transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO }}
              className="relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-5 shadow-card backdrop-blur-sm ring-gradient sm:p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
                  What I work on
                </p>
                <span className="font-mono text-[0.65rem] text-fg-subtle">
                  {String(capabilities.length).padStart(2, "0")}
                </span>
              </div>

              <Stagger stagger={0.06} delayChildren={0.15} className="space-y-1">
                {capabilities.map(({ label, icon: Icon }, index) => (
                  <StaggerItem
                    key={label}
                    direction="right"
                    distance={18}
                    className="group flex items-center gap-3.5 rounded-xl border border-transparent px-3 py-2.5 transition-colors duration-300 hover:border-line hover:bg-bg/60"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-bg/70 text-fg-muted transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent">
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-fg">{label}</span>
                    <span className="ml-auto font-mono text-[0.65rem] text-fg-subtle/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
