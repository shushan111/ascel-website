import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { isVposConfigured } from "@/lib/vpos";
import { getStalePendingDonations, isDonationStoreConfigured } from "@/lib/donations/store";
import { syncDonation } from "@/lib/donations/sync";

/**
 * For the cPanel cron job: asks the bank about donations still pending after
 * the payment session ended — a donor who paid and closed the tab never
 * reaches the BackURL. Requires `Authorization: Bearer <CRON_SECRET>`; without
 * a configured secret the endpoint is closed.
 */
function authorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret || secret.length < 24) return false;
  const given = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ?? "";
  const hash = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(given), hash(secret));
}

async function run(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!isVposConfigured() || !isDonationStoreConfigured()) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const pending = await getStalePendingDonations();
  let updated = 0;
  let failed = 0;
  for (const donation of pending) {
    try {
      const { donation: next } = await syncDonation(donation, "cron");
      if (next.status !== donation.status) updated += 1;
    } catch (error) {
      failed += 1;
      console.error(`[donate] cron check failed for ${donation.orderId}: ${error instanceof Error ? error.message : "unknown"}`);
    }
  }
  return NextResponse.json({ checked: pending.length, updated, failed });
}

export const GET = run;
export const POST = run;
