import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { services, trustStatement } from "@/content/services";
import { cn } from "@/lib/cn";
import { heroVideo, photos, type SitePhoto } from "@/lib/images";
import { stagger } from "@/lib/motion";

/** Photo shown in the side panel for each service (desktop). */
const panelPhotos: Record<string, SitePhoto> = {
  "full-truckload": photos.highway,
  "less-than-truckload": photos.dock,
  regional: photos.yard,
  "long-haul": photos.night,
  dedicated: heroVideo.poster,
  "team-expedited": photos.hero,
};

/**
 * Tailwind needs these as literal strings: panel N becomes visible while the
 * Nth row of the list is hovered (CSS :has(), no JavaScript).
 */
const panelVisibility = [
  "[.svc-index:has(li:nth-child(1):hover)_&]:opacity-100",
  "[.svc-index:has(li:nth-child(2):hover)_&]:opacity-100",
  "[.svc-index:has(li:nth-child(3):hover)_&]:opacity-100",
  "[.svc-index:has(li:nth-child(4):hover)_&]:opacity-100",
  "[.svc-index:has(li:nth-child(5):hover)_&]:opacity-100",
  "[.svc-index:has(li:nth-child(6):hover)_&]:opacity-100",
];

export function ServicesOverview() {
  return (
    <section className="on-dark bg-navy-950 py-20 text-white lg:py-28">
      <Container>
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="dark"
            eyebrow="Services"
            title="Six ways we move freight."
            lead="From a single truckload to a dedicated two-driver team, we match the service to the shipment rather than the other way around."
          />
          <ButtonLink href="/services" variant="inverse" arrow className="shrink-0">
            All services
          </ButtonLink>
        </div>

        <div className="svc-index mt-14 lg:grid lg:grid-cols-12 lg:gap-12">
          <ol className="divide-y divide-white/10 border-y border-white/10 lg:col-span-7">
            {services.map((service, index) => (
              <li key={service.slug} className="group reveal" style={stagger(index)}>
                <Link
                  href={`/services#${service.slug}`}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 transition-colors duration-300 hover:text-white sm:gap-8 lg:py-7"
                >
                  <span className="font-display text-2xl font-bold text-white/30 transition-colors duration-300 group-hover:text-accent-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="display block text-3xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                      {service.title}
                    </span>
                    <span className="mt-2 block max-w-xl text-[15px] leading-relaxed text-white/60 lg:hidden">
                      {service.short}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-6 w-6 text-white/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>

          <div className="relative hidden lg:col-span-5 lg:block" aria-hidden="true">
            <div className="sticky top-28 aspect-[4/5] overflow-clip rounded-sm bg-navy-900">
              {/* Resting state: the company's commitment statement. */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out [.svc-index:not(:has(li:hover))_&]:opacity-100">
                <Photo photo={heroVideo.poster} sizes="(min-width: 1024px) 40vw, 0px" quality={60} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/20" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="eyebrow text-accent-300">Our commitment</p>
                  <p className="display mt-3 text-4xl text-balance">
                    {trustStatement.title}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/80">
                    {trustStatement.body}
                  </p>
                </div>
              </div>

              {services.map((service, index) => (
                <div
                  key={service.slug}
                  className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-500 ease-out",
                    panelVisibility[index],
                  )}
                >
                  <Photo
                    photo={panelPhotos[service.slug] ?? photos.highway}
                    sizes="(min-width: 1024px) 40vw, 0px"
                    quality={60}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <p className="eyebrow text-accent-300">
                      {String(index + 1).padStart(2, "0")} · {service.title}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/85">
                      {service.short}
                    </p>
                    <ul className="mt-4 space-y-1.5 text-sm text-white/70">
                      {service.suitedFor.slice(0, 2).map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal mt-12 flex flex-col gap-5 border-l-2 border-accent-500 pl-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-lg text-white/75">
            Not sure which fits? Describe the freight, the lane and the timing,
            and we&apos;ll tell you how we would move it.
          </p>
          <ButtonLink href="/quote" arrow className="shrink-0">
            Request a quote
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
