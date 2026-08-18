"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * Sun/moon swap driven purely by the `dark` class, so the correct icon is
 * painted on the very first frame — no hydration flicker, no JS-held state.
 * The two glyphs cross-fade through a short rotation, reading as one object
 * turning over rather than two icons blinking.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle colour theme"
      className={cn(
        "group relative grid h-10 w-10 place-items-center rounded-full border border-line",
        "bg-surface/60 text-fg-muted backdrop-blur-sm transition-colors duration-300",
        "hover:border-line-strong hover:text-fg active:scale-95",
        className,
      )}
    >
      <span className="relative block h-4.5 w-4.5" aria-hidden="true">
        <Sun
          className="absolute inset-0 h-4.5 w-4.5 rotate-0 scale-100 opacity-100 transition-all duration-400 ease-out-expo dark:-rotate-90 dark:scale-50 dark:opacity-0"
          strokeWidth={1.75}
        />
        <Moon
          className="absolute inset-0 h-4.5 w-4.5 rotate-90 scale-50 opacity-0 transition-all duration-400 ease-out-expo dark:rotate-0 dark:scale-100 dark:opacity-100"
          strokeWidth={1.75}
        />
      </span>
    </button>
  );
}
