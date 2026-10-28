import "server-only";

import { randomBytes, randomUUID } from "node:crypto";
import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { VPOS_TEST_ORDER_RANGE } from "@/lib/vpos";
import {
  DONATION_ID_PREFIX,
  type Donation,
  type DonationLogEntry,
  type DonationStatus,
} from "./types";

/**
 * Donation records in Sanity, read and written only with the server token.
 * The token never leaves this module, and nothing here uses the CDN: a
 * donation's status must be read as it is now, not as it was cached.
 */

let cached: SanityClient | null = null;

function client(): SanityClient {
  if (cached) return cached;
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
  if (!token) throw new Error("SANITY_API_WRITE_TOKEN is not set");
  cached = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });
  return cached;
}

export function donationsClient(): SanityClient {
  return client();
}

export function isDonationStoreConfigured(): boolean {
  return Boolean(process.env.SANITY_API_WRITE_TOKEN?.trim());
}

const DONATION_FIELDS = `{
  _id, _rev, _createdAt, orderId, paymentId, publicRef, status, amount, requestedAmount,
  currency, testMode, locale, firstName, lastName, email, showName, cardNumber,
  approvalCode, bankOrderStatus, bankResponseCode, refundedAmount, paidAt, checkedAt, lock
}`;

export async function getDonation(id: string): Promise<Donation | null> {
  if (!id.startsWith(DONATION_ID_PREFIX)) return null;
  return client().fetch<Donation | null>(
    `*[_type == "donation" && _id == $id][0]${DONATION_FIELDS}`,
    { id },
    { cache: "no-store" },
  );
}

export async function getDonationByPaymentId(paymentId: string): Promise<Donation | null> {
  // InitPayment returns the ID in upper case, the BackURL sends it in lower case.
  return client().fetch<Donation | null>(
    `*[_type == "donation" && lower(paymentId) == $paymentId][0]${DONATION_FIELDS}`,
    { paymentId: paymentId.toLowerCase() },
    { cache: "no-store" },
  );
}

export async function getDonationByPublicRef(publicRef: string): Promise<Donation | null> {
  return client().fetch<Donation | null>(
    `*[_type == "donation" && publicRef == $publicRef][0]${DONATION_FIELDS}`,
    { publicRef },
    { cache: "no-store" },
  );
}

/** Pending donations old enough that the bank's 20-minute session is over. */
export async function getStalePendingDonations(limit = 20): Promise<Donation[]> {
  const before = new Date(Date.now() - 20 * 60 * 1000).toISOString();
  const after = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  return client().fetch<Donation[]>(
    `*[_type == "donation" && status == "pending" && defined(paymentId)
       && _createdAt < $before && _createdAt > $after] | order(_createdAt asc) [0...$limit]${DONATION_FIELDS}`,
    { before, after, limit },
    { cache: "no-store" },
  );
}

/**
 * The next OrderID. One counter per mode; the increment runs inside a single
 * Sanity transaction, so two donors at the same moment never share a number.
 */
export async function nextOrderId(testMode: boolean): Promise<number> {
  const id = `${DONATION_ID_PREFIX}counter-${testMode ? "test" : "live"}`;
  let first: number = VPOS_TEST_ORDER_RANGE.first;
  if (!testMode) {
    first = Number(process.env.VPOS_ORDER_ID_START);
    if (!Number.isSafeInteger(first) || first <= 0) throw new Error("VPOS_ORDER_ID_START is not set");
  }
  const result = await client()
    .transaction()
    .createIfNotExists({ _id: id, _type: "donationCounter", value: first - 1 })
    .patch(id, (patch) => patch.inc({ value: 1 }))
    .commit({ returnDocuments: true, visibility: "sync" });
  const counter = (result as unknown as { _id: string; value: number }[]).find((doc) => doc._id === id);
  const value = counter?.value;
  if (typeof value !== "number") throw new Error("OrderID counter did not return a value");
  if (testMode && value > VPOS_TEST_ORDER_RANGE.last) throw new Error("Test OrderID range is used up");
  return value;
}

export function logEntry(entry: Omit<DonationLogEntry, "_key" | "at">): DonationLogEntry {
  return { _key: randomUUID().replace(/-/g, "").slice(0, 12), at: new Date().toISOString(), ...entry };
}

export async function createDonation(input: {
  orderId: number;
  amount: number;
  requestedAmount: number;
  testMode: boolean;
  locale: string;
  firstName: string;
  lastName: string;
  email: string;
  showName: boolean;
}): Promise<Donation> {
  const doc = {
    _id: `${DONATION_ID_PREFIX}${randomUUID()}`,
    _type: "donation",
    ...input,
    currency: "AMD" as const,
    // Unguessable, so the result page cannot be used to look up other donations.
    publicRef: randomBytes(16).toString("hex"),
    status: "pending" as DonationStatus,
    log: [logEntry({ action: "created", ok: true, amount: input.amount })],
  };
  return client().create(doc, { visibility: "sync" }) as unknown as Promise<Donation>;
}

export async function updateDonation(
  id: string,
  set: Partial<Omit<Donation, "_id" | "_rev" | "_createdAt" | "log">>,
  entry?: DonationLogEntry,
): Promise<void> {
  let patch = client().patch(id).set(set);
  if (entry) patch = patch.setIfMissing({ log: [] }).append("log", [entry]);
  await patch.commit({ visibility: "sync" });
}

const LOCK_MS = 60_000;

/**
 * Claims a donation for one bank operation. The patch only applies if the
 * document is unchanged since it was read, so a double click or two admins at
 * once cannot both pass; a lock left by a crashed request expires by itself.
 */
export async function acquireLock(donation: Donation): Promise<string | null> {
  if (donation.lock && Date.parse(donation.lock.until) > Date.now()) return null;
  const token = randomUUID();
  try {
    await client()
      .patch(donation._id)
      .ifRevisionId(donation._rev)
      .set({ lock: { token, until: new Date(Date.now() + LOCK_MS).toISOString() } })
      .commit({ visibility: "sync" });
    return token;
  } catch {
    return null;
  }
}

export async function releaseLock(id: string): Promise<void> {
  await client().patch(id).unset(["lock"]).commit({ visibility: "sync" });
}
