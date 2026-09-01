import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu } from "lucide-react";

import { useAuthStore } from "@/stores/auth.store";

export default function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
        <Link to="/" className="shrink-0 text-xl font-bold">
          فروشگاه
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/">خانه</Link>

          <Link to="/products">محصولات</Link>

          <Link to="/categories">دسته‌بندی‌ها</Link>
        </nav>

        <div className="hidden flex-1 md:block">
          <div className="relative mx-auto max-w-md">
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="جستجوی محصول..."
              className="h-10 w-full rounded-lg border bg-gray-50 pr-10 pl-4 text-sm outline-none focus:border-gray-400"
            />
          </div>
        </div>

        <div className="mr-auto flex items-center gap-2">
          <Link to="/cart" className="rounded-lg p-2 hover:bg-gray-100">
            <ShoppingCart size={21} />
          </Link>

          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100"
            >
              <User size={21} />

              <span className="hidden text-sm md:inline">
                {user.firstName || "حساب کاربری"}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-black px-4 py-2 text-sm text-white"
            >
              ورود
            </Link>
          )}

          <button
            type="button"
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          >
            <Menu size={21} />
          </button>
        </div>
      </div>
    </header>
  );
}
