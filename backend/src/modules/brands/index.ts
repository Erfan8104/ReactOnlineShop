import { Router } from "express";
import brandRoutes from "./brand.routes";

const router = Router();

router.use("/", brandRoutes);

export default router;
