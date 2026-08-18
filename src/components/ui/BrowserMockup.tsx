"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { usePointerFine } from "@/hooks/usePointerFine";
import { cn } from "@/lib/utils";

type PortalView = {
  name: string;
  /** Sidebar entries for this portal. */
  nav: readonly string[];
  /** Three summary tiles — labels only, no fabricated figures. */
  tiles: readonly string[];
  /** Table rows: [primary, secondary, status]. */
  rows: readonly (readonly [string, string, string])[];
};

const VIEWS: readonly PortalView[] = [
  {
    name: "Customer",
    nav: ["Properties", "Snagging plans", "Orders", "Reports", "Payments"],
    tiles: ["Active orders", "Open defects", "Snag score"],
    rows: [
      ["Apartment 14B", "Inspection booked", "Scheduled"],
      ["Riverside Villa", "Report ready", "Complete"],
      ["Unit 302", "Awaiting vendor", "In progress"],
    ],
  },
  {
    name: "Admin",
    nav: ["Overview", "Vendors", "Orders", "Disputes", "Audit logs"],
    tiles: ["Orders in flight", "Vendor payouts", "Open disputes"],
    rows: [
      ["Order #SP-1042", "Payment captured", "Settled"],
      ["Vendor onboarding", "Documents pending", "Review"],
      ["Dispute #114", "Evidence submitted", "Open"],
    ],
  },
  {
    name: "Vendor",
    nav: ["Available jobs", "My bids", "Maintenance", "Payouts", "Profile"],
    tiles: ["Open bids", "Jobs assigned", "Next payout"],
    rows: [
      ["Bathroom sealant", "Bid submitted", "Pending"],
      ["Window alignment", "Awarded", "Scheduled"],
      ["Kitchen tiling", "Work completed", "Invoiced"],
    ],
  },
  {
    name: "Snagging Team",
    nav: ["Assignments", "Capture", "Defects", "Scoring", "Submissions"],
    tiles: ["Inspections today", "Defects logged", "AI cleanup"],
    rows: [
      ["Plot 27 — Handover", "42 defects captured", "Drafting"],
      ["Plot 31 — Pre-handover", "AI summary ready", "Review"],
      ["Plot 08 — Final", "Report submitted", "Complete"],
    ],
  },
];

const STATUS_TONE: Record<string, string> = {
  Complete: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300",
  Settled: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300",
  Scheduled: "bg-sky-500/12 text-sky-600 dark:text-sky-300",
  "In progress": "bg-amber-500/12 text-amber-600 dark:text-amber-300",
  Pending: "bg-amber-500/12 text-amber-600 dark:text-amber-300",
  Review: "bg-violet-500/12 text-violet-600 dark:text-violet-300",
  Drafting: "bg-violet-500/12 text-violet-600 dark:text-violet-300",
  Open: "bg-rose-500/12 text-rose-600 dark:text-rose-300",
  Invoiced: "bg-sky-500/12 text-sky-600 dark:text-sky-300",
};

const BAR_HEIGHTS = [38, 62, 45, 78, 56, 88, 67, 94];

/**
 * Interactive product mockup standing in for a screenshot.
 *
 * It is a real, generated interface rather than a placeholder rectangle: the
 * four portals cycle on a timer (pausing on hover), and on desktop the whole
 * frame tilts toward the cursor in 3D.
 */
export function BrowserMockup({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();
  const reduced = useReducedMotion();
  const tiltEnabled = pointerFine && !reduced;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [7, -7]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(my, [0, 1], [-6, 6]), {
    stiffness: 120,
    damping: 18,
  });

  useEffect(() => {
    if (paused || reduced) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % VIEWS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [paused, reduced]);

  const view = VIEWS[index];

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width);
    my.set((event.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handleMove}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        resetTilt();
      }}
      style={{ perspective: 1400 }}
      className={cn("relative", className)}
    >
      <p className="sr-only">
        Interface preview of the {view.name} portal, showing navigation, summary
        tiles, activity and a status list.
      </p>
      <motion.div
        style={tiltEnabled ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="relative overflow-hidden rounded-xl border border-line bg-surface shadow-lift ring-gradient sm:rounded-2xl"
      >
        {/* ---- browser chrome ---- */}
        <div className="flex items-center gap-2 border-b border-line bg-surface-2/70 px-3 py-2.5 sm:px-4">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
          </span>
          <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-bg/70 px-2.5 py-1">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="truncate font-mono text-[0.6rem] text-fg-subtle sm:text-[0.68rem]">
              proptoc &middot; {view.name.toLowerCase()} portal
            </span>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            {VIEWS.map((entry, entryIndex) => (
              <button
                key={entry.name}
                type="button"
                onClick={() => setIndex(entryIndex)}
                aria-label={`Preview the ${entry.name} portal`}
                aria-pressed={entryIndex === index}
                className="grid h-4 w-4 place-items-center rounded-full"
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                    entryIndex === index ? "bg-accent" : "bg-line-strong",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ---- app body ---- */}
        {/* The mockup is illustrative, so its internals stay out of the a11y
            tree; the caption above describes what it shows. */}
        <div
          aria-hidden="true"
          className="relative flex h-[19rem] text-[0.62rem] sm:h-[23rem] sm:text-[0.68rem] lg:h-[25rem]"
        >
          {/* sidebar */}
          <aside className="hidden w-36 shrink-0 flex-col gap-1 border-r border-line bg-surface-2/40 p-3 sm:flex lg:w-44">
            <div className="mb-3 flex items-center gap-2 px-1">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-[0.6rem] font-bold text-accent-fg">
                P
              </span>
              <span className="font-semibold tracking-tight text-fg">Proptoc</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={view.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.32 }}
                className="flex flex-col gap-0.5"
              >
                {view.nav.map((entry, entryIndex) => (
                  <span
                    key={entry}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5",
                      entryIndex === 0
                        ? "bg-accent-soft text-accent"
                        : "text-fg-subtle",
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-[2px] bg-current opacity-60" />
                    {entry}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
            <span className="mt-auto rounded-md border border-line px-2 py-1.5 text-fg-subtle">
              Audit log
            </span>
          </aside>

          {/* main */}
          <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={view.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="flex min-h-0 flex-1 flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-tight text-fg">
                    {view.name} Portal
                  </span>
                  <span className="rounded-full bg-accent px-2.5 py-1 text-[0.6rem] font-medium text-accent-fg">
                    New order
                  </span>
                </div>

                {/* stat tiles */}
                <div className="grid grid-cols-3 gap-2">
                  {view.tiles.map((tile) => (
                    <div
                      key={tile}
                      className="rounded-lg border border-line bg-bg/60 p-2"
                    >
                      <p className="truncate text-fg-subtle">{tile}</p>
                      <div className="mt-2 h-1.5 w-3/4 rounded-full bg-line-strong" />
                      <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-accent/50" />
                    </div>
                  ))}
                </div>

                {/* chart */}
                <div className="rounded-lg border border-line bg-bg/60 p-2.5">
                  <div className="flex items-end gap-1.5" aria-hidden="true">
                    {BAR_HEIGHTS.map((height, barIndex) => (
                      <motion.span
                        key={barIndex}
                        initial={{ scaleY: 0.2 }}
                        animate={{ scaleY: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: barIndex * 0.04,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ height: `${height * 0.42}px` }}
                        className={cn(
                          "w-full origin-bottom rounded-sm",
                          barIndex % 3 === 2 ? "bg-accent" : "bg-line-strong",
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* table */}
                <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-line bg-bg/60">
                  {view.rows.map(([primary, secondary, status], rowIndex) => (
                    <div
                      key={primary}
                      className={cn(
                        "flex items-center gap-2 px-2.5 py-2",
                        rowIndex > 0 && "border-t border-line",
                      )}
                    >
                      <span className="h-5 w-5 shrink-0 rounded-md bg-line-strong/60" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-fg">
                          {primary}
                        </span>
                        <span className="block truncate text-fg-subtle">
                          {secondary}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[0.55rem] font-medium sm:text-[0.6rem]",
                          STATUS_TONE[status] ?? "bg-line-strong/40 text-fg-muted",
                        )}
                      >
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Ambient glow anchoring the frame to the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -bottom-10 -z-10 h-32 rounded-full bg-[var(--glow-a)] blur-[70px]"
      />
    </div>
  );
}
