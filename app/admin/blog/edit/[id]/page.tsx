"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const blogId = resolvedParams.id;

  const [loadingFetch, setLoadingFetch] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Tutorial");
  const [imageUrl, setImageUrl] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  // 1. Ambil data artikel lama dari Supabase berdasarkan ID
  useEffect(() => {
    const fetchBlogData = async () => {
      setLoadingFetch(true);

      // Cek User Admin
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Ambil data artikel
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", blogId)
        .single();

      if (error || !data) {
        alert("Artikel tidak ditemukan!");
        router.push("/admin/dashboard");
        return;
      }

      // Isi form dengan data yang sudah ada
      setTitle(data.title || "");
      setSlug(data.slug || "");
      setCategory(data.category || "Tutorial");
      setImageUrl(data.image_url || "");
      setExcerpt(data.excerpt || "");
      setContent(data.content || "");

      setLoadingFetch(false);
    };

    fetchBlogData();
  }, [blogId, router]);

  // 2. Simpan Perubahan (Update data ke Supabase)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      alert("Judul, Slug, dan Konten Wajib Diisi!");
      return;
    }

    setLoadingSubmit(true);

    const { error } = await supabase
      .from("blogs")
      .update({
        title,
        slug,
        category,
        image_url: imageUrl,
        excerpt,
        content,
      })
      .eq("id", blogId);

    if (error) {
      alert("Gagal memperbarui artikel: " + error.message);
      setLoadingSubmit(false);
    } else {
      alert("Artikel berhasil diperbarui!");
      router.push("/admin/dashboard");
    }
  };

  if (loadingFetch) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 flex items-center justify-center text-xs font-semibold text-neutral-500 gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
        <span>Memuat data artikel...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Navigasi */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard Admin</span>
          </Link>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
            Edit Artikel Blog
          </span>
        </div>

        {/* Form Edit */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <h1 className="text-xl font-extrabold tracking-tight">Edit Artikel Blog</h1>

          {/* Judul Artikel */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Judul Artikel *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Slug & Kategori */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Slug URL *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Kategori *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="Tutorial">Tutorial</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Edukasi">Edukasi</option>
                <option value="Pengembangan Website">Pengembangan Website</option>
                <option value="Tips & Trik">Tips & Trik</option>
              </select>
            </div>
          </div>

          {/* URL Gambar Sampul */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
              <span>URL Gambar Sampul (Opsional)</span>
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {imageUrl && (
              <div className="mt-2 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 max-h-40">
                <img src={imageUrl} alt="Preview Sampul" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Ringkasan (Excerpt) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Ringkasan Singkat (Excerpt)</label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Konten Utama */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Konten Artikel *</label>
            <textarea
              rows={12}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Tombol Simpan */}
          <button
            type="submit"
            disabled={loadingSubmit}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loadingSubmit ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan Perubahan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
