import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
        {/* Logo */}
        <Link to="/" className="shrink-0 text-xl font-bold">
          فروشگاه
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm transition hover:text-gray-500">
            خانه
          </Link>

          <Link
            to="/products"
            className="text-sm transition hover:text-gray-500"
          >
            محصولات
          </Link>

          <Link
            to="/categories"
            className="text-sm transition hover:text-gray-500"
          >
            دسته‌بندی‌ها
          </Link>
        </nav>

        {/* Search */}
        <div className="hidden flex-1 md:block">
          <div className="relative mx-auto max-w-md">
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="جستجوی محصول..."
              className="h-10 w-full rounded-lg border bg-gray-50 pr-10 pl-4 text-sm outline-none transition focus:border-gray-400"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mr-auto flex items-center gap-2">
          <Link
            to="/cart"
            className="relative rounded-lg p-2 transition hover:bg-gray-100"
            aria-label="سبد خرید"
          >
            <ShoppingCart size={21} />
          </Link>

          <Link
            to="/profile"
            className="rounded-lg p-2 transition hover:bg-gray-100"
            aria-label="حساب کاربری"
          >
            <User size={21} />
          </Link>

          <button
            type="button"
            className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
            aria-label="منو"
          >
            <Menu size={21} />
          </button>
        </div>
      </div>
    </header>
  );
}
