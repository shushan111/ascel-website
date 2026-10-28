/**
 * Shared by the server code and the Studio, so it imports nothing.
 *
 * Every donation document lives at `donation.<uuid>`: Sanity hides IDs that
 * contain a dot from requests without a token, so the public dataset never
 * serves a donor's name or email to the open API or CDN.
 */

export const DONATION_ID_PREFIX = "donation.";
export const DONATION_REQUEST_ID_PREFIX = "donationRequest.";

export const donationStatuses = [
  "pending",
  "paid",
  "partiallyRefunded",
  "refunded",
  "cancelled",
  "failed",
  "expired",
  "needsReview",
] as const;
export type DonationStatus = (typeof donationStatuses)[number];

/** Studio labels; the site has its own translated wording. */
export const donationStatusLabels: Record<DonationStatus, string> = {
  pending: "Սպասվող",
  paid: "Վճարված",
  partiallyRefunded: "Մասնակի վերադարձված",
  refunded: "Վերադարձված",
  cancelled: "Չեղարկված",
  failed: "Չստացված",
  expired: "Ժամկետանց",
  needsReview: "Ստուգման կարիք ունի",
};

export const donationAdminActions = ["sync", "cancel", "refund"] as const;
export type DonationAdminAction = (typeof donationAdminActions)[number];

export type DonationLogEntry = {
  _key: string;
  at: string;
  action: string;
  ok: boolean;
  by?: string;
  amount?: number;
  message?: string;
};

export type Donation = {
  _id: string;
  _rev: string;
  _createdAt: string;
  orderId: number;
  paymentId?: string;
  publicRef: string;
  status: DonationStatus;
  amount: number;
  requestedAmount: number;
  currency: "AMD";
  testMode: boolean;
  locale: string;
  firstName: string;
  lastName: string;
  email: string;
  showName: boolean;
  cardNumber?: string;
  approvalCode?: string;
  bankOrderStatus?: number;
  bankResponseCode?: string;
  refundedAmount?: number;
  paidAt?: string;
  checkedAt?: string;
  lock?: { token: string; until: string };
  log?: DonationLogEntry[];
};

/** Bank rule: CancelPayment only within 72 hours of InitPayment. */
export const CANCEL_WINDOW_MS = 72 * 60 * 60 * 1000;
