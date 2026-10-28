import "server-only";

/**
 * Ameriabank vPOS 3.1 over REST — the only code that talks to the bank.
 *
 * The merchant credentials travel in every request body, so this module is
 * server-only and never returns them, logs them or puts them in an error. Each
 * call has a timeout: a bank that hangs must not hold a donor's request open.
 *
 * Test environment rules from the bank: OrderID within 4788001–4789000 and an
 * amount of 10 AMD. `VPOS_TEST_MODE=true` enforces both.
 */

const TIMEOUT_MS = 20_000;

export const VPOS_TEST_ORDER_RANGE = { first: 4788001, last: 4789000 } as const;
export const VPOS_TEST_AMOUNT = 10;
/** ISO 4217 numeric code; AMD is the only currency in use for now. */
export const VPOS_CURRENCY_AMD = "051";

type VposConfig = {
  apiUrl: string;
  clientId: string;
  username: string;
  password: string;
  testMode: boolean;
  returnOrigin: string;
};

function readConfig(): VposConfig | null {
  const apiUrl = process.env.VPOS_API_URL?.trim().replace(/\/+$/, "");
  const clientId = process.env.VPOS_CLIENT_ID?.trim();
  const username = process.env.VPOS_USERNAME?.trim();
  const password = process.env.VPOS_PASSWORD?.trim();
  const returnOrigin = process.env.VPOS_RETURN_ORIGIN?.trim().replace(/\/+$/, "");
  if (!apiUrl || !clientId || !username || !password || !returnOrigin) return null;
  if (!apiUrl.startsWith("https://")) return null;
  return {
    apiUrl,
    clientId,
    username,
    password,
    testMode: process.env.VPOS_TEST_MODE?.trim() === "true",
    returnOrigin,
  };
}

export function isVposConfigured(): boolean {
  return readConfig() !== null;
}

export function vposTestMode(): boolean {
  return readConfig()?.testMode ?? false;
}

function config(): VposConfig {
  const value = readConfig();
  if (!value) throw new VposError("vPOS is not configured");
  return value;
}

export function vposReturnOrigin(): string {
  return config().returnOrigin;
}

/** A bank error with a message that is safe to store and show to an admin. */
export class VposError extends Error {
  constructor(
    message: string,
    readonly responseCode?: string,
  ) {
    super(message);
    this.name = "VposError";
  }
}

async function post<T>(method: string, body: Record<string, unknown>): Promise<T> {
  const { apiUrl, username, password } = config();
  let response: Response;
  try {
    response = await fetch(`${apiUrl}/api/VPOS/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...body, Username: username, Password: password }),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    const reason = error instanceof Error && error.name === "TimeoutError" ? "timeout" : "network error";
    throw new VposError(`${method}: ${reason}`);
  }
  if (!response.ok) throw new VposError(`${method}: HTTP ${response.status}`);
  try {
    return (await response.json()) as T;
  } catch {
    throw new VposError(`${method}: invalid response`);
  }
}

/** Bank language codes for the hosted payment page. */
const payPageLanguage: Record<string, string> = { hy: "am", ru: "ru", en: "en" };

export async function initPayment(input: {
  orderId: number;
  amount: number;
  description: string;
  backUrl: string;
  opaque?: string;
}): Promise<{ paymentId: string }> {
  const { clientId } = config();
  const result = await post<{ PaymentID?: string; ResponseCode?: number; ResponseMessage?: string }>(
    "InitPayment",
    {
      ClientID: clientId,
      OrderID: input.orderId,
      Amount: input.amount,
      Currency: VPOS_CURRENCY_AMD,
      Description: input.description,
      BackURL: input.backUrl,
      Opaque: input.opaque ?? "",
    },
  );
  if (Number(result.ResponseCode) !== 1 || !result.PaymentID) {
    throw new VposError(
      `InitPayment: ${result.ResponseMessage ?? "rejected"}`,
      result.ResponseCode === undefined ? undefined : String(result.ResponseCode),
    );
  }
  return { paymentId: result.PaymentID };
}

export function paymentPageUrl(paymentId: string, locale: string): string {
  const url = new URL(`${config().apiUrl}/Payments/Pay`);
  url.searchParams.set("id", paymentId);
  url.searchParams.set("lang", payPageLanguage[locale] ?? "en");
  return url.toString();
}

/** Order status codes (vPOS Table 2). */
export const VPOS_ORDER_STATUS = {
  started: 0,
  approved: 1,
  deposited: 2,
  void: 3,
  refunded: 4,
  autoAuthorized: 5,
  declined: 6,
} as const;

export type PaymentDetails = {
  orderId: number;
  amount: number;
  approvedAmount: number;
  depositedAmount: number;
  refundedAmount: number;
  currency: string;
  orderStatus: number | null;
  paymentState: string;
  responseCode: string;
  cardNumber: string;
  approvalCode: string;
  dateTime: string;
};

const money = (value: unknown) => (typeof value === "number" && Number.isFinite(value) ? value : 0);
const text = (value: unknown) => (value === null || value === undefined ? "" : String(value));

export async function getPaymentDetails(paymentId: string): Promise<PaymentDetails> {
  const raw = await post<Record<string, unknown>>("GetPaymentDetails", { PaymentID: paymentId });
  const status = raw.OrderStatus;
  return {
    orderId: Number(raw.OrderID),
    amount: money(raw.Amount),
    approvedAmount: money(raw.ApprovedAmount),
    depositedAmount: money(raw.DepositedAmount),
    refundedAmount: money(raw.RefundedAmount),
    currency: text(raw.Currency),
    orderStatus: typeof status === "number" ? status : status === undefined || status === null ? null : Number(status),
    paymentState: text(raw.PaymentState),
    responseCode: text(raw.ResponseCode),
    cardNumber: text(raw.CardNumber),
    approvalCode: text(raw.ApprovalCode),
    dateTime: text(raw.DateTime),
  };
}

type OperationResponse = { ResponseCode?: string | number; ResponseMessage?: string };

function assertOperation(method: string, result: OperationResponse) {
  if (String(result.ResponseCode) !== "00") {
    throw new VposError(
      `${method}: ${result.ResponseMessage ?? "rejected"}`,
      result.ResponseCode === undefined ? undefined : String(result.ResponseCode),
    );
  }
}

/** Reverses a payment entirely. The bank allows it within 72 hours of InitPayment. */
export async function cancelPayment(paymentId: string): Promise<void> {
  assertOperation("CancelPayment", await post<OperationResponse>("CancelPayment", { PaymentID: paymentId }));
}

/** Returns part or all of a deposited payment to the card. */
export async function refundPayment(paymentId: string, amount: number): Promise<void> {
  assertOperation(
    "RefundPayment",
    await post<OperationResponse>("RefundPayment", { PaymentID: paymentId, Amount: amount }),
  );
}
