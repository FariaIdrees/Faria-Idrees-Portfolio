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
    summary: "Typed, accessible interfaces built to survive real product churn.",
    icon: Terminal,
    skills: [
      { name: "React", icon: "react", blurb: "Component architecture and state management" },
      { name: "Next.js", icon: "nextjs", blurb: "App Router, server components, routing" },
      { name: "TypeScript", icon: "typescript", blurb: "Strict types across the whole stack" },
      { name: "JavaScript", icon: "javascript", blurb: "Modern ES features and the DOM" },
      { name: "Tailwind CSS", icon: "tailwind", blurb: "Design systems without stylesheet drift" },
      { name: "React Router", icon: "reactrouter", blurb: "Client routing for SPA dashboards" },
      { name: "Material UI", icon: "mui", blurb: "Themed component libraries at scale" },
      { name: "Ant Design", icon: "antdesign", blurb: "Data-dense admin interfaces" },
      { name: "Vite", icon: "vite", blurb: "Fast builds and local dev tooling" },
      { name: "Bootstrap", icon: "bootstrap", blurb: "Rapid responsive layout work" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    summary: "Services and APIs with predictable contracts and clear boundaries.",
    icon: Server,
    skills: [
      { name: "Node.js", icon: "node", blurb: "Runtime for services and tooling" },
      { name: "NestJS", icon: "nestjs", blurb: "Modular services, DI, guards and pipes" },
      { name: "Hono", icon: "hono", blurb: "Lightweight, edge-ready HTTP routing" },
      { name: "REST APIs", icon: "openapi", blurb: "Versioned, documented resource design" },
      { name: "oRPC", icon: "orpc", blurb: "End-to-end typed client/server calls" },
    ],
  },
  {
    id: "database",
    title: "Database",
    summary: "Schemas modelled around the domain, not around the ORM.",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: "postgresql", blurb: "Relational modelling, indexes, migrations" },
      { name: "MySQL", icon: "mysql", blurb: "Relational schemas and query tuning" },
      { name: "MongoDB", icon: "mongodb", blurb: "Document modelling and aggregation" },
      { name: "Drizzle ORM", icon: "drizzle", blurb: "Type-safe SQL and schema migrations" },
    ],
  },
  {
    id: "infrastructure",
    title: "DevOps & Cloud",
    summary: "Reproducible environments and services that behave the same everywhere.",
    icon: Cloud,
    skills: [
      { name: "Docker", icon: "docker", blurb: "Containerised services and local parity" },
      { name: "Redis", icon: "redis", blurb: "Caching, queues and ephemeral state" },
      { name: "Google Cloud", icon: "gcp", blurb: "Hosting, storage and managed services" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    summary: "The everyday workflow — version control, review and API testing.",
    icon: Wrench,
    skills: [
      { name: "Git", icon: "git", blurb: "Branching strategy and clean history" },
      { name: "GitHub", icon: "github", blurb: "Pull requests, reviews and CI" },
      { name: "Postman", icon: "postman", blurb: "API collections and contract testing" },
    ],
  },
];
