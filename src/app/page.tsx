import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { LanesTicker } from "@/components/home/lanes-ticker";
import { ServicesOverview } from "@/components/home/services-overview";
import { WhyChoose } from "@/components/home/why-choose";
import { ContactStrip } from "@/components/sections/contact-strip";
import { CtaBand } from "@/components/sections/cta-band";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.legalName} — ${site.tagline}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LanesTicker />
      <Intro />
      <ServicesOverview />
      <WhyChoose />
      <CtaBand />
      <ContactStrip />
    </>
  );
}
