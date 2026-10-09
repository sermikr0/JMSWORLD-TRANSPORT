import { cn } from "@/lib/cn";

/**
 * Splits a headline into words that slide up one after another on load.
 * Lines are separated with "\n". Pure CSS animation; respects reduced motion
 * through the global rule that collapses animation durations.
 */
export function HeadlineWords({
  text,
  className,
  startDelayMs = 80,
  stepMs = 70,
}: {
  text: string;
  className?: string;
  startDelayMs?: number;
  stepMs?: number;
}) {
  let index = 0;
  return (
    <span className={cn("block", className)}>
      {text.split("\n").map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(" ").map((word, wordIndex) => {
            const delay = startDelayMs + index++ * stepMs;
            return (
              <span key={`${lineIndex}-${wordIndex}`} className="word-mask">
                <span
                  className="inline-block animate-mask-up"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {word}
                </span>
                {wordIndex < line.split(" ").length - 1 ? " " : ""}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
