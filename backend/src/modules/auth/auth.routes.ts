import { Router } from "express";
import { authController } from "./auth.controller";
import { asyncHandler } from "@/common/middleware/asyncHandler";
import { authMiddleware } from "@/common/middleware/auth.middleware";

const router = Router();

router.post("/register", asyncHandler(authController.register));

router.post("/login", asyncHandler(authController.login));

router.post("/refresh", asyncHandler(authController.refresh));

router.post("/logout", asyncHandler(authController.logout));

router.get("/me", authMiddleware, asyncHandler(authController.me));

router.patch(
  "/change-password",
  authMiddleware,
  asyncHandler(authController.changePassword),
);

export default router;
