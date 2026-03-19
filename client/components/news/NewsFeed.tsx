"use client";

import { useState } from "react";
import { useNews } from "@/hooks/useNews";
import NewsCard from "./NewsCard";

export default function NewsFeed() {
  const [page, setPage] = useState(1);

  const { news, loading } = useNews(page);

  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop ===
      e.target.clientHeight;

    if (bottom) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div
      onScroll={handleScroll}
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
    >
      {news.map((item) => (
        <NewsCard key={item._id} data={item} />
      ))}

      {loading && (
        <div className="text-center p-4">Loading...</div>
      )}
    </div>
  );
}