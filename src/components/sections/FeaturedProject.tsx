"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Lightbulb, Target } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { featuredProject } from "@/content/projects";
import { DURATION, EASE_OUT_EXPO, VIEWPORT_EARLY, staggerContainer } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { cn, isPlaceholderLink } from "@/lib/utils";

const { liveHref, repoHref } = featuredProject;
const hasLive = !isPlaceholderLink(liveHref);
const hasRepo = !isPlaceholderLink(repoHref);

export function FeaturedProject() {
  return (
    <Section id="projects" aria-labelledby="featured-heading" className="pb-8 sm:pb-10 lg:pb-12">
      <SectionHeading
        id="featured-heading"
        eyebrow="Featured Project"
        title="A full-stack store, built end to end."
        description="My most complete MERN project — React on the front, Express and Node.js serving the API, MongoDB holding the catalogue."
        accentWords={["end."]}
      />

      {/* ---------------- overview ---------------- */}
      <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal direction="left">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {featuredProject.year}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl lg:text-[2.1rem]">
              {featuredProject.name}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-fg-muted sm:text-base">
              {featuredProject.kind}
            </p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-fg-muted sm:text-base">
              {featuredProject.summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {hasLive ? (
                <Button href={liveHref} external magnetic>
                  Visit Live Site
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Button>
              ) : null}
              {hasRepo ? (
                <Button href={repoHref} external variant="secondary" magnetic>
                  <GithubIcon className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </Button>
              ) : null}
            </div>

            {!hasRepo ? (
              <p className="mt-3 text-xs text-fg-subtle">
                Source repository link will be added here — set{" "}
                <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.7rem] text-fg-muted">
                  repoHref
                </code>{" "}
                in the project data.
              </p>
            ) : null}
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VIEWPORT_EARLY}
          transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO }}
          className="lg:col-span-7"
        >
          <BrowserMockup />
        </motion.div>
      </div>

      {/* ---------------- problem / solution ---------------- */}
      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-20 lg:gap-5">
        {[
          {
            label: "The problem",
            icon: Target,
            body: featuredProject.problem,
          },
          {
            label: "The solution",
            icon: Lightbulb,
            body: featuredProject.solution,
          },
        ].map((block, index) => (
          <Reveal
            key={block.label}
            direction={index === 0 ? "left" : "right"}
            delay={index * 0.08}
            className="h-full"
          >
            <div
              className={cn(
                "relative h-full overflow-hidden rounded-2xl border border-line p-6 sm:p-7",
                index === 0 ? "bg-surface/40" : "bg-surface/70",
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-bg/70 text-accent">
                  <block.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
                  {block.label}
                </h4>
              </div>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-fg-muted">
                {block.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ---------------- architecture ---------------- */}
      <div className="mt-16 lg:mt-20">
        <Reveal>
          <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
            Architecture
          </h4>
          <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-fg-muted">
            Four layers, one flow: the React storefront asks the Express API for
            data, the API reads MongoDB, and the whole thing runs on Vercel.
          </p>
        </Reveal>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
          variants={staggerContainer(0.06, 0.06)}
          className="mt-7 space-y-3"
        >
          {featuredProject.architecture.map((layer, index) => (
            <motion.li
              key={layer.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
                },
              }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface/50 p-5 transition-colors duration-300 hover:border-line-strong sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-3 sm:w-56 sm:shrink-0">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-bg/70 font-mono text-[0.7rem] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold tracking-tight text-fg">
                      {layer.label}
                    </p>
                    <p className="truncate text-xs text-fg-subtle sm:whitespace-normal">
                      {layer.caption}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:flex-1">
                  {layer.nodes.map((node) => (
                    <span
                      key={node}
                      className="rounded-lg border border-line bg-bg/60 px-2.5 py-1.5 font-mono text-[0.68rem] text-fg-muted transition-colors duration-300 group-hover:border-line-strong group-hover:text-fg"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connector between layers. */}
              {index < featuredProject.architecture.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 left-[2.15rem] z-10 h-3 w-px bg-line-strong sm:left-[2.4rem]"
                />
              ) : null}
            </motion.li>
          ))}
        </motion.ol>
      </div>

      {/* ---------------- features ---------------- */}
      <div className="mt-16 lg:mt-20">
        <Reveal>
          <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
            What it does
          </h4>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
          variants={staggerContainer(0.045, 0.05)}
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredProject.featureGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
                },
              }}
              className="group rounded-2xl border border-line bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface/80"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-bg/70 text-fg-muted transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent">
                  <group.icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h5 className="text-sm font-semibold tracking-tight text-fg">
                  {group.title}
                </h5>
              </div>
              <ul className="mt-4 space-y-1.5">
                {group.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-[0.82rem] leading-relaxed text-fg-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent/70"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ---------------- stack ---------------- */}
      <Reveal className="mt-12">
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface/40 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle sm:w-32 sm:shrink-0">
            Built with
          </p>
          <div className="group flex flex-wrap gap-1.5">
            {featuredProject.tech.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
