"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * A value (USDOT / MC number) with a one-click copy button. Shows a brief
 * "Copied" confirmation and announces it to assistive technology.
 */
export function CopyValue({
  value,
  label,
  tone = "light",
  className,
  valueClassName,
}: {
  value: string;
  /** Human name used in the button label, e.g. "USDOT number". */
  label: string;
  tone?: "light" | "dark";
  className?: string;
  valueClassName?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Older browsers / non-secure contexts: fall back to a hidden textarea.
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  const dark = tone === "dark";

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className={valueClassName}>{value}</span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
        title={`Copy ${label}`}
        className={cn(
          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border font-sans transition-colors duration-200",
          dark
            ? "border-white/25 text-white/60 hover:border-white/70 hover:text-white"
            : "border-ink-300 text-ink-500 hover:border-navy-900 hover:text-navy-900",
          copied &&
            (dark
              ? "border-accent-400 text-accent-300 hover:text-accent-300"
              : "border-accent-600 text-accent-600 hover:text-accent-600"),
        )}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
      <span
        role="status"
        aria-live="polite"
        className={cn(
          "font-sans text-[11px] font-semibold uppercase tracking-[0.14em] transition-opacity duration-200",
          dark ? "text-accent-300" : "text-accent-600",
          copied ? "opacity-100" : "sr-only",
        )}
      >
        {copied ? "Copied" : ""}
      </span>
    </span>
  );
}
