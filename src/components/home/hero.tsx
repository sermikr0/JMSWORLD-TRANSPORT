import { HeroMedia } from "@/components/home/hero-media";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { HeadlineWords } from "@/components/ui/headline-words";
import { heroVideo } from "@/lib/images";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 -z-10">
        <HeroMedia poster={heroVideo.poster} video={heroVideo} />
        <div className="absolute inset-0 scrim-hero" aria-hidden="true" />
      </div>

      <Container className="flex min-h-[min(calc(100svh-4.5rem),58rem)] flex-col justify-end pb-10 pt-28 sm:pb-14 lg:pt-36">
        <div className="max-w-4xl">
          <p className="eyebrow animate-rise text-accent-300">
            JMSWORLD Transport · Norwood, Ohio
          </p>
          <h1 className="display mt-6 text-[clamp(3.75rem,11vw,9.5rem)] text-balance">
            <HeadlineWords text={"We haul what\nyou promised."} />
          </h1>
          <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-white/80 [animation-delay:600ms] sm:text-xl">
            Truckload freight out of Norwood, Ohio, moved by people who pick up
            the phone and deliver on the date they gave you.
          </p>
          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:720ms] sm:flex-row">
            <ButtonLink href="/quote" size="lg" arrow>
              Request a Quote
            </ButtonLink>
            <ButtonLink href="/contact" variant="inverse" size="lg">
              Contact Our Team
            </ButtonLink>
          </div>
        </div>

        <dl className="mt-16 flex animate-rise flex-wrap gap-x-10 gap-y-3 border-t border-white/15 pt-5 text-sm text-white/70 [animation-delay:860ms] sm:mt-20">
          <div>
            <dt className="sr-only">Company</dt>
            <dd className="font-semibold text-white">{site.legalName}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-white/50">USDOT</dt>
            <dd>
              <CopyValue
                value={site.usdot}
                label="USDOT number"
                tone="dark"
                valueClassName="font-mono text-white"
              />
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-white/50">MC</dt>
            <dd>
              <CopyValue
                value={site.mc}
                label="MC number"
                tone="dark"
                valueClassName="font-mono text-white"
              />
            </dd>
          </div>
          <div className="hidden md:block">
            <dt className="sr-only">Address</dt>
            <dd>{site.address.line}</dd>
          </div>
        </dl>
      </Container>

      <a
        href="#intro"
        className="absolute bottom-10 right-8 hidden animate-rise flex-col items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/55 transition-colors [animation-delay:1000ms] hover:text-white lg:flex xl:right-12"
      >
        <span>Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-white/20">
          <span
            className="absolute inset-x-0 top-0 h-1/2 animate-scroll-line bg-white"
            aria-hidden="true"
          />
        </span>
      </a>
    </section>
  );
}
