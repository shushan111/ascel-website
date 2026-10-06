"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Notice } from "@/components/ui/Notice";
import { AlertIcon, ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

type Errors = Partial<Record<"amount" | "firstName" | "lastName" | "email", string>>;

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="field-label">
      {children}
      {required ? <span aria-hidden="true" className="ml-0.5 text-muted">*</span> : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-1.5 flex animate-fade-in items-center gap-1.5 text-[0.84375rem] text-danger">
      <AlertIcon className="h-3.5 w-3.5" />
      {message}
    </p>
  ) : null;
}

/**
 * One donation panel: amount (the main element), the donor's name and email,
 * the bronze action. It never asks for card details — those belong on the
 * payment provider's own page. With a checkout URL configured, a valid form is
 * handed to that page as query parameters (rename them to match the provider
 * once it is chosen). Without one, the panel says plainly that nothing was
 * sent and points to the contact page.
 */
export function DonationForm({
  currencies,
  presets,
  checkoutUrl,
}: {
  currencies: readonly string[];
  presets: Partial<Record<string, number[]>>;
  checkoutUrl: string | null;
}) {
  const t = useTranslations("DonateForm");
  const page = useTranslations("DonatePage");
  const locale = useLocale();
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [currency, setCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState("");

  // A fixed grouping rather than Intl: Node and the browser ship different
  // Armenian locale data ("10 000" vs "10,000"), which broke hydration.
  const groupSeparator = locale === "en" ? "," : " ";
  const format = (value: number) =>
    String(value).replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
  const amountNumber = Number(amount.replace(/[\s, ]/g, ""));
  const quick = presets[currency] ?? [];

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const next: Errors = {};
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) next.amount = t("invalidAmount");
    if (!value("firstName")) next.firstName = t("required");
    if (!value("lastName")) next.lastName = t("required");
    if (!value("email")) next.email = t("required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) next.email = t("invalidEmail");
    setErrors(next);
    if (Object.keys(next).length) {
      // Take the visitor to the first problem rather than leaving them to find it.
      const first = Object.keys(next)[0];
      const field = event.currentTarget.querySelector<HTMLElement>(
        first === "amount" ? `#${CSS.escape(`${id}-amount`)}` : `[name="${first}"]`,
      );
      field?.focus();
      return;
    }

    if (!checkoutUrl) {
      setPending(true);
      return;
    }
    setRedirecting(true);
    const url = new URL(checkoutUrl);
    url.searchParams.set("amount", String(amountNumber));
    url.searchParams.set("currency", currency);
    for (const key of ["firstName", "lastName", "email"]) url.searchParams.set(key, value(key));
    window.location.assign(url.toString());
  }

  const describe = (key: keyof Errors) => (errors[key] ? `${id}-${key}-error` : undefined);
  const clear = (key: keyof Errors) =>
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="card min-w-0 p-6 shadow-panel sm:p-8"
    >
      <h2 className="t-h3 text-ink">{page("howTitle")}</h2>
      <p className="t-small mt-1.5 text-muted">{t("intro")}</p>

      {/* Amount — the main element of the panel. */}
      <fieldset className="mt-7 min-w-0">
        <legend className="field-label">{t("amountTitle")}</legend>
        <div
          className={cn(
            "flex min-h-16 items-stretch overflow-hidden rounded-sm border bg-paper transition-[border-color,box-shadow] duration-200 focus-within:border-ink focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-ink)_12%,transparent)]",
            errors.amount ? "border-danger" : "border-line-strong hover:border-muted",
          )}
        >
          <label htmlFor={`${id}-currency`} className="sr-only">{t("currencyLabel")}</label>
          <select
            id={`${id}-currency`}
            name="currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            className="w-[5.5rem] shrink-0 border-r border-line bg-sand pl-4 text-[0.9375rem] font-medium text-ink focus-visible:outline-none"
          >
            {currencies.map((code) => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
          <label htmlFor={`${id}-amount`} className="sr-only">{t("amountLabel")}</label>
          <input
            id={`${id}-amount`}
            name="amount"
            type="text"
            inputMode="decimal"
            autoComplete="transaction-amount"
            placeholder={t("amountPlaceholder")}
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              clear("amount");
            }}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={describe("amount")}
            className="min-w-0 flex-1 bg-transparent px-4 font-display text-[1.625rem] tabular-nums text-ink placeholder:font-sans placeholder:text-[1rem] placeholder:text-muted/60 focus-visible:outline-none"
          />
        </div>
        <FieldError id={`${id}-amount-error`} message={errors.amount} />

        {quick.length ? (
          <div role="group" aria-label={t("presetsLabel")} className="mt-3 grid grid-cols-2 gap-2 min-[420px]:grid-cols-4">
            {quick.map((preset) => {
              const active = amountNumber === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setAmount(String(preset));
                    clear("amount");
                  }}
                  className={cn(
                    "inline-flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-sm border px-1 text-[0.9375rem] tabular-nums transition-colors duration-200 active:translate-y-px",
                    active
                      ? "border-accent bg-accent-soft font-medium text-ink"
                      : "border-line-strong bg-paper text-muted hover:border-ink hover:text-ink",
                  )}
                >
                  {active ? <CheckIcon className="h-3.5 w-3.5 text-accent-ink" /> : null}
                  {format(preset)}
                </button>
              );
            })}
          </div>
        ) : null}
      </fieldset>

      <fieldset className="mt-7 min-w-0 border-t border-line pt-6">
        <legend className="sr-only">{t("detailsTitle")}</legend>
        <p aria-hidden="true" className="t-label mb-4 text-ink">{t("detailsTitle")}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <Label htmlFor={`${id}-first`} required>{t("firstName")}</Label>
            <input id={`${id}-first`} name="firstName" autoComplete="given-name" aria-invalid={Boolean(errors.firstName)} aria-describedby={describe("firstName")} onChange={() => clear("firstName")} className="field" />
            <FieldError id={`${id}-firstName-error`} message={errors.firstName} />
          </div>
          <div>
            <Label htmlFor={`${id}-last`} required>{t("lastName")}</Label>
            <input id={`${id}-last`} name="lastName" autoComplete="family-name" aria-invalid={Boolean(errors.lastName)} aria-describedby={describe("lastName")} onChange={() => clear("lastName")} className="field" />
            <FieldError id={`${id}-lastName-error`} message={errors.lastName} />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor={`${id}-email`} required>{t("email")}</Label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={describe("email")} onChange={() => clear("email")} className="field" />
          <FieldError id={`${id}-email-error`} message={errors.email} />
        </div>
      </fieldset>

      <button
        type="submit"
        aria-busy={redirecting || undefined}
        className={buttonClassName("support", "mt-7 w-full", "lg")}
      >
        {redirecting ? <span className="spinner" aria-hidden="true" /> : null}
        {t("submit")}
        {redirecting ? null : <ArrowRightIcon className="btn-arrow" />}
      </button>

      {checkoutUrl ? <p className="t-caption mt-3 text-center text-muted">{t("cardNote")}</p> : null}

      {pending ? (
        <Notice tone="warn" title={t("pendingTitle")} className="mt-5">
          {t("pendingBody")}
        </Notice>
      ) : null}

      <p className="mt-5 border-t border-line pt-5 text-center">
        <Link
          href="/contact"
          className="text-[0.9375rem] text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
          {page("contactCta")}
        </Link>
      </p>
    </form>
  );
}
