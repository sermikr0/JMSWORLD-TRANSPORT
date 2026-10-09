import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { HeadlineWords } from "@/components/ui/headline-words";
import { Photo } from "@/components/ui/photo";
import { cn } from "@/lib/cn";
import type { SitePhoto } from "@/lib/images";

export function PageHero({
  eyebrow,
  title,
  lead,
  photo,
  children,
}: {
  eyebrow: string;
  /** Use "\n" to force a line break. */
  title: string;
  lead?: string;
  photo?: SitePhoto;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative isolate overflow-clip bg-navy-950 text-white">
      {photo && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 animate-drift">
            <Photo photo={photo} priority sizes="100vw" />
          </div>
          <div className="absolute inset-0 scrim-page" aria-hidden="true" />
        </div>
      )}
      <Container
        className={cn(
          "py-20 lg:py-28",
          photo && "flex min-h-[460px] flex-col justify-end lg:min-h-[560px]",
        )}
      >
        <p className="eyebrow animate-rise text-accent-300">{eyebrow}</p>
        <h1 className="display mt-5 max-w-4xl text-[clamp(3.25rem,9vw,8rem)] text-balance">
          <HeadlineWords text={title} />
        </h1>
        {lead && (
          <p className="mt-7 max-w-2xl animate-rise text-lg leading-relaxed text-white/75 [animation-delay:500ms] sm:text-xl">
            {lead}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
