import { NextRequest, NextResponse } from "next/server";
import { getTransactionStatus } from "@/lib/gateway";
import { buildMerchantToken, buildNicepayTimestamp, buildWebhookMerchantToken, normalizeAmount, readParam, resolveStatus } from "@/lib/utils";

const iMid = process.env.NICEPAY_IMID;
const merchantKey = process.env.NICEPAY_MERCHANT_KEY;
type WebhookField = string | string[] | undefined;

export async function POST(request: NextRequest) {
  console.log("NICEPAY notification request received", request);

  let eventPayload: Record<string, unknown>;
  try {
    const formData = await request.formData();
    eventPayload = Object.fromEntries(formData.entries());
    console.log("NICEPAY notification payload:", eventPayload);
  } catch {
    console.log("invalid webhook payload received, unable to parse form data");
    return NextResponse.json(
      { ok: false, message: "Invalid payload" },
      { status: 400 },
    );
  }

  if (!iMid || !merchantKey) {
    console.log("webhook credentials are not configured");
    return NextResponse.json(
      { ok: false, message: "Webhook credentials are not configured" },
      { status: 500 },
    );
  }

  const tXid = readParam(eventPayload.tXid as WebhookField);
  const amt = normalizeAmount(readParam(eventPayload.amt as WebhookField) ?? undefined);
  const referenceNo = readParam(eventPayload.referenceNo as WebhookField);
  const receivedMerchantToken = readParam(eventPayload.merchantToken as WebhookField);

  if (!tXid || !amt || !receivedMerchantToken) {
    console.log("missing required webhook fields");
    return NextResponse.json(
      { ok: false, message: "Missing required webhook fields" },
      { status: 400 },
    );
  }

  const expectedMerchantToken = buildWebhookMerchantToken(iMid, tXid, amt, merchantKey);
  if (receivedMerchantToken.toLowerCase() !== expectedMerchantToken.toLowerCase()) {
    console.log("invalid merchant token");
    return NextResponse.json(
      { ok: false, message: "Invalid merchant token" },
      { status: 401 },
    );
  }

  const timeStamp = buildNicepayTimestamp();
  const inquiryMerchantToken = buildMerchantToken(timeStamp, iMid, referenceNo ?? tXid, amt, merchantKey);

  try {
    const inquiry = await getTransactionStatus({
      timeStamp,
      tXid,
      iMid: iMid,
      referenceNo: referenceNo as string,
      amt,
      merchantToken: inquiryMerchantToken,
    });

    // NOTE: After verifying the transaction status, you can process the webhook event as needed (e.g., update your database, trigger notifications, etc.).
    console.log("NICEPAY notification verified successfully:", inquiry);
    return NextResponse.json(
      {
        ok: true,
        message: "NICEPAY notification verified",
        webhook: {
          tXid,
          referenceNo: referenceNo ?? null,
          amt,
          iMid: iMid,
          status: inquiry.status,
        },
        inquiry,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error verifying transaction status:", error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Unable to verify transaction status",
      },
      { status: 502 },
    );
  }
}
