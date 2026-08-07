import { Router } from "express";
import { productController } from "./product.controller";
import { asyncHandler } from "@/common/middleware/asyncHandler";
import { authMiddleware } from "@/common/middleware/auth.middleware";
import { authorize } from "@/common/middleware/authorize.middleware";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", asyncHandler(productController.findAll));

router.get("/:id", asyncHandler(productController.findById));

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  asyncHandler(productController.create),
);

router.patch(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  asyncHandler(productController.update),
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  asyncHandler(productController.remove),
);

export default router;
