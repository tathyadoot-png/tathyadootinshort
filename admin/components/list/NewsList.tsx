"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

interface News {
  _id: string;
  title: string;
  category?: { name: string };
  isPublished: boolean;
  createdAt: string;
}

export default function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await apiRequest("/news");
      setNews(res);
    } catch (err: any) {
      console.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this news?")) return;

    try {
      await apiRequest(`/news/${id}`, {
        method: "DELETE",
      });

      setNews((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">All News</h2>

        <Link
          href="/dashboard/news/create"
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          + Create News
        </Link>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">
                {item.category?.name || "No Category"} •{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/dashboard/news/create?id=${item._id}`}
                className="text-blue-600"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {news.length === 0 && (
          <div className="text-gray-500">No news found</div>
        )}
      </div>
    </div>
  );
}
