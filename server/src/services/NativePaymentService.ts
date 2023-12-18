import PAYPAY from "@paypayopa/paypayopa-sdk-node";
import { NextFunction, Response } from "express";
import OrderModel from "../models/order";
import { createError } from "../utils/CreateError";
import { Types } from "mongoose";

/// Account Link
export const accountLinkService = async (payload: any) => {
  try {
    const response = await PAYPAY.AccountLinkQRCodeCreate(payload);
    return response;
  } catch (error) {
    throw createError(500, "Internal Server Error");
  }
};

/// User Authorization Status
export const getUserAuthorizationService = async (userAuthorizationId: any) => {
  try {
    const response = await PAYPAY.GetUserAuthorizationStatus([
      userAuthorizationId,
    ]);
    return response;
  } catch (error) {
    throw createError(500, "Internal Server Error");
  }
};

/// Payment
export const paymentService = async (
  res: Response,
  next: NextFunction,
  payload: any
) => {
  try {
    const response: any = await PAYPAY.CreatePayment(payload);
    const body = response.BODY;
    if (body.resultInfo.code === "SUCCESS") {
      const orderItems = body.data.orderItems;
      const newOrderItems = [];
      for (const item of orderItems) {
        const newOrderItem = new OrderModel({
          merchantPaymentId: new Types.ObjectId(body.data.merchantPaymentId),
          cake: new Types.ObjectId(item.productId),
          category: item.category,
          quantity: item.quantity,
          unitPrice: {
            amount: item.unitPrice.amount,
            currency: item.unitPrice.currency,
          },
          status: body.data.status,
        });

        const savedOrderItem = await newOrderItem.save();
        newOrderItems.push(savedOrderItem);
      }
      const mergedOrderItems = [...body.data.orderItems, ...newOrderItems];
      body.data.orderItems = mergedOrderItems;
      res.status(response.STATUS).send(body);
    } else {
      return next(createError(response.STATUS, body.resultInfo.message));
    }
  } catch (error) {
    console.log(error);
    throw createError(500, "Internal Server Error");
  }
};

/// Continue Payment
export const continuePaymentService = async (
  res: Response,
  next: NextFunction,
  payload: any
) => {
  try {
    const response: any = await PAYPAY.CreateSubscriptionPayment(payload);

    const body = response.BODY;
    console.log("RES===>", response);
    if (body.resultInfo.code === "SUCCESS") {
      const orderItems = body.data.orderItems;
      const newOrderItems = [];
      for (const item of orderItems) {
        const newOrderItem = new OrderModel({
          merchantPaymentId: new Types.ObjectId(body.data.merchantPaymentId),
          cake: new Types.ObjectId(item.productId),
          category: item.category,
          quantity: item.quantity,
          unitPrice: {
            amount: item.unitPrice.amount,
            currency: item.unitPrice.currency,
          },
          status: body.data.status,
        });

        const savedOrderItem = await newOrderItem.save();
        newOrderItems.push(savedOrderItem);
      }
      const mergedOrderItems = [...body.data.orderItems, ...newOrderItems];
      body.data.orderItems = mergedOrderItems;
      res.status(response.STATUS).send(body);
    } else {
      return next(createError(response.STATUS, body.resultInfo.message));
    }
  } catch (error) {
    console.log(error);
    throw createError(500, "Internal Server Error");
  }
};

/// Pending Payment
export const pendingPaymentService = async (
  res: Response,
  next: NextFunction,
  payload: any
) => {
  try {
    const response: any = await PAYPAY.CreatePendingPayment(payload);

    const body = response.BODY;
    if (body.resultInfo.code === "SUCCESS") {
      const orderItems = body.data.orderItems;
      const newOrderItems = [];
      for (const item of orderItems) {
        const newOrderItem = new OrderModel({
          merchantPaymentId: new Types.ObjectId(body.data.merchantPaymentId),
          cake: new Types.ObjectId(item.productId),
          category: item.category,
          quantity: item.quantity,
          unitPrice: {
            amount: item.unitPrice.amount,
            currency: item.unitPrice.currency,
          },
          status: body.data.status,
        });

        const savedOrderItem = await newOrderItem.save();
        newOrderItems.push(savedOrderItem);
      }
      const mergedOrderItems = [...body.data.orderItems, ...newOrderItems];
      body.data.orderItems = mergedOrderItems;
      res.status(response.STATUS).send(body);
    } else {
      return next(createError(response.STATUS, body.resultInfo.message));
    }
  } catch (error) {
    console.log(error);
    throw createError(500, "Internal Server Error");
  }
};
