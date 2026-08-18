"use client";

import { useCallback, useRef } from "react";
import { usePointerFine } from "@/hooks/usePointerFine";
import { cn } from "@/lib/utils";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Radius of the cursor spotlight, in px. */
  radius?: number;
};

/**
 * Card shell with a cursor-tracked spotlight on its border and surface.
 *
 * Position is written straight to CSS custom properties on the element rather
 * than through React state, so moving the pointer never triggers a re-render.
 */
export function GlowCard({
  children,
  className,
  radius = 320,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      element.style.setProperty("--my", `${event.clientY - rect.top}px`);
      element.style.setProperty("--glow-opacity", "1");
    },
    [],
  );

  const handleLeave = useCallback(() => {
    ref.current?.style.setProperty("--glow-opacity", "0");
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={pointerFine ? handleMove : undefined}
      onPointerLeave={pointerFine ? handleLeave : undefined}
      style={{ "--glow-radius": `${radius}px` } as React.CSSProperties}
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl border border-line bg-surface/70",
        "transition-[transform,border-color,box-shadow] duration-300 ease-out-expo",
        "hover:-translate-y-1 hover:border-line-strong hover:shadow-lift",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[var(--glow-opacity,0)] transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(var(--glow-radius) circle at var(--mx, 50%) var(--my, 50%), var(--accent-soft), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
