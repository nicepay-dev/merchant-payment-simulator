import { SELLERS } from "./data/sellers";
import { CUSTOMER } from "./data/customer";
import { NicepayRegistrationPayload } from "./types";
import { resolveStoreUrls } from "@/config/config";
import { getCartLines } from "./cart";
import type { CartLine } from "./types";
import { buildNicepayTimestamp, buildMerchantToken } from "./utils";

const iMid = process.env.NICEPAY_IMID as string;
const merchantKey = process.env.NICEPAY_MERCHANT_KEY as string;

function buildCartData(lines: ReturnType<typeof getCartLines>) {
  return JSON.stringify({
    count: String(lines.length),
    item: lines.map((line) => ({
      img_url: line.product.imageSrc ?? "",
      goods_name: line.product.name,
      goods_detail: line.product.name,
      goods_amt: String(line.product.price),
      goods_quantity: String(line.quantity),
    })),
  });
}

function buildCustomerAndDeliveryData() {
  return {
    billingNm: CUSTOMER.name,
    billingPhone: CUSTOMER.phone,
    billingEmail: CUSTOMER.email,
    billingAddr: CUSTOMER.billingAddress.address,
    billingCity: CUSTOMER.billingAddress.city,
    billingState: CUSTOMER.billingAddress.state,
    billingPostCd: CUSTOMER.billingAddress.postCode,
    billingCountry: CUSTOMER.billingAddress.country,
    deliveryNm: CUSTOMER.name,
    deliveryPhone: CUSTOMER.phone,
    deliveryAddr: CUSTOMER.deliveryAddress.address,
    deliveryCity: CUSTOMER.deliveryAddress.city,
    deliveryState: CUSTOMER.deliveryAddress.state,
    deliveryPostCd: CUSTOMER.deliveryAddress.postCode,
    deliveryCountry: CUSTOMER.deliveryAddress.country,
  };
}

export function buildCheckoutPayload(
  lines: CartLine[],
): NicepayRegistrationPayload {
  const timestamp = buildNicepayTimestamp();
  const amount = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const referenceNo = `NICEPAY-SHOP-${Date.now()}`;
  const { callBackUrl, dbProcessUrl } = resolveStoreUrls();
  const goodsName =
    lines.map((line) => line.product.name).join(", ") || "Cart items";
  const cartData = buildCartData(lines);
  const sellers = JSON.stringify(SELLERS);
  const merchantToken = buildMerchantToken(
    timestamp,
    iMid,
    referenceNo,
    amount,
    merchantKey,
  );

  return {
    timeStamp: timestamp,
    iMid: process.env.NICEPAY_IMID as string,
    payMethod: "00",
    currency: "IDR",
    amt: String(amount),
    referenceNo: referenceNo,
    callBackUrl: callBackUrl,
    dbProcessUrl: dbProcessUrl,
    goodsNm: goodsName,
    ...buildCustomerAndDeliveryData(),
    description: `Order ${referenceNo}`,
    merchantToken: merchantToken,
    userIP: "127.0.0.1",
    cartData: cartData,
    sellers: sellers,
    mitraCd: "",
    msId: "",
    msFee: "",
    msFeeType: "",
    escrowCl: "",
  };
}
