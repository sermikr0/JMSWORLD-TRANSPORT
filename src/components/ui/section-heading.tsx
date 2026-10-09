import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  as: Heading = "h2",
  size = "md",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  size?: "md" | "lg";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className={cn("eyebrow", dark ? "text-accent-300" : "text-accent-600")}>
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "display mt-4 text-balance",
          size === "lg"
            ? "text-6xl sm:text-7xl lg:text-8xl"
            : "text-5xl sm:text-6xl lg:text-7xl",
          dark ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </Heading>
      {lead && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            dark ? "text-white/70" : "text-ink-600",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
