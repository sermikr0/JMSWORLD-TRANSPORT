import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { photos } from "@/lib/images";
import { stagger } from "@/lib/motion";

const checklist = [
  "Pickup and delivery locations",
  "Freight type and packaging",
  "Estimated weight and dimensions",
  "Requested pickup date",
  "Any delivery appointment requirements",
];

export function CtaBand({
  title = "Got freight? Let's talk.",
  lead = "Send us the pickup, delivery, freight details and timing. We'll review it and come back with a quote and a realistic pickup window.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="on-dark relative isolate overflow-clip bg-navy-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-drift">
          <Photo photo={photos.night} sizes="100vw" quality={60} />
        </div>
        <div className="absolute inset-0 scrim-band" aria-hidden="true" />
      </div>
      <div
        className="road-line absolute inset-x-0 top-0 text-accent-400 opacity-80"
        aria-hidden="true"
      />
      <Container className="py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <p className="eyebrow text-accent-300">Request a quote</p>
            <h2 className="display mt-4 text-6xl text-balance sm:text-7xl lg:text-8xl">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              {lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/quote" size="lg" arrow>
                Request a Quote
              </ButtonLink>
              <ButtonLink href="/contact" variant="inverse" size="lg">
                Contact Our Team
              </ButtonLink>
            </div>
          </div>
          <div
            className="reveal lg:col-span-4 lg:col-start-9 lg:border-l lg:border-white/20 lg:pl-10"
            style={stagger(1)}
          >
            <p className="eyebrow text-accent-300">Helpful to have ready</p>
            <ul className="mt-5 space-y-3.5 text-[15px] text-white/85">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-400"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
