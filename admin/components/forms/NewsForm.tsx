"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getNewsById, createNews, updateNews } from "@/lib/api/news";
import { getCategories } from "@/lib/api/category";
import { Save, Image as ImageIcon, Globe, FileText, Settings, AlertCircle } from "lucide-react";
import { Structured } from "@/types/news";

export default function CreateNewsPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    detailedContent: "",
    categoryId: "",
    tags: "",
    keywords: "",
    publishedAt: "",
    location: "",
    status: "draft",
    isBreaking: false,
    metaTitle: "",
    metaDescription: "",
    who: "",
    what: "",
    when: "",
    where: "",
    why: "",
    how: "",
  });


useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data || res))
      .catch(console.error);
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 // 🔥 EDIT MODE
  useEffect(() => {
    if (id) {
      getNewsById(id).then((data) => {
        setForm((prev) => ({
          ...prev,
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          detailedContent: data.detailedContent || "",
          categoryId: data.category?._id || "",
          tags: data.tags?.join(",") || "",
          keywords: data.keywords?.join(",") || "",
          status: data.status || "draft",
          isBreaking: data.isBreaking ?? false,
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          publishedAt: data.publishedAt
            ? new Date(data.publishedAt).toISOString().slice(0, 16)
            : "",
          location: data.location || "",
          who: data.structured?.who || "",
          what: data.structured?.what || "",
          when: data.structured?.when || "",
          where: data.structured?.where || "",
          why: data.structured?.why || "",
          how: data.structured?.how || "",
        }));

        setImagePreview(data.image?.url || null);
      });
    }
  }, [id]);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.slug) return alert("Slug required");
    if (!form.categoryId) return alert("Category required");

    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          formData.append(key, String(value));
        } else {
          formData.append(key, value as string);
        }
      });

      formData.set(
        "tags",
        JSON.stringify(form.tags.split(",").map((t) => t.trim()))
      );

      formData.set(
        "keywords",
        JSON.stringify(
          form.keywords.split(",").map((k) => k.trim())
        )
      );

      formData.set(
        "structured",
        JSON.stringify({
          who: form.who,
          what: form.what,
          when: form.when,
          where: form.where,
          why: form.why,
          how: form.how,
        })
      );

      if (image) formData.append("image", image);

      // 🔥 CREATE vs UPDATE
      if (id) {
        await updateNews(id, formData);
      } else {
        await createNews(formData);
      }

      router.push("/dashboard/news");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const inputClasses = "w-full bg-bg border border-border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text placeholder:opacity-50";
  const labelClasses = "block text-sm font-medium mb-1.5 text-text/80";

  return (
    <div className="p-8 bg-bg min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text tracking-tight">Create Article</h1>
            <p className="text-text/60 text-sm">Draft and publish your latest news story</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-primary hover:opacity-90 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <span className="animate-pulse">Publishing...</span> : <><Save size={18} /> Publish News</>}
          </button>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                <FileText size={20} />
                <h2>Content Details</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelClasses}>Article Title</label>
                  <input name="title"  placeholder="e.g. Breaking: New Tech Innovation..." value={form.title} onChange={handleChange} className={`${inputClasses} text-lg font-semibold`} required />
                </div>
                <div>
                  <label className={labelClasses}>Slug</label>
                  <input
                    name="slug"
                    value={form.slug}
                    placeholder="e.g. breaking-news-india"
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Detailed Content</label>
                  <textarea name="detailedContent" placeholder="Write your story here..." value={form.detailedContent} onChange={handleChange} className={`${inputClasses} h-64 resize-none`} required />
                </div>
                <div>
                  <label className={labelClasses}>Short Excerpt</label>
                  <textarea name="excerpt" placeholder="Brief summary for list views..." value={form.excerpt} onChange={handleChange} className={`${inputClasses} h-20`} />
                </div>
              </div>
            </section>

            <section className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                <AlertCircle size={20} />
                <h2>The 5 W's (Structured Data)</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["who", "what", "when", "where", "why", "how"].map((field) => (
                  <div key={field}>
                    <label className="text-xs uppercase font-bold text-text/50 mb-1 block">{field}</label>
                    <input name={field} onChange={handleChange} value={form[field as keyof typeof form] as string}   className={inputClasses} placeholder={`The ${field}...`} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <section className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                <ImageIcon size={20} />
                <h2>Featured Image</h2>
              </div>
              <div className={`relative border-2 border-dashed border-border rounded-xl p-4 transition-colors hover:border-primary/50 ${imagePreview ? 'pb-2' : 'py-10'}`}>
                {imagePreview ? (
                  <div className="space-y-3">
                    <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                    <label className="block text-center text-xs text-primary  cursor-pointer hover:underline font-medium">
                      Change Image
                      <input type="file"  accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <ImageIcon size={32} className="text-text/20 mb-2" />
                    <span className="text-xs text-text/40">Upload JPG, PNG, WEBP</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>
            </section>

            <section className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                <Settings size={20} />
                <h2>Organization</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelClasses}>Category</label>
                  <select name="categoryId" onChange={handleChange} value={form.categoryId} className={inputClasses} required>
                    <option value="">Select category</option>
                    {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Status</label>
                  <select name="status" onChange={handleChange} value={form.status} className={inputClasses}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Publish Date</label>
                  <input
                    type="datetime-local"
                    value={form.publishedAt}
                    name="publishedAt"
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-bg rounded-lg border border-border">
                  <span className="text-sm font-medium">Breaking News</span>
                  <input type="checkbox" name="isBreaking" checked={form.isBreaking} onChange={handleChange} className="w-5 h-5 accent-primary" />
                </div>
              </div>
            </section>

            <section className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                <Globe size={20} />
                <h2>SEO & Meta</h2>
              </div>
              <div className="space-y-3">
                <input name="metaTitle" placeholder="SEO Title" value={form.metaTitle} onChange={handleChange} className={inputClasses} />
                <textarea name="metaDescription" placeholder="Meta Description" value={form.metaDescription} onChange={handleChange} className={`${inputClasses} h-24`} />
                <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} className={inputClasses} />
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}