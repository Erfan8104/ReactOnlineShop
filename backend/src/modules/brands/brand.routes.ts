import { Router } from "express";
import authRoutes from "@/modules/auth";
import categoryRoutes from "@/modules/categories";
import brandRoutes from "@/modules/brands";

const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/brands", brandRoutes);

export default router;
