"use client";

import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Token = { text: string; tone?: keyof typeof TONES };

const TONES = {
  keyword: "text-violet-600 dark:text-violet-300",
  name: "text-fg",
  prop: "text-sky-600 dark:text-sky-300",
  string: "text-emerald-600 dark:text-emerald-300",
  punct: "text-fg-subtle",
} as const;

/** The panel content, expressed as tokens so it stays readable and typo-proof. */
const LINES: Token[][] = [
  [
    { text: "const ", tone: "keyword" },
    { text: "developer", tone: "name" },
    { text: " = {", tone: "punct" },
  ],
  [
    { text: "  name", tone: "prop" },
    { text: ": ", tone: "punct" },
    { text: '"Faria Idrees"', tone: "string" },
    { text: ",", tone: "punct" },
  ],
  [
    { text: "  role", tone: "prop" },
    { text: ": ", tone: "punct" },
    { text: '"Web Developer"', tone: "string" },
    { text: ",", tone: "punct" },
  ],
  [
    { text: "  stack", tone: "prop" },
    { text: ": [", tone: "punct" },
    { text: '"React"', tone: "string" },
    { text: ", ", tone: "punct" },
    { text: '"Next.js"', tone: "string" },
    { text: ", ", tone: "punct" },
    { text: '"Node.js"', tone: "string" },
    { text: ", ", tone: "punct" },
    { text: '"MongoDB"', tone: "string" },
    { text: "],", tone: "punct" },
  ],
  [
    { text: "  focus", tone: "prop" },
    { text: ": ", tone: "punct" },
    { text: '"Building full-stack web apps"', tone: "string" },
    { text: ",", tone: "punct" },
  ],
  [{ text: "};", tone: "punct" }],
];

const line = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
};

/**
 * Editor-style panel used as the hero visual. Lines write themselves in one
 * after another, then a caret settles at the end — enough motion to read as
 * "code being written" without an endless typing loop burning frames.
 */
export function CodePanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-lift backdrop-blur-xl ring-gradient",
        className,
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </span>
        <span className="ml-2 font-mono text-[0.7rem] tracking-tight text-fg-subtle">
          developer.js
        </span>
        <span className="ml-auto font-mono text-[0.65rem] uppercase tracking-[0.16em] text-fg-subtle">
          JavaScript
        </span>
      </div>

      <motion.pre
        aria-hidden="true"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.09, delayChildren: 0.85 } },
        }}
        className="overflow-x-auto px-4 py-5 font-mono text-[0.72rem] leading-[1.85] sm:px-6 sm:text-[0.8rem]"
      >
        <code>
          {LINES.map((tokens, index) => (
            <motion.span key={index} variants={line} className="block whitespace-pre">
              <span className="mr-4 inline-block w-3 select-none text-right text-fg-subtle/50">
                {index + 1}
              </span>
              {tokens.map((token, tokenIndex) => (
                <span key={tokenIndex} className={TONES[token.tone ?? "name"]}>
                  {token.text}
                </span>
              ))}
              {index === LINES.length - 1 ? (
                <span className="animate-caret ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-accent/80" />
              ) : null}
            </motion.span>
          ))}
        </code>
      </motion.pre>

      {/* A single slow sheen pass so the panel feels lit rather than flat. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
        style={{ animation: "shimmer 6s ease-in-out 2s infinite" }}
      />
    </div>
  );
}
