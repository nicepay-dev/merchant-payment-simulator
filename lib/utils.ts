import { createHash } from "node:crypto";
import { PayMethodCode, Status } from "./types";
import { STATUS_MAPS } from "./data/payment-method";

export function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseAmount(value: string | undefined) {
  if (!value) {
    return 0;
  }

  const normalized = value.replace(/[^\d.-]/g, "");
  const parsed = Number.parseInt(normalized, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function normalizeAmount(value: string | undefined) {
  if (!value) {
    return null;
  }

  const normalized = value.replace(/[^\d.-]/g, "");
  if (!normalized) {
    return null;
  }

  const parsed = Number.parseInt(normalized, 10);
  return Number.isFinite(parsed) ? String(parsed) : null;
}

export function buildNicepayTimestamp(date = new Date()) {
  return date
    .toISOString()
    .replace(/[-:T.]/g, "")
    .slice(0, 14);
}

export function buildMerchantToken(
  timestamp: string,
  iMid: string,
  referenceNo: string,
  amount: string | number,
  merchantKey: string,
) {
  return createSha256Hex(`${timestamp}${iMid}${referenceNo}${amount}${merchantKey}`);
}

export function buildWebhookMerchantToken(
  iMid: string,
  tXid: string,
  amount: string | number,
  merchantKey: string,
) {
  return createSha256Hex(`${iMid}${tXid}${amount}${merchantKey}`);
}

function createSha256Hex(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function resolveStatus(payMethod?: PayMethodCode | null, statusCode?: string | null): Status {
  if (!payMethod || !statusCode) {
    return "pending";
  }
  const map = STATUS_MAPS[payMethod as PayMethodCode];
  if (!map) {
    return "pending";
  }
  const status = map[statusCode];
  if (!status) {
    return "pending";
  }
  return status;
}

export function statusUI(status: Status) {
  if (status === "success") {
    return {
      title: "Payment successful",
      tone: "text-[var(--success)]",
      detail: "NICEPAY confirmed that the transaction completed.",
    };
  }
  if (status === "failed") {
    return {
      title: "Payment failed",
      tone: "text-[var(--danger)]",
      detail: "The payment attempt was not completed.",
    };
  }
  if (status === "expired") {
    return {
      title: "Payment expired",
      tone: "text-[var(--danger)]",
      detail: "The payment is expired. Please start a new checkout.",
    };
  }
  if (status === "reversed") {
    return {
      title: "Payment reversed",
      tone: "text-[var(--muted)]",
      detail: "This payment was voided or refunded after being processed.",
    };
  }
  return {
    title: "Payment pending",
    tone: "text-[var(--brand)]",
    detail: "The gateway has not resolved this transaction yet.",
  };
}