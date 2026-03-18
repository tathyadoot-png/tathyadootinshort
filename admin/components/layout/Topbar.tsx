"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/");
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <h2 className="font-semibold text-lg">Admin Dashboard</h2>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-600 hover:opacity-80 transition"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}
