import PAYPAY from "@paypayopa/paypayopa-sdk-node";

export default function configurePayPay(
  API_KEY: string | undefined,
  API_SECRET: string | undefined,
  MERCHANT_ID: string | undefined
) {
  PAYPAY.Configure({
    clientId: API_KEY!,
    clientSecret: API_SECRET!,
    merchantId: MERCHANT_ID,
    productionMode: false,
  });
}
