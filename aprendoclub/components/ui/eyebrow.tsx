import type { ReactNode } from "react";

/**
 * Eyebrow / badge label. Always accent-colored, always uppercase, always
 * this one size/weight — no variants (per 06-UI-SPEC).
 *
 * Server component (presentational, no interactivity).
 */
export function Eyebrow({
  children,
  as = "span",
  className,
}: {
  children: ReactNode;
  as?: "span" | "p";
  className?: string;
}) {
  const Tag = as;
  const classes = [
    "text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
