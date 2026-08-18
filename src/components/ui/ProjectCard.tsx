"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "@/content/projects";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import { TechBadge } from "./TechBadge";
import { cn, isPlaceholderLink } from "@/lib/utils";

/**
 * Stand-in artwork for projects without a screenshot yet — an abstract
 * interface sketch rather than a grey box, so the grid still looks finished.
 * Drop a real `image` into the project data and this is replaced automatically.
 */
function GeneratedPreview({
  seed,
  icon: Icon,
}: {
  seed: number;
  icon?: LucideIcon;
}) {
  const rows = [70, 46, 58, 34];

  return (
    <div className="absolute inset-0 bg-surface-2">
      <div className="absolute inset-0 bg-grid-sm opacity-70" />
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-[60px]"
        style={{ background: "var(--glow-a)" }}
      />
      <div className="absolute inset-0 flex flex-col gap-2 p-5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          {Icon ? (
            <Icon
              className="ml-auto h-4 w-4 text-accent/70"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          ) : null}
        </div>
        <div className="mt-2 flex gap-2">
          {[0, 1, 2].map((tile) => (
            <div
              key={tile}
              className={cn(
                "h-9 flex-1 rounded-md border border-line",
                (tile + seed) % 3 === 0 ? "bg-accent/15" : "bg-bg/50",
              )}
            />
          ))}
        </div>
        <div className="mt-1 flex-1 rounded-md border border-line bg-bg/40 p-3">
          <div className="flex h-full flex-col justify-between">
            {rows.map((width, row) => (
              <div key={row} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                <span
                  className="h-1.5 rounded-full bg-line-strong"
                  style={{ width: `${width - seed * 4}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasLive = !isPlaceholderLink(project.liveHref);
  const hasRepo = !isPlaceholderLink(project.repoHref);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
        },
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/50 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-line-strong hover:shadow-lift"
    >
      {/* ---- media ---- */}
      <div className="relative aspect-16/10 overflow-hidden border-b border-line">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: index * 0.06 }}
          className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
        >
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <GeneratedPreview seed={index} icon={project.icon} />
          )}
        </motion.div>

        {/* Gradient wash that deepens on hover. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
        />

        <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/80 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-muted backdrop-blur-sm">
          {project.category}
        </span>

        {project.isPlaceholder ? (
          <span className="absolute right-4 top-4 rounded-full border border-dashed border-line-strong bg-bg/80 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-subtle backdrop-blur-sm">
            Placeholder
          </span>
        ) : null}
      </div>

      {/* ---- body ---- */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight text-fg transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5">
            {project.title}
          </h3>
          <ArrowUpRight
            className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fg-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <TechBadge key={tech} label={tech} size="sm" />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-line pt-4">
          {hasRepo ? (
            <a
              href={project.repoHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} — source code`}
              className="inline-flex items-center gap-1.5 text-xs text-fg-muted transition-colors duration-300 hover:text-accent"
            >
              <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Code
            </a>
          ) : null}
          {hasLive ? (
            <a
              href={project.liveHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} — open the live site`}
              className="group/link -my-1.5 inline-flex items-center gap-1.5 py-2.5 text-xs font-medium text-accent transition-colors duration-300 hover:text-accent-hover"
            >
              Visit live site
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
