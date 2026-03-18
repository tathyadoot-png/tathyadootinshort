"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

interface Stats {
  news: number;
  categories: number;
  users: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<Stats>({
    news: 0,
    categories: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [newsRes, categoryRes, userRes] =
          await Promise.all([
            apiRequest("/news/count"),
            apiRequest("/categories/count"),
            apiRequest("/users/count"),
          ]);

        setStats({
          news: newsRes.total,
          categories: categoryRes.total,
          users: userRes.total,
        });
      } catch (error) {
        console.error("Dashboard Stats Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}
