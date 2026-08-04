import "server-only";

const configuredBaseUrl = process.env.STORE_URL ?? "http://localhost:3000";
const normalizedBaseUrl = configuredBaseUrl.replace(/\/$/, "");

export function resolveStoreUrls() {
  return {
    callBackUrl: `${normalizedBaseUrl}/checkout-return`,
    dbProcessUrl: `${normalizedBaseUrl}/api/webhook`,
  };
}