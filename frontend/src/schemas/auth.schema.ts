import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("ایمیل معتبر وارد کنید"),

  password: z.string().min(6, "رمز عبور حداقل باید ۶ کاراکتر باشد"),
});

export const registerSchema = z.object({
  firstName: z.string().trim().min(2, "نام الزامی است"),

  lastName: z.string().trim().min(2, "نام خانوادگی الزامی است"),

  email: z.string().trim().email("ایمیل معتبر وارد کنید"),

  password: z.string().min(6, "رمز عبور حداقل باید ۶ کاراکتر باشد"),

  phone: z.string().trim().optional(),
});
