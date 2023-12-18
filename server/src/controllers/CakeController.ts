import { Request, Response, NextFunction } from "express";
import { createCakeService, getCakesService } from "../services/CakeService";
import { Item } from "../interfaces/Interfaces";
import { createError } from "../utils/CreateError";

/// get cakes
export const getCakes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await getCakesService(req, res, next);
};

/// create cake
export const createCake = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload: Item = req.body;
  try {
    await createCakeService(payload, req, res, next);
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};
