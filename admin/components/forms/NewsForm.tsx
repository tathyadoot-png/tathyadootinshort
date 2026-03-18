"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Send,
  Zap,
  Globe,
  Hash,
  MapPin,
  LayoutDashboard,
  Eye,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";

type NewsStatus = "draft" | "published" | "archived";

interface StructuredType {
  who: string;
  what: string;
  when: string;
  where: string;
  why: string;
  how: string;
}

export default function CreateNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    detailedContent: "",
    categoryId: "",
    location: "",
    status: "draft" as NewsStatus,
    isBreaking: false,
    tags: "",
    structured: {
      who: "",
      what: "",
      when: "",
      where: "",
      why: "",
      how: "",
    } as StructuredType,
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  const categories = [
    { _id: "1", name: "Politics" },
    { _id: "2", name: "Sports" },
    { _id: "3", name: "Technology" },
  ];

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/\s+/g, "-");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        keywords: form.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed");

      router.push("/admin/news");
    } catch (err) {
      console.error(err);
      alert("Error creating news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      {/* HEADER */}
      <div
        className="sticky top-0 z-50 border-b mb-10"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm">
            <LayoutDashboard size={16} />
            <ChevronRight size={14} />
            <span style={{ color: "var(--color-primary)" }}>
              News Editor
            </span>
          </div>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-full font-bold flex items-center gap-2 text-white transition-all"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {loading ? "Publishing..." : <><Send size={16} /> Publish</>}
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* MAIN CONTENT */}
          <section
            className="p-8 rounded-3xl shadow"
            style={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            <input
              type="text"
              placeholder="Headline..."
              className="w-full text-4xl font-black outline-none mb-6 bg-transparent"
              value={form.title}
              onChange={(e) => {
                setForm({
                  ...form,
                  title: e.target.value,
                  slug: generateSlug(e.target.value),
                });
              }}
            />

            <div className="flex gap-4 mb-8">
              <input
                type="text"
                value={form.slug}
                className="flex-1 p-3 border rounded-xl text-sm"
                style={{ borderColor: "var(--color-border)" }}
                readOnly
              />

              <select
                className="p-3 border rounded-xl text-sm"
                style={{ borderColor: "var(--color-border)" }}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              rows={10}
              placeholder="Detailed Content..."
              className="w-full p-4 border rounded-xl outline-none"
              style={{ borderColor: "var(--color-border)" }}
              onChange={(e) =>
                setForm({ ...form, detailedContent: e.target.value })
              }
            />
          </section>

          {/* 5W1H */}
          <section
            className="p-8 rounded-3xl"
            style={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h2
              className="font-bold mb-6 flex items-center gap-2"
              style={{ color: "var(--color-primary)" }}
            >
              <Zap size={18} /> 5W1H Structure
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {Object.keys(form.structured).map((key) => (
                <input
                  key={key}
                  placeholder={key.toUpperCase()}
                  className="p-3 border rounded-xl text-sm"
                  style={{ borderColor: "var(--color-border)" }}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      structured: {
                        ...form.structured,
                        [key]: e.target.value,
                      },
                    })
                  }
                />
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Publication */}
          <div
            className="p-6 rounded-3xl space-y-4"
            style={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h3 className="font-bold text-sm uppercase">Publication</h3>

            <div className="flex justify-between items-center">
              <span>Breaking News</span>
              <button
                onClick={() =>
                  setForm({ ...form, isBreaking: !form.isBreaking })
                }
                className={`w-12 h-6 rounded-full flex items-center px-1 transition`}
                style={{
                  backgroundColor: form.isBreaking
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                }}
              >
                <div className="w-4 h-4 bg-white rounded-full ml-auto" />
              </button>
            </div>

            <input
              placeholder="Location"
              className="w-full p-3 border rounded-xl text-sm"
              style={{ borderColor: "var(--color-border)" }}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <input
              placeholder="Tags (comma separated)"
              className="w-full p-3 border rounded-xl text-sm"
              style={{ borderColor: "var(--color-border)" }}
              onChange={(e) =>
                setForm({ ...form, tags: e.target.value })
              }
            />

            <select
              className="w-full p-3 border rounded-xl text-sm"
              style={{ borderColor: "var(--color-border)" }}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as NewsStatus })
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* SEO */}
          <div
            className="p-6 rounded-3xl space-y-4"
            style={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h3 className="font-bold text-sm uppercase">SEO</h3>

            <input
              placeholder="Meta Title"
              className="w-full p-3 border rounded-xl text-sm"
              style={{ borderColor: "var(--color-border)" }}
              onChange={(e) =>
                setForm({ ...form, metaTitle: e.target.value })
              }
            />

            <textarea
              rows={3}
              placeholder="Meta Description"
              className="w-full p-3 border rounded-xl text-sm"
              style={{ borderColor: "var(--color-border)" }}
              onChange={(e) =>
                setForm({ ...form, metaDescription: e.target.value })
              }
            />

            <input
              placeholder="Keywords (comma separated)"
              className="w-full p-3 border rounded-xl text-sm"
              style={{ borderColor: "var(--color-border)" }}
              onChange={(e) =>
                setForm({ ...form, keywords: e.target.value })
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
}
