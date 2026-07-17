import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(100),

  slug: z.string().trim().min(2).max(120).optional(),

  parentId: z.number().int().positive().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),

  slug: z.string().trim().min(2).max(120).optional(),

  parentId: z.number().int().positive().nullable().optional(),
});
