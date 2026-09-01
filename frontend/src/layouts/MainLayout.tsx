import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
