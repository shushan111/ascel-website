"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
};

function SubmitButton() {
  const t = useTranslations("ContactPage");
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={buttonClassName("primary")} disabled={pending}>
      {pending ? t("sending") : t("submit")}
    </button>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full min-h-11 border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70";

export function ContactForm() {
  const t = useTranslations("ContactPage");
  const [state, action] = useActionState(submitContact, initialState);

  return (
    <form action={action} className="space-y-5" noValidate>
      <Field id="name" label={t("name")} error={state.errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(state.errors.name)}
          aria-describedby={state.errors.name ? "name-error" : undefined}
          className={inputClass}
        />
      </Field>
      <Field id="email" label={t("email")} error={state.errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(state.errors.email)}
          aria-describedby={state.errors.email ? "email-error" : undefined}
          className={inputClass}
        />
      </Field>
      <Field id="phone" label={t("phone")}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
        />
      </Field>
      <Field id="organization" label={t("organization")}>
        <input
          id="organization"
          name="organization"
          type="text"
          autoComplete="organization"
          className={inputClass}
        />
      </Field>
      <Field id="message" label={t("message")} error={state.errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(state.errors.message)}
          aria-describedby={state.errors.message ? "message-error" : undefined}
          className={`${inputClass} py-3`}
        />
      </Field>
      {state.message ? (
        <p
          className={
            state.status === "error" ? "text-sm text-red-700" : "text-sm text-accent"
          }
          role="status"
        >
          {state.message}
        </p>
      ) : null}
      <SubmitButton />
    </form>
  );
}
