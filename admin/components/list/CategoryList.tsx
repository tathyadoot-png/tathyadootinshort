"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import {
  getCategories,
  deleteCategory,
} from "@/lib/api/category";
import { useRouter } from "next/navigation";

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this category?");
    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold text-[var(--color-accent)]">
          Categories
        </h1>

        <button
          onClick={() =>
            router.push("/dashboard/category/create")
          }
          className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:opacity-90"
        >
          + Create Category
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-sm text-gray-500">
          Loading categories...
        </p>
      )}

      {/* EMPTY */}
      {!loading && categories.length === 0 && (
        <p className="text-sm text-gray-400">
          No categories found
        </p>
      )}

      {/* LIST */}
      <div className="grid gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-4 flex justify-between items-center shadow-sm"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {cat.icon?.url && (
                <img
                  src={cat.icon.url}
                  className="w-12 h-12 object-contain border rounded-lg"
                />
              )}

              <div>
                <h2 className="font-semibold text-lg">
                  {cat.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {cat.slug}
                </p>

                {/* extra info */}
                <div className="text-xs text-gray-400 mt-1 flex gap-3">
                  <span>
                    Status:{" "}
                    {cat.isActive ? "Active" : "Inactive"}
                  </span>
                  <span>Order: {cat.order}</span>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  router.push(
                    `/dashboard/category/create?id=${cat._id}`
                  )
                }
                className="px-3 py-1.5 text-sm border rounded hover:bg-gray-100"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(cat._id)}
                className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}