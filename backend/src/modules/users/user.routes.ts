import { Router } from "express";
import { userController } from "./user.controller";
import { asyncHandler } from "@/common/middleware/asyncHandler";
import { authMiddleware } from "@/common/middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

// Profile
router.get("/me", asyncHandler(userController.getProfile));

router.patch("/me", asyncHandler(userController.updateProfile));

// Addresses
router.get("/me/addresses", asyncHandler(userController.getAddresses));

router.post("/me/addresses", asyncHandler(userController.createAddress));

router.patch("/me/addresses/:id", asyncHandler(userController.updateAddress));

router.delete("/me/addresses/:id", asyncHandler(userController.deleteAddress));

export default router;
