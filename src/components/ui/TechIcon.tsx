import { cn } from "@/lib/utils";
import {
  TECH_ICON_COLORS,
  TECH_ICON_PATHS,
  type TechIconKey,
} from "./tech-icon-data";

type TechIconProps = {
  name: TechIconKey;
  className?: string;
  /**
   * Exposes the brand colour as `--tech` on the element, so a parent can tint
   * the glyph on hover without the grid looking like a sticker sheet at rest.
   */
  withBrandColor?: boolean;
  title?: string;
};

/**
 * A single-path brand glyph. Decorative by default: the technology name is
 * always rendered as text next to it, so the SVG stays out of the a11y tree
 * unless an explicit `title` is supplied.
 */
export function TechIcon({
  name,
  className,
  withBrandColor = true,
  title,
}: TechIconProps) {
  const path = TECH_ICON_PATHS[name];
  const brand = TECH_ICON_COLORS[name];

  return (
    <svg
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className ?? "h-full w-full")}
      style={
        withBrandColor && brand
          ? ({ "--tech": brand } as React.CSSProperties)
          : undefined
      }
    >
      {title ? <title>{title}</title> : null}
      <path d={path} fill="currentColor" />
    </svg>
  );
}
