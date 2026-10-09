import {
  Clock,
  MapPin,
  MessageSquare,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type Principle = {
  title: string;
  body: string;
  icon: LucideIcon;
};

/** "Why choose JMSWORLD" — only claims that can be stood behind today. */
export const whyChoose: Principle[] = [
  {
    title: "One point of contact",
    body: "You speak with the people coordinating your freight. Questions about pickup, transit or delivery are answered by someone who knows the load.",
    icon: MessageSquare,
  },
  {
    title: "Straight answers on timing",
    body: "We quote transit times we expect to meet, and we tell you early if something changes along the way.",
    icon: Clock,
  },
  {
    title: "Registered and verifiable",
    body: "JMSWORLD TRANSPORT LLC operates under USDOT 3642835 and MC 1252524. You can check our record on the FMCSA website at any time.",
    icon: ShieldCheck,
  },
  {
    title: "Positioned for the Midwest and beyond",
    body: "Based in Norwood, Ohio, inside Cincinnati's interstate network and within a day's drive of major Midwest, Southeast and East Coast markets.",
    icon: MapPin,
  },
];

/** Operating principles shown on the About page. */
export const operatingPrinciples: { title: string; body: string }[] = [
  {
    title: "Plan before we commit",
    body: "We confirm pickup windows, receiving hours, equipment and freight details before a truck is assigned, so the plan we give you is the plan we run.",
  },
  {
    title: "Communicate early",
    body: "If a schedule shifts, you hear it from us first. Updates go out before you have to ask for them.",
  },
  {
    title: "Operate safely",
    body: "Safe operation is a condition of doing business, not a feature. We follow federal hours-of-service and equipment requirements and expect the same from everyone who moves our customers' freight.",
  },
  {
    title: "Own the outcome",
    body: "When something does not go to plan, we say so, fix what we can, and tell you what we are changing so it does not happen again.",
  },
];
