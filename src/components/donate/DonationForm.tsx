"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"amount" | "firstName" | "lastName" | "email", string>>;

const fieldClass =
  "min-h-13 w-full min-w-0 rounded-[2px] border border-line bg-canvas px-4 text-[1rem] text-ink transition-colors duration-200 placeholder:text-muted/55 hover:border-line-strong focus:border-ink focus-visible:outline-none aria-[invalid=true]:border-danger";

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[0.875rem] text-muted">
      {children}
      {required ? <span aria-hidden="true" className="ml-0.5 text-muted/60">*</span> : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} role="alert" className="mt-1.5 text-[0.85rem] text-danger">
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
  const [currency, setCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState("");

  // A fixed grouping rather than Intl: Node and the browser ship different
  // Armenian locale data ("10 000" vs "10,000"), which broke hydration.
  const groupSeparator = locale === "en" ? "," : "\u00a0";
  const format = (value: number) =>
    String(value).replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
  const amountNumber = Number(amount.replace(/[\s, ]/g, ""));
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
    if (Object.keys(next).length) return;

    if (!checkoutUrl) {
      setPending(true);
      return;
    }
    const url = new URL(checkoutUrl);
    url.searchParams.set("amount", String(amountNumber));
    url.searchParams.set("currency", currency);
    for (const key of ["firstName", "lastName", "email"]) url.searchParams.set(key, value(key));
    window.location.assign(url.toString());
  }

  const describe = (key: keyof Errors) => (errors[key] ? `${id}-${key}-error` : undefined);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="min-w-0 border border-line bg-paper px-6 py-7 sm:px-8 sm:py-8"
    >
      <h2 className="t-h3 text-ink">{page("howTitle")}</h2>
      <p className="t-small mt-1.5 text-muted">{t("intro")}</p>

      {/* Amount — the main element of the panel. */}
      <fieldset className="mt-6 min-w-0">
        <legend className="mb-2.5 text-[0.95rem] text-ink">{t("amountTitle")}</legend>
        <div
          className={cn(
            "flex min-h-16 items-stretch rounded-[2px] border bg-canvas transition-colors duration-200 focus-within:border-ink",
            errors.amount ? "border-danger" : "border-line-strong",
          )}
        >
          <label htmlFor={`${id}-currency`} className="sr-only">{t("currencyLabel")}</label>
          <select
            id={`${id}-currency`}
            name="currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            className="w-[5.25rem] shrink-0 cursor-pointer border-r border-line bg-transparent pl-4 text-[0.95rem] font-medium text-ink focus-visible:outline-none"
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
            onChange={(event) => setAmount(event.target.value)}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={describe("amount")}
            className="min-w-0 flex-1 bg-transparent px-4 font-display text-[1.5rem] tabular-nums text-ink placeholder:font-sans placeholder:text-[1rem] placeholder:text-muted/55 focus-visible:outline-none"
          />
        </div>
        <FieldError id={`${id}-amount-error`} message={errors.amount} />

        {quick.length ? (
          <div role="group" aria-label={t("presetsLabel")} className="mt-3 grid grid-cols-4 gap-2">
            {quick.map((preset) => {
              const active = amountNumber === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setAmount(String(preset));
                    setErrors((current) => ({ ...current, amount: undefined }));
                  }}
                  className={cn(
                    "min-h-10 min-w-0 rounded-[2px] border px-1 text-[0.875rem] tabular-nums transition-colors duration-200",
                    active
                      ? "border-accent bg-accent/12 text-ink"
                      : "border-line text-muted hover:border-line-strong hover:text-ink",
                  )}
                >
                  {format(preset)}
                </button>
              );
            })}
          </div>
        ) : null}
      </fieldset>

      <div aria-hidden="true" className="my-6 h-px bg-line" />

      <fieldset className="min-w-0">
        <legend className="mb-3 text-[0.95rem] text-ink">{t("detailsTitle")}</legend>
        <div className="grid gap-3 xl:grid-cols-2">
          <div>
            <Label htmlFor={`${id}-first`} required>{t("firstName")}</Label>
            <input id={`${id}-first`} name="firstName" autoComplete="given-name" aria-invalid={Boolean(errors.firstName)} aria-describedby={describe("firstName")} className={fieldClass} />
            <FieldError id={`${id}-firstName-error`} message={errors.firstName} />
          </div>
          <div>
            <Label htmlFor={`${id}-last`} required>{t("lastName")}</Label>
            <input id={`${id}-last`} name="lastName" autoComplete="family-name" aria-invalid={Boolean(errors.lastName)} aria-describedby={describe("lastName")} className={fieldClass} />
            <FieldError id={`${id}-lastName-error`} message={errors.lastName} />
          </div>
        </div>
        <div className="mt-3">
          <Label htmlFor={`${id}-email`} required>{t("email")}</Label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={describe("email")} className={fieldClass} />
          <FieldError id={`${id}-email-error`} message={errors.email} />
        </div>
      </fieldset>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-[2px] bg-accent px-6 text-[1rem] font-medium tracking-[0.01em] text-ink transition-colors duration-300 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ink"
      >
        {t("submit")}
      </button>

      {checkoutUrl ? <p className="mt-3 text-[0.82rem] leading-5 text-muted">{t("cardNote")}</p> : null}

      {pending ? (
        <div role="status" className="mt-5 border-l-2 border-accent pl-4">
          <p className="text-[0.95rem] font-medium text-ink">{t("pendingTitle")}</p>
          <p className="t-small mt-1.5 text-muted">{t("pendingBody")}</p>
        </div>
      ) : null}

      <Link
        href="/contact"
        className="mt-4 inline-block text-[0.9rem] text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
      >
        {page("contactCta")}
      </Link>
    </form>
  );
}
