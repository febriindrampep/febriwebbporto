"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";

// Varian Animasi untuk Container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

// Varian Animasi untuk elemen teks
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* --- Bagian Kiri: Profile & Teks --- */}
        <motion.div
          className="relative flex-1 text-center md:text-left z-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 mb-6"
          >
            <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
              Modern Web Development Services
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-neutral-900 dark:text-white leading-[0.95]"
          >
            Tingkatkan <span className="text-indigo-600">Bisnismu</span> Dengan Website Premium.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto md:mx-0"
          >
            Halo, selamat datang di <strong>febriwebb</strong>. Saya spesialis dalam merancang dan mengembangkan website modern, cepat, dan responsif. Berikan kesan digital terbaik untuk klien dan pelanggan Anda.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          >
            {/* Tombol Konsultasi Proyek -> Mengarah ke Halaman Kontak */}
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                href="/kontak"
                className="group px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-colors w-full sm:w-auto justify-center"
              >
                Konsultasi Proyek
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            {/* Tombol Lihat Portofolio -> Mengarah ke Halaman Portofolio */}
            <motion.div whileHover={{ opacity: 0.8 }} className="w-full sm:w-auto">
              <Link
                href="/portfolio"
                className="inline-block px-8 py-4 bg-transparent text-neutral-800 dark:text-neutral-200 rounded-2xl font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors w-full sm:w-auto text-center border border-neutral-200 dark:border-neutral-800"
              >
                Lihat Portofolio
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* --- Bagian Kanan: Animasi Visual --- */}
        <div className="flex-1 w-full flex justify-center items-center relative h-[300px] md:h-[500px] mt-10 md:mt-0 z-0 pointer-events-none md:pointer-events-auto">
          <div className="absolute w-72 h-72 bg-indigo-300 dark:bg-indigo-800 rounded-full blur-[120px] opacity-50" />
          <motion.div
            className="relative w-full h-full flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="absolute w-40 h-40 md:w-60 md:h-60 rounded-3xl border-2 border-indigo-500/30 bg-white/5 dark:bg-black/15 backdrop-blur-sm z-10 flex items-center justify-center"
              animate={{ rotate: [0, 10, 0, -10, 0], y: [0, -15, 0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <motion.div 
                    className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-xl shadow-indigo-500/30"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </motion.div>

            <motion.div
              className="absolute top-10 left-10 md:top-20 md:left-20 w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
              animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />

            <motion.div
              className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-12 h-12 rounded-xl bg-indigo-200 dark:bg-indigo-900"
              animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
             <motion.div 
                className="absolute w-[150%] h-[2px] bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-800 to-transparent rotate-[-35deg]"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
             />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
