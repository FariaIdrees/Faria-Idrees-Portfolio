"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Mail, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { navItems, site } from "@/content/site";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  activeId: string;
  onClose: () => void;
  onNavigate: (id: string) => void;
};

const panel = {
  hidden: { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.5, ease: EASE_OUT_EXPO, when: "beforeChildren" as const },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.35, ease: EASE_OUT_EXPO, when: "afterChildren" as const },
  },
};

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

/**
 * Full-screen navigation for small viewports. The panel wipes open with a clip
 * path, then the links stagger in; closing plays the same sequence in reverse.
 * Focus is trapped to the panel and the page behind it is scroll-locked.
 */
export function MobileMenu({ open, activeId, onClose, onNavigate }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          key="mobile-menu"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          variants={panel}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[65] flex flex-col bg-bg/95 backdrop-blur-xl lg:hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid-sm opacity-60 mask-fade-b" />

          <div className="relative flex items-center justify-between px-5 py-4 sm:px-8">
            <span className="font-mono text-sm font-semibold tracking-[0.2em] text-fg">
              {site.initials}
            </span>
            <motion.button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1, transition: { delay: 0.12 } }}
              exit={{ rotate: 90, opacity: 0 }}
              whileTap={{ scale: 0.92 }}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/70 text-fg"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </motion.button>
          </div>

          <motion.nav
            variants={list}
            className="relative flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8"
          >
            {navItems.map((entry, index) => (
              <motion.a
                key={entry.id}
                variants={item}
                href={`#${entry.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(entry.id);
                }}
                className={cn(
                  "group flex items-baseline justify-between border-b border-line py-4",
                  "text-3xl font-semibold tracking-tight transition-colors sm:text-4xl",
                  activeId === entry.id ? "text-accent" : "text-fg",
                )}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-fg-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {entry.label}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-fg-subtle transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </motion.nav>

          <motion.div
            variants={list}
            className="relative flex flex-wrap items-center gap-3 px-5 pb-10 pt-6 sm:px-8"
          >
            <motion.a
              variants={item}
              href={site.socials.github.href}
              aria-label="GitHub profile"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/70 text-fg-muted transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon className="h-4.5 w-4.5" strokeWidth={1.75} />
            </motion.a>
            <motion.a
              variants={item}
              href={site.socials.linkedin.href}
              aria-label="LinkedIn profile"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/70 text-fg-muted transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinIcon className="h-4.5 w-4.5" strokeWidth={1.75} />
            </motion.a>
            <motion.a
              variants={item}
              href={`mailto:${site.email}`}
              aria-label="Send an email"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/70 text-fg-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Mail className="h-4.5 w-4.5" strokeWidth={1.75} />
            </motion.a>
            <motion.a
              variants={item}
              href={site.resumeHref}
              className="ml-auto inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-fg"
            >
              Resume
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </motion.a>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
