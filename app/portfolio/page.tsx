"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Award, Users, Briefcase } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: "Company Profile" | "E-Commerce" | "Landing Page";
  description: string;
  image: string;
  demoUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Kap Ardiansyah (Kantor Akuntan Publik)",
    category: "Company Profile",
    description: "Perusahaan besar Kantor Akuntan Publik Ardiansyah.",
    image: "/images/project1.jpg", // Menggunakan gambar lokal
    demoUrl: "https://kapardiansyah.netlify.app/",
  },
  {
    id: 2,
    title: "Hyundai Kembangan",
    category: "E-Commerce",
    description: "Toko online modern mobil Hyundai Kembangan.",
    image: "/images/project2.jpg", // Menggunakan gambar lokal
    demoUrl: "https://www.hyundaikembangan.com/",
  },
  {
    id: 3,
    title: "Kopi Muu Meruya",
    category: "E-Commerce",
    description: "Caffe Gen Z dengan tampilan modern dan responsife.",
    image: "/images/project3.jpg", // Menggunakan gambar lokal
    demoUrl: "https://kopimuumeruya.netlify.app/",
  },
];

const categories = ["Semua", "Company Profile", "E-Commerce"];

// Statistik Kredibilitas Klien
const stats = [
  { icon: <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />, value: "50+", label: "Proyek Selesai" },
  { icon: <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />, value: "50+", label: "Klien Puas" },
  { icon: <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />, value: "100%", label: "Tepat Waktu" },
  { icon: <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />, value: "5 Thn", label: "Pengalaman" },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredProjects = activeCategory === "Semua"
    ? projects
    : projects.filter((item) => item.category === activeCategory);

  return (
    <section className="py-24 bg-white dark:bg-neutral-950 border-t border-neutral-200/60 dark:border-neutral-800/60 relative">
      <div className="container mx-auto px-6">
        
        {/* --- Statistik Pengalaman (Social Proof) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="p-5 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50">
                  {stat.icon}
                </div>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                  {stat.value}
                </h4>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2">
              Portofolio Pilihan
            </h2>
            <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Hasil Karya & Studi Kasus Proyek
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-neutral-50 dark:bg-neutral-900 p-1.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                  activeCategory === cat
                    ? "text-white dark:text-neutral-900"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-indigo-600 dark:bg-white rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- Grid Projects --- */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Container Gambar Lokal */}
                  <div className="relative h-56 overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md text-neutral-800 dark:text-neutral-200 shadow-sm border border-neutral-200/50 dark:border-neutral-800/50">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Deskripsi Karya */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer Card / Tombol Live Demo Full Width */}
                <div className="p-6 pt-0">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-neutral-900 transition-all shadow-sm"
                  >
                    <span>Lihat Live Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
