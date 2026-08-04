export type Product = {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};

export type CartLine = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  billingAddress: {
    address: string;
    city: string;
    state: string;
    postCode: string;
    country: string;
  };
  deliveryAddress: {
    address: string;
    city: string;
    state: string;
    postCode: string;
    country: string;
  };
};

export type Seller = {
  sellersId: string;
  sellersNm: string;
  sellersEmail: string;
  sellersAddress: {
    sellerNm: string;
    sellerLastNm: string;
    sellerAddr: string;
    sellerCity: string;
    sellerPostCd: string;
    sellerPhone: string;
    sellerCountry: string;
  };
};

export type PayMethodCode = "01" | "02" | "03" | "04" | "05" | "06" | "08";

export type NicepayRegistrationPayload = {
  timeStamp: string;
  iMid: string;
  payMethod: "00" | PayMethodCode;
  currency: string;
  amt: string;
  referenceNo: string;
  callBackUrl: string;
  dbProcessUrl: string;
  goodsNm: string;
  description: string;
  merchantToken: string;
  userIP: string;
  cartData: string;
  sellers: string;
  mitraCd: string;
  msId: string;
  msFee: string;
  msFeeType: string;
  escrowCl: string;
};

export type NicepayRegistrationResponse = {
  resultCd?: string;
  resultMsg?: string;
  tXid?: string;
  paymentURL?: string;
  redirectUrl?: string;
  url?: string;
};

export type NicepayCheckoutResult = {
  redirectUrl: string;
  referenceNo: string;
  response: NicepayRegistrationResponse;
};

export type Status = "success" | "pending" | "expired" | "reversed" | "failed";

export type GatewayStatusResponse = {
  reference: string;
  status: Status;
  amount: number;
  currency: string;
  message: string;
  tXid: string;
  transactionDate?: string;
  transactionTime?: string;
  description?: string;
  billingName?: string;
  goodsName?: string;
  bankCode?: string;
  accountNo?: string;
};

export type NicepayTransactionStatusPayload = {
  timeStamp: string;
  tXid: string;
  iMid: string;
  referenceNo: string;
  amt: string;
  merchantToken: string;
}

export type NicepayTransactionStatusResponse = {
    tXid: string,
    iMid: string;
    currency: string;
    amt: string;
    instmntMon: string | null;
    instmntType: string | null;
    referenceNo: string | null;
    goodsNm: string | null;
    payMethod: PayMethodCode | null;
    billingNm: string | null;
    reqDt: string | null;
    reqTm: string | null;
    status: string | null;
    resultCd: string;
    resultMsg: string;
    cardNo: string | null;
    preauthToken: string | null;
    acquBankCd: string | null;
    issuBankCd: string | null;
    vacctValidDt: string | null;
    vacctValidTm: string | null;
    vacctNo: string | null;
    bankCd: string | null;
    payNo: string | null;
    mitraCd: string | null;
    receiptCode: string | null;
    cancelAmt: string | null;
    transDt: string | null;
    transTm: string | null;
    recurringToken: string | null;
    ccTransType: string | null;
    payValidDt: string | null;
    payValidTm: string | null;
    mRefNo: string | null;
    acquStatus: string | null;
    cardExpYymm: string | null;
    acquBankNm: string | null;
    issuBankNm: string | null;
    depositDt: string | null;
    depositTm: string | null;
    paymentExpDt: string | null;
    paymentExpTm: string | null;
    paymentTrxSn: string | null;
    cancelTrxSn: string | null;
    userId: string | null;
    shopId: string | null;
}