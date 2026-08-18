/** Tiny class-name joiner — avoids pulling in clsx/tailwind-merge for this scale. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * True when a link is an unfilled placeholder rather than a real destination.
 * Takes a widened `string` so it also works on `as const` content literals.
 */
export function isPlaceholderLink(href: string): boolean {
  return href === "#" || href.trim() === "";
}
