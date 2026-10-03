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
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full min-h-11 rounded-md border border-line-strong bg-paper px-3.5 text-sm text-ink transition-colors placeholder:text-muted/70 hover:border-muted/50 focus:border-ink aria-[invalid=true]:border-danger";

export function ContactForm() {
  const t = useTranslations("ContactPage");
  const [state, action] = useActionState(submitContact, initialState);

  return (
    <form action={action} className="space-y-6" noValidate>
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
          className={`${inputClass} py-3 leading-7`}
        />
      </Field>
      {state.message ? (
        <p
          className={
            state.status === "error"
              ? "text-sm leading-6 text-danger"
              : "text-sm leading-6 text-ok"
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
