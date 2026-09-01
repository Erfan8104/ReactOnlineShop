import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/schemas/auth.schema";
import { useAuthStore } from "@/stores/auth.store";

import type { z } from "zod";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const isLoading = useAuthStore((state) => state.isLoading);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setServerError("");

    try {
      await login(data);
      navigate("/");
    } catch {
      setServerError("ایمیل یا رمز عبور صحیح نیست.");
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
      <div className="w-full rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">ورود</h1>

        <p className="mt-2 text-sm text-gray-500">وارد حساب کاربری خود شوید.</p>

        {serverError && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">ایمیل</label>

            <input
              {...register("email")}
              type="email"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              placeholder="example@email.com"
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">رمز عبور</label>

            <input
              {...register("password")}
              type="password"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              placeholder="••••••••"
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
            className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          حساب کاربری ندارید؟{" "}
          <Link to="/register" className="font-medium text-black">
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}
