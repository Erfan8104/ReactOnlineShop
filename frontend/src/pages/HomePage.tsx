import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="rounded-2xl bg-gray-100 px-6 py-16 md:px-12">
        <div className="max-w-2xl">
          <span className="text-sm font-medium text-gray-500">
            فروشگاه آنلاین
          </span>

          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            خرید آسان،
            <br />
            انتخاب بهتر
          </h1>

          <p className="mt-5 max-w-lg leading-7 text-gray-600">
            محصولات مورد نیاز خود را با بهترین قیمت پیدا کنید و سفارش دهید.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            مشاهده محصولات
          </Link>
        </div>
      </section>

      {/* Categories placeholder */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">دسته‌بندی‌ها</h2>

          <Link
            to="/categories"
            className="text-sm text-gray-500 hover:text-black"
          >
            مشاهده همه
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {["موبایل", "لپ‌تاپ", "لوازم جانبی", "پوشاک"].map((category) => (
            <div
              key={category}
              className="flex h-32 items-center justify-center rounded-xl border bg-white font-medium transition hover:shadow-md"
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      {/* Products placeholder */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">محصولات جدید</h2>

          <Link
            to="/products"
            className="text-sm text-gray-500 hover:text-black"
          >
            مشاهده همه
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-xl border bg-white"
            >
              <div className="aspect-square bg-gray-100" />

              <div className="p-4">
                <div className="h-4 w-3/4 rounded bg-gray-100" />

                <div className="mt-4 h-4 w-1/2 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
