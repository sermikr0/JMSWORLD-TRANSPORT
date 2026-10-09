import { Resend } from "resend";

/**
 * Email delivery for website inquiries, via Resend.
 *
 * Configuration (see .env.example):
 *   RESEND_API_KEY      API key from https://resend.com
 *   INQUIRY_TO_EMAIL    Inbox(es) that receive inquiries, comma-separated
 *   INQUIRY_FROM_EMAIL  Sender on a domain verified in Resend
 *
 * Nothing here is ever imported by client code; `resend` runs server-side only.
 */

export type InquiryEmail = {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
};

export type MailResult =
  | { ok: true; id?: string }
  | { ok: false; reason: "not_configured" | "delivery_failed" };

export async function sendInquiryEmail(email: InquiryEmail): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = (process.env.INQUIRY_TO_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!apiKey || !from || to.length === 0) {
    console.warn(
      "[mail] Inquiry email is not configured. Set RESEND_API_KEY, INQUIRY_FROM_EMAIL and INQUIRY_TO_EMAIL.",
    );
    return { ok: false, reason: "not_configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (error) {
      // Log the provider error for operators; never return it to the browser.
      console.error("[mail] Resend rejected the message:", error.name, error.message);
      return { ok: false, reason: "delivery_failed" };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    console.error(
      "[mail] Failed to send inquiry email:",
      err instanceof Error ? err.message : err,
    );
    return { ok: false, reason: "delivery_failed" };
  }
}

/** Escapes a string for safe interpolation into HTML email markup. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Renders label/value rows as both plain text and a simple HTML table. */
export function renderRows(rows: Array<[label: string, value: string]>) {
  const text = rows
    .map(([label, value]) => `${label}: ${value || "—"}`)
    .join("\n");

  const html = `<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#171b21">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#667082;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;vertical-align:top;white-space:pre-wrap">${escapeHtml(value || "—")}</td></tr>`,
    )
    .join("")}</table>`;

  return { text, html };
}
