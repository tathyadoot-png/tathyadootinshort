import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_key";
// console.log("VERIFY SECRET:", process.env.JWT_ACCESS_SECRET);

export const authMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    // console.log("AUTH HEADER:", req.headers.authorization);

    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
