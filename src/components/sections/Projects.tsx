"use client";

import { motion } from "motion/react";
import { projects } from "@/content/projects";
import { VIEWPORT_EARLY, staggerContainer } from "@/lib/motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const hasPlaceholders = projects.some((project) => project.isPlaceholder);

export function Projects() {
  return (
    <Section id="other-projects" aria-labelledby="other-projects-heading" className="pt-8 sm:pt-10 lg:pt-12">
      <SectionHeading
        id="other-projects-heading"
        eyebrow="More Work"
        title="More projects, all of them live."
        description="Every project here is built, deployed and reachable by a link — click through and try them."
        accentWords={["live."]}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_EARLY}
        variants={staggerContainer(0.1, 0.1)}
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </motion.div>

      {hasPlaceholders ? (
        <Reveal delay={0.1} className="mt-6">
          <p className="text-xs text-fg-subtle">
            Cards marked <span className="text-fg-muted">Placeholder</span> are
            structural slots — replace them in{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.7rem] text-fg-muted">
              src/content/projects.ts
            </code>{" "}
            and the grid updates itself.
          </p>
        </Reveal>
      ) : null}
    </Section>
  );
}
