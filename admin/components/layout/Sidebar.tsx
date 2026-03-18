"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenu } from "@/lib/menu";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white fixed">
      <div className="p-6 text-xl font-bold border-b border-white/10">
        Admin
      </div>

      <nav className="p-4 space-y-2">
        {sidebarMenu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                active
                  ? "bg-red-600"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
