import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { heroVideo } from "@/lib/images";
import { stagger } from "@/lib/motion";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a freight quote from JMSWORLD TRANSPORT LLC. Share pickup and delivery locations, freight type, weight and timing, and we will come back with a quote and pickup window.",
  alternates: { canonical: "/quote" },
  openGraph: { url: "/quote" },
};

const steps = [
  {
    title: "We review the details",
    body: "Pickup, delivery, freight and timing, plus anything you noted.",
  },
  {
    title: "We confirm what's unclear",
    body: "Expect a quick call or email if we need dimensions, accessorials or appointment details.",
  },
  {
    title: "You receive a quote",
    body: "With a proposed pickup window and the transit time we expect to meet.",
  },
];

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title={"Tell us about\nthe load."}
        lead="Share the pickup, delivery, freight details and timing. We'll review it and come back with a quote and a realistic pickup window."
        photo={heroVideo.poster}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="reveal lg:col-span-7">
              <QuoteForm />
            </div>

            <aside
              className="reveal space-y-10 lg:col-span-4 lg:col-start-9"
              style={stagger(1)}
            >
              <div>
                <h2 className="eyebrow text-ink-500">What happens next</h2>
                <ol className="mt-5 space-y-5">
                  {steps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-navy-900 font-mono text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-navy-900">{step.title}</p>
                        <p className="mt-1 text-[15px] leading-relaxed text-ink-600">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-sm border border-ink-200 p-6">
                <h2 className="display text-2xl text-navy-900">
                  Time-critical freight?
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                  Call us directly and we&apos;ll take the details over the
                  phone.
                </p>
                <a
                  href={telHref}
                  className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-navy-900 transition-colors hover:text-accent-600"
                >
                  <Phone className="h-5 w-5 text-accent-600" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </div>

              <div>
                <h2 className="eyebrow text-ink-500">Business details</h2>
                <dl className="mt-4 space-y-2 text-sm text-ink-700">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-500">Legal name</dt>
                    <dd className="text-right font-medium text-navy-900">
                      {site.legalName}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink-500">USDOT</dt>
                    <dd>
                      <CopyValue
                        value={site.usdot}
                        label="USDOT number"
                        valueClassName="font-mono font-medium text-navy-900"
                      />
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink-500">MC</dt>
                    <dd>
                      <CopyValue
                        value={site.mc}
                        label="MC number"
                        valueClassName="font-mono font-medium text-navy-900"
                      />
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-500">Address</dt>
                    <dd className="text-right font-medium text-navy-900">
                      {site.address.line}
                    </dd>
                  </div>
                </dl>
                <Link
                  href="/compliance"
                  className="mt-4 inline-flex text-sm font-semibold text-accent-600 hover:text-accent-700"
                >
                  Compliance information →
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
