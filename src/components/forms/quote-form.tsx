"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormAlert,
  Honeypot,
  SelectField,
  SmsConsentField,
  SubmitButton,
  SuccessPanel,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { site, telHref } from "@/lib/site";
import {
  FREIGHT_TYPES,
  quoteSchema,
  type QuoteData,
  type QuoteInput,
} from "@/lib/validation";
import { submitQuoteRequest, type SubmitResult } from "@/server/actions";

const defaultValues: QuoteInput = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  pickupLocation: "",
  deliveryLocation: "",
  freightType: "",
  weightLbs: "",
  pickupDate: "",
  details: "",
  smsConsent: false,
  website: "",
  startedAt: 0,
};

/** Today's date in the visitor's time zone as YYYY-MM-DD (client only). */
function todayLocalISO() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
}
const noSubscription = () => () => {};

export function QuoteForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<SubmitResult | null>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Rendered as undefined on the server, then today's local date in the browser.
  const minDate = useSyncExternalStore(noSubscription, todayLocalISO, () => undefined);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<QuoteInput, unknown, QuoteData>({
    resolver: zodResolver(quoteSchema),
    defaultValues,
    mode: "onTouched",
  });

  // Record when the form became interactive; the server rejects instant submissions.
  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  // Move focus to the outcome so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (!result) return;
    (result.ok ? successRef : alertRef).current?.focus();
  }, [result]);

  const onSubmit = handleSubmit((data) => {
    setResult(null);
    startTransition(async () => {
      let res: SubmitResult;
      try {
        res = await submitQuoteRequest(data);
      } catch {
        res = {
          ok: false,
          code: "delivery_failed",
          message: `We couldn't reach the server. Please check your connection and try again, or call ${site.phone.display}.`,
        };
      }
      if (!res.ok && res.fieldErrors) {
        for (const [name, message] of Object.entries(res.fieldErrors)) {
          setError(name as keyof QuoteInput, { type: "server", message });
        }
      }
      if (res.ok) reset(defaultValues);
      setResult(res);
    });
  });

  if (result?.ok) {
    return (
      <SuccessPanel
        ref={successRef}
        title="Your quote request is in."
        resetLabel="Submit another request"
        onReset={() => setResult(null)}
      >
        <p>
          Thanks — we have the details and will review them. We&apos;ll follow
          up by email or phone to confirm anything we need before sending a
          quote.
        </p>
        <p>If the shipment is time-critical, call us directly.</p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <p className="text-sm text-ink-500">
        Required fields are marked with{" "}
        <span className="text-accent-600" aria-hidden="true">
          *
        </span>
        <span className="sr-only">an asterisk</span>.
      </p>

      <fieldset className="space-y-5">
        <legend className="eyebrow text-ink-500">Your contact details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="fullName"
            label="Full name"
            required
            autoComplete="name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <TextField
            id="company"
            label="Company name"
            autoComplete="organization"
            error={errors.company?.message}
            {...register("company")}
          />
          <TextField
            id="email"
            label="Email address"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <TextField
            id="phone"
            label="Phone number"
            type="tel"
            required
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
        <SmsConsentField id="smsConsent" {...register("smsConsent")} />
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="eyebrow text-ink-500">Shipment</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="pickupLocation"
            label="Pickup location"
            required
            hint="City and state, or ZIP code"
            autoComplete="off"
            error={errors.pickupLocation?.message}
            {...register("pickupLocation")}
          />
          <TextField
            id="deliveryLocation"
            label="Delivery location"
            required
            hint="City and state, or ZIP code"
            autoComplete="off"
            error={errors.deliveryLocation?.message}
            {...register("deliveryLocation")}
          />
          <SelectField
            id="freightType"
            label="Freight type"
            required
            options={FREIGHT_TYPES}
            placeholder="Select freight type"
            error={errors.freightType?.message}
            {...register("freightType")}
          />
          <TextField
            id="weightLbs"
            label="Estimated weight (lbs)"
            required
            inputMode="numeric"
            placeholder="e.g. 12,000"
            hint="An estimate is fine"
            error={errors.weightLbs?.message}
            {...register("weightLbs")}
          />
          <TextField
            id="pickupDate"
            label="Requested pickup date"
            type="date"
            required
            min={minDate}
            error={errors.pickupDate?.message}
            {...register("pickupDate")}
          />
        </div>
        <TextAreaField
          id="details"
          label="Additional shipment details"
          hint="Dimensions, pallet count, equipment needs, delivery appointment requirements, or anything else we should know."
          error={errors.details?.message}
          {...register("details")}
        />
      </fieldset>

      <Honeypot id="quote-website" {...register("website")} />

      {result && !result.ok && <FormAlert ref={alertRef} message={result.message} />}

      <div className="flex flex-col gap-5 border-t border-ink-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton pending={pending}>Send quote request</SubmitButton>
        <p className="text-sm text-ink-500">
          Prefer to talk?{" "}
          <a
            href={telHref}
            className="font-semibold text-navy-900 underline-offset-4 hover:underline"
          >
            Call {site.phone.display}
          </a>
        </p>
      </div>
    </form>
  );
}
