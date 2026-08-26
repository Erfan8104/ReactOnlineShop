import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4 text-gray-600">صفحه مورد نظر پیدا نشد.</p>

      <Link to="/" className="mt-6 rounded-lg bg-black px-5 py-2 text-white">
        بازگشت به خانه
      </Link>
    </div>
  );
}
