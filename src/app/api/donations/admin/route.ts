import { NextResponse, type NextRequest } from "next/server";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { isVposConfigured } from "@/lib/vpos";
import { isDonationStoreConfigured } from "@/lib/donations/store";
import { handleAdminRequest } from "@/lib/donations/admin";

/**
 * Called by the Studio's donation actions with `{ requestId }` only. Who is
 * asking is not taken from this request at all — see lib/donations/admin.ts.
 */
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin && origin !== process.env.VPOS_RETURN_ORIGIN?.trim()) {
    return NextResponse.json({ ok: false, message: "Forbidden" }, { status: 403 });
  }
  if (!rateLimit(`admin:${await clientIp()}`, 30, 60 * 1000)) {
    return NextResponse.json({ ok: false, message: "Չափազանց շատ հարցումներ։ Փորձեք մի րոպեից։" }, { status: 429 });
  }
  if (!isVposConfigured() || !isDonationStoreConfigured()) {
    return NextResponse.json({ ok: false, message: "Վճարային համակարգը կարգավորված չէ սերվերում։" }, { status: 503 });
  }

  let requestId = "";
  try {
    const body = (await request.json()) as { requestId?: unknown };
    requestId = typeof body.requestId === "string" ? body.requestId : "";
  } catch {
    // Falls through to the validation in handleAdminRequest.
  }

  try {
    const result = await handleAdminRequest(requestId);
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (error) {
    console.error(`[donate] admin action failed: ${error instanceof Error ? error.message : "unknown"}`);
    return NextResponse.json({ ok: false, message: "Սերվերի սխալ։ Փորձեք կրկին։" }, { status: 500 });
  }
}
