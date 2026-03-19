"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api/api";

export default function TrendingNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    apiRequest("/engagement/trending?limit=10")
      .then(setNews)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-card p-6 rounded-xl border border-border">
      <h2 className="font-bold mb-4">
        🔥 Top 10 Trending News
      </h2>

      <div className="space-y-3">
        {news.map((item: any, index) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">
                {index + 1}. {item.title}
              </p>

              <p className="text-sm text-gray-500">
                {item.categoryId?.name}
              </p>
            </div>

            <div className="text-sm text-gray-500">
              🔥 {item.engagementScore}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}