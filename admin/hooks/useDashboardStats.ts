import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api/api";

export const useDashboardStats = () => {
const [stats, setStats] = useState({
  news: 0,
  publishedNews: 0,
  categories: 0,
  users: 0,
  likes: 0,
  bookmarks: 0,
  shares: 0,
  views: 0,
});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiRequest("/dashboard/stats");

       setStats({
  news: res.totalNews,
  publishedNews: res.publishedNews,
  categories: res.totalCategories,
  users: res.totalUsers,
  likes: res.totalLikes,
  bookmarks: res.totalBookmarks,
  shares: res.totalShares,
  views: res.totalViews,
});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};