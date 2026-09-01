import { useAuthStore } from "@/stores/auth.store";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border p-6">
        <h1 className="text-2xl font-bold">پروفایل</h1>

        <div className="mt-6 space-y-4">
          <div>
            <span className="text-sm text-gray-500">نام</span>

            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>
          </div>

          <div>
            <span className="text-sm text-gray-500">ایمیل</span>

            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <span className="text-sm text-gray-500">شماره تلفن</span>

            <p className="font-medium">{user.phone || "-"}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-8 rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white"
        >
          خروج از حساب
        </button>
      </div>
    </div>
  );
}
