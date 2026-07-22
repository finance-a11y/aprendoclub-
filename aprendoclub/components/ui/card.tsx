import type { ReactNode } from "react";

export type CardPadding = "default" | "compact";
export type CardHover = "lift" | "liftAccent" | "none";

const paddingClasses: Record<CardPadding, string> = {
  default: "p-8",
  compact: "p-6",
};

const hoverClasses: Record<CardHover, string> = {
  lift: "hover:-translate-y-1.5 hover:scale-[1.01] hover:border-white/20 hover:shadow-[var(--shadow-lg)]",
  liftAccent:
    "hover:-translate-y-1.5 hover:scale-[1.01] hover:border-[var(--accent)]/30 hover:shadow-[var(--shadow-lg)]",
  none: "",
};

/**
 * Base surface primitive shared by ProgramCard, testimonial cards and team
 * cards. Renders a plain <div> — never a link; the click affordance lives
 * inside as a <Button> or wrapping <Link> at the call site.
 *
 * Server component (presentational, no interactivity).
 */
export function Card({
  padding = "default",
  hover = "lift",
  children,
  className,
}: {
  padding?: CardPadding;
  hover?: CardHover;
  children: ReactNode;
  className?: string;
}) {
  const classes = [
    "bg-[var(--surface-card)] border border-[var(--border-card)] rounded-xl transition-all duration-300",
    paddingClasses[padding],
    hoverClasses[hover],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
