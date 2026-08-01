"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        
        {/* Lingkaran Luar Berputar (Spinner) */}
        <motion.div
          className="w-20 h-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 dark:border-t-indigo-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Ikon di Tengah */}
        <div className="absolute flex items-center justify-center">
          <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-pulse" />
        </div>

      </div>

      {/* Teks Loading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="mt-6 text-center space-y-1"
      >
        <h3 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
          Memuat Halaman...
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Mohon tunggu sebentar, sedang menyiapkan pengalaman terbaik untuk Anda.
        </p>
      </motion.div>
    </div>
  );
}
