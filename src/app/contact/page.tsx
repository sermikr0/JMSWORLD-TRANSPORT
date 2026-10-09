import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, MapPin, Phone, ShieldCheck, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { MapEmbed } from "@/components/sections/map-embed";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { SectionHeading } from "@/components/ui/section-heading";
import { photos } from "@/lib/images";
import { stagger } from "@/lib/motion";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.legalName} at ${site.phone.display} or visit us at ${site.address.full}. Send a business inquiry or request a freight quote.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

function Detail({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-navy-900">
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </div>
      <div>
        <h2 className="eyebrow text-ink-500">{title}</h2>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={"Talk to the people\nwho move it."}
        lead="Call, send a business inquiry, or visit our Norwood office. For shipment pricing, the quote form gives us everything we need to respond quickly."
        photo={photos.highway}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="reveal space-y-10 lg:col-span-5">
              <Detail icon={Phone} title="Phone">
                <a
                  href={telHref}
                  className="display text-4xl text-navy-900 transition-colors hover:text-accent-600 sm:text-5xl"
                >
                  {site.phone.display}
                </a>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                  A direct line to the people coordinating your freight.
                </p>
              </Detail>

              <Detail icon={MapPin} title="Office">
                <address className="text-lg not-italic leading-relaxed text-ink-800">
                  <span className="font-semibold text-navy-900">
                    {site.legalName}
                  </span>
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region}{" "}
                  {site.address.postalCode}
                </address>
                <a
                  href={site.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 hover:text-accent-700"
                >
                  Get directions
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Detail>

              <Detail icon={ShieldCheck} title="Registration">
                <dl className="space-y-2 text-[15px] text-ink-800">
                  <div className="flex items-center gap-3">
                    <dt className="w-16 text-ink-500">USDOT</dt>
                    <dd>
                      <CopyValue
                        value={site.usdot}
                        label="USDOT number"
                        valueClassName="font-mono font-semibold"
                      />
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="w-16 text-ink-500">MC</dt>
                    <dd>
                      <CopyValue
                        value={site.mc}
                        label="MC number"
                        valueClassName="font-mono font-semibold"
                      />
                    </dd>
                  </div>
                </dl>
                <Link
                  href="/compliance"
                  className="mt-3 inline-flex text-sm font-semibold text-accent-600 hover:text-accent-700"
                >
                  Compliance information →
                </Link>
              </Detail>
            </div>

            <div className="reveal lg:col-span-7" style={stagger(1)}>
              <div className="rounded-sm border border-ink-200 p-6 shadow-card sm:p-8 lg:p-10">
                <h2 className="display text-3xl text-navy-900">
                  Send a business inquiry
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                  For shipment pricing, please use the{" "}
                  <Link
                    href="/quote"
                    className="font-semibold text-accent-600 underline-offset-4 hover:underline"
                  >
                    quote request form
                  </Link>{" "}
                  so we have the freight details. For everything else, this
                  form reaches our office directly.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ink-50 py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Location"
            title="Find us in Norwood, Ohio."
            lead={`${site.address.full}. Inside the Cincinnati interstate network, minutes from I-71 and I-75.`}
          />
          <div className="mt-10 overflow-hidden rounded-sm border border-ink-200">
            <MapEmbed />
          </div>
        </Container>
      </section>
    </>
  );
}
