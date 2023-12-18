import express from "express";
import {
  cancelPayment,
  createCapturePayment,
  createQRCode,
  deleteQRCode,
  getOrderDetail,
  getRefundDetail,
  refundPayment,
  revertPayment,
} from "../controllers/PayPayController";

const router = express.Router();

// Create QR code for payment
router.route("/create-qr").post(createQRCode);

// Delete QR code
router.route("/delete-qr/:codeId").delete(deleteQRCode);

// Get order detail
router.route("/order-status/:merchantId").get(getOrderDetail);

// Cancel Payment
router.route("/cancel-payment/:merchantPaymentId").delete(cancelPayment);

// Refund Payment
router.route("/refunds").post(refundPayment);

// Refund Detail
router.route("/refunds/:merchantRefundId").get(getRefundDetail);

// Capture Payment
router.route("/payments/capture").post(createCapturePayment);

// Revert Payment
router.route("/payments/preauthorize/revert").post(revertPayment);

export default router;
