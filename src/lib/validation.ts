import { z } from "zod";

/**
 * Shared validation for the quote and contact forms.
 * Runs on the client (react-hook-form) and again on the server (actions.ts).
 */

export const FREIGHT_TYPES = [
  "General / dry freight",
  "Palletized goods",
  "Machinery or equipment",
  "Building materials",
  "Temperature-sensitive goods",
  "Other (describe below)",
] as const;
export type FreightType = (typeof FREIGHT_TYPES)[number];

const PHONE_CHARS_RE = /^[+\d().\-\s]{7,25}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Accepts "(513) 960-0090", "513.960.0090", "+1 513 960 0090", etc. */
function isPhone(value: string) {
  const digits = value.replace(/\D/g, "").length;
  return PHONE_CHARS_RE.test(value) && digits >= 10 && digits <= 15;
}

const fullName = z
  .string()
  .trim()
  .min(2, "Enter your full name")
  .max(80, "Keep this under 80 characters");

const email = z
  .string()
  .trim()
  .min(1, "Enter your email address")
  .email("Enter a valid email address")
  .max(254, "Keep this under 254 characters");

const optionalText = (max: number) =>
  z.string().trim().max(max, `Keep this under ${max} characters`);

/** Anti-spam fields present on every form. */
const antiSpam = {
  /** Honeypot. Hidden from people; must stay empty. */
  website: z.string().max(0).optional(),
  /** Epoch ms when the form was rendered; rejects instant bot submissions. */
  startedAt: z.number().int().nonnegative(),
};

function isNotPast(date: string) {
  const t = Date.parse(`${date}T00:00:00Z`);
  // Allow a generous margin so "today" is valid in every US time zone.
  return !Number.isNaN(t) && t >= Date.now() - 1.5 * DAY_MS;
}

function isWithinOneYear(date: string) {
  const t = Date.parse(`${date}T00:00:00Z`);
  return !Number.isNaN(t) && t <= Date.now() + 366 * DAY_MS;
}

export const quoteSchema = z.object({
  fullName,
  company: optionalText(120),
  email,
  phone: z
    .string()
    .trim()
    .min(1, "Enter a phone number")
    .refine(isPhone, "Enter a valid phone number, including the area code"),
  pickupLocation: z
    .string()
    .trim()
    .min(2, "Enter the pickup city and state, or ZIP code")
    .max(160, "Keep this under 160 characters"),
  deliveryLocation: z
    .string()
    .trim()
    .min(2, "Enter the delivery city and state, or ZIP code")
    .max(160, "Keep this under 160 characters"),
  freightType: z
    .string()
    .refine(
      (v): v is FreightType => (FREIGHT_TYPES as readonly string[]).includes(v),
      "Select a freight type",
    ),
  weightLbs: z
    .string()
    .trim()
    .transform((v) => v.replace(/[,\s]/g, ""))
    .pipe(
      z
        .string()
        .regex(/^\d{1,6}$/, "Enter the estimated weight in pounds (numbers only)")
        .refine(
          (v) => Number(v) > 0 && Number(v) <= 100000,
          "Enter a weight between 1 and 100,000 lbs",
        ),
    ),
  pickupDate: z
    .string()
    .regex(DATE_RE, "Select a pickup date")
    .refine(isNotPast, "Pickup date can't be in the past")
    .refine(isWithinOneYear, "Choose a date within the next 12 months"),
  details: optionalText(2000),
  ...antiSpam,
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;

export const contactSchema = z.object({
  fullName,
  company: optionalText(120),
  email,
  phone: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || isPhone(v),
      "Enter a valid phone number, including the area code",
    ),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(2000, "Keep this under 2,000 characters"),
  ...antiSpam,
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
