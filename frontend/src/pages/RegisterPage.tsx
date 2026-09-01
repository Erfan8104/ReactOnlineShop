import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "@/schemas/auth.schema";
import { useAuthStore } from "@/stores/auth.store";

import type { z } from "zod";

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();

  const registerUser = useAuthStore((state) => state.register);

  const isLoading = useAuthStore((state) => state.isLoading);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setServerError("");

    try {
      await registerUser(data);
      navigate("/");
    } catch {
      setServerError("ثبت‌نام انجام نشد. اطلاعات را بررسی کنید.");
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
      <div className="w-full rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">ایجاد حساب</h1>

        {serverError && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-medium">نام</label>

              <input
                {...register("firstName")}
                className="w-full rounded-lg border px-3 py-3 outline-none focus:border-black"
              />

              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                نام خانوادگی
              </label>

              <input
                {...register("lastName")}
                className="w-full rounded-lg border px-3 py-3 outline-none focus:border-black"
              />

              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">ایمیل</label>

            <input
              {...register("email")}
              type="email"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">شماره تلفن</label>

            <input
              {...register("phone")}
              type="tel"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">رمز عبور</label>

            <input
              {...register("password")}
              type="password"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {isLoading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          قبلاً حساب ساخته‌اید؟{" "}
          <Link to="/login" className="font-medium text-black">
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  );
}
