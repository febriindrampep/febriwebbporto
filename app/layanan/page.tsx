"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, Code, Globe, ShoppingCart, LayoutTemplate, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

// Daftar Layanan Utama
const services = [
  {
    icon: <LayoutTemplate className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    title: "Landing Page Profesional",
    price: "Mulai dari Rp 750rb",
    description: "Cocok untuk UMKM, portofolio pribadi, atau promosi produk/jasa spesifik dengan tingkat konversi tinggi.",
    features: [
      "Desain Responsif (Mobile & Desktop)",
      "Optimasi Kecepatan & SEO Dasar",
      "Integrasi Tombol WhatsApp / Kontak",
      "Animasi Halus & Interaktif",
      "Revisi hingga Sesuai",
    ],
    popular: false,
  },
  {
    icon: <ShoppingCart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    title: "E-Commerce / Toko Online",
    price: "Mulai dari Rp 2 Juta",
    description: "Solusi lengkap untuk jualan online dengan sistem keranjang belanja, manajemen produk, dan integrasi pembayaran.",
    features: [
      "Sistem Keranjang & Checkout",
      "Integrasi Payment Gateway / WA Order",
      "Dashboard Admin Manajemen Produk",
      "Desain Toko Eksklusif & Elegan",
      "Optimasi Keamanan Data Klien",
    ],
    popular: true,
  },
  {
    icon: <Code className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    title: "Web Aplikasi Custom (SaaS)",
    price: "Sesuai Kebutuhan",
    description: "Pengembangan sistem web aplikasi khusus sesuai alur bisnis Anda yang kompleks dan dinamis.",
    features: [
      "Teknologi Next.js & TypeScript",
      "Manajemen Database & Autentikasi User",
      "Dashboard Analitik & Grafik Data",
      "Performa Tinggi & Skalabel",
      "Dukungan Pemeliharaan Berkelanjutan",
    ],
    popular: false,
  },
];

// Alur Kerja
const workflows = [
  { step: "01", title: "Konsultasi Kebutuhan", desc: "Diskusikan ide, konsep, dan fitur yang Anda inginkan melalui WhatsApp atau telepon." },
  { step: "02", title: "Desain & Pengembangan", desc: "Proses pembuatan struktur web, antarmuka UI/UX, dan penulisan kode pemrograman." },
  { step: "03", title: "Revisi & Uji Coba", desc: "Pemeriksaan menyeluruh terhadap fungsi web, kecepatan, dan penyesuaian revisi." },
  { step: "04", title: "Peluncuran (Deployment)", desc: "Website resmi online, siap diakses publik dan digunakan untuk bisnis Anda." },
];

export default function LayananPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solusi Digital Terbaik</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Layanan Pembuatan <span className="text-indigo-600 dark:text-indigo-400">Website Profesional</span>
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Tingkatkan kredibilitas bisnis dan jangkau lebih banyak pelanggan dengan website modern, cepat, dan berdesain eksklusif.
          </p>
        </motion.div>

        {/* --- Pricing / Services Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`relative rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 ${
                srv.popular
                  ? "bg-neutral-900 dark:bg-neutral-900 text-white border-indigo-500 shadow-2xl shadow-indigo-500/10 md:-translate-y-2"
                  : "bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white border-neutral-200 dark:border-neutral-800"
              }`}
            >
              {srv.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold bg-indigo-600 text-white shadow-sm uppercase tracking-wider">
                  Paling Diminati
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl ${srv.popular ? "bg-white/10" : "bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50"}`}>
                    {srv.icon}
                  </div>
                  <span className={`text-sm font-extrabold ${srv.popular ? "text-indigo-400" : "text-indigo-600 dark:text-indigo-400"}`}>
                    {srv.price}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-2">{srv.title}</h3>
                <p className={`text-xs leading-relaxed mb-8 ${srv.popular ? "text-neutral-300" : "text-neutral-500 dark:text-neutral-400"}`}>
                  {srv.description}
                </p>

                <div className="space-y-3 mb-8">
                  {srv.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${srv.popular ? "text-indigo-400" : "text-indigo-600 dark:text-indigo-400"}`} />
                      <span className={srv.popular ? "text-neutral-200" : "text-neutral-700 dark:text-neutral-300"}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/pesan"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  srv.popular
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                    : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-neutral-900"
                }`}
              >
                <span>Pesan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* --- Alur Kerja (Workflow) --- */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2">
              Cara Kerja
            </h2>
            <p className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Alur Pengerjaan Proyek Mudah & Transparan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflows.map((wf, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-indigo-600/40 dark:text-indigo-400/40 block mb-3">
                    {wf.step}
                  </span>
                  <h3 className="text-lg font-bold mb-2">{wf.title}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {wf.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Keunggulan / Mengapa Memilih Kami --- */}
        <div className="rounded-3xl bg-neutral-900 dark:bg-neutral-900 text-white p-8 md:p-12 relative overflow-hidden shadow-xl border border-neutral-800">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Garansi Kualitas</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Komitmen Saya untuk Setiap Proyek
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              Setiap baris kode ditulis dengan teliti untuk memastikan performa yang cepat, aman, dan siap bersaing di mesin pencari Google. Anda juga mendapatkan panduan pengelolaan setelah website selesai.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-neutral-200">
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-indigo-400" /> Pengerjaan Cepat</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-indigo-400" /> Full Support</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-indigo-400" /> Harga Bersahabat</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
