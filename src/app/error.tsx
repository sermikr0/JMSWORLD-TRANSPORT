"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site, telHref } from "@/lib/site";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // Surface in the browser console; server logs hold the matching digest.
    console.error(error);
  }, [error]);

  return (
    <section className="bg-white">
      <Container className="py-28 lg:py-40">
        <p className="eyebrow text-accent-600">Something went wrong</p>
        <h1 className="display mt-4 max-w-2xl text-6xl text-balance text-navy-900 sm:text-7xl">
          We hit a bump. Give it another try.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
          Please try again. If it keeps happening, call us at{" "}
          <a
            href={telHref}
            className="font-semibold text-navy-900 underline-offset-4 hover:underline"
          >
            {site.phone.display}
          </a>
          {error.digest && (
            <>
              {" "}
              and mention reference{" "}
              <code className="rounded-sm bg-ink-100 px-1.5 py-0.5 font-mono text-sm text-ink-800">
                {error.digest}
              </code>
            </>
          )}
          .
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={() => retry()}>
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary" size="lg">
            Go to the homepage
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
