import type { LucideIcon } from "lucide-react";
import { Cloud, Database, Server, Terminal, Wrench } from "lucide-react";
import type { TechIconKey } from "@/components/ui/tech-icon-data";

export type Skill = {
  name: string;
  icon: TechIconKey;
  /** One line on how the technology is actually used. */
  blurb: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  skills: readonly Skill[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    summary:
      "Component-driven interfaces that stay readable and work on every screen size.",
    icon: Terminal,
    skills: [
      {
        name: "React.js",
        icon: "react",
        blurb: "Components, props and state for dynamic interfaces",
      },
      {
        name: "Next.js",
        icon: "nextjs",
        blurb: "Routing, reusable components and fast page loads",
      },
      {
        name: "JavaScript",
        icon: "javascript",
        blurb: "The language behind every project on this site",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
        blurb: "Utility-first styling and responsive layouts",
      },
      {
        name: "Bootstrap",
        icon: "bootstrap",
        blurb: "Grid layouts and rapid responsive build-out",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    summary: "Servers and APIs that hand the frontend the data it asks for.",
    icon: Server,
    skills: [
      {
        name: "Node.js",
        icon: "node",
        blurb: "JavaScript runtime powering the server side",
      },
      {
        name: "Express.js",
        icon: "express",
        blurb: "Routes, middleware and request handling",
      },
      {
        name: "RESTful API Design",
        icon: "openapi",
        blurb: "Clear resources and predictable JSON responses",
      },
      {
        name: "API Integration",
        icon: "api",
        blurb: "Wiring interfaces to live data with loading states",
      },
    ],
  },
  {
    id: "database",
    title: "Database",
    summary: "Storing the content that makes a page dynamic instead of static.",
    icon: Database,
    skills: [
      {
        name: "MongoDB",
        icon: "mongodb",
        blurb: "Document collections, queries and dynamic content",
      },
    ],
  },
  {
    id: "deployment",
    title: "Deployment",
    summary: "Getting work live, on a real URL, with fast load times.",
    icon: Cloud,
    skills: [
      {
        name: "Vercel",
        icon: "vercel",
        blurb: "Deploying Next.js and full-stack projects",
      },
      {
        name: "Netlify",
        icon: "netlify",
        blurb: "Hosting frontend builds with optimised delivery",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    summary: "Version control and the everyday workflow around the code.",
    icon: Wrench,
    skills: [
      {
        name: "Git",
        icon: "git",
        blurb: "Branching, commits and a clean history",
      },
      {
        name: "GitHub",
        icon: "github",
        blurb: "Repositories, collaboration and project hosting",
      },
    ],
  },
];
