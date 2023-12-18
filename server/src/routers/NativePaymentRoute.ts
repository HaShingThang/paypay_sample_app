import express from "express";
import {
  createAccountLink,
  getUserAuthorization,
  makeContinuePayment,
  makePayment,
  makePendingPayment,
} from "../controllers/NativePaymentController";

const router = express.Router();

/// Account Link
router.route("/account-link").post(createAccountLink);

/// Get User Authorization Status
router.route("/user-status/:userAuthorizationId").get(getUserAuthorization);

/// Payment
router.route("/payments").post(makePayment);

/// Continue Payment
router.route("/subscription/payments").post(makeContinuePayment);

/// Pending Payment
router.route("/requestOrder").post(makePendingPayment);

export default router;
