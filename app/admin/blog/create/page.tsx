"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, Send, FileText } from "lucide-react";
import Link from "next/link";

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Bisnis & Web",
    read_time: "3 menit baca",
    image_url: "",
    excerpt: "",
    content: "",
  });

  // Fungsi pembuat Slug otomatis (misal: "Tips Web" -> "tips-web")
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.excerpt) {
      toast.error("Harap isi semua kolom wajib!");
      return;
    }

    setLoading(true);
    const slug = generateSlug(formData.title);

    const { error } = await supabase.from("blogs").insert([
      {
        title: formData.title,
        slug: slug,
        category: formData.category,
        read_time: formData.read_time,
        image_url: formData.image_url || null,
        excerpt: formData.excerpt,
        content: formData.content,
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error("Gagal menerbitkan artikel: " + error.message);
    } else {
      toast.success("Artikel berhasil dipublikasikan!");
      router.push("/blog");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-3xl">
        
        <Link 
          href="/admin/dashboard" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard Admin</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-900 rounded-3xl p-6 md:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 rounded-2xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Tambah Artikel Baru</h1>
              <p className="text-xs text-neutral-500">Artikel ini akan langsung tampil di halaman Blog publik.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Judul Artikel */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                Judul Artikel *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: 5 Alasan Kenapa Bisnis Wajib Punya Website"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-500 text-sm text-neutral-900 dark:text-white"
              />
            </div>

            {/* Kategori & Waktu Baca */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-500 text-sm text-neutral-900 dark:text-white"
                >
                  <option value="Bisnis & Web">Bisnis & Web</option>
                  <option value="Performansi">Performansi</option>
                  <option value="Edukasi">Edukasi</option>
                  <option value="Teknologi">Teknologi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                  Estimasi Waktu Baca
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 4 menit baca"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-500 text-sm text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            {/* URL Gambar (Opsional) */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                URL Gambar Sampul (Opsional)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-500 text-sm text-neutral-900 dark:text-white"
              />
            </div>

            {/* Ringkasan Singkat (Excerpt) */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                Ringkasan Singkat (Excerpt) *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Deskripsi singkat yang tampil di kartu depan halaman blog..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-500 text-sm text-neutral-900 dark:text-white resize-none"
              />
            </div>

            {/* Isi Konten Lengkap */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                Isi Artikel Lengkap *
              </label>
              <textarea
                rows={10}
                required
                placeholder="Tuliskan isi artikel lengkap di sini..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-500 text-sm text-neutral-900 dark:text-white"
              />
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? "Menerbitkan..." : "Terbitkan Artikel"}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
