"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useNews } from "@/hooks/useNews";

export default function CategoryPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(1);

  const { news } = useNews(page); // later filter by category

  return (
    <div>
      <h1 className="p-4 text-xl font-bold">
        {slug}
      </h1>

      {news.map((item) => (
        <div key={item._id}>{item.title}</div>
      ))}
    </div>
  );
}