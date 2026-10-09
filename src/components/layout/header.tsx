"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { primaryNav, site, telHref } from "@/lib/site";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );

  // Close the mobile panel when the route changes (state adjusted during render).
  if (pathname !== openedAt) {
    setOpenedAt(pathname);
    setOpen(false);
  }

  // While the panel is open: lock scroll, make the rest of the page inert,
  // move focus into the panel, and close on Escape or when resized to desktop.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const outside = [
      document.getElementById("main"),
      document.querySelector("footer"),
    ];
    outside.forEach((el) => el?.setAttribute("inert", ""));
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const toggle = toggleRef.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      outside.forEach((el) => el?.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      toggle?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "on-dark sticky top-0 z-50 bg-navy-950 text-white transition-shadow duration-300",
        scrolled
          ? "shadow-[0_1px_0_0_rgb(255_255_255/0.08),0_16px_40px_-20px_rgb(0_0_0/0.7)]"
          : "shadow-[0_1px_0_0_rgb(255_255_255/0.08)]",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6">
        <Link
          href="/"
          className="rounded-sm"
          aria-label={`${site.legalName} — home`}
        >
          <Logo tone="dark" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent-400 after:transition-transform after:duration-300 after:ease-out hover:text-white hover:after:scale-x-100",
                      active ? "text-white after:scale-x-100" : "text-white/70",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={telHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone.display}
          </a>
          <ButtonLink href="/quote">Request a Quote</ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-white transition-colors hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </Container>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-navy-950 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-white/10 px-5 sm:px-8">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "display flex items-center justify-between py-5 text-4xl transition-colors",
                      active ? "text-white" : "text-white/75 hover:text-white",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span
                        className="h-2 w-2 rounded-full bg-accent-400"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="space-y-6 px-5 pb-12 pt-8 sm:px-8">
          <ButtonLink href="/quote" size="lg" className="w-full">
            Request a Quote
          </ButtonLink>
          <a
            href={telHref}
            className="flex items-center gap-3 text-lg font-medium text-white"
          >
            <Phone className="h-5 w-5 text-accent-400" aria-hidden="true" />
            {site.phone.display}
          </a>
          <p className="text-sm leading-relaxed text-white/55">
            {site.address.line}
            <br />
            USDOT {site.usdot} · MC {site.mc}
          </p>
        </div>
      </div>
    </header>
  );
}
