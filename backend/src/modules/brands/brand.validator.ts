import { z } from "zod";

export const createBrandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Brand name must be at least 2 characters")
    .max(100),

  slug: z.string().trim().min(2).max(120).optional(),
});

export const updateBrandSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),

  slug: z.string().trim().min(2).max(120).optional(),
});
