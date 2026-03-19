"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api/api";
import CommentsModal from "@/components/ui/CommentsModal";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/ui/Pagination";
import { useDebounce } from "@/hooks/useDebounce";
import ListHeader from "@/components/common/ListHeader";

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
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [categories, setCategories] = useState<any[]>([]);

  // 📄 Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔄 Sorting
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const debouncedSearch = useDebounce(search);

  // 🔥 Fetch categories
  useEffect(() => {
    apiRequest("/categories").then((res) =>
      setCategories(res.data || res)
    );
  }, []);

  // 🔥 Fetch News
  const fetchNews = async () => {
    try {
      setLoading(true);

      const res = await apiRequest(
        `/news?page=${page}&search=${debouncedSearch}&category=${category}&status=${status}&sort=${sortKey}&order=${sortOrder}`
      );

      setNews(res.data || []);
      setTotalPages(res.totalPages || 1);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, debouncedSearch, category, status, sortKey, sortOrder]);

  // 🗑️ Delete
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

  // 🔄 Sorting
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // 📊 Columns
  const columns = [
    {
      key: "title",
      label: "Title",
      sortable: true,
    },
    {
      key: "category",
      label: "Category",
      render: (item: any) =>
         item.categoryId?.name || "No Category",
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (item: any) =>
        new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  // ⚡ Actions
  const renderActions = (item: any) => (
    <div className="flex gap-3">
      <button
        onClick={() => setSelectedNewsId(item._id)}
        className="text-purple-600"
      >
        Comments
      </button>

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
  );

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow p-6">
      {/* 🧩 Header */}
      <ListHeader
        search={search}
        setSearch={setSearch}
        createLink="/dashboard/news/create"
        createLabel="Create News"
        filters={[
          {
            value: category,
            onChange: setCategory,
            options: categories.map((c: any) => ({
              label: c.name,
              value: c._id,
            })),
          },
          {
            value: status,
            onChange: setStatus,
            options: [
              { label: "Published", value: "published" },
              { label: "Draft", value: "draft" },
            ],
          },
        ]}
      />

      {/* 📊 Table */}
      <DataTable
        columns={columns}
        data={news}
        loading={loading}
        renderActions={renderActions}
        onSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />

      {/* 📄 Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />

      {/* 💬 Comments */}
      <CommentsModal
        newsId={selectedNewsId}
        onClose={() => setSelectedNewsId(null)}
      />
    </div>
  );
}