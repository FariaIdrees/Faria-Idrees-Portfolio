/** Tiny class-name joiner — avoids pulling in clsx/tailwind-merge for this scale. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
