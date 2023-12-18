import { NextFunction, Request, Response } from "express";
import { logger } from "../logger/logger";

export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong.";

  logger.error(`Error ${errorStatus}: ${errorMessage}`, {
    error: err,
    stack: err.stack,
  });

  return res.status(errorStatus).send({
    success: false,
    error: {
      status: errorStatus,
      message: errorMessage,
    },
  });
};
