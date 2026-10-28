import { getTranslations } from "next-intl/server";
import { isVposConfigured, vposTestMode } from "@/lib/vpos";
import { isDonationStoreConfigured } from "@/lib/donations/store";
import { donationCurrencies, donationPresets, hasBankTransfer, payment } from "@/data/fundraising";
import { FactList } from "@/components/ui/FactList";
import { DonationForm } from "./DonationForm";

/**
 * The giving panel beside the donate page's opening. Online payment is on
 * once the Ameriabank vPOS and the donation store are configured on the
 * server; it takes AMD only for now (see DonationForm). Bank
 * transfer details appear under the panel once IBAN and beneficiary are filled
 * in src/data/fundraising.ts.
 */
export async function HowToGive() {
  const t = await getTranslations("DonatePage");

  const online = isVposConfigured() && isDonationStoreConfigured();
  const bank = payment.bankTransfer;
  const bankRows = [
    [t("beneficiary"), bank.beneficiary],
    [t("iban"), bank.iban],
    [t("swift"), bank.swift],
    [t("bank"), bank.bank],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <div className="min-w-0">
      <DonationForm
        currencies={online ? ["AMD"] : donationCurrencies}
        presets={donationPresets}
        online={online}
        testMode={online && vposTestMode()}
      />

      {hasBankTransfer() ? (
        <FactList
          className="mt-4"
          facts={bankRows.map(([label, value]) => ({
            label,
            value: <span className="break-all font-mono text-[0.92rem]">{value}</span>,
          }))}
        />
      ) : null}
    </div>
  );
}
