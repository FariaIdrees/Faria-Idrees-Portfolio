"use client";

import { motion } from "motion/react";
import { services } from "@/content/services";
import { VIEWPORT_EARLY, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function Services() {
  return (
    <Section id="services" aria-labelledby="services-heading" className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-72 bg-[var(--glow-b)] opacity-40 blur-[140px]"
      />

      <SectionHeading
        id="services-heading"
        eyebrow="Services"
        title="What I build."
        description="The kinds of work I take on — from a single responsive page to a full MERN application, deployed and live."
        accentWords={["build."]}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_EARLY}
        variants={staggerContainer(0.07, 0.08)}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </motion.div>
    </Section>
  );
}
