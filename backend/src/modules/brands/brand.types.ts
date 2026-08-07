import { z } from "zod";
import { createBrandSchema, updateBrandSchema } from "./brand.validator";

export type CreateBrandDto = z.infer<typeof createBrandSchema>;

export type UpdateBrandDto = z.infer<typeof updateBrandSchema>;
