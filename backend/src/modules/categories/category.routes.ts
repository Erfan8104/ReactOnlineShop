import { Router } from "express";
import { categoryController } from "./category.controller";
import { asyncHandler } from "@/common/middleware/asyncHandler";
import { authMiddleware } from "@/common/middleware/auth.middleware";
import { authorize } from "@/common/middleware/authorize.middleware";

const router = Router();

/**
 * Public Routes
 */

router.get("/", asyncHandler(categoryController.findAll));

router.get("/:id", asyncHandler(categoryController.findById));

/**
 * Admin Routes
 */

router.post(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  asyncHandler(categoryController.create),
);

router.patch(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  asyncHandler(categoryController.update),
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  asyncHandler(categoryController.remove),
);

export default router;
