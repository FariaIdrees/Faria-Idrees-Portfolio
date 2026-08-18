"use client";

import { motion } from "motion/react";
import { skillGroups } from "@/content/skills";
import { DURATION, EASE_OUT_EXPO, VIEWPORT_EARLY, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/ui/SkillCard";

export function Skills() {
  return (
    <Section id="skills" aria-labelledby="skills-heading" className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
      />

      <SectionHeading
        id="skills-heading"
        eyebrow="Skills"
        title="The stack I build with."
        description="Grouped by where they sit in a project — from the interface a visitor sees down to the database behind it."
        accentWords={["with."]}
      />

      <div className="mt-14 space-y-14 sm:mt-16 lg:space-y-16">
        {skillGroups.map((group, groupIndex) => {
          const Icon = group.icon;

          return (
            <div
              key={group.id}
              className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10"
            >
              {/* Group label column — sticks alongside its tiles on desktop. */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_EARLY}
                transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO }}
                className="lg:col-span-4"
              >
                <div className="lg:sticky lg:top-28">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface/60 text-accent">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-fg">
                        {group.title}
                      </h3>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-subtle">
                        {String(group.skills.length).padStart(2, "0")} technologies
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
                    {group.summary}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-5 hidden h-px w-full bg-gradient-to-r from-line-strong to-transparent lg:block"
                  />
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_EARLY}
                variants={staggerContainer(0.03, groupIndex === 0 ? 0.06 : 0)}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8"
              >
                {group.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
