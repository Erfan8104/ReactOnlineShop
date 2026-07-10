import { NextFunction, Request, Response } from "express";
import { AppError } from "@/common/errors/AppError";
import { verifyToken } from "@/modules/auth/auth.utils";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: number;
        role: "ADMIN" | "CUSTOMER";
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Unauthorized", 401);
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new AppError("Unauthorized", 401);
  }

  try {
    req.user = verifyToken(token);

    next();
  } catch {
    throw new AppError("Invalid access token", 401);
  }
};
