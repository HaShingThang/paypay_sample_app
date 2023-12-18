import { NextFunction, Response } from "express";
import PAYPAY from "@paypayopa/paypayopa-sdk-node";
import { Types } from "mongoose";
import OrderModel from "../models/order";
import { createError } from "../utils/CreateError";

/// Create QR code for payment
export const createQRCodeService = async (
  payload: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const ppResponse: any = await PAYPAY.QRCodeCreate(payload);
    const body = ppResponse.BODY;

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
            amount: item.unit_price.amount,
            currency: item.unit_price.currency,
          },
          status: body.data.status,
        });

        const savedOrderItem = await newOrderItem.save();
        newOrderItems.push(savedOrderItem);
      }

      const mergedOrderItems = [...body.data.orderItems, ...newOrderItems];
      body.data.orderItems = mergedOrderItems;
      res.status(ppResponse.STATUS).send(body);
    } else {
      res.status(ppResponse.STATUS).send(body);
    }
  } catch (error) {
    next(createError(500, "Internal Server Error1"));
  }
};

/// Delete a QR code
export const deleteQRCodeService = async (
  codeId: string,
  res: Response,
  next: Function
) => {
  try {
    const deleteResponse: any = await PAYPAY.QRCodeDelete([codeId]);
    if (deleteResponse.BODY.resultInfo.code === "SUCCESS") {
      res.status(200).send(deleteResponse.BODY);
    } else {
      const error = createError(
        deleteResponse.STATUS,
        deleteResponse.BODY.resultInfo.message
      );
      return next(error);
    }
  } catch (error) {
    const internalServerError = createError(500, "Internal Server Error");
    return next(internalServerError);
  }
};

/// order detail
export const getOrderDetailService = async (
  merchantPaymentId: any
): Promise<any> => {
  try {
    const response: any = await PAYPAY.GetCodePaymentDetails([
      merchantPaymentId,
    ]);

    if (
      response.BODY.resultInfo.code === "SUCCESS" &&
      response.BODY.data.status === "COMPLETED"
    ) {
      const orders = await OrderModel.find({
        merchantPaymentId,
        status: { $ne: "SUCCESS" },
      });

      if (orders.length > 0) {
        await OrderModel.updateMany(
          { merchantPaymentId },
          { $set: { status: "SUCCESS" } }
        );
      }

      return response;
    } else if (response.BODY.data.status === "CREATED") {
      const orders = await OrderModel.find({
        merchantPaymentId,
        status: { $ne: "SUCCESS" },
      });

      if (orders.length > 0) {
        await OrderModel.updateMany(
          { merchantPaymentId },
          { $set: { status: "EXPIRED" } }
        );
      }
      return response;
    } else {
      const orders = await OrderModel.find({
        merchantPaymentId,
      });
      if (orders.length > 0) {
        await OrderModel.updateMany(
          { merchantPaymentId },
          { $set: { status: response.BODY.data.status } }
        );
      }
      return response;
    }
  } catch (error) {
    throw createError(500, "Internal Server Error");
  }
};

/// Cancel Refund
export const cancelPaymentService = async (
  merchantPaymentId: string
): Promise<any> => {
  try {
    const response: any = await PAYPAY.PaymentCancel([merchantPaymentId]);
    if (response.BODY.resultInfo.code === "REQUEST_ACCEPTED") {
      const orders = await OrderModel.find({
        merchantPaymentId,
        status: { $ne: "FAILED" },
      });

      if (orders.length > 0) {
        await OrderModel.updateMany(
          { merchantPaymentId },
          { $set: { status: "FAILED" } }
        );
      }

      return response;
    }
    return response;
  } catch (error) {
    throw createError(500, "Internal Server Error");
  }
};

/// Refund Payment
export const refundPaymentService = async (payload: any): Promise<any> => {
  try {
    const response: any = await PAYPAY.PaymentRefund(payload);
    const merchantPaymentId = payload.merchantRefundId;
    if (
      response.BODY.resultInfo.code === "SUCCESS" &&
      response.BODY.data.status === "REFUNDED"
    ) {
      const orders = await OrderModel.find({
        merchantPaymentId,
        status: { $ne: "REFUNDED" },
      });

      if (orders.length > 0) {
        await OrderModel.updateMany(
          { merchantPaymentId },
          { $set: { status: response.BODY.data.status } }
        );
      }

      return response;
    }
    return response;
  } catch (error) {
    throw createError(500, "Internal Server Error");
  }
};

/// Refund Detail
export const getReundDetailService = async (merchantPaymentId: any) => {
  try {
    const response: any = await PAYPAY.GetRefundDetails([merchantPaymentId]);
    return response;
  } catch (error) {
    throw createError(500, "Internal Server Error");
  }
};

/// Capture Payment
export const createCapturePaymentService = async (payload: any) => {
  try {
    const response = PAYPAY.PaymentAuthCapture(payload);
    return response;
  } catch (error) {
    throw createError(500, "Internal Server Error");
  }
};

/// Revert Payment
export const revertPaymentService = async (payload: any) => {
  try {
    const response = PAYPAY.PaymentAuthRevert(payload);
    return response;
  } catch (error) {
    throw createError(500, "Internal Server Error");
  }
};
