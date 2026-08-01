"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner"; // <-- 1. Import toast dari sonner

export default function PesanPage() {
  const [serviceName, setServiceName] = useState("Landing Page Profesional");
  const [whatsapp, setWhatsapp] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    // Cek apakah user sudah login
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // 2. Notifikasi jika belum login
        toast.warning("Akses Ditolak", {
          description: "Silakan login atau daftar akun terlebih dahulu untuk memesan.",
        });
        router.push("/login");
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    const { error } = await supabase.from("orders").insert([
      {
        user_id: user.id,
        service_name: serviceName,
        whatsapp: whatsapp,
        notes: notes,
        status: "Pending",
      },
    ]);

    setLoading(false);

    if (error) {
      // 3. Notifikasi jika gagal membuat pesanan
      toast.error("Gagal Mengirim Pesanan", {
        description: error.message,
      });
    } else {
      // 4. Notifikasi jika pesanan berhasil
      toast.success("Pesanan Berhasil Dibuat!", {
        description: "Anda akan diarahkan ke Dashboard...",
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-28 pb-16 px-4">
      <div className="max-w-xl mx-auto">
        
        {/* Tombol Kembali */}
        <Link 
          href="/layanan" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Layanan</span>
        </Link>

        {/* Card Form */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-xl">
          
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Formulir Project Baru</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Formulir Pemesanan Website</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Isi rincian kebutuhan project Anda. Saya akan menghubungi Anda untuk tahap konsultasi lanjutan.
            </p>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-5">
            
            {/* Pilihan Layanan */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                Pilih Layanan / Paket
              </label>
              <select
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Landing Page Profesional">Landing Page Profesional (Mulai Rp 750rb)</option>
                <option value="E-Commerce / Toko Online">E-Commerce / Toko Online (Mulai Rp 2 Juta)</option>
                <option value="Web Aplikasi Custom (SaaS)">Web Aplikasi Custom (SaaS) - Dynamic</option>
              </select>
            </div>

            {/* Nomor WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                Nomor WhatsApp Aktif
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: 081234567890"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Catatan Project */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                Detail / Catatan Kebutuhan Website
              </label>
              <textarea
                rows={4}
                placeholder="Jelaskan jenis usaha Anda, referensi tampilan website yang disukai, atau fitur khusus yang diinginkan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span>Mengirim Pesanan...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesanan Sekarang</span>
                </>
              )}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}
