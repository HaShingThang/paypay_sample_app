import { Request, Response, NextFunction } from "express";
import { Item } from "../interfaces/Interfaces";
import CakeModel from "../models/cake";
import { createError } from "../utils/CreateError";

/// get cakes
export const getCakesService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cakes = await CakeModel.find();
    res.status(200).send({
      success: true,
      data: cakes,
      length: cakes.length,
    });
  } catch (error) {
    next(createError(500, "Internal Server Error!!"));
  }
};

/// create cake
export const createCakeService = async (
  payload: Item,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cakeTitle = payload.title;
  try {
    let cake = await CakeModel.findOne({ cakeTitle });
    if (cake) {
      return next(createError(409, "This cake is already exist!"));
    }
    const newCake = new CakeModel(payload);
    const savedCake = await newCake.save();
    res.status(201).send({
      success: true,
      data: savedCake,
    });
  } catch (error: any) {
    next(createError(500, "Internal Server Error!"));
  }
};
