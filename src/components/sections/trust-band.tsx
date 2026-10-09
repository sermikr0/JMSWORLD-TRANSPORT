import { Radar, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { trustStatement } from "@/content/services";
import { stagger } from "@/lib/motion";

const pillarIcons: LucideIcon[] = [Users, Radar, ShieldCheck];

/** "Trusted to deliver what matters most" — the company's service commitment. */
export function TrustBand() {
  return (
    <section className="on-dark relative isolate overflow-clip bg-navy-900 text-white">
      <div
        className="road-line absolute inset-x-0 top-0 text-accent-500 opacity-70"
        aria-hidden="true"
      />
      <Container className="py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-6">
            <p className="eyebrow text-accent-300">Our commitment</p>
            <h2 className="display mt-4 text-5xl text-balance sm:text-6xl lg:text-7xl">
              {trustStatement.title}
            </h2>
          </div>
          <div className="reveal lg:col-span-6 lg:pt-9" style={stagger(1)}>
            <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
              {trustStatement.body}
            </p>
            <p className="display mt-6 text-2xl text-accent-300 sm:text-3xl">
              {trustStatement.closing}
            </p>
          </div>
        </div>

        <ul className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
          {trustStatement.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? ShieldCheck;
            return (
              <li
                key={pillar.title}
                className="group reveal bg-navy-900 p-8 transition-colors duration-300 hover:bg-navy-800"
                style={stagger(index)}
              >
                <Icon
                  className="h-6 w-6 text-accent-400 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <h3 className="display mt-8 text-3xl">{pillar.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">
                  {pillar.body}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
