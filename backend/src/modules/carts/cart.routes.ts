import { Router } from "express";
import { cartController } from "./cart.controller";
import { asyncHandler } from "@/common/middleware/asyncHandler";
import { authMiddleware } from "@/common/middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", asyncHandler(cartController.getCart));

router.post("/items", asyncHandler(cartController.addItem));

router.patch("/items/:itemId", asyncHandler(cartController.updateItem));

router.delete("/items/:itemId", asyncHandler(cartController.removeItem));

router.delete("/", asyncHandler(cartController.clearCart));

export default router;
