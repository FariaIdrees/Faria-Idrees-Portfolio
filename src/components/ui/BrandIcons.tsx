import { TechIcon } from "./TechIcon";

type BrandIconProps = {
  className?: string;
  /**
   * Accepted so these drop into the same lists as Lucide icons, but ignored —
   * brand marks are filled paths, not strokes.
   */
  strokeWidth?: number;
  /** Also ignored — TechIcon already hides decorative glyphs from a11y. */
  "aria-hidden"?: React.AriaAttributes["aria-hidden"];
};

/**
 * GitHub and LinkedIn marks.
 *
 * Lucide dropped its brand glyphs in v1, so these reuse the same generated
 * path data as the skills grid — one source, no extra icon dependency.
 */
export function GithubIcon({ className = "h-4.5 w-4.5" }: BrandIconProps) {
  return <TechIcon name="github" withBrandColor={false} className={className} />;
}

export function LinkedinIcon({ className = "h-4.5 w-4.5" }: BrandIconProps) {
  return <TechIcon name="linkedin" withBrandColor={false} className={className} />;
}
