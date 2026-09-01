export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">فروشگاه</h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              فروشگاه آنلاین با تجربه خرید ساده، سریع و مطمئن.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">دسترسی سریع</h4>

            <div className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
              <a href="/">خانه</a>

              <a href="/products">محصولات</a>

              <a href="/categories">دسته‌بندی‌ها</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">پشتیبانی</h4>

            <p className="mt-3 text-sm text-gray-600">
              در صورت وجود هرگونه مشکل با پشتیبانی تماس بگیرید.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Online Shop
        </div>
      </div>
    </footer>
  );
}
