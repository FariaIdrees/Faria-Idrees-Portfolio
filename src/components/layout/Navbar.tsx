"use client";

import { useCallback, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";
import { navIds, navItems, site } from "@/content/site";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

/** Scrolls to a section, honouring the user's motion preference. */
function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", id === navIds[0] ? " " : `#${id}`);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(navIds);
  const { scrollY } = useScroll();

  // The bar never hides — it only gains a glass plate once the page moves.
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 16));

  const handleNavigate = useCallback((id: string) => {
    setMenuOpen(false);
    // Wait for the scroll lock to release before moving the page.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.38, ease: EASE_OUT_EXPO }}
        className="fixed inset-x-0 top-0 z-60"
      >
        {/* Full-width glass plate, faded in only once the page has moved. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10 border-b transition-all duration-300",
            scrolled ? "glass border-line opacity-100" : "border-transparent opacity-0",
          )}
        />

        <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-8 lg:h-18 lg:px-10">
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              handleNavigate("home");
            }}
            aria-label={`${site.name} — back to top`}
            className="group relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface/60 backdrop-blur-sm transition-colors duration-300 hover:border-accent"
          >
            <span className="font-mono text-[0.8rem] font-semibold tracking-[0.08em] text-fg transition-colors duration-300 group-hover:text-accent">
              {site.initials}
            </span>
          </a>

          {/* Absolutely centred so the pill sits on the page axis rather than
              drifting between two side groups of unequal width. */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-line bg-surface/50 p-1 backdrop-blur-md lg:flex"
          >
            {navItems.map((entry) => {
              const isActive = active === entry.id;
              return (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigate(entry.id);
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200",
                    isActive ? "text-accent" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full bg-accent-soft ring-1 ring-inset ring-[var(--accent-ring)]"
                    />
                  ) : null}
                  {entry.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <ThemeToggle />

            <a
              href={site.resumeHref}
              className={cn(
                "group hidden h-10 items-center gap-1.5 rounded-full border border-line bg-surface/60 px-4",
                "text-sm font-medium text-fg backdrop-blur-sm transition-colors duration-300",
                "hover:border-accent hover:text-accent sm:inline-flex",
              )}
            >
              Resume
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-fg backdrop-blur-sm transition-colors duration-300 hover:border-line-strong lg:hidden"
            >
              <Menu className="h-4.5 w-4.5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        activeId={active}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavigate}
      />
    </>
  );
}
