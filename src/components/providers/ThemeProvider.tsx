"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "sa-theme";

/**
 * Runs before paint to apply the stored theme, so there is no flash of the
 * wrong palette. Kept as a string because it is injected into <head>.
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var s=localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: light)").matches;var t=s==="light"||s==="dark"?s:(m?"light":"dark");document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.classList.add("dark");}})();`;

/* ---------------------------------------------------------------------------
 * The `dark` class on <html> is the single source of truth — it is set by the
 * inline script above before React exists. Rather than mirroring it into state
 * (which means an extra render and a hydration mismatch), the provider
 * subscribes to the attribute directly.
 * ------------------------------------------------------------------------ */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Dark is the primary experience, so it is also what the server renders. */
function getServerSnapshot(): Theme {
  return "dark";
}

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next: Theme = root.classList.contains("dark") ? "light" : "dark";

    // The swap itself is instant. A cross-fade here would mean attaching a
    // transition to every node on a very long page, which costs far more than
    // it buys — the palette change reads better as a clean cut.
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage can be unavailable — the toggle still works for the session */
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
