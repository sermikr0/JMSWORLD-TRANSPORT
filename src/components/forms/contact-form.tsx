"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormAlert,
  Honeypot,
  SubmitButton,
  SuccessPanel,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { site } from "@/lib/site";
import {
  contactSchema,
  type ContactData,
  type ContactInput,
} from "@/lib/validation";
import { submitContactMessage, type SubmitResult } from "@/server/actions";

const defaultValues: ContactInput = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  website: "",
  startedAt: 0,
};

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<SubmitResult | null>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onTouched",
  });

  // Record when the form became interactive; the server rejects instant submissions.
  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  useEffect(() => {
    if (!result) return;
    (result.ok ? successRef : alertRef).current?.focus();
  }, [result]);

  const onSubmit = handleSubmit((data) => {
    setResult(null);
    startTransition(async () => {
      let res: SubmitResult;
      try {
        res = await submitContactMessage(data);
      } catch {
        res = {
          ok: false,
          code: "delivery_failed",
          message: `We couldn't reach the server. Please check your connection and try again, or call ${site.phone.display}.`,
        };
      }
      if (!res.ok && res.fieldErrors) {
        for (const [name, message] of Object.entries(res.fieldErrors)) {
          setError(name as keyof ContactInput, { type: "server", message });
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
        title="Message received."
        resetLabel="Send another message"
        onReset={() => setResult(null)}
      >
        <p>
          Thanks for reaching out. We&apos;ll reply by email, or by phone if
          you included a number.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="contact-fullName"
          label="Full name"
          required
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <TextField
          id="contact-company"
          label="Company"
          autoComplete="organization"
          error={errors.company?.message}
          {...register("company")}
        />
        <TextField
          id="contact-email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          id="contact-phone"
          label="Phone number"
          type="tel"
          autoComplete="tel"
          hint="Optional"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>
      <TextAreaField
        id="contact-message"
        label="How can we help?"
        required
        rows={6}
        error={errors.message?.message}
        {...register("message")}
      />

      <Honeypot id="contact-website" {...register("website")} />

      {result && !result.ok && <FormAlert ref={alertRef} message={result.message} />}

      <SubmitButton pending={pending}>Send message</SubmitButton>
    </form>
  );
}
