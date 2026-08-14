import { Router } from "express";
import { orderController } from "./order.controller";
import { asyncHandler } from "@/common/middleware/asyncHandler";
import { authMiddleware } from "@/common/middleware/auth.middleware";
import { authorize } from "@/common/middleware/authorize.middleware";

const router = Router();

router.use(authMiddleware);

// Customer
router.post("/", asyncHandler(orderController.create));

router.get("/", asyncHandler(orderController.findMyOrders));

router.get("/:id", asyncHandler(orderController.findById));

// Admin
router.patch(
  "/:id/status",
  authorize("ADMIN"),
  asyncHandler(orderController.updateStatus),
);

export default router;
