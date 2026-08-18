import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Database,
  Gauge,
  Layers,
  Rocket,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";

export const aboutParagraphs: readonly string[] = [
  "I'm a Computer Science student at KIPS College Kasur, affiliated with GCUF, and a MERN stack developer. I recently completed the MERN Stack Development course at Nexskill, Arfa Kareem Tower, where I built full-stack applications end to end with MongoDB, Express.js, React.js and Node.js.",
  "My work sits across the whole stack: responsive interfaces in React and Next.js, Express APIs behind them, and MongoDB for data. Every project on this site is built, deployed and live — I like finishing things, not just prototyping them.",
  "I care about clean, readable code and interfaces that hold up on a phone as well as a laptop. I'm actively looking for a junior developer role where I can keep learning from real production work and grow into a professional software engineer.",
];

export type Capability = {
  label: string;
  icon: LucideIcon;
};

/** Rendered as the animated card opposite the About copy. */
export const capabilities: readonly Capability[] = [
  { label: "Full-Stack Development", icon: Layers },
  { label: "React & Next.js Interfaces", icon: Sparkles },
  { label: "REST API Integration", icon: Blocks },
  { label: "MongoDB Data Modelling", icon: Database },
  { label: "Responsive Design", icon: Smartphone },
  { label: "Performance & SEO", icon: Gauge },
  { label: "Version Control with Git", icon: Wrench },
  { label: "Deployment & Hosting", icon: Rocket },
];

export type Principle = {
  title: string;
  description: string;
};

export const principles: readonly Principle[] = [
  {
    title: "Clean Code",
    description:
      "Readable names, small components and no clever tricks that need a paragraph of explanation.",
  },
  {
    title: "Responsive First",
    description:
      "Layouts designed for a phone screen first, then given room to breathe on larger displays.",
  },
  {
    title: "Reusable Components",
    description:
      "Build a piece once, use it everywhere — fewer places to fix when something changes.",
  },
  {
    title: "Performance",
    description:
      "Optimised images, sensible bundles and fast load times, because most visitors are on mobile data.",
  },
  {
    title: "Ship It",
    description:
      "A project isn't finished until it's deployed, tested on real devices and reachable by a link.",
  },
  {
    title: "Keep Learning",
    description:
      "Every project adds a tool I didn't have before. The stack keeps moving and so should I.",
  },
];
