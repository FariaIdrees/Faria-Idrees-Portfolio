"use client";

import { education } from "@/content/education";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineEntry, TimelineTrack } from "@/components/ui/Timeline";

export function Education() {
  return (
    <Section id="education" aria-labelledby="education-heading">
      <SectionHeading
        id="education-heading"
        eyebrow="Education & Training"
        title="Where the skills came from."
        description="A Computer Science degree alongside a professional MERN stack certification — theory and practice at the same time."
        accentWords={["from."]}
      />

      <div className="mt-14">
        <TimelineTrack>
          {education.map((item) => (
            <TimelineEntry key={`${item.organisation}-${item.title}`} item={item} />
          ))}
        </TimelineTrack>
      </div>
    </Section>
  );
}
