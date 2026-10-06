"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Notice } from "@/components/ui/Notice";
import { AlertIcon, ArrowRightIcon } from "@/components/ui/icons";
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
    <button
      type="submit"
      className={buttonClassName("primary", "w-full sm:w-auto sm:min-w-[12rem]", "lg")}
      disabled={pending}
      aria-busy={pending || undefined}
    >
      {pending ? <span className="spinner" aria-hidden="true" /> : null}
      {pending ? t("sending") : t("submit")}
      {pending ? null : <ArrowRightIcon className="btn-arrow" />}
    </button>
  );
}

function Field({
  id,
  label,
  error,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span aria-hidden="true" className="ml-0.5 text-muted">*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex animate-fade-in items-center gap-1.5 text-[0.84375rem] text-danger">
          <AlertIcon className="h-3.5 w-3.5" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("ContactPage");
  const [state, action] = useActionState(submitContact, initialState);
  const values = state.values;

  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2" noValidate>
      <Field id="name" label={t("name")} error={state.errors.name} required>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={values?.name}
          aria-invalid={Boolean(state.errors.name)}
          aria-describedby={state.errors.name ? "name-error" : undefined}
          className="field"
        />
      </Field>
      <Field id="email" label={t("email")} error={state.errors.email} required>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={values?.email}
          aria-invalid={Boolean(state.errors.email)}
          aria-describedby={state.errors.email ? "email-error" : undefined}
          className="field"
        />
      </Field>
      <Field id="phone" label={t("phone")}>
        <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={values?.phone} className="field" />
      </Field>
      <Field id="organization" label={t("organization")}>
        <input
          id="organization"
          name="organization"
          type="text"
          autoComplete="organization"
          defaultValue={values?.organization}
          className="field"
        />
      </Field>
      <Field id="message" label={t("message")} error={state.errors.message} required className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={values?.message}
          aria-invalid={Boolean(state.errors.message)}
          aria-describedby={state.errors.message ? "message-error" : undefined}
          className="field"
        />
      </Field>

      {state.message ? (
        <Notice
          className="sm:col-span-2"
          tone={state.status === "error" ? "danger" : state.status === "pending" ? "warn" : "ok"}
          role={state.status === "error" ? "alert" : "status"}
          title={state.message}
        />
      ) : null}

      <div className="sm:col-span-2">
        <SubmitButton />
      </div>
    </form>
  );
}
