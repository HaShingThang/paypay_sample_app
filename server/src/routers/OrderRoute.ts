import express from "express";
import { getOrderPayments, getOrders } from "../controllers/OrderController";

const router = express.Router();

/// get orders
router.route("/orders").get(getOrders);

/// get orders payment
router.route("/order-payments").get(getOrderPayments);

export default router;
