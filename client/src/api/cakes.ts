/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BASE_URL } from "@/constants/url";

/// get items
export const getCakes = () => {
  return axios.get(`${BASE_URL}/cakes`);
};

/// payment
export const makePayment = (payload: any) => {
  return axios.post(`${BASE_URL}/create-qr`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/// payment detail
export const getOrderStatus = (id: string) => {
  return axios.get(`${BASE_URL}/order-status/${id}`);
};

/// get order list
export const getOrders = () => {
  return axios.get(`${BASE_URL}/orders`);
};

/// Payment Transition
export const getOrdersPayment = () => {
  return axios.get(`${BASE_URL}/order-payments`);
};

/// Refund Payment
export const refundPayment = (payload: any) => {
  return axios.post(`${BASE_URL}/refunds`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/// Cancel Payment
export const cancelPayment = (merchantPaymentId: string) => {
  return axios.delete(`${BASE_URL}/cancel-payment/${merchantPaymentId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/// Capture Payment
export const capturePayment = (payload: any) => {
  return axios.post(`${BASE_URL}/payments/capture`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/// Revert Payment
export const revertPayment = (payload: any) => {
  return axios.post(`${BASE_URL}/payments/preauthorize/revert`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/// Account Link
export const accountLink = () => {
  return axios.post(`${BASE_URL}/account-link`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/// native payment
export const makeNativePayment = (payload: any) => {
  return axios.post(`${BASE_URL}/payments`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/// native payment
export const makeContinuePayment = (payload: any) => {
  return axios.post(`${BASE_URL}/subscription/payments`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

//// native payment
export const makePendingPayment = (payload: any) => {
  return axios.post(`${BASE_URL}/requestOrder`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};