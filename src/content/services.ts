import type { LucideIcon } from "lucide-react";
import {
  Database,
  Gauge,
  Layers,
  Plug,
  Rocket,
  ShoppingCart,
  Smartphone,
  Webhook,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: readonly Service[] = [
  {
    title: "Full-Stack Web Apps",
    description:
      "Complete MERN applications — React interface, Express and Node.js API, MongoDB behind it, built and deployed as one piece.",
    icon: Layers,
  },
  {
    title: "React & Next.js Sites",
    description:
      "Modern, component-driven websites with reusable building blocks, smooth navigation and clean, maintainable structure.",
    icon: Rocket,
  },
  {
    title: "Responsive Interfaces",
    description:
      "Layouts that work as well on a phone as on a desktop, using Tailwind CSS or Bootstrap with careful attention to spacing and readability.",
    icon: Smartphone,
  },
  {
    title: "REST API Development",
    description:
      "Express routes designed around clear resources, returning predictable JSON that a frontend can rely on.",
    icon: Webhook,
  },
  {
    title: "API Integration",
    description:
      "Connecting interfaces to real data — fetching, loading and error states handled so pages stay dynamic instead of hard-coded.",
    icon: Plug,
  },
  {
    title: "E-Commerce Storefronts",
    description:
      "Product listings driven from a database, cart functionality and a checkout-ready structure, as built in Shop Hub.",
    icon: ShoppingCart,
  },
  {
    title: "Database Work",
    description:
      "MongoDB collections modelled around what the application actually needs, with queries that keep pages fast.",
    icon: Database,
  },
  {
    title: "Deployment & Performance",
    description:
      "Getting projects live on Vercel or Netlify with optimised images, fast load times and an SEO-friendly structure.",
    icon: Gauge,
  },
];
