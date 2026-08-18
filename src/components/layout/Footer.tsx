"use client";

import { motion } from "motion/react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { navItems, site } from "@/content/site";
import { DURATION, EASE_OUT_EXPO, VIEWPORT_EARLY } from "@/lib/motion";

const footerLinks = navItems.filter((entry) =>
  ["home", "about", "skills", "projects", "contact"].includes(entry.id),
);

const socials = [
  { label: "GitHub", href: site.socials.github.href, icon: GithubIcon },
  { label: "LinkedIn", href: site.socials.linkedin.href, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-surface/30">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_EARLY}
          transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO }}
          className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between"
        >
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight text-fg">
              {site.name}
            </p>
            <p className="mt-1 text-sm text-fg-muted">{site.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-fg-subtle">
              Open to full-stack engineering roles and freelance work.
            </p>
          </div>

          <nav aria-label="Footer" className="md:min-w-40">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className="group relative inline-block text-sm text-fg-muted transition-colors duration-300 hover:text-fg"
                  >
                    {entry.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 ease-out-expo group-hover:w-full"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              Elsewhere
            </p>
            <ul className="mt-4 flex gap-2.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-fg-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-fg-subtle">
            &copy; {year} {site.name}. Built with Next.js, TypeScript and Tailwind CSS.
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 text-xs text-fg-muted transition-colors hover:text-accent"
          >
            Back to top
            <span className="grid h-7 w-7 place-items-center rounded-full border border-line transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
