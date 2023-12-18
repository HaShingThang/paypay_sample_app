import { Request, Response, NextFunction } from "express";
import { getOrderPaymentsService, getOrdersService } from "../services/OrderService";

/// get orders
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await getOrdersService(req, res, next);
};


/// get orders payment
export const getOrderPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await getOrderPaymentsService(req, res, next);
};
