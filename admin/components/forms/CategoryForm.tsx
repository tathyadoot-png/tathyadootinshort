"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types/category";

interface Props {
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: Category | null;
}

export default function CategoryForm({
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true,
    order: "",
  });

  const [icon, setIcon] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 smart slug
  useEffect(() => {
    if (!isSlugEdited) {
      const s = form.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

      setForm((prev) => ({ ...prev, slug: s }));
    }
  }, [form.name, isSlugEdited]);

  // 🔥 edit mode
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        isActive: initialData.isActive ?? true,
        order: String(initialData.order ?? 0),
      });

      setPreview(initialData.icon?.url || null);
      setIsSlugEdited(true); // edit me override
    }
  }, [initialData]);

const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >
) => {
  const { name, value, type } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value,   // 🔥 बस value रखो (Number मत करो)
  }));
};

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      formData.append("isActive", String(form.isActive));
      formData.append("order", String(Number(form.order) || 0));

      if (icon) formData.append("icon", icon);

      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 space-y-5 shadow-md"
    >
      <h2 className="text-2xl font-bold text-[var(--color-accent)]">
        {initialData ? "Edit Category" : "Create Category"}
      </h2>

      {/* Name */}
      <input
        name="name"
        placeholder="Category Name"
        value={form.name}
        onChange={handleChange}
        className="w-full bg-transparent border border-[var(--color-border)] p-3 rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        required
      />

      {/* Slug */}
      <input
        name="slug"
        placeholder="Slug"
        value={form.slug}
        onChange={(e) => {
          setIsSlugEdited(true);
          handleChange(e);
        }}
        className="w-full bg-transparent border border-[var(--color-border)] p-3 rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        required
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full bg-transparent border border-[var(--color-border)] p-3 rounded-lg h-24"
      />

      {/* Order */}
      <input
        type="number"
        name="order"
        placeholder="Order"
        value={form.order}
        onChange={handleChange}
        className="w-full bg-transparent border border-[var(--color-border)] p-3 rounded-lg"
      />

      {/* Active */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
          className="accent-[var(--color-accent)]"
        />
        Active Category
      </label>

      {/* Image */}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setIcon(file);

            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {preview && (
          <img
            src={preview}
            className="w-24 h-24 mt-3 object-contain border rounded-lg"
          />
        )}
      </div>

      {/* 🔥 BUTTON FIX */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Category"
          : "Create Category"}
      </button>
    </form>
  );
}