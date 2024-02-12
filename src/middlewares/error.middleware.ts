/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Logger from "@/logger";
import * as Sentry from "@sentry/node";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import AppErr from "@/helpers/appErr";

const errorMiddleware: ErrorRequestHandler = async (
  err: AppErr,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB ID error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new AppErr(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new AppErr(message, 400);
  }

  // Wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    err = new AppErr(message, 400);
  }

  // JWT expired Error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, try again`;
    err = new AppErr(message, 400);
  }

  Logger.error(err.message);

  // Send error to Sentry
  Sentry.captureException(err);

  if (process.env.NODE_ENV === "production") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
};

export default errorMiddleware;
