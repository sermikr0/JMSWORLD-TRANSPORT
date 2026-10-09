"use server";

import { headers } from "next/headers";
import type { ZodError } from "zod";
import { site } from "@/lib/site";
import {
  contactSchema,
  quoteSchema,
  type ContactData,
  type QuoteData,
} from "@/lib/validation";
import { renderRows, sendInquiryEmail } from "@/server/mail";
import { checkRateLimit } from "@/server/rate-limit";

export type SubmitResult =
  | { ok: true }
  | {
      ok: false;
      code:
        | "validation"
        | "spam"
        | "rate_limited"
        | "not_configured"
        | "delivery_failed";
      message: string;
      fieldErrors?: Record<string, string>;
    };

/** Submissions faster than this are almost certainly automated. */
const MIN_FILL_TIME_MS = 3000;

const CALL_US = `Please call ${site.phone.display} and we'll take the details over the phone.`;

export async function submitQuoteRequest(input: unknown): Promise<SubmitResult> {
  const parsed = quoteSchema.safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error);

  const blocked = await screen(parsed.data);
  if (blocked) return blocked;

  const d: QuoteData = parsed.data;
  const { text, html } = renderRows([
    ["Name", d.fullName],
    ["Company", d.company],
    ["Email", d.email],
    ["Phone", d.phone],
    ["Pickup", d.pickupLocation],
    ["Delivery", d.deliveryLocation],
    ["Freight type", d.freightType],
    ["Estimated weight", `${Number(d.weightLbs).toLocaleString("en-US")} lbs`],
    ["Requested pickup date", d.pickupDate],
    ["Additional details", d.details],
    ["Received", new Date().toISOString()],
  ]);

  const subject = `Quote request: ${d.pickupLocation} → ${d.deliveryLocation} (${d.freightType})`;
  return deliver({
    subject,
    replyTo: d.email,
    text: `New quote request from the ${site.shortName} website\n\n${text}\n`,
    html: `<p style="font-family:Arial,Helvetica,sans-serif;font-size:15px">New quote request from the ${site.shortName} website</p>${html}`,
  });
}

export async function submitContactMessage(input: unknown): Promise<SubmitResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error);

  const blocked = await screen(parsed.data);
  if (blocked) return blocked;

  const d: ContactData = parsed.data;
  const { text, html } = renderRows([
    ["Name", d.fullName],
    ["Company", d.company],
    ["Email", d.email],
    ["Phone", d.phone],
    ["Message", d.message],
    ["Received", new Date().toISOString()],
  ]);

  const subject = `Website inquiry from ${d.fullName}${d.company ? ` (${d.company})` : ""}`;
  return deliver({
    subject,
    replyTo: d.email,
    text: `New message from the ${site.shortName} website\n\n${text}\n`,
    html: `<p style="font-family:Arial,Helvetica,sans-serif;font-size:15px">New message from the ${site.shortName} website</p>${html}`,
  });
}

/* ----------------------------------------------------------------------- */

function validationFailure(error: ZodError): SubmitResult {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in fieldErrors)) {
      fieldErrors[key] = issue.message;
    }
  }
  return {
    ok: false,
    code: "validation",
    message: "Please check the highlighted fields and try again.",
    fieldErrors,
  };
}

/** Honeypot, fill-time and rate-limit checks shared by both forms. */
async function screen(data: {
  website?: string;
  startedAt: number;
}): Promise<SubmitResult | null> {
  if (data.website || Date.now() - data.startedAt < MIN_FILL_TIME_MS) {
    return {
      ok: false,
      code: "spam",
      message: `We couldn't verify this submission. Please try again, or call ${site.phone.display}.`,
    };
  }

  const ip = await clientIp();
  // Without a trusted proxy header every visitor shares one bucket, so allow more.
  const limit = checkRateLimit(`inquiry:${ip}`, { max: ip === "unknown" ? 20 : 5 });
  if (!limit.allowed) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterMs / 60000));
    return {
      ok: false,
      code: "rate_limited",
      message: `Too many requests from your connection. Please wait about ${minutes} minute${minutes === 1 ? "" : "s"}, or call ${site.phone.display}.`,
    };
  }
  return null;
}

async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip")?.trim() || "unknown";
}

async function deliver(email: {
  subject: string;
  replyTo: string;
  text: string;
  html: string;
}): Promise<SubmitResult> {
  const result = await sendInquiryEmail(email);
  if (result.ok) return { ok: true };

  if (result.reason === "not_configured") {
    return {
      ok: false,
      code: "not_configured",
      message: `Our online form isn't available right now. ${CALL_US}`,
    };
  }
  return {
    ok: false,
    code: "delivery_failed",
    message: `We couldn't send your request. ${CALL_US}`,
  };
}
