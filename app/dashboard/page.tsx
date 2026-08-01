"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  LogOut, 
  LayoutTemplate, 
  ShoppingCart, 
  Code, 
  ArrowRight, 
  Package, 
  Clock, 
  CheckCircle2, 
  PlusCircle,
  Sparkles,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

// List Layanan untuk ditampilkan di Dashboard
const servicesList = [
  {
    icon: <LayoutTemplate className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    title: "Landing Page Profesional",
    price: "Mulai Rp 750rb",
    desc: "Cocok untuk UMKM, portofolio, atau promosi produk spesifik.",
    param: "Landing Page Profesional"
  },
  {
    icon: <ShoppingCart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    title: "E-Commerce / Toko Online",
    price: "Mulai Rp 2 Juta",
    desc: "Sistem keranjang belanja, payment gateway, & manajemen produk.",
    param: "E-Commerce / Toko Online"
  },
  {
    icon: <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    title: "Web Aplikasi Custom (SaaS)",
    price: "Sesuai Kebutuhan",
    desc: "Sistem web aplikasi khusus sesuai alur bisnis yang kompleks.",
    param: "Web Aplikasi Custom (SaaS)"
  },
];

export default function UserDashboard() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDataAndOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      setUserEmail(user.email || "");

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchUserDataAndOrders();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center text-sm font-semibold text-neutral-500">
        Memuat data dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* --- Header Dashboard --- */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Dashboard Klien</span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-1">
              Selamat Datang! 👋
            </h1>
            <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Akun: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{userEmail}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/40 dark:hover:bg-red-950 dark:text-red-400 text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar / Logout</span>
          </button>
        </div>

        {/* --- SECTION 1: Status Pesanan Saya --- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Status Pesanan Saya</span>
            </h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              Total: {orders.length} Project
            </span>
          </div>

          {/* --- BANNER INSTRUKSI PEMBAYARAN PROFESIONAL --- */}
          {orders.length > 0 && (
            <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-200 dark:border-indigo-900/50 rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-indigo-600 text-white mt-0.5 shadow-md shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white">Langkah Selanjutnya & Pembayaran</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                    Pesanan Anda berhasil tercatat! Sebelum melanjutkan proses pengerjaan, silakan <strong className="text-indigo-600 dark:text-indigo-400">chat admin</strong> melalui WhatsApp untuk mendapatkan rincian <span className="underline decoration-indigo-400 underline-offset-2">invoice pembayaran</span> resmi.
                  </p>
                </div>
              </div>
              
              <a
                href="https://wa.me/6285183154973?text=Halo%20Admin,%20saya%20ingin%20meminta%20invoice%20pembayaran%20untuk%20pesanan%20website%20saya%20di%20febriweb."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Admin (Minta Invoice)</span>
              </a>
            </div>
          )}

          {orders.length === 0 ? (
            <div className="bg-white dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-3xl p-8 text-center">
              <Package className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200">Belum Ada Pesanan Aktif</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-md mx-auto">
                Anda belum pernah memesan website. Pilih paket layanan di bawah untuk mulai membuat project pertama Anda!
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Layanan</th>
                      <th className="px-6 py-4">WhatsApp</th>
                      <th className="px-6 py-4">Tanggal Pesan</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {orders.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-neutral-900 dark:text-white">
                          {item.service_name}
                          {item.notes && (
                            <p className="text-[11px] font-normal text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                              Catatan: {item.notes}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300 font-medium">{item.whatsapp}</td>
                        <td className="px-6 py-4 text-neutral-500">
                          {new Date(item.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                              item.status === "Pending"
                                ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-900"
                                : item.status === "Diproses"
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-900"
                                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900"
                            }`}
                          >
                            {item.status === "Pending" && <Clock className="w-3 h-3" />}
                            {item.status === "Diproses" && <Clock className="w-3 h-3" />}
                            {item.status === "Selesai" && <CheckCircle2 className="w-3 h-3" />}
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* --- SECTION 2: Katalog Layanan --- */}
        <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Pilih Layanan & Buat Pesanan Baru</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Klik pada salah satu layanan di bawah untuk membuka formulir pemesanan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesList.map((srv, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 flex flex-col justify-between hover:border-indigo-500 dark:hover:border-indigo-500 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50">
                      {srv.icon}
                    </div>
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                      {srv.price}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                <Link
                  href={`/pesan?service=${encodeURIComponent(srv.param)}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-indigo-600 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-indigo-400 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Pesan Layanan Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
