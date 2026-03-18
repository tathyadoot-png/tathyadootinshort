import { Request, Response, NextFunction } from "express";

export const asyncHandler =
  <T = any>(
    fn: (
      req: Request<T>,
      res: Response,
      next: NextFunction
    ) => Promise<any>
  ) =>
  (
    req: Request<T>,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
