"use client";

import { useCallback, useRef, useState } from "react";
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
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(navIds);
  const { scrollY } = useScroll();
  /** True while a nav click is smooth-scrolling the page for the user. */
  const navigating = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);

    // A jump the user asked for shouldn't cost them the bar they just used.
    if (navigating.current) {
      setHidden(false);
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => {
        navigating.current = false;
      }, 160);
      return;
    }

    // Only surrender the bar well below the fold, and never mid-menu.
    if (menuOpen || latest < 420) {
      setHidden(false);
      return;
    }
    setHidden(latest > previous && latest - previous > 4);
  });

  const handleNavigate = useCallback((id: string) => {
    setMenuOpen(false);
    navigating.current = true;
    // Wait for the scroll lock to release before moving the page.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden && !menuOpen ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: hidden ? 0 : 0.1 }}
        className="fixed inset-x-0 top-0 z-60"
      >
        <div
          className={cn(
            "mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-18 lg:px-10",
            "transition-[background-color,border-color,backdrop-filter] duration-500",
          )}
        >
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

          <nav
            aria-label="Primary"
            className={cn(
              "relative hidden items-center gap-1 rounded-full border p-1 lg:flex",
              "transition-[background-color,border-color,box-shadow] duration-500",
              scrolled
                ? "glass border-line shadow-card"
                : "border-transparent bg-transparent",
            )}
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
                    "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-accent-soft ring-1 ring-inset ring-[var(--accent-ring)]"
                    />
                  ) : null}
                  {entry.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <a
              href={site.resumeHref}
              className={cn(
                "group hidden h-10 items-center gap-2 rounded-full border border-line bg-surface/60 px-4",
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

        {/* Full-width glass plate, faded in only once the page has moved. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10 border-b transition-all duration-500 lg:hidden",
            scrolled
              ? "glass border-line opacity-100"
              : "border-transparent opacity-0",
          )}
        />
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
