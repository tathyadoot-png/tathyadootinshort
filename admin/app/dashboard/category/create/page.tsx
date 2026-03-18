"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryForm from "@/components/forms/CategoryForm";
import {
  createCategory,
  updateCategory,
  getCategoryById,
} from "@/lib/api/category";
import { Category } from "@/types/category";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [category, setCategory] =
    useState<Category | null>(null);

  const [loading, setLoading] = useState(false);

  // 🔥 EDIT MODE FETCH
  useEffect(() => {
    if (id) {
      setLoading(true);
      getCategoryById(id)
        .then((data) => {
          setCategory(data);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to load category");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  // ⏳ loading UI
  if (id && loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <CategoryForm
        initialData={category}
        onSubmit={async (formData) => {
          if (id) {
            await updateCategory(id, formData);
          } else {
            await createCategory(formData);
          }

          router.push("/dashboard/category");
        }}
      />
    </div>
  );
}