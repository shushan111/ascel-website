/**
 * Fundraising figures.
 *
 * The total budget and the amount raised are not known yet, and the client
 * may decide not to publish them at all. Nothing here is invented: every
 * value stays `null` until real numbers arrive, and `showProgress` is the
 * single switch that turns the progress display on everywhere at once.
 *
 * When the numbers exist:
 *   1. set `goal`, `raised` and `lastUpdated`
 *   2. set `showProgress: true`
 * Nothing else needs to change — every component reads `hasProgress()`.
 */
export interface FundraisingState {
  /** Master switch. While false, no progress bar, percentage or total renders. */
  showProgress: boolean;
  /** Total construction budget, in `currency`. */
  goal: number | null;
  /** Raised so far, in `currency`. */
  raised: number | null;
  currency: "AMD" | "USD" | "EUR";
  /** ISO date the figures were last confirmed by the client. */
  lastUpdated: string | null;
}

/**
 * Currencies offered in the donation form, first one is the default.
 * DRAFT — պատվիրատուի հաստատման կարիք ունի: whether USD/EUR are accepted
 * depends on the bank account (see CLIENT-CHECKLIST, section 3).
 */
export const donationCurrencies = ["AMD", "USD", "EUR"] as const;
export type DonationCurrency = (typeof donationCurrencies)[number];

/**
 * Quick-pick amounts under the amount field, per currency. They only fill
 * the field; a currency with no entry shows no presets.
 * DRAFT — պատվիրատուի հաստատման կարիք ունի (values suggested in review).
 */
export const donationPresets: Partial<Record<DonationCurrency, number[]>> = {
  AMD: [10000, 25000, 50000, 100000],
};

export const fundraising: FundraisingState = {
  showProgress: false,
  goal: null,
  raised: null,
  currency: "AMD",
  lastUpdated: null,
};

/** True only when the switch is on and both figures are actually present. */
export function hasProgress(): boolean {
  return (
    fundraising.showProgress &&
    typeof fundraising.goal === "number" &&
    typeof fundraising.raised === "number" &&
    fundraising.goal > 0
  );
}

/** Raised as a 0–100 percentage, or null when there is nothing to show. */
export function progressPercent(): number | null {
  if (!hasProgress()) return null;
  const pct = ((fundraising.raised as number) / (fundraising.goal as number)) * 100;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

/**
 * Payment provider. The whole donate path is built as if this exists; only
 * `DonateCheckout` reads it, so connecting the bank means filling this in and
 * replacing the body of that one component.
 */
export interface PaymentProvider {
  /** Display name, shown to the donor once a provider is live. */
  name: string | null;
  /** Hosted checkout URL, or null while the provider is not connected. */
  checkoutUrl: string | null;
  /** Bank transfer details, used while no provider is connected. */
  bankTransfer: {
    beneficiary: string | null;
    iban: string | null;
    swift: string | null;
    bank: string | null;
  };
}

export const payment: PaymentProvider = {
  name: null,
  checkoutUrl: null,
  bankTransfer: {
    beneficiary: null,
    iban: null,
    swift: null,
    bank: null,
  },
};

export function hasPaymentProvider(): boolean {
  return Boolean(payment.checkoutUrl);
}

export function hasBankTransfer(): boolean {
  return Boolean(payment.bankTransfer.iban && payment.bankTransfer.beneficiary);
}
