import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      
      <Sidebar />

      <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>

    </div>
  );
}
