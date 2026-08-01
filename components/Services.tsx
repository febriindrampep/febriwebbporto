"use client";

import { motion } from "framer-motion";
import { Layout, Smartphone, Zap, Search, ShieldCheck, Database } from "lucide-react";

// Import Logo Resmi Teknologi dari react-icons/si (Simple Icons)
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiVite,
  SiNextdotjs,
  SiPhp,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    icon: <Layout className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />,
    title: "Custom Web Application",
    description: "Pengembangan web kustom menggunakan Next.js & React dengan performa tinggi, struktur rapi, dan mudah di-scale.",
  },
  {
    icon: <Smartphone className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />,
    title: "Responsive UI/UX Design",
    description: "Tampilan website yang adaptif di semua ukuran layar (Mobile, Tablet, Desktop) dengan animasi yang mulus.",
  },
  {
    icon: <Zap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />,
    title: "Speed & Performance Optimization",
    description: "Optimasi kecepatan muat halaman untuk meraih skor Core Web Vitals tinggi di Google Lighthouse.",
  },
  {
    icon: <Search className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />,
    title: "SEO On-Page Optimization",
    description: "Struktur HTML semantik dan metadata lengkap agar website kamu lebih mudah ditemukan di halaman pertama Google.",
  },
  {
    icon: <Database className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />,
    title: "Fullstack & API Integration",
    description: "Integrasi API, basis data (Database), sistem autentikasi user, hingga Payment Gateway untuk transaksi.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />,
    title: "Maintenance & Technical Support",
    description: "Dukungan pemeliharaan rutin, perbaikan bug, dan pembaruan sistem berkala agar web tetap aman.",
  },
];

// Data Tech Stack menggunakan komponen ikon resmi
const techLogos = [
  {
    name: "HTML5",
    icon: <SiHtml5 className="w-6 h-6 text-[#E34F26]" />,
  },
  {
    name: "CSS",
    icon: <SiCss className="w-6 h-6 text-[#1572B6]" />,
  },
  {
    name: "JavaScript",
    icon: <SiJavascript className="w-6 h-6 text-[#F7DF1E] bg-black rounded-sm" />,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="w-6 h-6 text-[#3178C6]" />,
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="w-6 h-6 text-[#5FA04E]" />,
  },
  {
    name: "React.js",
    icon: <SiReact className="w-6 h-6 text-[#61DAFB]" />,
  },
  {
    name: "Vite",
    icon: <SiVite className="w-6 h-6 text-[#646CFF]" />,
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="w-6 h-6 text-neutral-900 dark:text-white" />,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" />,
  },
  {
    name: "PHP",
    icon: <SiPhp className="w-6 h-6 text-[#777BB4]" />,
  },
];

// Duplikasi array untuk looping tanpa jeda
const doubleTechLogos = [...techLogos, ...techLogos];

export default function Services() {
  return (
    <section className="py-24 bg-white dark:bg-neutral-900/50 border-t border-neutral-200/60 dark:border-neutral-800/60 relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* --- Infinite Marquee (Logo Berjalan) --- */}
        <div className="mb-20 text-center">
          <p className="text-xs font-semibold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-8">
            Teknologi Modern Yang Digunakan
          </p>

          {/* Mask Efek Blur Kiri & Kanan */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              className="flex w-max gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 22,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {doubleTechLogos.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 shadow-sm"
                >
                  {tech.icon}
                  <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* --- Header Seksi Layanan --- */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2">
            Layanan Utama
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Solusi Web Terbaik Untuk Mengembangkan Bisnismu
          </p>
        </div>

        {/* --- Grid Card Layanan --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
            >
              <div>
                <div className="p-3 w-fit rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
