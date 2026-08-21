import { Router } from "express";
import { paymentController } from "./payment.controller";
import { asyncHandler } from "@/common/middleware/asyncHandler";
import { authMiddleware } from "@/common/middleware/auth.middleware";

const router = Router();

// احراز هویت برای پرداخت‌های کاربر
router.post("/", authMiddleware, asyncHandler(paymentController.create));

// دریافت وضعیت پرداخت یک سفارش
router.get(
  "/orders/:orderId",
  authMiddleware,
  asyncHandler(paymentController.getByOrderId),
);

// Callback درگاه پرداخت
// این endpoint نباید authMiddleware داشته باشد،
// چون درگاه پرداخت کاربر را از طریق JWT نمی‌شناسد.
router.post("/callback", asyncHandler(paymentController.callback));

export default router;
