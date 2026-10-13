import Link from "next/link";
import { ExternalLink, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Year } from "@/components/layout/year";
import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { footerNav, site, telHref } from "@/lib/site";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="eyebrow text-white">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="on-dark bg-navy-950 text-white/70">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          <div>
            <Link
              href="/"
              className="inline-block rounded-sm"
              aria-label={`${site.legalName} — home`}
            >
              <Logo tone="dark" height={120} />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed">
              A transportation company based in Norwood, Ohio. Request a quote
              or call to talk through your freight.
            </p>
            <address className="mt-6 text-sm not-italic leading-relaxed">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region}{" "}
              {site.address.postalCode}
            </address>
            <a
              href={telHref}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-accent-300"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone.display}
            </a>
          </div>

          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Get started" links={footerNav.getStarted} />

          <div>
            <h2 className="eyebrow text-white">Business information</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt>Legal name</dt>
                <dd className="text-right text-white">{site.legalName}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <dt>USDOT</dt>
                <dd>
                  <CopyValue
                    value={site.usdot}
                    label="USDOT number"
                    tone="dark"
                    valueClassName="font-mono text-white"
                  />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <dt>MC</dt>
                <dd>
                  <CopyValue
                    value={site.mc}
                    label="MC number"
                    tone="dark"
                    valueClassName="font-mono text-white"
                  />
                </dd>
              </div>
            </dl>
            <a
              href={site.fmcsa.snapshot}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300 transition-colors hover:text-white"
            >
              Verify on FMCSA SAFER
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year /> {site.legalName}. All rights reserved.
          </p>
          <p>
            USDOT {site.usdot} · MC {site.mc} · Norwood, Ohio
          </p>
        </Container>
      </div>
    </footer>
  );
}
