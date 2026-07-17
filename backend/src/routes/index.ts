import { Router } from "express";
import authRoutes from "@/modules/auth/auth.routes";
import categoryRoutes from "@/modules/categories";

const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);

export default router;
