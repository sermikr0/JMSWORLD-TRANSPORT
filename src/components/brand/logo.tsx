import { cn } from "@/lib/cn";

/** `light` = placed on a light background, `dark` = placed on a dark background. */
export type LogoTone = "light" | "dark";

/**
 * Brand mark: a "J" whose top stroke runs out as a dashed lane marking,
 * a nod to movement and the open road.
 */
export function Mark({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: LogoTone;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect
        width="40"
        height="40"
        rx="8"
        fill={tone === "dark" ? "#163061" : "#0a1730"}
      />
      <path
        d="M8 11h4M16 11h10"
        fill="none"
        stroke="#5f8ff7"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="M26 11v11a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  tone = "light",
  className,
  compact = false,
}: {
  tone?: LogoTone;
  className?: string;
  compact?: boolean;
}) {
  const primary = tone === "dark" ? "text-white" : "text-navy-900";
  const accent = tone === "dark" ? "text-accent-400" : "text-accent-600";
  const sub = tone === "dark" ? "text-white/60" : "text-ink-500";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Mark tone={tone} className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[26px] font-extrabold uppercase leading-none tracking-[0.02em]",
            primary,
          )}
        >
          JMS<span className={accent}>WORLD</span>
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 text-[9px] font-semibold uppercase tracking-[0.3em]",
              sub,
            )}
          >
            Transport LLC
          </span>
        )}
      </span>
    </span>
  );
}
