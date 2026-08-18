import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  Layout,
  Server,
  ShoppingCart,
  Smartphone,
  Store,
} from "lucide-react";

/* ---------------------------------------------------------------------------
 * FEATURED PROJECT — the most substantial build on the CV.
 * ------------------------------------------------------------------------ */

export type FeatureGroup = {
  title: string;
  icon: LucideIcon;
  features: readonly string[];
};

export type ArchitectureLayer = {
  label: string;
  caption: string;
  nodes: readonly string[];
};

export const featuredProject = {
  name: "Shop Hub",
  kind: "Full-Stack E-Commerce Platform (MERN)",
  year: "MERN Stack",
  summary:
    "A full-stack e-commerce platform built with React.js, Node.js, Express and MongoDB — product listing, cart functionality and API integration driving dynamic content from the database through to the storefront.",

  problem:
    "An online store is the clearest test of a full-stack developer: the catalogue has to come from a database rather than hard-coded markup, the cart has to hold state as a shopper moves around the site, and the frontend and backend have to agree on a data shape. Getting all three working together is the whole exercise.",

  solution:
    "I built the stack end to end. Express and Node.js expose a REST API over a MongoDB collection of products; React consumes it to render the listing dynamically, so adding a product to the database is all it takes to see it in the store. Cart functionality is handled on the client, and the interface is responsive across phone, tablet and desktop.",

  liveHref: "https://shop-hub-gilt-ten.vercel.app/",
  /** PLACEHOLDER — add the repository URL once it is public. */
  repoHref: "#",

  tech: [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JavaScript",
    "REST API",
    "Vercel",
  ],

  architecture: [
    {
      label: "Frontend",
      caption: "React storefront rendering catalogue data from the API",
      nodes: ["React.js", "Component structure", "Cart state", "Responsive UI"],
    },
    {
      label: "API layer",
      caption: "Express routes serving product and cart data over REST",
      nodes: ["Node.js", "Express.js", "REST endpoints", "JSON responses"],
    },
    {
      label: "Data",
      caption: "MongoDB collections behind the dynamic content",
      nodes: ["MongoDB", "Product documents", "Queries"],
    },
    {
      label: "Deployment",
      caption: "Live and reachable, not just running locally",
      nodes: ["Vercel", "Git", "GitHub"],
    },
  ] as const satisfies readonly ArchitectureLayer[],

  featureGroups: [
    {
      title: "Storefront",
      icon: Store,
      features: [
        "Product listing from the database",
        "Dynamic content via API integration",
        "Responsive layout across devices",
      ],
    },
    {
      title: "Cart",
      icon: ShoppingCart,
      features: [
        "Add and remove items",
        "Cart state as the shopper browses",
      ],
    },
    {
      title: "Backend",
      icon: Server,
      features: [
        "Express REST API",
        "MongoDB data layer",
        "Node.js server",
      ],
    },
  ] as const satisfies readonly FeatureGroup[],
} as const;

/* ---------------------------------------------------------------------------
 * OTHER PROJECTS — every entry is built and deployed, with a live link.
 * ------------------------------------------------------------------------ */

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: readonly string[];
  /** Optional screenshot in /public. Without one, a generated preview renders. */
  image?: string;
  /** Keep as "#" until a real URL exists — never a fabricated link. */
  liveHref: string;
  repoHref: string;
  icon: LucideIcon;
  isPlaceholder?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "georgia-travel",
    title: "Georgia Travel Website",
    category: "Next.js",
    description:
      "A responsive travel website for exploring Georgia's destinations, attractions and travel experiences. Built with reusable components, responsive layouts, smooth navigation and modern styling.",
    tech: ["Next.js", "React.js", "JavaScript", "Responsive Design"],
    liveHref: "https://travel-georgia-next-js.vercel.app/",
    repoHref: "#",
    icon: Layout,
  },
  {
    slug: "nature-hike-pakistan",
    title: "Nature Hike Pakistan",
    category: "Full Stack",
    description:
      "A full-stack travelling website built with React.js and Node.js, featuring dynamic pages, optimised images and API integration. Deployed on Vercel with fast load times and an SEO-friendly structure.",
    tech: ["React.js", "Node.js", "API Integration", "Vercel"],
    liveHref: "https://nature-hike-pakistan.vercel.app/",
    repoHref: "#",
    icon: Cloud,
  },
  {
    slug: "agency-ai",
    title: "Agency AI",
    category: "Frontend",
    description:
      "A responsive web application featuring a modern landing page with engaging UI and a smooth user experience. Deployed on Netlify with optimised accessibility and performance across devices.",
    tech: ["React.js", "JavaScript", "Responsive Design", "Netlify"],
    liveHref: "https://agencyai59.netlify.app/",
    repoHref: "#",
    icon: Smartphone,
  },
];
