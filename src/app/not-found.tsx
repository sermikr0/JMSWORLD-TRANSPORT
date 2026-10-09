import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="on-dark bg-navy-950 text-white">
      <Container className="py-28 lg:py-40">
        <p className="eyebrow text-accent-300">404</p>
        <h1 className="display mt-4 max-w-2xl text-6xl text-balance sm:text-7xl lg:text-8xl">
          This road ends here.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
          The address may have changed or the page may have been removed.
          Here are a few places to go next, or call us at{" "}
          <a
            href={telHref}
            className="font-semibold text-white underline-offset-4 hover:underline"
          >
            {site.phone.display}
          </a>
          .
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Go to the homepage
          </ButtonLink>
          <ButtonLink href="/quote" variant="inverse" size="lg">
            Request a Quote
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
