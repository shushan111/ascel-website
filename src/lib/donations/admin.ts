import "server-only";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { cancelPayment, refundPayment, VposError } from "@/lib/vpos";
import {
  acquireLock,
  donationsClient,
  getDonation,
  logEntry,
  releaseLock,
  updateDonation,
} from "./store";
import { syncDonation } from "./sync";
import {
  CANCEL_WINDOW_MS,
  DONATION_REQUEST_ID_PREFIX,
  donationAdminActions,
  donationStatusLabels,
  type DonationAdminAction,
  type Donation,
} from "./types";

/**
 * Cancel, refund and refresh, asked for from the Studio.
 *
 * The Studio never sends credentials here. Instead the admin's own Studio
 * session writes a small request document (`donationRequest.<uuid>`), and the
 * browser sends us only its ID. Sanity records who wrote every document, and
 * that record cannot be set by the writer, so the server reads the author
 * from Sanity's transaction history and accepts the request only if that
 * person is a project Administrator. Everything else — the donation, its
 * amount, what is left to refund — is read again from Sanity and the bank.
 */

const REQUEST_MAX_AGE_MS = 5 * 60 * 1000;

export type AdminResult = { ok: boolean; message: string };

type DonationRequest = {
  _id: string;
  _rev: string;
  _createdAt: string;
  action?: string;
  donationId?: string;
  amount?: number;
  processedAt?: string;
};

function token(): string {
  return process.env.SANITY_API_WRITE_TOKEN?.trim() ?? "";
}

/** The author of the one transaction that created the request, or null. */
async function requestAuthor(request: DonationRequest): Promise<string | null> {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/history/${dataset}/transactions/${encodeURIComponent(request._id)}?excludeContent=true`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token()}` },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) return null;
  const transactions = (await response.text())
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as { id: string; author?: string });
  // Exactly one transaction, and it is the document's current revision: the
  // request was created once and nobody has touched it since.
  if (transactions.length !== 1 || transactions[0].id !== request._rev) return null;
  return transactions[0].author ?? null;
}

async function isAdministrator(userId: string): Promise<boolean> {
  const response = await fetch(`https://api.sanity.io/v2021-06-07/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token()}` },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) return false;
  const project = (await response.json()) as {
    members?: { id: string; isRobot?: boolean; roles?: { name: string }[] }[];
  };
  const member = project.members?.find((m) => m.id === userId);
  return Boolean(member && !member.isRobot && member.roles?.some((role) => role.name === "administrator"));
}

function formatAmd(value: number): string {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} AMD`;
}

async function cancel(donation: Donation, by: string): Promise<AdminResult> {
  const { donation: fresh, details } = await syncDonation(donation, by);
  if (fresh.status !== "paid" || details.refundedAmount > 0) {
    return { ok: false, message: "Չեղարկել կարելի է միայն վճարված և չվերադարձված նվիրատվությունը։" };
  }
  if (Date.now() - Date.parse(donation._createdAt) > CANCEL_WINDOW_MS) {
    return { ok: false, message: "Չեղարկման 72 ժամը անցել է։ Օգտագործեք «Վերադարձնել»-ը։" };
  }
  await cancelPayment(donation.paymentId!);
  await updateDonation(donation._id, {}, logEntry({ action: "cancel", ok: true, by, amount: details.amount }));
  const { donation: after } = await syncDonation(fresh, by);
  return { ok: true, message: `Չեղարկված է։ Կարգավիճակը՝ «${donationStatusLabels[after.status]}»։` };
}

async function refund(donation: Donation, amount: unknown, by: string): Promise<AdminResult> {
  if (typeof amount !== "number" || !Number.isSafeInteger(amount) || amount <= 0) {
    return { ok: false, message: "Նշեք վերադարձվող գումարը ամբողջ դրամներով։" };
  }
  const { donation: fresh, details } = await syncDonation(donation, by);
  if (fresh.status !== "paid" && fresh.status !== "partiallyRefunded") {
    return { ok: false, message: "Վերադարձնել կարելի է միայն վճարված նվիրատվությունը։" };
  }
  const left = details.amount - details.refundedAmount;
  if (amount > left) {
    return { ok: false, message: `Կարելի է վերադարձնել առավելագույնը ${formatAmd(left)}։` };
  }
  await refundPayment(donation.paymentId!, amount);
  await updateDonation(donation._id, {}, logEntry({ action: "refund", ok: true, by, amount }));
  const { donation: after } = await syncDonation(fresh, by);
  return { ok: true, message: `Վերադարձվել է ${formatAmd(amount)}։ Կարգավիճակը՝ «${donationStatusLabels[after.status]}»։` };
}

export async function handleAdminRequest(requestId: string): Promise<AdminResult> {
  if (!new RegExp(`^${DONATION_REQUEST_ID_PREFIX.replace(".", "\\.")}[A-Za-z0-9-]{8,64}$`).test(requestId)) {
    return { ok: false, message: "Սխալ հարցում։" };
  }
  const client = donationsClient();
  const request = await client.fetch<DonationRequest | null>(
    `*[_type == "donationRequest" && _id == $id][0]{_id, _rev, _createdAt, action, donationId, amount, processedAt}`,
    { id: requestId },
    { cache: "no-store" },
  );
  if (!request || request.processedAt) return { ok: false, message: "Հարցումը չի գտնվել կամ արդեն կատարված է։" };
  if (Date.now() - Date.parse(request._createdAt) > REQUEST_MAX_AGE_MS) {
    return { ok: false, message: "Հարցումը հնացել է։ Փորձեք կրկին։" };
  }

  const author = await requestAuthor(request);
  if (!author || !(await isAdministrator(author))) {
    return { ok: false, message: "Այս գործողությունը թույլատրված է միայն Administrator դեր ունեցողին։" };
  }

  // Claim the request; the revision check makes a replay of the same ID fail.
  try {
    await client
      .patch(request._id)
      .ifRevisionId(request._rev)
      .set({ processedAt: new Date().toISOString(), processedBy: author })
      .commit({ visibility: "sync" });
  } catch {
    return { ok: false, message: "Հարցումն արդեն մշակվում է։" };
  }

  const action = request.action as DonationAdminAction;
  const donation = request.donationId ? await getDonation(request.donationId) : null;
  let result: AdminResult;
  if (!donationAdminActions.includes(action) || !donation?.paymentId) {
    result = { ok: false, message: "Նվիրատվությունը կամ գործողությունը չի գտնվել։" };
  } else {
    const lock = await acquireLock(donation);
    if (!lock) {
      result = { ok: false, message: "Այս նվիրատվության հետ այլ գործողություն է ընթանում։ Փորձեք մի րոպեից։" };
    } else {
      // Re-read after locking, so the checks below see the latest record.
      const current = (await getDonation(donation._id)) ?? donation;
      try {
        if (action === "cancel") result = await cancel(current, author);
        else if (action === "refund") result = await refund(current, request.amount, author);
        else {
          const { donation: after } = await syncDonation(current, author);
          result = { ok: true, message: `Թարմացված է բանկից։ Կարգավիճակը՝ «${donationStatusLabels[after.status]}»։` };
        }
      } catch (error) {
        const message = error instanceof VposError ? error.message : "Բանկի հետ կապի սխալ";
        await updateDonation(donation._id, {}, logEntry({ action, ok: false, by: author, message })).catch(
          () => undefined,
        );
        result = { ok: false, message: `Բանկը մերժեց կամ չպատասխանեց. ${message}` };
      } finally {
        await releaseLock(donation._id).catch(() => undefined);
      }
    }
  }

  await client
    .patch(request._id)
    .set({ resultOk: result.ok, resultMessage: result.message })
    .commit()
    .catch(() => undefined);
  return result;
}
