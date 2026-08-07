import { z } from "zod";

const imageSchema = z.object({
  url: z.string().url("Image url is invalid"),

  isPrimary: z.boolean().default(false),
});

export const createProductSchema = z.object({
  title: z.string().trim().min(2).max(255),

  slug: z.string().trim().min(2).max(255).optional(),

  description: z.string().trim().optional(),

  sku: z.string().trim().optional(),

  price: z.coerce.number().positive(),

  discountPercent: z.coerce.number().min(0).max(100).optional(),

  stock: z.coerce.number().int().min(0),

  weight: z.coerce.number().positive().optional(),

  isActive: z.boolean().default(true),

  categoryId: z.coerce.number().int().positive(),

  brandId: z.coerce.number().int().positive().optional(),

  images: z.array(imageSchema).optional(),
});

export const updateProductSchema = createProductSchema.partial();
