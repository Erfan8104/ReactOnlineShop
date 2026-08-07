import { Router } from "express";

import authRoutes from "@/modules/auth";
import categoryRoutes from "@/modules/categories";
import brandRoutes from "@/modules/brands";
import productRoutes from "@/modules/products";

const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/brands", brandRoutes);
router.use("/products", productRoutes);

export default router;
