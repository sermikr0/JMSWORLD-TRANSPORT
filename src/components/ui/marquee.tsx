import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Continuous horizontal ticker. Pure CSS: the content is rendered twice and
 * the track slides by half its width, so the loop is seamless. Pauses on
 * hover; under prefers-reduced-motion it simply sits still.
 */
export function Marquee({
  children,
  className,
  durationSeconds = 45,
}: {
  children: ReactNode;
  className?: string;
  durationSeconds?: number;
}) {
  // min-w-0: as a flex item, the clipped track must not widen the page.
  return (
    <div className={cn("group/marquee min-w-0 overflow-clip", className)}>
      <div
        className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
