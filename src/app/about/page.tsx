import type { Metadata } from "next";
import { MessageSquare, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { operatingPrinciples } from "@/content/principles";
import { photos } from "@/lib/images";
import { stagger } from "@/lib/motion";
import { site, telHref } from "@/lib/site";

const mission =
  "Move our customers' freight safely, on the schedule we agreed to, and keep them informed from pickup to delivery.";
const missionWords = mission.split(" ");

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.legalName}: a transportation company based in Norwood, Ohio. Our mission, operating principles, and commitment to safe, reliable freight transportation.`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

const safety = [
  {
    title: "Federal compliance",
    body: "We maintain our USDOT and MC registrations and operate under FMCSA regulations, including hours-of-service and vehicle inspection requirements.",
  },
  {
    title: "Fit to drive, fit to roll",
    body: "Rested drivers and roadworthy equipment are prerequisites for every dispatch, not goals we work toward.",
  },
  {
    title: "Cargo care",
    body: "Securement, weight distribution and proper handling are checked at pickup, not discovered at delivery.",
  },
];

const communication = [
  {
    title: "Confirmation up front",
    body: "Before pickup, we confirm the details that cause most problems: addresses, hours, contacts, equipment and appointment requirements.",
  },
  {
    title: "Updates when it matters",
    body: "You hear from us when the load is picked up, if anything changes in transit, and when it delivers.",
  },
  {
    title: "A direct line",
    body: "Call us and you reach the people managing your freight, not a call center.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About JMSWORLD"
        title={"A carrier you can\nactually call."}
        lead="JMSWORLD TRANSPORT LLC is a transportation company based in Norwood, Ohio."
        photo={photos.yard}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="reveal lg:col-span-4">
              <SectionHeading eyebrow="Company overview" title="Who we are" />
            </div>
            <div
              className="reveal space-y-5 text-lg leading-relaxed text-ink-600 lg:col-span-7 lg:col-start-6"
              style={stagger(1)}
            >
              <p>
                JMSWORLD TRANSPORT LLC is a USDOT-registered transportation
                company headquartered at {site.address.street} in Norwood,
                Ohio, part of the Cincinnati metropolitan area. We work with
                businesses that depend on freight arriving when it was
                promised.
              </p>
              <p>
                We are deliberately straightforward about how we operate. You
                get a clear quote, a realistic schedule, and a direct line to
                the people responsible for your shipment. If you want to check
                us out first, our USDOT and MC numbers are published on every
                page and link to our official FMCSA record.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="on-dark bg-navy-900 py-20 text-white lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow text-accent-300">Our mission</p>
            </div>
            <div className="lg:col-span-9">
              <p className="display text-5xl text-balance sm:text-6xl lg:text-7xl">
                <span className="sr-only">{mission}</span>
                <span aria-hidden="true">
                  {missionWords.map((word, index) => (
                    <span
                      key={`${word}-${index}`}
                      className="reveal inline-block"
                      style={stagger(index, "1.4%")}
                    >
                      {word}
                      {index < missionWords.length - 1 ? " " : ""}
                    </span>
                  ))}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-16 lg:mt-20">
            <h2 className="eyebrow reveal text-accent-300">Operating principles</h2>
            <ol className="mt-6 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {operatingPrinciples.map((principle, index) => (
                <li
                  key={principle.title}
                  className="reveal bg-navy-900 p-8 transition-colors duration-300 hover:bg-navy-800"
                  style={stagger(index)}
                >
                  <span className="font-mono text-xs text-white/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 display text-2xl">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/65">
                    {principle.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div className="relative aspect-[4/3] overflow-clip rounded-sm bg-navy-900">
              <div className="reveal-zoom absolute inset-0">
                <Photo
                  photo={photos.highway}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
            <div className="reveal">
              <SectionHeading
                eyebrow="Reliable transportation"
                title="Reliability is a discipline, not a slogan."
              />
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-600">
                <p>
                  Reliable freight is not complicated, but it takes discipline.
                  It means confirming details instead of assuming them,
                  dispatching with enough margin for weather and traffic, and
                  treating a delivery appointment as a commitment rather than a
                  target.
                </p>
                <p>
                  We would rather give you a realistic date than an optimistic
                  one, and we would rather decline a load than take one we
                  cannot move properly. That is how trust gets built, one
                  shipment at a time.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ink-50 py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="How we operate"
            title="Safety and communication principles"
            lead="Two things every customer should be able to count on, every time."
            className="reveal"
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="reveal">
              <h3 className="flex items-center gap-3 display text-3xl text-navy-900">
                <ShieldCheck className="h-6 w-6 text-accent-600" aria-hidden="true" />
                Safety
              </h3>
              <ul className="mt-6 divide-y divide-ink-200 border-y border-ink-200">
                {safety.map((item) => (
                  <li key={item.title} className="py-5">
                    <p className="font-semibold text-navy-900">{item.title}</p>
                    <p className="mt-1.5 leading-relaxed text-ink-600">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal" style={stagger(1)}>
              <h3 className="flex items-center gap-3 display text-3xl text-navy-900">
                <MessageSquare className="h-6 w-6 text-accent-600" aria-hidden="true" />
                Communication
              </h3>
              <ul className="mt-6 divide-y divide-ink-200 border-y border-ink-200">
                {communication.map((item) => (
                  <li key={item.title} className="py-5">
                    <p className="font-semibold text-navy-900">{item.title}</p>
                    <p className="mt-1.5 leading-relaxed text-ink-600">
                      {item.body}
                      {item.title === "A direct line" && (
                        <>
                          {" "}
                          <a
                            href={telHref}
                            className="font-semibold text-navy-900 underline-offset-4 hover:underline"
                          >
                            {site.phone.display}
                          </a>
                        </>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
