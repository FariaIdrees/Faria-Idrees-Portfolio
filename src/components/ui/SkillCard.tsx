"use client";

import { motion } from "motion/react";
import type { Skill } from "@/content/skills";
import { revealVariants } from "@/lib/motion";
import { GlowCard } from "./GlowCard";
import { TechIcon } from "./TechIcon";

/**
 * One technology tile. At rest the glyph is monochrome so a wall of them reads
 * as a single system; on hover it takes on the brand colour, the tile lifts and
 * the spotlight follows the cursor.
 */
export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div variants={revealVariants("up", 20)}>
      <GlowCard className="h-full p-4 sm:p-5" radius={220}>
        <div className="flex items-start gap-3.5">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-bg/70 p-2 text-fg-muted
                       transition-all duration-500 ease-out-expo
                       group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:border-line-strong
                       group-hover:text-[var(--tech,var(--accent))]"
          >
            <TechIcon name={skill.icon} />
          </span>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold tracking-tight text-fg">
              {skill.name}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-fg-subtle transition-colors duration-300 group-hover:text-fg-muted">
              {skill.blurb}
            </p>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
