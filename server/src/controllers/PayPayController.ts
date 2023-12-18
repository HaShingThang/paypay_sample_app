import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import {
  cancelPaymentService,
  createCapturePaymentService,
  createQRCodeService,
  deleteQRCodeService,
  getOrderDetailService,
  getReundDetailService,
  refundPaymentService,
  revertPaymentService,
} from "../services/PayPayService";
import { createError } from "../utils/CreateError";

/// Create QR Code for payment
export const createQRCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentId = crypto.randomBytes(12).toString("hex");
    const redirectUrl =
      process.env.FRONTEND_PATH + "/orderpayment/" + paymentId;
    const payload = {
      merchantPaymentId: paymentId,
      amount: req.body.amount,
      codeType: "ORDER_QR",
      orderItems: req.body.orderItems,
      redirectUrl,
      redirectType: "WEB_LINK",
      isAuthorization: req.body.isAuthorization,
    };
    await createQRCodeService(payload, res, next);
  } catch (error) {
    next(createError(500, "Internal Server Error2"));
  }
};

/// Delete a QR Code
export const deleteQRCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const codeId = req.params.codeId;
    await deleteQRCodeService(codeId, res, next);
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

/// get order detail from paypay
export const getOrderDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getOrderDetailService(req.params.merchantId);
    res.status(response.STATUS).send(response.BODY);
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

/// CancelPayment
export const cancelPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { merchantPaymentId } = req.params;
    const result = await cancelPaymentService(merchantPaymentId);
    if (
      result.BODY.resultInfo.code === "SUCCESS" ||
      result.BODY.resultInfo.code === "REQUEST_ACCEPTED"
    ) {
      res.status(result.STATUS).send({
        success: true,
        data: result.BODY,
      });
    } else {
      const error = createError(result.STATUS, result.BODY.resultInfo.message);
      next(error);
    }
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

/// Refund Payment
export const refundPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { merchantRefundId, paymentId, amount, reason } = req.body;

    const payload = {
      merchantRefundId,
      paymentId,
      amount,
      reason,
    };

    const result = await refundPaymentService(payload);
    if (result.BODY.resultInfo.code === "SUCCESS") {
      res.status(result.STATUS).send({
        success: true,
        data: result.BODY,
      });
    } else {
      res.status(result.STATUS).send({
        success: true,
        data: result.BODY,
      });
    }
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

/// Refund Detail
export const getRefundDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { merchantRefundId } = req.params;
    const response: any = await getReundDetailService(merchantRefundId);
    if (
      response.BODY.resultInfo.code === "SUCCESS" &&
      response.BODY.data.status === "REFUNDED"
    ) {
      res.status(response.STATUS).json({
        success: true,
        data: response.BODY,
      });
    } else {
      return next(
        createError(response.STATUS, response.BODY.resultInfo.message)
      );
    }
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

/// Capture Payment
export const createCapturePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const captureId = crypto.randomBytes(12).toString("hex");
    const payload = {
      merchantPaymentId: req.body.merchantPaymentId,
      merchantCaptureId: captureId,
      requestedAt: 1587460334340,
      amount: req.body.amount,
      orderDescription: req.body.orderDescription,
    };
    const ppResult = await createCapturePaymentService(payload);
    res.status(ppResult.STATUS).send(ppResult);
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

/// Revert Payment
export const revertPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { merchantRevertId, paymentId, reason } = req.body;
    const payload = {
      merchantRevertId,
      paymentId,
      reason,
    };
    const ppResult = await revertPaymentService(payload);
    res.status(ppResult.STATUS).send(paymentId.BODY);
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};
