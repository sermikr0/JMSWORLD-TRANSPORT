import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyChoose } from "@/content/principles";
import { stagger } from "@/lib/motion";

export function WhyChoose() {
  return (
    <section className="bg-ink-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why JMSWORLD"
          title="What rides with every load."
          lead="No slogans. Four commitments we can stand behind on every shipment."
          className="reveal"
        />
        <ul className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {whyChoose.map((item, index) => (
            <li
              key={item.title}
              className="group relative pt-6"
              style={stagger(index)}
            >
              <span
                className="reveal-line absolute inset-x-0 top-0 h-px bg-navy-900"
                aria-hidden="true"
              />
              <div className="reveal">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-ink-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <item.icon
                    className="h-6 w-6 text-accent-600 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="display mt-6 text-3xl text-navy-900 sm:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-ink-600">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
