"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "whitespace-nowrap transition-colors duration-300 select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-[0_8px_30px_-10px_var(--accent-ring)] hover:bg-accent-hover",
  secondary:
    "border border-line-strong bg-surface/60 text-fg backdrop-blur-sm hover:border-accent hover:text-accent",
  ghost: "text-fg-muted hover:text-fg",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm sm:px-6",
  lg: "h-12 px-6 text-[0.95rem] sm:h-13 sm:px-7 sm:text-base",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Adds the cursor-follow pull. Reserved for primary calls to action. */
  magnetic?: boolean;
};

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  "aria-label"?: string;
  download?: boolean;
};

type NativeButtonProps = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export type ButtonProps = AnchorProps | NativeButtonProps;

const press = { scale: 0.97 };
const hover = { scale: 1.02 };

/**
 * One button for the whole site. The press/hover scale lives here so every
 * call to action responds identically, and `magnetic` layers the cursor pull
 * on top for the primary actions only.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    magnetic = false,
  } = props;

  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  const inner =
    "href" in props && props.href !== undefined ? (
      <motion.a
        href={props.href}
        onClick={props.onClick}
        aria-label={props["aria-label"]}
        download={props.download}
        target={props.external ? "_blank" : undefined}
        rel={props.external ? "noreferrer noopener" : undefined}
        whileHover={hover}
        whileTap={press}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className={classes}
      >
        {children}
      </motion.a>
    ) : (
      <motion.button
        type={(props as NativeButtonProps).type ?? "button"}
        onClick={(props as NativeButtonProps).onClick}
        aria-label={props["aria-label"]}
        whileHover={hover}
        whileTap={press}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className={classes}
      >
        {children}
      </motion.button>
    );

  return magnetic ? <Magnetic>{inner}</Magnetic> : inner;
}
