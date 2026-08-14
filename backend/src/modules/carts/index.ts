import { Router } from "express";
import cartRoutes from "./cart.routes";

const router = Router();

router.use("/", cartRoutes);

export default router;
