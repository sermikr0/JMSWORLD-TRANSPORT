import { Truck } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

/** Major markets within roughly a day's drive of Norwood, Ohio (geography, not a service claim). */
const cities = [
  "Cincinnati",
  "Columbus",
  "Dayton",
  "Indianapolis",
  "Louisville",
  "Lexington",
  "Cleveland",
  "Chicago",
  "Nashville",
  "Pittsburgh",
  "Detroit",
  "St. Louis",
];

export function LanesTicker() {
  return (
    <section
      aria-label="Major markets within a day's drive of Norwood, Ohio"
      className="on-dark border-b border-white/10 bg-navy-900 text-white"
    >
      <div className="flex items-stretch">
        <p className="eyebrow hidden shrink-0 items-center border-r border-white/10 px-6 text-accent-300 md:flex lg:px-10">
          Within a day&apos;s drive
        </p>
        <Marquee className="flex-1 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
          {cities.map((city) => (
            <span
              key={city}
              className="flex items-center gap-5 py-4 pr-10 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/75"
            >
              <Truck className="h-4 w-4 text-accent-400" aria-hidden="true" />
              {city}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
