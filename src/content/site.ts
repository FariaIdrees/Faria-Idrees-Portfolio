/**
 * ---------------------------------------------------------------------------
 * SINGLE PLACE TO EDIT PERSONAL DETAILS
 * ---------------------------------------------------------------------------
 * Everything below comes from the CV. Two values still need replacing:
 *
 *   1. `siteUrl`     — set to the deployed domain (used for canonical + OG tags)
 *   2. `resumeHref`  — drop the PDF into /public and point this at it
 * ---------------------------------------------------------------------------
 */

export const site = {
  name: "Faria Idrees",
  initials: "FI",
  role: "Web Developer & MERN Stack Developer",
  shortRole: "Web Developer / MERN Stack",
  tagline:
    "I build responsive, production-ready websites and full-stack web applications with React, Next.js and the MERN stack.",
  description:
    "Faria Idrees — Web Developer specialising in React.js, Next.js and the MERN stack. Building responsive interfaces, REST API integrations and deployed full-stack web applications.",

  location: "Lahore, Pakistan",

  /** PLACEHOLDER — replace with the deployed domain. */
  siteUrl: "https://example.com",
  email: "fariaidrees47@gmail.com",
  phone: "+92 316 1436021",
  /** PLACEHOLDER — add /public/resume.pdf and change this to "/resume.pdf". */
  resumeHref: "#",

  socials: {
    github: { label: "GitHub", href: "https://github.com/FariaIdrees" },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/fariaidrees",
    },
  },
} as const;

export type NavItem = {
  id: string;
  label: string;
};

export const navItems: readonly NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

export const navIds = navItems.map((item) => item.id);

/** Compact strip under the hero. Deliberately non-numeric — nothing invented. */
export const heroHighlights: readonly { label: string; value: string }[] = [
  { value: "MERN Stack", label: "MongoDB, Express, React, Node" },
  { value: "4 Projects", label: "Built and deployed live" },
  { value: "Open to work", label: "Seeking a junior developer role" },
];

/** Badges that sit around the hero code panel. */
export const heroTech: readonly string[] = [
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
];
