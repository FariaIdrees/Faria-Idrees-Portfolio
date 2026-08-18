import { cn } from "@/lib/utils";

type TechBadgeProps = {
  label: string;
  className?: string;
  size?: "sm" | "md";
};

/** Compact pill used for technology lists on cards and the featured project. */
export function TechBadge({ label, className, size = "md" }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface-2/70 font-mono",
        "tracking-tight text-fg-muted transition-colors duration-300",
        "group-hover:border-line-strong group-hover:text-fg",
        size === "sm" ? "px-2.5 py-1 text-[0.68rem]" : "px-3 py-1.5 text-xs",
        className,
      )}
    >
      {label}
    </span>
  );
}
