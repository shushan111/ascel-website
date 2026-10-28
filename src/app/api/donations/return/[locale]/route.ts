import { NextResponse, type NextRequest } from "next/server";
import { localePrefixedPath, routing } from "@/i18n/routing";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { vposReturnOrigin } from "@/lib/vpos";
import { getDonationByPaymentId } from "@/lib/donations/store";
import { syncDonation } from "@/lib/donations/sync";

/**
 * The BackURL: the bank sends the donor's browser here after the payment page
 * with `?orderID=…&resposneCode=…&paymentID=…&opaque=…` (the bank's spelling).
 * Anyone can open this address with any query, so the query is used only to
 * find our record; whether the donation is paid is asked of the bank itself.
 * The donor then lands on the result page, which shows the stored outcome.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (routing.locales as readonly string[]).includes(raw) ? raw : routing.defaultLocale;
  const result = new URL(localePrefixedPath("/donate/result", locale), vposReturnOrigin());

  const paymentId = request.nextUrl.searchParams.get("paymentID")?.trim() ?? "";
  const orderId = Number(request.nextUrl.searchParams.get("orderID"));
  const ip = await clientIp();

  if (/^[A-Za-z0-9-]{8,64}$/.test(paymentId) && rateLimit(`return:${ip}`, 30, 10 * 60 * 1000)) {
    try {
      const donation = await getDonationByPaymentId(paymentId);
      if (donation && donation.orderId === orderId) {
        result.searchParams.set("ref", donation.publicRef);
        await syncDonation(donation, "bank return");
      }
    } catch (error) {
      // The result page shows whatever is stored; the cron job retries later.
      console.error(`[donate] return check failed: ${error instanceof Error ? error.message : "unknown"}`);
    }
  }

  return NextResponse.redirect(result, 303);
}
