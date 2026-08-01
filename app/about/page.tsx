"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Layers, Terminal, Sparkles, CheckCircle2, GraduationCap } from "lucide-react";
import Link from "next/link";

// Daftar Keahlian / Tech Stack (Dipertahankan dan disesuaikan untuk level 5 tahun pengalaman)
const skills = [
  { name: "Next.js & React", level: "Senior", desc: "Arsitektur web modern, optimasi SSR, dan performa tinggi." },
  { name: "TypeScript", level: "Mahir", desc: "Menulis kode tipe-aman yang berskala besar dan mudah dirawat." },
  { name: "Tailwind CSS", level: "Ahli", desc: "Membangun antarmuka UI/UX responsif dengan cepat dan presisi." },
  { name: "UI/UX & Framer Motion", level: "Mahir", desc: "Menciptakan interaksi dan animasi yang memberikan pengalaman pengguna premium." },
  { name: "Node.js & Ekosistem", level: "Mahir", desc: "Pengembangan backend tangguh, integrasi API, dan manajemen basis data." },
  { name: "Arsitektur & Deployment", level: "Mahir", desc: "Infrastruktur cloud, CI/CD, dan optimasi arsitektur web enterprise." },
];

// Perjalanan Karier / Timeline (Disesuaikan dengan 5 tahun pengalaman 2021-2026)
const experiences = [
  {
    year: "2023 - Sekarang",
    role: "Senior Full-Stack Web Developer",
    company: "Klien Enterprise & Perusahaan Besar",
    description: "Memimpin pengembangan solusi digital berskala besar, mengoptimalkan arsitektur sistem, dan memberikan hasil yang berdampak langsung pada metrik bisnis klien tingkat korporat.",
  },
  {
    year: "2021 - 2023",
    role: "Freelance Web Developer",
    company: "Agensi Digital & Klien Individu",
    description: "Memulai karier profesional dengan membangun website portofolio untuk individu. Berkembang pesat dengan menangani berbagai proyek e-commerce, company profile, dan web aplikasi kompleks.",
  },
  {
    year: "Pendidikan",
    role: "D3 Sistem Informasi",
    company: "Universitas Bina Sarana Informatika",
    description: "Mempelajari fondasi ilmu komputer, analisis sistem, dan logika pemrograman yang menjadi landasan kuat dalam pemecahan masalah (problem solving) di dunia rekayasa perangkat lunak.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* --- Header / Hero Section About --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mengenal Febri Indra Pratama</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            5 Tahun Membangun Solusi Digital dengan <span className="text-indigo-600 dark:text-indigo-400">Dedikasi & Kualitas</span>
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Halo! Saya Febri, seorang Web Developer dengan pengalaman lebih dari 5 tahun. Saya berfokus pada pembuatan antarmuka digital yang bersih, cepat, interaktif, dan berskala enterprise.
          </p>
        </motion.div>

        {/* --- Section: Cerita Singkat & Foto/Visual Card --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold tracking-tight">
              Dari Rasa Penasaran Menjadi Profesional
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Ketertarikan saya pada dunia teknologi dimulai sejak masa kecil. Berawal dari kebiasaan menghabiskan waktu bermain game di bilik warnet, muncul sebuah pertanyaan besar di benak saya: <em>"Bagaimana cara mereka membuat game dan program ini?"</em> Rasa penasaran itulah yang mendorong saya untuk terus mengotak-atik komputer.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Saya kemudian memantapkan langkah dengan menempuh pendidikan <strong>D3 Sistem Informasi di Universitas Bina Sarana Informatika</strong>. Karier profesional saya dimulai dari titik yang sederhana: membuat sebuah website portofolio untuk seorang klien. 
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Kini, dengan rekam jejak selama 5 tahun, saya telah berkembang dari mengerjakan proyek individu hingga melayani dan membangun infrastruktur web untuk berbagai perusahaan besar.
            </p>
            
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Enterprise Grade</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Scalable Architecture</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Pixel Perfect</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm flex flex-col justify-center gap-6 h-full"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5 pointer-events-none">
              <Terminal className="w-40 h-40" />
            </div>
            
            <h3 className="text-lg font-bold">Prinsip Kerja & Fondasi</h3>
            
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 h-fit border border-indigo-100 dark:border-indigo-900/50">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1">Berbasis Logika Sistem</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Pendidikan Sistem Informasi membentuk cara saya menganalisis dan memecahkan masalah kompleks dari akar.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 h-fit border border-indigo-100 dark:border-indigo-900/50">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1">Performa Tinggi</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Mengoptimalkan kecepatan muat halaman untuk retensi pengguna dan efisiensi server korporat.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 h-fit border border-indigo-100 dark:border-indigo-900/50">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1">Desain Skalabel</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Struktur kode dan komponen yang rapi agar mudah dikembangkan oleh tim di masa depan.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- Section: Keahlian & Teknologi (Tech Stack) --- */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2">
              Keahlian Teknis
            </h2>
            <p className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Teknologi yang Saya Kuasai
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
                      <Code2 className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {skill.level}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{skill.name}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Section: Perjalanan Karier (Timeline) --- */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2">
              Jejak Pengalaman
            </h2>
            <p className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Rekam Jejak Profesional
            </p>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="p-6 md:p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors"
              >
                <div className="space-y-1 md:max-w-xl">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
                    {exp.year}
                  </span>
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    {exp.company}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pt-2">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Call to Action Banner --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-indigo-600 dark:bg-indigo-950 p-8 md:p-12 text-white text-center relative overflow-hidden shadow-xl"
        >
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Globe className="w-64 h-64" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 relative z-10">
            Tertarik Berkolaborasi?
          </h2>
          <p className="text-sm text-indigo-100 max-w-xl mx-auto mb-8 relative z-10 leading-relaxed">
            Dari proyek skala kecil hingga solusi tingkat enterprise untuk perusahaan Anda. Mari diskusikan bagaimana pengalaman 5 tahun saya dapat membantu mencapai target bisnis Anda.
          </p>
          <Link
            href="/kontak"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 text-xs font-bold rounded-xl hover:bg-neutral-100 transition-all shadow-md relative z-10"
          >
            Hubungi Saya Sekarang
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
