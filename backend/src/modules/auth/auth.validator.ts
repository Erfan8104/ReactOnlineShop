import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Email is invalid").trim().toLowerCase(),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(100)
    .regex(/[A-Z]/, "Password must contain one uppercase letter")
    .regex(/[a-z]/, "Password must contain one lowercase letter")
    .regex(/[0-9]/, "Password must contain one number"),

  firstName: z.string().trim().min(2).max(50),

  lastName: z.string().trim().min(2).max(50),
});

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),

  password: z.string().min(8),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string(),

  newPassword: z
    .string()
    .min(8)
    .max(100)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/),
});
