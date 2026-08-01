"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-4 border border-indigo-100 dark:border-indigo-900/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wawasan & Artikel Terbaru</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-4">
            Blog & Wawasan <span className="text-indigo-600 dark:text-indigo-400">febriwebb.</span>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
            Temukan berbagai tips seputar pengembangan web, strategi digital, dan trik meningkatkan omset bisnis lewat internet.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-neutral-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <p className="text-sm font-medium">Memuat artikel...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            <p className="text-base font-semibold">Belum ada artikel yang diterbitkan.</p>
          </div>
        ) : (
          /* List Artikel Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col justify-between hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all group shadow-sm hover:shadow-md overflow-hidden"
              >
                <div>
                  {/* Gambar Opsional jika ada */}
                  {article.image_url && (
                    <div className="mb-4 -mx-6 -mt-6 h-48 overflow-hidden">
                      <img 
                        src={article.image_url} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 mb-4">
                    <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-indigo-600 dark:text-indigo-400">
                      {article.category}
                    </span>
                    <span>{article.read_time}</span>
                  </div>

                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-3 line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(article.created_at).toLocaleDateString("id-ID", {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Baca</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
