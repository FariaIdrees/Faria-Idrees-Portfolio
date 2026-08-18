"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { heroHighlights, heroTech, site } from "@/content/site";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import { usePointerFine } from "@/hooks/usePointerFine";
import { Button } from "@/components/ui/Button";
import { CodePanel } from "@/components/ui/CodePanel";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

const socialLinks = [
  { label: "GitHub", href: site.socials.github.href, icon: GithubIcon },
  { label: "LinkedIn", href: site.socials.linkedin.href, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
];

const enter = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT_EXPO } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pointerFine = usePointerFine();
  const reduced = useReducedMotion();
  const interactive = pointerFine && !reduced;

  // Normalised pointer position (-0.5 … 0.5) drives every parallax layer.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const smoothX = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const smoothY = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });

  const orbAX = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const orbAY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);
  const orbBX = useTransform(smoothX, [-0.5, 0.5], [26, -26]);
  const orbBY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
  const panelX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const panelY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  // Scroll parallax: the hero settles back slightly as the page moves on.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0.15]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28 lg:pt-32"
    >
      {/* ---------------- background layers ---------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-radial opacity-70" />

        <motion.div
          style={{ x: orbAX, y: orbAY }}
          className="animate-float-slow absolute -top-32 left-[8%] h-[26rem] w-[26rem] rounded-full blur-[110px]"
        >
          <div className="h-full w-full rounded-full bg-[var(--glow-a)]" />
        </motion.div>

        <motion.div
          style={{ x: orbBX, y: orbBY }}
          className="animate-drift absolute -right-24 top-1/3 h-[22rem] w-[22rem] rounded-full blur-[120px]"
        >
          <div className="h-full w-full rounded-full bg-[var(--glow-b)]" />
        </motion.div>

        {/* Grounds the hero and hands off cleanly to the next section. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--bg)]" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-10"
      >
        {/* ---------------- copy ---------------- */}
        <div className="lg:col-span-7">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.div variants={enter} className="mb-6 flex">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-2.5 pr-4 text-xs text-fg-muted backdrop-blur-sm">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to junior developer roles
              </span>
            </motion.div>

            <h1 className="text-[clamp(2.5rem,9vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-fg">
              <TextReveal text={site.name} immediate stagger={0.07} delay={0.15} />
            </h1>

            <motion.p
              variants={enter}
              className="mt-4 text-lg font-medium tracking-tight text-fg-muted sm:text-xl lg:text-2xl"
            >
              Web Developer{" "}
              <span className="text-fg-subtle" aria-hidden="true">
                &amp;
              </span>{" "}
              <span className="text-gradient">MERN Stack Developer</span>
            </motion.p>

            <motion.p
              variants={enter}
              className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
            >
              {site.tagline}
            </motion.p>

            <motion.div
              variants={enter}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="#projects" size="lg" magnetic className="w-full sm:w-auto">
                View My Work
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
              <Button
                href="#contact"
                size="lg"
                variant="secondary"
                magnetic
                className="w-full sm:w-auto"
              >
                Let&apos;s Work Together
              </Button>
            </motion.div>

            <motion.ul variants={enter} className="mt-8 flex items-center gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="group grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/50 text-fg-muted backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    <Icon
                      className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.75}
                    />
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* ---------------- visual ---------------- */}
        <motion.div
          style={interactive ? { x: panelX, y: panelY } : undefined}
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO, delay: 0.45 }}
          className="relative lg:col-span-5"
        >
          <CodePanel />

          {/* Technology badges tucked around the panel edges. */}
          <div className="mt-5 flex flex-wrap gap-2 lg:absolute lg:-bottom-14 lg:left-0 lg:right-0 lg:mt-0">
            {heroTech.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.base,
                  ease: EASE_OUT_EXPO,
                  delay: 1.25 + index * 0.06,
                }}
                className={cn(
                  "rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-[0.7rem]",
                  "text-fg-muted backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent",
                )}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ---------------- highlights strip ---------------- */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO, delay: 1.05 }}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:col-span-12 lg:mt-14"
        >
          {heroHighlights.map((highlight) => (
            <div key={highlight.value} className="bg-bg/70 px-5 py-4 backdrop-blur-sm">
              <dt className="text-sm font-semibold tracking-tight text-fg">
                {highlight.value}
              </dt>
              <dd className="mt-0.5 text-xs text-fg-subtle">{highlight.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-label="Scroll to the About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-fg-subtle transition-colors hover:text-accent lg:inline-flex"
      >
        <span className="font-mono uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
