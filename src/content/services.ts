import {
  Boxes,
  CalendarCheck,
  Map,
  Route,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Company statement used on the Services page and the homepage services panel. */
export const trustStatement = {
  title: "Trusted to deliver what matters most.",
  body: "From high-value cargo to time-critical freight, JMSWORLD Transport provides dedicated true-team capacity backed by experienced operations, real-time shipment visibility, and a security-first mindset.",
  closing: "Every mile is managed with care, accountability, and precision.",
  pillars: [
    {
      title: "Dedicated true-team capacity",
      body: "Two-driver teams for freight that cannot wait, backed by experienced operations.",
    },
    {
      title: "Real-time shipment visibility",
      body: "Know where your load is from pickup to delivery, and hear from us the moment anything changes.",
    },
    {
      title: "Security-first mindset",
      body: "High-value cargo handled with care, accountability and precision on every mile.",
    },
  ],
};

/**
 * Service catalog.
 *
 * These are proposed service categories for a transportation company of this
 * type. Confirm with JMSWORLD TRANSPORT LLC which services are actually
 * offered before launch, and remove or edit entries here — every services
 * section on the site reads from this list.
 */
export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string[];
  suitedFor: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "full-truckload",
    title: "Full Truckload (FTL)",
    short:
      "Dedicated trailer capacity for shipments that fill a trailer, or that need to move without being combined with other freight.",
    description: [
      "Your freight is the only freight on the trailer. It is loaded once at origin and unloaded once at destination, which keeps handling to a minimum and makes transit times easier to plan.",
      "FTL is usually the right fit when volume, timing, or product sensitivity make shared trailer space impractical.",
    ],
    suitedFor: [
      "Shipments of roughly ten or more pallets",
      "Time-sensitive deliveries with a firm appointment",
      "Products that should not be handled more than necessary",
      "High-value or fragile freight",
    ],
    icon: Truck,
  },
  {
    slug: "less-than-truckload",
    title: "Less Than Truckload (LTL)",
    short:
      "Space for smaller shipments that do not need a full trailer, priced for the space and weight you actually use.",
    description: [
      "Less-than-truckload moves share trailer space with other freight. It is a practical option for a few pallets, or for shipments where the cost of a dedicated trailer is hard to justify.",
      "Because LTL freight is handled more than once in transit, good packaging and accurate dimensions matter. We will ask for both when you request a quote.",
    ],
    suitedFor: [
      "One to several pallets",
      "Palletized, well-packaged goods",
      "Flexible delivery windows",
      "Supplemental shipments between full loads",
    ],
    icon: Boxes,
  },
  {
    slug: "regional",
    title: "Regional Transportation",
    short:
      "Shorter lanes across Ohio, Kentucky, Indiana and the surrounding states, planned for predictable transit windows.",
    description: [
      "Our base in Norwood sits inside Cincinnati's interstate network, with I-71, I-75, I-74 and I-275 close by. That puts Columbus, Dayton, Indianapolis, Louisville and Lexington within a few hours' drive, and Chicago, Nashville, Pittsburgh and Detroit within a day.",
      "Regional freight benefits from short, consistent transit windows and a carrier that knows the routes and the receivers.",
    ],
    suitedFor: [
      "Next-day deliveries within the region",
      "Distribution to regional warehouses and retailers",
      "Recurring shuttle moves between facilities",
    ],
    icon: Map,
  },
  {
    slug: "long-haul",
    title: "Long-Haul Transportation",
    short:
      "Over-the-road freight across longer distances, planned around hours-of-service rules and realistic transit times.",
    description: [
      "Long-haul transportation covers freight moving well beyond the region, including multi-day transits across the Midwest, Southeast and East Coast.",
      "On longer lanes, honest transit estimates matter more than optimistic ones. We plan around driver hours, weather and receiving appointments, so the delivery date we give you is one we expect to meet.",
    ],
    suitedFor: [
      "Interstate shipments beyond a day's drive",
      "Multi-day transits with scheduled delivery appointments",
      "Plant-to-warehouse and warehouse-to-customer moves across states",
    ],
    icon: Route,
  },
  {
    slug: "dedicated",
    title: "Dedicated Freight Solutions",
    short:
      "Recurring capacity assigned to your lanes and schedule, so you are not sourcing a truck from scratch every week.",
    description: [
      "Dedicated arrangements set aside capacity for shippers with consistent volume. Lanes, pickup windows and delivery requirements are agreed up front, and the same process repeats each cycle.",
      "The result is less time spent sourcing capacity, fewer surprises at the dock, and a carrier that already knows your product and your receivers.",
    ],
    suitedFor: [
      "Weekly or daily lanes with steady volume",
      "Scheduled distribution routes",
      "Shippers who want a consistent point of contact",
    ],
    icon: CalendarCheck,
  },
  {
    slug: "team-expedited",
    title: "Team & Expedited Service",
    short:
      "Dedicated true-team capacity for high-value and time-critical freight, with real-time visibility from pickup to delivery.",
    description: [
      "When a shipment cannot wait, a two-driver team keeps it moving. True-team capacity shortens transit on long lanes and gives time-critical freight the schedule it needs.",
      "Every team load is backed by experienced operations, real-time shipment visibility, and a security-first mindset, so high-value cargo is managed with care, accountability and precision on every mile.",
    ],
    suitedFor: [
      "High-value cargo",
      "Time-critical and expedited freight",
      "Long lanes that need to run without overnight stops",
      "Shipments that require continuous visibility",
    ],
    icon: Users,
  },
];
