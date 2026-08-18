"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ShoppingCart } from "lucide-react";
import { usePointerFine } from "@/hooks/usePointerFine";
import { cn } from "@/lib/utils";

type ShopView = {
  /** Route label shown in the address pill. */
  name: string;
  path: string;
};

const VIEWS: readonly ShopView[] = [
  { name: "Storefront", path: "/" },
  { name: "Product", path: "/product" },
  { name: "Cart", path: "/cart" },
];

const CATEGORIES = ["All", "Audio", "Bags", "Wearables", "Home"];

const PRODUCTS = [
  "Wireless Headphones",
  "Canvas Backpack",
  "Smart Watch",
  "Desk Lamp",
  "Bluetooth Speaker",
  "Leather Wallet",
];

const CART_ITEMS = ["Wireless Headphones", "Canvas Backpack", "Smart Watch"];

/** Neutral skeleton bar — stands in for prices and copy without inventing data. */
function Bar({ className }: { className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-line-strong", className)} />;
}

function ProductTile({ label, accent }: { label: string; accent: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-line bg-bg/60 p-2">
      <div
        className={cn(
          "h-10 rounded-md border border-line",
          accent ? "bg-accent/15" : "bg-surface-2",
        )}
      />
      <span className="truncate font-medium text-fg">{label}</span>
      <div className="flex items-center justify-between gap-2">
        <Bar className="w-8 bg-accent/60" />
        <Bar className="w-5" />
      </div>
    </div>
  );
}

/**
 * Interactive product mockup standing in for a screenshot.
 *
 * It is a real, generated storefront rather than a placeholder rectangle: the
 * three views cycle on a timer (pausing on hover), and on desktop the whole
 * frame tilts toward the cursor in 3D.
 */
export function BrowserMockup({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerFine = usePointerFine();
  const reduced = useReducedMotion();
  const tiltEnabled = pointerFine && !reduced;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [7, -7]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(my, [0, 1], [-6, 6]), {
    stiffness: 120,
    damping: 18,
  });

  useEffect(() => {
    if (paused || reduced) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % VIEWS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [paused, reduced]);

  const view = VIEWS[index];

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width);
    my.set((event.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div
      onPointerMove={handleMove}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        resetTilt();
      }}
      style={{ perspective: 1400 }}
      className={cn("relative", className)}
    >
      <p className="sr-only">
        Interface preview of the Shop Hub {view.name.toLowerCase()} view, showing
        the storefront layout, product listing and cart.
      </p>

      <motion.div
        style={tiltEnabled ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="relative overflow-hidden rounded-xl border border-line bg-surface shadow-lift ring-gradient sm:rounded-2xl"
      >
        {/* ---- browser chrome ---- */}
        <div className="flex items-center gap-2 border-b border-line bg-surface-2/70 px-3 py-2.5 sm:px-4">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
          </span>
          <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-bg/70 px-2.5 py-1">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
              aria-hidden="true"
            />
            <span className="truncate font-mono text-[0.6rem] text-fg-subtle sm:text-[0.68rem]">
              shop-hub{view.path}
            </span>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            {VIEWS.map((entry, entryIndex) => (
              <button
                key={entry.name}
                type="button"
                onClick={() => setIndex(entryIndex)}
                aria-label={`Preview the ${entry.name} view`}
                aria-pressed={entryIndex === index}
                className="-m-1 grid h-6 w-6 place-items-center rounded-full"
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                    entryIndex === index ? "bg-accent" : "bg-line-strong",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ---- app body ----
            The mockup is illustrative, so its internals stay out of the a11y
            tree; the caption above describes what it shows. */}
        <div
          aria-hidden="true"
          className="relative flex h-[19rem] flex-col text-[0.62rem] sm:h-[23rem] sm:text-[0.68rem] lg:h-[25rem]"
        >
          {/* store header */}
          <div className="flex items-center gap-2 border-b border-line px-3 py-2.5 sm:px-4">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-[0.6rem] font-bold text-accent-fg">
              S
            </span>
            <span className="font-semibold tracking-tight text-fg">Shop Hub</span>
            <span className="ml-3 hidden flex-1 rounded-md border border-line bg-bg/60 px-2 py-1 text-fg-subtle sm:block">
              Search products…
            </span>
            <span className="ml-auto flex items-center gap-1.5 rounded-md border border-line bg-bg/60 px-2 py-1 text-fg-muted sm:ml-0">
              <ShoppingCart className="h-3 w-3" strokeWidth={2} />
              <span className="rounded-full bg-accent px-1.5 text-[0.55rem] font-semibold text-accent-fg">
                3
              </span>
            </span>
          </div>

          {/* category row */}
          <div className="flex gap-1.5 overflow-hidden border-b border-line px-3 py-2 sm:px-4">
            {CATEGORIES.map((category, categoryIndex) => (
              <span
                key={category}
                className={cn(
                  "shrink-0 rounded-full border px-2.5 py-1",
                  categoryIndex === 0
                    ? "border-accent/40 bg-accent-soft text-accent"
                    : "border-line text-fg-subtle",
                )}
              >
                {category}
              </span>
            ))}
          </div>

          {/* view */}
          <div className="min-h-0 flex-1 p-3 sm:p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={view.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                {view.name === "Storefront" ? (
                  <div className="grid h-full grid-cols-3 gap-2">
                    {PRODUCTS.map((product, productIndex) => (
                      <ProductTile
                        key={product}
                        label={product}
                        accent={productIndex % 4 === 0}
                      />
                    ))}
                  </div>
                ) : null}

                {view.name === "Product" ? (
                  <div className="grid h-full grid-cols-5 gap-3">
                    <div className="col-span-2 rounded-lg border border-line bg-accent/10" />
                    <div className="col-span-3 flex flex-col gap-2">
                      <span className="text-sm font-semibold tracking-tight text-fg">
                        Wireless Headphones
                      </span>
                      <Bar className="w-16 bg-accent/60" />
                      <div className="mt-1 space-y-1.5">
                        <Bar className="w-full" />
                        <Bar className="w-5/6" />
                        <Bar className="w-2/3" />
                      </div>
                      <div className="mt-auto flex gap-2">
                        <span className="rounded-md bg-accent px-3 py-1.5 font-medium text-accent-fg">
                          Add to cart
                        </span>
                        <span className="rounded-md border border-line px-3 py-1.5 text-fg-muted">
                          Details
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}

                {view.name === "Cart" ? (
                  <div className="flex h-full flex-col gap-2">
                    <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-line bg-bg/60">
                      {CART_ITEMS.map((item, itemIndex) => (
                        <div
                          key={item}
                          className={cn(
                            "flex items-center gap-2 px-2.5 py-2",
                            itemIndex > 0 && "border-t border-line",
                          )}
                        >
                          <span className="h-7 w-7 shrink-0 rounded-md bg-line-strong/50" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium text-fg">
                              {item}
                            </span>
                            <Bar className="mt-1 w-10" />
                          </span>
                          <span className="rounded border border-line px-1.5 text-fg-subtle">
                            1
                          </span>
                          <Bar className="w-6 bg-accent/60" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-line bg-bg/60 px-2.5 py-2">
                      <span className="text-fg-muted">Total</span>
                      <Bar className="w-12 bg-accent/70" />
                    </div>
                    <span className="rounded-md bg-accent px-3 py-1.5 text-center font-medium text-accent-fg">
                      Checkout
                    </span>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Ambient glow anchoring the frame to the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -bottom-10 -z-10 h-32 rounded-full bg-[var(--glow-a)] blur-[70px]"
      />
    </div>
  );
}
