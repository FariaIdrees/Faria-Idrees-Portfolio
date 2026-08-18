import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  /** Constrains the inner content; sections with edge decoration opt out. */
  containerClassName?: string;
  "aria-labelledby"?: string;
};

/**
 * Every landing section shares this shell so vertical rhythm, max width and
 * gutters stay identical from top to bottom.
 */
export function Section({
  id,
  children,
  className,
  containerClassName,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-20 sm:py-28 lg:py-36", className)}
      {...rest}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
