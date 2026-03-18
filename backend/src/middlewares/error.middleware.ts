import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("ERROR ", err);

  // Mongoose Invalid ID
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate field value",
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};
