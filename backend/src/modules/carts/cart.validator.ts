import { z } from "zod";

export const addCartItemSchema = z.object({
  productId: z.coerce.number().int().positive(),

  quantity: z.coerce.number().int().min(1).max(100),
});

export const updateCartItemSchema = z.object({
  quantity: z.coerce.number().int().min(1).max(100),
});
