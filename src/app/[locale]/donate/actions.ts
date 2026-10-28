"use server";

import { routing } from "@/i18n/routing";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import {
  initPayment,
  isVposConfigured,
  paymentPageUrl,
  VPOS_TEST_AMOUNT,
  vposReturnOrigin,
  vposTestMode,
} from "@/lib/vpos";
import {
  createDonation,
  isDonationStoreConfigured,
  logEntry,
  nextOrderId,
  updateDonation,
} from "@/lib/donations/store";

export type DonationField = "amount" | "firstName" | "lastName" | "email";

export type StartDonationResult =
  | { ok: true; url: string }
  | {
      ok: false;
      error: "invalid" | "rateLimited" | "unavailable" | "failed";
      fields?: Partial<Record<DonationField, "required" | "invalidAmount" | "invalidEmail">>;
    };

const MIN_AMOUNT = 100;
const MAX_AMOUNT = 10_000_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Starts a donation: validates the form again (the browser's checks are a
 * convenience, not a guarantee), records the donation as pending, registers
 * it with the bank and returns the bank's payment page. Card details are
 * entered only there. The amount charged, the currency and the return address
 * are decided here, never taken from the request.
 */
export async function startDonation(formData: FormData): Promise<StartDonationResult> {
  const value = (key: string) => String(formData.get(key) ?? "").trim();

  // Hidden field a person never fills in; a bot filling every input does.
  if (value("website")) return { ok: false, error: "failed" };

  const ip = await clientIp();
  if (!rateLimit(`donate:${ip}`, 5, 10 * 60 * 1000) || !rateLimit("donate:all", 120, 10 * 60 * 1000)) {
    return { ok: false, error: "rateLimited" };
  }

  const locale = (routing.locales as readonly string[]).includes(value("locale"))
    ? value("locale")
    : routing.defaultLocale;
  const firstName = value("firstName").slice(0, 80);
  const lastName = value("lastName").slice(0, 80);
  const email = value("email").slice(0, 200);
  const requestedAmount = Number(value("amount").replace(/[\s, ]/g, ""));
  const showName = formData.get("showName") === "on";

  const fields: NonNullable<Extract<StartDonationResult, { ok: false }>["fields"]> = {};
  if (!Number.isSafeInteger(requestedAmount) || requestedAmount < MIN_AMOUNT || requestedAmount > MAX_AMOUNT) {
    fields.amount = "invalidAmount";
  }
  if (!firstName) fields.firstName = "required";
  if (!lastName) fields.lastName = "required";
  if (!email) fields.email = "required";
  else if (!emailPattern.test(email)) fields.email = "invalidEmail";
  if (Object.keys(fields).length) return { ok: false, error: "invalid", fields };

  if (!isVposConfigured() || !isDonationStoreConfigured()) return { ok: false, error: "unavailable" };

  const testMode = vposTestMode();
  const amount = testMode ? VPOS_TEST_AMOUNT : requestedAmount;

  let donationId: string | null = null;
  try {
    const orderId = await nextOrderId(testMode);
    const donation = await createDonation({
      orderId,
      amount,
      requestedAmount,
      testMode,
      locale,
      firstName,
      lastName,
      email,
      showName,
    });
    donationId = donation._id;

    const { paymentId } = await initPayment({
      orderId,
      amount,
      description: `ASCEL donation #${orderId}`,
      backUrl: `${vposReturnOrigin()}/api/donations/return/${locale}`,
    });
    await updateDonation(donation._id, { paymentId }, logEntry({ action: "sent to bank", ok: true }));
    return { ok: true, url: paymentPageUrl(paymentId, locale) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error(`[donate] start failed: ${message}`);
    if (donationId) {
      await updateDonation(donationId, { status: "failed" }, logEntry({ action: "start failed", ok: false, message }))
        .catch(() => undefined);
    }
    return { ok: false, error: "failed" };
  }
}
