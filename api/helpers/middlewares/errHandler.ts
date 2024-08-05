import { Request, Response, NextFunction } from "express";

import CustomAPIError from "@/utils/custom-errors";
import logger from "@/utils/logger";

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  logger.error(err);
  next(err);
};

export default errorHandlerMiddleware;
