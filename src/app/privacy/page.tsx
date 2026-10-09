import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { photos } from "@/lib/images";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.legalName} handles information submitted through this website.`,
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title={"Your data,\nplainly."}
        lead="A plain-language description of what this website collects and what we do with it."
        photo={photos.dock}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl space-y-12 text-lg leading-relaxed text-ink-600">
            <div>
              <h2 className="display text-3xl text-navy-900">
                What we collect
              </h2>
              <p className="mt-4">
                When you submit the quote request or contact form, we receive
                the information you enter: your name, company, email address,
                phone number, shipment details and any message you include.
                We do not collect this information unless you choose to send
                it.
              </p>
            </div>

            <div>
              <h2 className="display text-3xl text-navy-900">
                How we use it
              </h2>
              <p className="mt-4">
                We use what you send to respond to your inquiry, prepare a
                quote, and coordinate transportation if you decide to work with
                us. We do not sell your information or share it with third
                parties for their own marketing.
              </p>
            </div>

            <div>
              <h2 className="display text-3xl text-navy-900">
                Service providers
              </h2>
              <p className="mt-4">
                Form submissions are delivered to our office by email through a
                transactional email provider that processes the message on our
                behalf. The website itself does not use advertising trackers or
                third-party analytics cookies.
              </p>
            </div>

            <div>
              <h2 className="display text-3xl text-navy-900">
                Retention and your choices
              </h2>
              <p className="mt-4">
                Inquiry emails are kept as long as needed to respond and for
                ordinary business records. If you would like us to correct or
                delete information you have sent, contact us and we will take
                care of it.
              </p>
            </div>

            <div>
              <h2 className="display text-3xl text-navy-900">
                Questions
              </h2>
              <p className="mt-4">
                {site.legalName}
                <br />
                {site.address.full}
                <br />
                <a
                  href={telHref}
                  className="font-semibold text-navy-900 underline-offset-4 hover:underline"
                >
                  {site.phone.display}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
