import type { CSSProperties } from "react";

/**
 * Inline custom properties for the scroll-driven `reveal` utilities.
 * `index` staggers siblings; `step` is the per-index offset (default 5%).
 */
export function stagger(index: number, step?: string): CSSProperties {
  return {
    "--reveal-i": index,
    ...(step ? { "--reveal-step": step } : {}),
  } as CSSProperties;
}
