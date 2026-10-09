import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { SectionNav } from "@/components/sections/section-nav";
import { TrustBand } from "@/components/sections/trust-band";
import { Container } from "@/components/ui/container";
import { services } from "@/content/services";
import { photos } from "@/lib/images";
import { stagger } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Freight transportation services from JMSWORLD TRANSPORT LLC in Norwood, Ohio: full truckload, less than truckload, regional, long-haul, dedicated and team/expedited service for high-value, time-critical freight.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

const navItems = services.map((service) => ({
  id: service.slug,
  label: service.title,
}));

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={"Every load,\nthe right truck."}
        lead="From a single truckload to a recurring dedicated lane, here is how we can move your freight. If you are not sure which fits, describe the shipment and we will recommend an approach."
        photo={photos.dock}
      />

      <TrustBand />

      <section className="bg-white">
        <Container>
          <SectionNav items={navItems} label="Services on this page" />

          <div className="divide-y divide-ink-200">
            {services.map((service, index) => (
              <article
                key={service.slug}
                id={service.slug}
                className="group grid scroll-mt-40 gap-8 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20"
              >
                <div className="reveal lg:col-span-4">
                  <span className="font-mono text-xs text-ink-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-4 flex items-start gap-3">
                    <service.icon
                      className="mt-1 h-6 w-6 shrink-0 text-accent-600 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <h2 className="display text-4xl text-navy-900 sm:text-5xl">
                      {service.title}
                    </h2>
                  </div>
                </div>
                <div
                  className="reveal space-y-4 text-lg leading-relaxed text-ink-600 lg:col-span-5"
                  style={stagger(1)}
                >
                  {service.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="reveal lg:col-span-3" style={stagger(2)}>
                  <h3 className="eyebrow text-ink-500">Well suited for</h3>
                  <ul className="mt-4 space-y-3 text-[15px] leading-snug text-ink-700">
                    {service.suitedFor.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent-600"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Have a shipment that doesn't fit neatly into a category?"
        lead="Many don't. Tell us what you're moving, where it's going and when it needs to be there, and we'll tell you how we would handle it."
      />
    </>
  );
}
