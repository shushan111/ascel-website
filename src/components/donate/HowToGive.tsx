import { getTranslations } from "next-intl/server";
import { donationConfig } from "@/lib/config";
import { donationCurrencies, donationPresets, hasBankTransfer, payment } from "@/data/fundraising";
import { DonationForm } from "./DonationForm";

/**
 * The giving panel beside the donate page's opening. What happens on submit
 * depends on whether a checkout URL is configured (see DonationForm). Bank
 * transfer details appear under the panel once IBAN and beneficiary are filled
 * in src/data/fundraising.ts.
 */
export async function HowToGive() {
  const t = await getTranslations("DonatePage");

  const checkoutUrl = payment.checkoutUrl || donationConfig.providerUrl || null;
  const bank = payment.bankTransfer;
  const bankRows = [
    [t("beneficiary"), bank.beneficiary],
    [t("iban"), bank.iban],
    [t("swift"), bank.swift],
    [t("bank"), bank.bank],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <div className="min-w-0">
      <DonationForm currencies={donationCurrencies} presets={donationPresets} checkoutUrl={checkoutUrl} />

      {hasBankTransfer() ? (
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {bankRows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[7rem_1fr] gap-4 py-3">
              <dt className="text-[0.9rem] text-muted">{label}</dt>
              <dd className="break-all font-mono text-[0.92rem] text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
