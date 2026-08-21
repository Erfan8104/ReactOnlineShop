import { Router } from "express";

import authRoutes from "@/modules/auth";
import categoryRoutes from "@/modules/categories";
import brandRoutes from "@/modules/brands";
import productRoutes from "@/modules/products";
import cartRoutes from "@/modules/carts";
import orderRoutes from "@/modules/orders";
import paymentRoutes from "@/modules/payments";

const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/brands", brandRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);

router.use("/payments", paymentRoutes);

export default router;
