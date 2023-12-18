/* eslint-disable @typescript-eslint/no-explicit-any */
export interface iItem {
  title: string;
  _id: number;
  price: number;
  image: string;
  quantity: number;
}

export interface iAddToCartPayload {
  id: number;
}

export interface iUnitPrice {
  amount: number;
  currency: string;
}
export interface iOrderItem {
  unitPrice: iUnitPrice;
  _id?: string;
  productId: string;
  cake: iItem;
  quantity: number;
  category: string;
  name: string;
  status?: string;
}

export interface ResultInfo {
  code: string;
  message: string;
  codeId: string;
}

export interface Refund {
  data: any[];
}

export interface UnitPrice {
  amount: number;
  currency: string;
}

export interface OrderItem {
  name: string;
  category: string;
  quantity: number;
  productId: string;
  unitPrice: UnitPrice;
}

export interface PaymentMethod {
  amount: UnitPrice;
  type: string;
}

export interface PaymentData {
  paymentId: string;
  status: string;
  acceptedAt: number;
  refunds: Refund;
  merchantPaymentId: string;
  amount: UnitPrice;
  requestedAt: number;
  terminalId: string;
  orderItems: OrderItem[];
  metadata: any;
  paymentMethods: PaymentMethod[];
}

export interface PaymentTransition {
  resultInfo: ResultInfo;
  data: PaymentData;
}


