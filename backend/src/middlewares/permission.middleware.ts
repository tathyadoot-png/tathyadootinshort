import { Request, Response, NextFunction } from "express";

export const requirePermission = (path: string) => {
  return (req: any, res: Response, next: NextFunction) => {

    // ADMIN bypass
    if (req.user?.role === "ADMIN") return next();

    const keys = path.split(".");
    let permission = req.user?.permissions;

    for (const key of keys) {
      permission = permission?.[key];
    }

    if (!permission) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  };
};
