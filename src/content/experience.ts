export type ExperienceItem = {
  company: string;
  role: string;
  /** Left blank on purpose — no dates were provided, none are invented. */
  period?: string;
  location?: string;
  summary: string;
  highlights: readonly string[];
  stack: readonly string[];
};

export const experience: readonly ExperienceItem[] = [
  {
    company: "Devsarch",
    role: "Software Engineer",
    summary:
      "Full-stack product development on a multi-portal platform — shipping production features end to end, from database schema through API to the interfaces that consume them.",
    highlights: [
      "Build and ship production features across the full stack, from schema design to user-facing interface.",
      "Develop TypeScript applications with Next.js on the frontend and Node.js services behind them.",
      "Design and implement REST APIs, including request validation, error contracts and versioning.",
      "Model and query PostgreSQL schemas for multi-role, workflow-heavy product domains.",
      "Implement authentication and role-based access control across multiple user portals.",
      "Integrate Stripe and other third-party services for payment and payout workflows.",
      "Work with cloud services and containerised environments for deployment and local parity.",
      "Test and debug features through to release, and support them once they are live.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Drizzle",
      "Redis",
      "Docker",
      "Stripe",
      "GCP",
    ],
  },
];
