"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { site } from "@/content/site";
import { DURATION, EASE_OUT_EXPO, VIEWPORT_EARLY, staggerContainer } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/ui/TextReveal";
import { isPlaceholderLink } from "@/lib/utils";

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/s/g, "")}`,
    icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "Connect professionally",
    href: site.socials.linkedin.href,
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "See the code",
    href: site.socials.github.href,
    icon: GithubIcon,
  },
];

const placeholdersRemain =
  site.email.endsWith("example.com") ||
  isPlaceholderLink(site.socials.github.href) ||
  isPlaceholderLink(site.socials.linkedin.href);

export function Contact() {
  return (
    <Section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-grid mask-fade-radial opacity-60"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 32 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={VIEWPORT_EARLY}
        transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO }}
        className="relative overflow-hidden rounded-3xl border border-line bg-surface/60 px-6 py-12 text-center shadow-card backdrop-blur-xl ring-gradient sm:px-10 sm:py-16 lg:px-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="animate-float-slow pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] max-w-[120%] -translate-x-1/2 rounded-full bg-[var(--glow-a)] blur-[110px]"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_EARLY}
          transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO }}
          className="font-mono text-xs uppercase tracking-[0.22em] text-accent"
        >
          Contact
        </motion.p>

        <TextReveal
          as="h2"
          id="contact-heading"
          text="Let's Build Something Great"
          accentWords={["Great"]}
          delay={0.1}
          className="mx-auto mt-4 max-w-3xl text-[clamp(1.85rem,6vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-fg"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_EARLY}
          transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO, delay: 0.3 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
        >
          Have a project, idea or opportunity? Let&apos;s talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_EARLY}
          transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO, delay: 0.42 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button href={`mailto:${site.email}`} size="lg" magnetic className="w-full sm:w-auto">
            <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Send Email
          </Button>
          <Button
            href={site.socials.linkedin.href}
            size="lg"
            variant="secondary"
            magnetic
            className="w-full sm:w-auto"
          >
            <LinkedinIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            LinkedIn
          </Button>
          <Button
            href={site.socials.github.href}
            size="lg"
            variant="secondary"
            magnetic
            className="w-full sm:w-auto"
          >
            <GithubIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            GitHub
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_EARLY}
          transition={{ duration: DURATION.base, delay: 0.55 }}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-fg-subtle"
        >
          <MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          {site.location}
        </motion.p>

        {/* ---- channel list ---- */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
          variants={staggerContainer(0.08, 0.5)}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {channels.map(({ label, value, href, icon: Icon }) => (
            <motion.li
              key={label}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
                },
              }}
            >
              <Magnetic strength={5} className="w-full">
                <a
                  href={href}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-line bg-bg/50 p-4 text-left transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-accent/50 hover:bg-bg/80"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface/70 text-fg-muted transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-fg-subtle">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-fg">{value}</span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-fg-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
            </motion.li>
          ))}
        </motion.ul>

        {placeholdersRemain ? (
          <p className="mt-8 text-xs text-fg-subtle">
            Contact details are placeholders — set the real address and profile
            links in{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.7rem] text-fg-muted">
              src/content/site.ts
            </code>
            .
          </p>
        ) : null}
      </motion.div>
    </Section>
  );
}
