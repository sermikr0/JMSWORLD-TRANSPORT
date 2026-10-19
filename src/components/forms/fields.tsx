"use client";

import type { ComponentProps, ReactNode, Ref } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { site, telHref } from "@/lib/site";

const controlBase =
  "w-full rounded-sm border bg-white px-4 text-[15px] text-ink-900 transition-colors placeholder:text-ink-400 focus:outline-none focus:ring-2 disabled:bg-ink-50";

function controlState(invalid: boolean) {
  return invalid
    ? "border-red-600 focus:border-red-600 focus:ring-red-600/20"
    : "border-ink-300 hover:border-ink-400 focus:border-accent-500 focus:ring-accent-500/25";
}

function describedBy(id: string, hint?: string, error?: string) {
  const ids = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

type ShellProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: ShellProps & { children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink-800">
        {label}
        {required && (
          <span className="ml-1 text-accent-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-[13px] text-ink-500">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="flex items-start gap-1.5 text-[13px] font-medium text-red-700"
        >
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = ShellProps & Omit<ComponentProps<"input">, "id" | "className">;

export function TextField({
  id,
  label,
  hint,
  error,
  required,
  className,
  ...input
}: InputProps) {
  return (
    <FieldShell {...{ id, label, hint, error, required, className }}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlBase, "h-12", controlState(Boolean(error)))}
        {...input}
      />
    </FieldShell>
  );
}

type SelectProps = ShellProps &
  Omit<ComponentProps<"select">, "id" | "className"> & {
    options: readonly string[];
    placeholder?: string;
  };

export function SelectField({
  id,
  label,
  hint,
  error,
  required,
  className,
  options,
  placeholder = "Select an option",
  ...select
}: SelectProps) {
  return (
    <FieldShell {...{ id, label, hint, error, required, className }}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-required={required || undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cn(
            controlBase,
            "h-12 appearance-none pr-11",
            controlState(Boolean(error)),
          )}
          {...select}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
          aria-hidden="true"
        />
      </div>
    </FieldShell>
  );
}

type TextAreaProps = ShellProps &
  Omit<ComponentProps<"textarea">, "id" | "className">;

export function TextAreaField({
  id,
  label,
  hint,
  error,
  required,
  className,
  rows = 5,
  ...textarea
}: TextAreaProps) {
  return (
    <FieldShell {...{ id, label, hint, error, required, className }}>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(
          controlBase,
          "min-h-32 resize-y py-3 leading-relaxed",
          controlState(Boolean(error)),
        )}
        {...textarea}
      />
    </FieldShell>
  );
}

/** Optional, unchecked-by-default opt-in to text messages (SMS consent). */
export function SmsConsentField({
  id,
  ...input
}: { id: string } & Omit<ComponentProps<"input">, "id" | "className" | "type">) {
  const linkClass =
    "font-medium text-navy-900 underline-offset-4 hover:underline";
  return (
    <div className="flex gap-3 rounded-sm border border-ink-200 bg-ink-50 p-5">
      <input
        id={id}
        type="checkbox"
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-accent-600"
        {...input}
      />
      <div>
        <label htmlFor={id} className="cursor-pointer">
          <span className="block text-sm font-semibold text-ink-800">
            SMS consent (optional)
          </span>
          <span className="mt-2 block text-sm leading-relaxed text-ink-600">
            I agree to receive text messages from JMSWORLD Transport LLC
            regarding shipment updates, pickup and delivery coordination,
            dispatch communications, and responses to my inquiries. Message
            frequency varies. Message and data rates may apply. Reply STOP to
            opt out or HELP for assistance. Consent is not a condition of
            purchasing any service.
          </span>
        </label>
        <p className="mt-2 text-[13px] text-ink-500">
          <a href="/privacy" target="_blank" rel="noopener" className={linkClass}>
            Privacy Policy
          </a>
          {" · "}
          <a
            href="/privacy#sms-messaging"
            target="_blank"
            rel="noopener"
            className={linkClass}
          >
            SMS Terms &amp; Conditions
          </a>
        </p>
      </div>
    </div>
  );
}

/** Honeypot: invisible to people, tempting to bots. Must be submitted empty. */
export function Honeypot({
  id,
  ...input
}: { id: string } & Omit<ComponentProps<"input">, "id" | "className">) {
  return (
    <div className="hp-field" aria-hidden="true">
      <label htmlFor={id}>Leave this field empty</label>
      <input id={id} type="text" tabIndex={-1} autoComplete="off" {...input} />
    </div>
  );
}

export function FormAlert({
  message,
  ref,
}: {
  message: string;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      role="alert"
      tabIndex={-1}
      className="flex gap-3 rounded-sm border border-red-200 bg-red-50 p-4 text-[15px] text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600/30"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
      <div>
        <p>{message}</p>
        <a
          href={telHref}
          className="mt-2 inline-flex items-center gap-2 font-semibold text-red-900 underline-offset-4 hover:underline"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {site.phone.display}
        </a>
      </div>
    </div>
  );
}

export function SubmitButton({
  pending,
  pendingLabel = "Sending…",
  children,
}: {
  pending: boolean;
  pendingLabel?: string;
  children: ReactNode;
}) {
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      aria-busy={pending}
      className="w-full sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export function SuccessPanel({
  title,
  children,
  onReset,
  resetLabel,
  ref,
}: {
  title: string;
  children: ReactNode;
  onReset: () => void;
  resetLabel: string;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      role="status"
      tabIndex={-1}
      className="rounded-sm border border-ink-200 bg-ink-50 p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/30"
    >
      <CheckCircle2 className="h-9 w-9 text-accent-600" aria-hidden="true" />
      <h3 className="mt-5 display text-3xl text-navy-900">
        {title}
      </h3>
      <div className="mt-3 space-y-3 leading-relaxed text-ink-600">{children}</div>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button variant="secondary" onClick={onReset}>
          {resetLabel}
        </Button>
        <a
          href={telHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 underline-offset-4 hover:underline"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {site.phone.display}
        </a>
      </div>
    </div>
  );
}
