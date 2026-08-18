"use client";

import { experience } from "@/content/experience";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineEntry, TimelineTrack } from "@/components/ui/Timeline";

export function Experience() {
  return (
    <Section id="experience" aria-labelledby="experience-heading">
      <SectionHeading
        id="experience-heading"
        eyebrow="Experience"
        title="Where the work happens."
        description="Production engineering on a real product — the responsibilities below are the day-to-day, not a wish list."
        accentWords={["happens."]}
      />

      <div className="mt-14">
        <TimelineTrack>
          {experience.map((item) => (
            <TimelineEntry key={`${item.company}-${item.role}`} item={item} />
          ))}
        </TimelineTrack>
      </div>
    </Section>
  );
}
