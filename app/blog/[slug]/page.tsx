"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Loader2, Sparkles } from "lucide-react";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        setArticle(data);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center gap-3 text-neutral-400 bg-neutral-50 dark:bg-neutral-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-sm font-medium">Memuat artikel...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-6 bg-neutral-50 dark:bg-neutral-950">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Artikel Tidak Ditemukan</h1>
        <p className="text-neutral-500 text-sm mb-6">Artikel yang kamu cari mungkin sudah dihapus atau diganti URL-nya.</p>
        <Link 
          href="/blog" 
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all"
        >
          Kembali ke Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <article className="container mx-auto px-6 max-w-3xl">
        
        {/* Tombol Kembali */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Semua Artikel</span>
        </Link>

        {/* Header Artikel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 text-xs font-semibold text-neutral-400 mb-4">
            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
              {article.category}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.read_time}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(article.created_at).toLocaleDateString("id-ID", {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </span>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-neutral-900 dark:text-white leading-tight mb-6">
            {article.title}
          </h1>

          {/* Gambar Sampul jika ada */}
          {article.image_url && (
            <div className="mb-8 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <img src={article.image_url} alt={article.title} className="w-full max-h-96 object-cover" />
            </div>
          )}
        </motion.div>

        {/* Isi Artikel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 leading-relaxed text-base space-y-4 whitespace-pre-line"
        >
          {article.content}
        </motion.div>

      </article>
    </div>
  );
}
