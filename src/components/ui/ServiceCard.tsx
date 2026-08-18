"use client";

import { motion } from "motion/react";
import type { Service } from "@/content/services";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import { GlowCard } from "./GlowCard";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 26 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
        },
      }}
      className="h-full"
    >
      <GlowCard className="h-full p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <span
            className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg/70 text-fg-muted
                       transition-all duration-500 ease-out-expo
                       group-hover:-translate-y-0.5 group-hover:border-accent/50 group-hover:text-accent"
          >
            <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <span className="font-mono text-[0.65rem] text-fg-subtle/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-5 text-base font-semibold tracking-tight text-fg">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {service.description}
        </p>

        {/* Hairline that draws in from the left on hover. */}
        <span
          aria-hidden="true"
          className="mt-5 block h-px w-0 bg-gradient-to-r from-accent to-transparent transition-[width] duration-700 ease-out-expo group-hover:w-full"
        />
      </GlowCard>
    </motion.div>
  );
}
