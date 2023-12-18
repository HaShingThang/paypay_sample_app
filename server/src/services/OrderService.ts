import { Request, Response, NextFunction } from "express";
import OrderModel from "../models/order";
import { createError } from "../utils/CreateError";
import { getOrderDetailService } from "./PayPayService";

/// get orders
export const getOrdersService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.find().populate("cake");
    res.status(200).send({
      success: true,
      data: orders,
      length: orders.length,
    });
  } catch (error) {
    next(createError(500, "Internal Server Error!!"));
  }
};

/// get orders payment
export const getOrderPaymentsService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders: any = await OrderModel.find();
    const uniqueOrdersMap = new Map<string, any>();
    for (const order of orders) {
      const merchantPaymentId = order.merchantPaymentId.toString();
      if (!uniqueOrdersMap.has(merchantPaymentId)) {
        uniqueOrdersMap.set(merchantPaymentId, order);
      }
    }

    const uniqueOrders = Array.from(uniqueOrdersMap.values());

    const ordersWithDetails = await Promise.all(
      uniqueOrders.map(async (order) => {
        const orderDetail = await getOrderDetailService(
          order.merchantPaymentId
        );
        return orderDetail.BODY;
      })
    );

    const filteredOrdersWithDetails = ordersWithDetails.filter(
      (orderDetail) => orderDetail && orderDetail.data.status !== "CREATED"
    );

    res.status(200).send({
      success: true,
      data: filteredOrdersWithDetails,
      length: filteredOrdersWithDetails.length,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error!!"));
  }
};
