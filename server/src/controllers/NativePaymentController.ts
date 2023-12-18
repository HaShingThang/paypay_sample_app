import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/CreateError";
import crypto from "crypto";
import {
  accountLinkService,
  continuePaymentService,
  getUserAuthorizationService,
  paymentService,
  pendingPaymentService,
} from "../services/NativePaymentService";
import { generateRandomString } from "../utils/RandomString";

/// Link to paypay Account
export const createAccountLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const referenceId = crypto.randomBytes(12).toString("hex");
    const payload = {
      scopes: ["direct_debit"],
      nonce: generateRandomString(),
      redirectType: "WEB_LINK",
      redirectUrl: "https://172.20.80.61:8080",
      referenceId: referenceId,
      phoneNumber: "",
      deviceId: "",
    };
    const ppResult: any = await accountLinkService(payload);
    res.status(ppResult.STATUS).send(ppResult.BODY);
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

/// Get User Status
export const getUserAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userAuthorizationId } = req.params;
  try {
    const ppResult: any = await getUserAuthorizationService(
      userAuthorizationId
    );
    res.status(ppResult.STATUS).send(ppResult.BODY);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

/// Pay with native payment
export const makePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentId = crypto.randomBytes(12).toString("hex");
    let payload = {
      merchantPaymentId: paymentId,
      amount: req.body.amount,
      orderItems: req.body.orderItems,
      requestedAt: 1587460334340,
      userAuthorizationId: "9ddf5580-c967-4458-a6a4-01d9aa260cc4",
      orderDescription: "Mune's Favourite Cake",
    };
    await paymentService(res, next, payload);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

/// Pay with continue payment
export const makeContinuePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentId = crypto.randomBytes(12).toString("hex");
    let payload = {
      merchantPaymentId: paymentId,
      amount: req.body.amount,
      orderItems: req.body.orderItems,
      requestedAt: 1587460334340,
      userAuthorizationId: "9ddf5580-c967-4458-a6a4-01d9aa260cc4",
    };
    await continuePaymentService(res, next, payload);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

/// Pending payment
export const makePendingPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentId = crypto.randomBytes(12).toString("hex");
    let payload = {
      merchantPaymentId: paymentId,
      amount: req.body.amount,
      orderItems: req.body.orderItems,
      requestedAt: 1587460334340,
      userAuthorizationId: "9ddf5580-c967-4458-a6a4-01d9aa260cc4",
      expiryDate: expiryTimestamp,
    };
    await pendingPaymentService(res, next, payload);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};
