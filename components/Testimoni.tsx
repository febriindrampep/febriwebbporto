"use client";

import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Owner, Toko UMKM Maju Jaya",
    content: "Pengerjaan sangat cepat dan hasilnya melebihi ekspektasi. Website toko online kami jadi jauh lebih profesional dan omzet meningkat pesat!",
    rating: 5,
  },
  {
    name: "Siti Rahma",
    role: "Founder, Agensi Kreatif Lokal",
    content: "Komunikasi sangat lancar dan detail. Desain web yang dibuat benar-benar elegan dan responsif di semua perangkat. Sangat recommended!",
    rating: 5,
  },
  {
    name: "Dimas Pratama",
    role: "Startup Enthusiast",
    content: "Sebagai orang yang paham teknologi, saya kagum dengan performa kode dan kecepatan loading website buatan febriweb. Top banget!",
    rating: 5,
  },
];

export default function Testimoni() {
  return (
    <section className="py-24 bg-neutral-50/50 dark:bg-neutral-900/40 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Testimoni Klien</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Apa Kata Mereka Tentang <span className="text-indigo-600 dark:text-indigo-400">febriweb.</span>
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Kepuasan klien adalah prioritas utama. Berikut adalah ulasan nyata dari mereka yang telah mempercayakan proyek digitalnya.
          </p>
        </div>

        {/* --- Grid Testimoni --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              <div className="absolute top-6 right-6 text-indigo-500/10 dark:text-indigo-500/2{-text}">
                <Quote className="w-10 h-10" />
              </div>

              <div className="space-y-4">
                {/* Bintang Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed relative z-10">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{item.name}</h4>
                <p className="text-[11px] text-neutral-500 font-medium mt-0.5">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
