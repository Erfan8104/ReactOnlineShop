import { NextFunction, Request, Response } from "express";
import { AppError } from "@/common/errors/AppError";

export const authorize =
  (...roles: ("ADMIN" | "CUSTOMER")[]) =>
  (req: Request, _: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError("Forbidden", 403);
    }

    next();
  };
