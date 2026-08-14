import { z } from "zod";
import { addCartItemSchema, updateCartItemSchema } from "./cart.validator";

export type AddCartItemDto = z.infer<typeof addCartItemSchema>;

export type UpdateCartItemDto = z.infer<typeof updateCartItemSchema>;
