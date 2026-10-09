import Link from "next/link";
import { ExternalLink, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { site, telHref } from "@/lib/site";

export function ContactStrip() {
  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-20">
        <div className="reveal grid gap-px overflow-clip rounded-sm border border-ink-200 bg-ink-200 md:grid-cols-3">
          <div className="bg-white p-8 transition-colors duration-300 hover:bg-ink-50">
            <Phone className="h-6 w-6 text-accent-600" aria-hidden="true" />
            <h2 className="mt-6 display text-2xl text-navy-900">
              Call us
            </h2>
            <a
              href={telHref}
              className="mt-2 block text-2xl font-semibold tracking-tight text-navy-900 transition-colors hover:text-accent-600"
            >
              {site.phone.display}
            </a>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
              A direct line to the people coordinating your freight.
            </p>
          </div>

          <div className="bg-white p-8 transition-colors duration-300 hover:bg-ink-50">
            <MapPin className="h-6 w-6 text-accent-600" aria-hidden="true" />
            <h2 className="mt-6 display text-2xl text-navy-900">
              Visit
            </h2>
            <address className="mt-2 text-[15px] not-italic leading-relaxed text-ink-800">
              <span className="font-semibold">{site.legalName}</span>
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
          </div>

          <div className="bg-white p-8 transition-colors duration-300 hover:bg-ink-50">
            <ShieldCheck className="h-6 w-6 text-accent-600" aria-hidden="true" />
            <h2 className="mt-6 display text-2xl text-navy-900">
              Verify our registration
            </h2>
            <dl className="mt-2 space-y-2 text-[15px] text-ink-800">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
