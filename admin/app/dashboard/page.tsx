"use client";

import StatCard from "@/components/ui/StatCard";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function DashboardPage() {
  const { stats, loading } = useDashboardStats();

  if (loading) {
    return (
      <div className="p-6 text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total News"
          value={stats.news}
          color="text-blue-600"
        />

        <StatCard
          title="Total Categories"
          value={stats.categories}
          color="text-green-600"
        />

        <StatCard
          title="Total Users"
          value={stats.users}
          color="text-red-600"
        />
      </div>
    </div>
  );
}
