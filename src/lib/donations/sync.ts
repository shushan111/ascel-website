import "server-only";

import { getPaymentDetails, VPOS_ORDER_STATUS, type PaymentDetails } from "@/lib/vpos";
import { logEntry, updateDonation } from "./store";
import type { Donation, DonationStatus } from "./types";

/** The bank's payment session lasts 20 minutes; after that an unpaid order is dead. */
const SESSION_MS = 25 * 60 * 1000;

/**
 * Turns the bank's answer into our status. The bank is the only source of
 * truth: nothing the donor's browser sends (the BackURL query) is used here.
 * An answer that does not match our record — another order, another amount —
 * is never treated as paid; it is flagged for a person to look at.
 */
export function statusFromDetails(donation: Donation, details: PaymentDetails): DonationStatus {
  if (details.orderId !== donation.orderId) return "needsReview";
  const settled =
    details.orderStatus === VPOS_ORDER_STATUS.deposited || details.orderStatus === VPOS_ORDER_STATUS.refunded;
  if (settled && details.amount !== donation.amount) return "needsReview";

  switch (details.orderStatus) {
    case VPOS_ORDER_STATUS.deposited:
    case VPOS_ORDER_STATUS.refunded:
      if (details.refundedAmount <= 0) return "paid";
      return details.refundedAmount >= details.amount ? "refunded" : "partiallyRefunded";
    case VPOS_ORDER_STATUS.void:
      return "cancelled";
    case VPOS_ORDER_STATUS.declined:
      return "failed";
    case VPOS_ORDER_STATUS.approved:
    case VPOS_ORDER_STATUS.autoAuthorized:
      // Blocked on the card but not captured: single-stage payments should not
      // stop here, so a person checks it rather than the site guessing.
      return "needsReview";
    default: {
      const age = Date.now() - Date.parse(donation._createdAt);
      return age > SESSION_MS ? "expired" : "pending";
    }
  }
}

/**
 * Asks the bank about one donation and stores the answer. Safe to run any
 * number of times: the same answer leaves the record as it was, apart from
 * the time of the check.
 */
export async function syncDonation(
  donation: Donation,
  by = "system",
): Promise<{ donation: Donation; details: PaymentDetails }> {
  if (!donation.paymentId) throw new Error("Donation has no PaymentID");
  const details = await getPaymentDetails(donation.paymentId);
  const status = statusFromDetails(donation, details);
  const now = new Date().toISOString();

  const set: Partial<Donation> = {
    status,
    bankOrderStatus: details.orderStatus ?? undefined,
    bankResponseCode: details.responseCode,
    refundedAmount: details.refundedAmount,
    checkedAt: now,
  };
  if (details.cardNumber) set.cardNumber = details.cardNumber;
  if (details.approvalCode) set.approvalCode = details.approvalCode;
  if (status === "paid" && !donation.paidAt) set.paidAt = now;

  const changed = status !== donation.status || details.refundedAmount !== (donation.refundedAmount ?? 0);
  const entry = changed
    ? logEntry({
        action: `status: ${status}`,
        ok: status !== "needsReview",
        by,
        message: `bank OrderStatus ${details.orderStatus ?? "-"}, ResponseCode ${details.responseCode || "-"}`,
      })
    : undefined;

  await updateDonation(donation._id, set, entry);
  return { donation: { ...donation, ...set }, details };
}
