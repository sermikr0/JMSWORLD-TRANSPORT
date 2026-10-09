import type { Metadata } from "next";
import { ExternalLink, Info } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { photos } from "@/lib/images";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compliance",
  description: `Business and registration information for ${site.legalName}: USDOT ${site.usdot}, MC ${site.mc}, with links to the official FMCSA records.`,
  alternates: { canonical: "/compliance" },
  openGraph: { url: "/compliance" },
};

export default function CompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="Compliance"
        title={"On record.\nOn the road."}
        lead="JMSWORLD TRANSPORT LLC is registered with the U.S. Department of Transportation. Our identifiers are listed below, with links to the official FMCSA records so you can verify them directly."
        photo={photos.night}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="eyebrow text-ink-500">Business information</h2>
              <dl className="mt-6 divide-y divide-ink-200 border-y border-ink-200">
                <div className="grid gap-1 py-5 sm:grid-cols-3">
                  <dt className="text-sm text-ink-500">Legal name</dt>
                  <dd className="text-lg font-semibold text-navy-900 sm:col-span-2">
                    {site.legalName}
                  </dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-3">
                  <dt className="text-sm text-ink-500">USDOT Number</dt>
                  <dd className="sm:col-span-2">
                    <CopyValue
                      value={site.usdot}
                      label="USDOT number"
                      className="gap-3"
                      valueClassName="font-mono text-2xl font-semibold text-navy-900"
                    />
                  </dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-3">
                  <dt className="text-sm text-ink-500">MC Number</dt>
                  <dd className="sm:col-span-2">
                    <CopyValue
                      value={site.mc}
                      label="MC number"
                      className="gap-3"
                      valueClassName="font-mono text-2xl font-semibold text-navy-900"
                    />
                  </dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-3">
                  <dt className="text-sm text-ink-500">Principal address</dt>
                  <dd className="text-lg text-ink-800 sm:col-span-2">
                    <address className="not-italic">{site.address.full}</address>
                  </dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-3">
                  <dt className="text-sm text-ink-500">Phone</dt>
                  <dd className="text-lg sm:col-span-2">
                    <a
                      href={telHref}
                      className="font-semibold text-navy-900 transition-colors hover:text-accent-600"
                    >
                      {site.phone.display}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="on-dark rounded-sm bg-navy-900 p-8 text-white">
                <h2 className="display text-2xl">
                  Verify with FMCSA
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  The Federal Motor Carrier Safety Administration maintains the
                  authoritative record for every registered carrier, including
                  authority status, insurance filings and safety data.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink
                    href={site.fmcsa.snapshot}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="inverse"
                    className="w-full"
                  >
                    SAFER company snapshot
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </ButtonLink>
                  <ButtonLink
                    href={site.fmcsa.licensing}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="inverse"
                    className="w-full"
                  >
                    Licensing &amp; Insurance search
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </ButtonLink>
                </div>
                <p className="mt-5 text-xs leading-relaxed text-white/50">
                  Search by USDOT {site.usdot} or MC {site.mc}. FMCSA&apos;s
                  lookup tools are available to visitors in the United States;
                  from other countries they may show &ldquo;403 Forbidden&rdquo;.
                  If the direct link does not open, use the{" "}
                  <a
                    href={site.fmcsa.search}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-white"
                  >
                    SAFER search page
                  </a>
                  .
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-16 flex gap-4 rounded-sm border border-ink-200 bg-ink-50 p-6 sm:p-8">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-navy-900">
                A note on authority and insurance status
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                Operating authority, insurance filings and safety ratings are
                maintained by FMCSA and can change. We do not restate them
                here, so the official record linked above is always the current
                one. If you need documents for your vendor file, contact our
                office directly.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
