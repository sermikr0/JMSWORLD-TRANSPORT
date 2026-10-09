import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "inverse" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent-600 text-white hover:bg-accent-500 active:bg-accent-700",
  secondary:
    "border border-ink-300 bg-white text-navy-900 hover:border-navy-900 hover:bg-ink-50",
  inverse:
    "border border-white/35 text-white hover:border-white hover:bg-white/10",
  ghost: "text-accent-600 hover:text-accent-700",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[13px]",
  lg: "h-13 px-7 text-sm",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    base,
    variants[variant],
    variant === "ghost" ? "h-auto px-0 text-[13px]" : sizes[size],
    className,
  );
}

function Arrow() {
  return (
    <ArrowRight
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  );
}

type SharedProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: SharedProps & Omit<ComponentProps<typeof Link>, "className">) {
  return (
    <Link className={classes(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  type = "button",
  ...props
}: SharedProps & Omit<ComponentProps<"button">, "className">) {
  return (
    <button type={type} className={classes(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
