import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "default" | "lg";

const EXTERNAL_HREF_PATTERN = /^(https?:|tel:|mailto:)/;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300";

const sizeClasses: Record<ButtonSize, string> = {
  default: "",
  lg: "px-8 py-4 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-black hover:brightness-110 hover:shadow-[0_0_40px_rgba(184,246,13,0.3)]",
  secondary:
    "bg-[var(--surface-card)] text-white border border-[var(--border-card)] hover:border-white/20",
  ghost:
    "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5",
};

/**
 * Shared CTA/button primitive with primary/secondary/ghost variants.
 * Routes to Next's <Link> for internal hrefs, or a plain <a> for
 * external/tel/mailto hrefs (forwarding target/rel).
 *
 * Server component (presentational, no interactivity).
 */
export function Button({
  href,
  variant = "primary",
  size = "default",
  children,
  icon = false,
  className,
  target,
  rel,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  icon?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}) {
  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    icon ? "group/cta" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {icon && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
      )}
    </>
  );

  if (EXTERNAL_HREF_PATTERN.test(href)) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} target={target} rel={rel}>
      {content}
    </Link>
  );
}
