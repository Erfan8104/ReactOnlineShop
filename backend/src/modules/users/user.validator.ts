import { z } from "zod";

export const updateProfileSchema = z.object({
  email: z.string().trim().email("Invalid email").optional(),

  firstName: z.string().trim().min(2).max(100).optional(),

  lastName: z.string().trim().min(2).max(100).optional(),

  phone: z.string().trim().min(10).max(20).optional(),

  avatar: z.string().url("Invalid avatar URL").optional(),
});

export const createAddressSchema = z.object({
  title: z.string().trim().min(2).max(100),

  province: z.string().trim().min(2).max(100),

  city: z.string().trim().min(2).max(100),

  address: z.string().trim().min(5).max(500),

  postalCode: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Postal code must contain exactly 10 digits"),

  isDefault: z.boolean().default(false),
});

export const updateAddressSchema = createAddressSchema.partial();
