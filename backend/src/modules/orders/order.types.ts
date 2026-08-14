import { z } from "zod";
import { createOrderSchema, updateOrderStatusSchema } from "./order.validator";

export type CreateOrderDto = z.infer<typeof createOrderSchema>;

export type UpdateOrderStatusDto = z.infer<typeof updateOrderStatusSchema>;
