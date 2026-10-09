import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { SectionHeading } from "@/components/ui/section-heading";
import { stagger } from "@/lib/motion";
import { site, telHref } from "@/lib/site";

const facts: Array<{
  label: string;
  value: string;
  sub: string;
  copyLabel?: string;
}> = [
  { label: "Based in", value: "Norwood, OH", sub: "Cincinnati metro" },
  {
    label: "USDOT",
    value: site.usdot,
    sub: "Registered carrier number",
    copyLabel: "USDOT number",
  },
  {
    label: "MC",
    value: site.mc,
    sub: "Motor carrier number",
    copyLabel: "MC number",
  },
  {
    label: "Interstate access",
    value: "I-71 · I-75",
    sub: "I-74 and I-275 minutes away",
  },
];

export function Intro() {
  return (
    <section id="intro" className="scroll-mt-18 bg-white py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <SectionHeading
              eyebrow="Who we are"
              title={
                <>
                  Freight is a promise.
                  <br />
                  We keep it moving.
                </>
              }
            />
          </div>
          <div className="reveal lg:col-span-6 lg:col-start-7" style={stagger(1)}>
            <div className="space-y-5 text-lg leading-relaxed text-ink-600">
              <p>
                JMSWORLD TRANSPORT LLC is a USDOT-registered transportation
                company based in Norwood, Ohio, in the Cincinnati metro. We work
                with shippers who need a carrier that confirms the details,
                communicates clearly, and delivers on what was agreed.
              </p>
              <p>
                Freight does not move itself. Behind every on-time delivery is
                a plan: the right equipment, a realistic schedule, and someone
                paying attention from pickup through delivery. That is the work
                we do.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <ButtonLink href="/about" variant="ghost" arrow>
                More about the company
              </ButtonLink>
              <a
                href={telHref}
                className="text-sm font-semibold text-navy-900 underline-offset-4 hover:underline"
              >
                {site.phone.display}
              </a>
            </div>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 border-y border-ink-200 lg:mt-24 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <div
              key={fact.label}
              className="reveal border-ink-200 px-1 py-8 [&:nth-child(odd)]:border-r lg:border-r lg:px-8 lg:py-10 lg:first:pl-0 lg:last:border-r-0"
              style={stagger(index)}
            >
              <dt className="eyebrow text-ink-500">{fact.label}</dt>
              <dd className="display mt-4 text-4xl text-navy-900 sm:text-5xl">
                {fact.copyLabel ? (
                  <CopyValue
                    value={fact.value}
                    label={fact.copyLabel}
                    className="gap-3"
                  />
                ) : (
                  fact.value
                )}
              </dd>
              <dd className="mt-2 text-sm text-ink-500">{fact.sub}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
