"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Sparkles } from "lucide-react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Pembuatan Website Company Profile",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi Kirim ke WhatsApp
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "6285183154973"; // Nomor WhatsApp tujuan
    const text = `Halo febriweb,\n\nNama: ${formData.name}\nEmail: ${formData.email}\nLayanan / Topik: ${formData.service}\n\nPesan:\n${formData.message}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, "_blank");
  };

  // Fungsi Kirim ke Email
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailTarget = "febriindrapratama2027@gmail.com";
    const subject = encodeURIComponent(`Pesan / Konsultasi dari ${formData.name}`);
    const body = encodeURIComponent(
      `Nama: ${formData.name}\nEmail Pengirim: ${formData.email}\nLayanan / Topik: ${formData.service}\n\nPesan:\n${formData.message}`
    );

    window.location.href = `mailto:${emailTarget}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white pt-32 pb-24 transition-colors">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hubungi Kami</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Mari Diskusikan <span className="text-indigo-600 dark:text-indigo-400">Proyek Anda</span>
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Punya ide website, ingin bertanya hal random, atau ingin berkonsultasi? Isi formulir di bawah dan kirimkan secara instan ke WhatsApp atau Email saya.
          </p>
        </motion.div>

        {/* --- Form Card --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 md:p-10 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors"
        >
          <form className="space-y-6">
            
            {/* Nama & Email Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Nama lengkap"
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Alamat Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Pilihan Layanan & Pertanyaan Lainnya */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Layanan atau Topik yang Ditanyakan
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="Pembuatan Website Company Profile">Pembuatan Website Company Profile</option>
                <option value="Toko Online / E-Commerce">Toko Online / E-Commerce</option>
                <option value="Landing Page Kustom">Landing Page Kustom</option>
                <option value="Redesign / Optimasi Website">Redesign / Optimasi Website</option>
                <option value="Pertanyaan Lainnya / Diskusi Random">Pertanyaan Lainnya / Diskusi Random</option>
              </select>
            </div>

            {/* Pesan / Detail Proyek */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Detail Pesan / Pertanyaan
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tuliskan detail proyek atau pertanyaan bebas Anda di sini..."
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
            </div>

            {/* Tombol Aksi (Kirim ke WhatsApp / Email) */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Kirim Pesan via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleEmailSubmit}
                className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
              >
                <Mail className="w-4 h-4" />
                <span>Kirim Pesan via Email</span>
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </div>
  );
}
