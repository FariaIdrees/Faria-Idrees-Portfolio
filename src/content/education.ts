import type { LucideIcon } from "lucide-react";
import { Award, GraduationCap } from "lucide-react";

export type TimelineItem = {
  title: string;
  organisation: string;
  /** Blank when the CV gives no dates — nothing is invented. */
  period?: string;
  location?: string;
  icon: LucideIcon;
  summary: string;
  highlights: readonly string[];
  stack: readonly string[];
};

/**
 * Education and training. This is a student CV with no employment history, so
 * the timeline shows the degree and the professional course rather than jobs.
 */
export const education: readonly TimelineItem[] = [
  {
    title: "MERN Stack Web Development",
    organisation: "Nexskill, Arfa Kareem Tower",
    location: "Lahore",
    icon: Award,
    summary:
      "A professional certification course covering full-stack JavaScript development, completed alongside my degree.",
    highlights: [
      "Built dynamic full-stack web applications using MongoDB, Express.js, React.js and Node.js.",
      "Designed and consumed RESTful APIs, wiring frontend interfaces to backend data.",
      "Worked with MongoDB for schema design, queries and dynamic content.",
      "Practised Git-based workflows and deployment to Vercel and Netlify.",
    ],
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Git"],
  },
  {
    title: "Bachelor of Science in Computer Science",
    organisation: "KIPS College Kasur (affiliated with GCUF)",
    period: "2022 — 2026",
    icon: GraduationCap,
    summary:
      "Undergraduate degree in Computer Science, building the fundamentals behind the applications I write.",
    highlights: [
      "Core computer science coursework alongside self-directed web development projects.",
      "Applied programming fundamentals to real, deployed applications rather than exercises alone.",
      "Developed a focus on frontend and backend web development throughout the programme.",
    ],
    stack: ["Computer Science", "Programming Fundamentals", "Web Development"],
  },
];
