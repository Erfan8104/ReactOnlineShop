import { z } from "zod";

export const createPaymentSchema = z.object({
  orderId: z.coerce.number().int().positive(),
});

export const paymentCallbackSchema = z.object({
  authority: z.string().trim().min(1),

  status: z.string().trim().min(1),

  transactionId: z.string().trim().optional(),

  refId: z.string().trim().optional(),
});
