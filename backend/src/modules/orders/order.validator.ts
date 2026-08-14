import { z } from "zod";

export const createOrderSchema = z.object({
  shippingProvince: z.string().trim().min(2, "Province is required").max(100),

  shippingCity: z.string().trim().min(2, "City is required").max(100),

  shippingAddress: z.string().trim().min(5, "Address is required").max(500),

  shippingPostalCode: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Postal code must contain exactly 10 digits"),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),
});
