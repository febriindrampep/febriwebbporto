"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { 
  Users, 
  Package, 
  Clock, 
  CheckCircle2, 
  LogOut, 
  ShieldCheck, 
  MessageSquare, 
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Plus,
  FileText,
  Trash2,
  Loader2,
  Pencil
} from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [profilesMap, setProfilesMap] = useState<{ [key: string]: string }>({});
  const [totalClientsCount, setTotalClientsCount] = useState<number>(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);

  const router = useRouter();

  const fetchAdminData = async () => {
    setLoading(true);

    // 1. Cek User & Role Admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profile")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    // 2. Ambil Semua Profil User (untuk mapping email & statistik total user)
    const { data: allProfiles } = await supabase
      .from("profile")
      .select("id, email, role");

    if (allProfiles) {
      const map: { [key: string]: string } = {};
      let clientCount = 0;

      allProfiles.forEach((p) => {
        map[p.id] = p.email;
        if (p.role === "user") clientCount++;
      });

      setProfilesMap(map);
      setTotalClientsCount(clientCount);
    }

    // 3. Ambil Semua Pesanan Klien dari Supabase
    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!ordersError && ordersData) {
      setOrders(ordersData);
    }

    // 4. Ambil Semua Artikel Blog dari Supabase
    const { data: blogsData, error: blogsError } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!blogsError && blogsData) {
      setBlogs(blogsData);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAdminData();
  }, [router]);

  // Fungsi untuk merubah status pesanan
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);

    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      alert("Gagal merubah status: " + error.message);
    } else {
      setOrders((prev) =>
        prev.map((item) => (item.id === orderId ? { ...item, status: newStatus } : item))
      );
    }

    setUpdatingId(null);
  };

  // Fungsi untuk menghapus artikel blog
  const handleDeleteBlog = async (blogId: string, blogTitle: string) => {
    if (!confirm(`Apakah kamu yakin ingin menghapus artikel "${blogTitle}"?`)) {
      return;
    }

    setDeletingBlogId(blogId);

    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", blogId);

    if (error) {
      alert("Gagal menghapus artikel: " + error.message);
    } else {
      setBlogs((prev) => prev.filter((item) => item.id !== blogId));
    }

    setDeletingBlogId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center text-sm font-semibold text-neutral-500">
        Memeriksa Hak Akses Panel Admin...
      </div>
    );
  }

  // Hitung Statistik
  const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Diproses").length;
  const completedOrders = orders.filter((o) => o.status === "Selesai").length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- Header Panel Admin --- */}
        <div className="bg-neutral-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Akses Kontrol Utama</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Panel Kontrol Admin 👋
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Kelola pesanan masuk, posting artikel blog, dan pantau status proyek secara terpusat.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/admin/blog/create"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex-1 md:flex-none"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Tambah Blog</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* --- STATISTIK CARDS (4 Kolom) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Total Klien</span>
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-3xl font-black">{totalClientsCount} <span className="text-xs font-normal text-neutral-400">User</span></h2>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Pesanan Aktif</span>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-amber-600 dark:text-amber-400">{pendingOrders} <span className="text-xs font-normal text-neutral-400">Project</span></h2>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Project Selesai</span>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{completedOrders} <span className="text-xs font-normal text-neutral-400">Project</span></h2>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Artikel Blog</span>
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-purple-600 dark:text-purple-400">{blogs.length} <span className="text-xs font-normal text-neutral-400">Artikel</span></h2>
          </div>
        </div>

        {/* --- DAFTAR PESANAN MASUK --- */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Daftar Pesanan Website Klien</span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Ubah status pengerjaan untuk mengabarkan progres ke dashboard klien.
              </p>
            </div>

            <button
              onClick={fetchAdminData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-all self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Data</span>
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl p-8 text-center">
              <AlertCircle className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
              <p className="text-xs text-neutral-500">Belum ada pesanan masuk dari klien.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3.5">Klien & Kontak</th>
                    <th className="px-4 py-3.5">Paket Layanan</th>
                    <th className="px-4 py-3.5">Catatan Project</th>
                    <th className="px-4 py-3.5">Tanggal</th>
                    <th className="px-4 py-3.5">Aksi / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {orders.map((item) => {
                    const clientEmail = profilesMap[item.user_id] || "User Terhapus";
                    const cleanWA = item.whatsapp ? item.whatsapp.replace(/[^0-9]/g, "") : "";
                    const waUrl = cleanWA ? `https://wa.me/${cleanWA.startsWith("0") ? "62" + cleanWA.slice(1) : cleanWA}` : "#";

                    return (
                      <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                        {/* Klien & Kontak */}
                        <td className="px-4 py-4">
                          <p className="font-bold text-neutral-900 dark:text-white">{clientEmail}</p>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline mt-0.5"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>{item.whatsapp}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </td>

                        {/* Paket Layanan */}
                        <td className="px-4 py-4 font-bold text-indigo-600 dark:text-indigo-400">
                          {item.service_name}
                        </td>

                        {/* Catatan Project */}
                        <td className="px-4 py-4 text-neutral-600 dark:text-neutral-300 max-w-xs">
                          <p className="line-clamp-2 text-[11px]">
                            {item.notes || <span className="text-neutral-400 italic">Tidak ada catatan</span>}
                          </p>
                        </td>

                        {/* Tanggal */}
                        <td className="px-4 py-4 text-neutral-500 whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        {/* Dropdown Update Status */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <select
                            value={item.status}
                            disabled={updatingId === item.id}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                              item.status === "Pending"
                                ? "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
                                : item.status === "Diproses"
                                ? "bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800"
                                : item.status === "Selesai"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                                : "bg-red-50 text-red-700 border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800"
                            }`}
                          >
                            <option value="Pending">⏳ Pending</option>
                            <option value="Diproses">⚙️ Diproses</option>
                            <option value="Selesai">✅ Selesai</option>
                            <option value="Dibatalkan">❌ Dibatalkan</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* --- DAFTAR ARTIKEL BLOG --- */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Manajemen Artikel Blog ({blogs.length})</span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Kelola artikel yang diterbitkan untuk keperluan Google AdSense & SEO.
              </p>
            </div>

            <Link
              href="/admin/blog/create"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Artikel Baru</span>
            </Link>
          </div>

          {blogs.length === 0 ? (
            <div className="border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl p-8 text-center">
              <AlertCircle className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
              <p className="text-xs text-neutral-500 mb-3">Belum ada artikel blog yang diterbitkan.</p>
              <Link
                href="/admin/blog/create"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-xl hover:bg-indigo-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Artikel Pertama</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {blogs.map((blog) => (
                <div 
                  key={blog.id} 
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 px-3 rounded-2xl transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-indigo-600 dark:text-indigo-400">
                        {blog.category}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(blog.created_at).toLocaleDateString("id-ID", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </span>
                    </div>
                    
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                      {blog.title}
                    </h3>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                      /blog/{blog.slug}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    {/* Buka Artikel di Tab Baru */}
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="p-2 rounded-xl text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center gap-1 text-xs font-semibold"
                      title="Lihat Artikel"
                    >
                      <span>Lihat</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    {/* Edit Artikel */}
                    <Link
                      href={`/admin/blog/edit/${blog.id}`}
                      className="p-2 rounded-xl text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all flex items-center gap-1 text-xs font-semibold"
                      title="Edit Artikel"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>

                    {/* Hapus Artikel */}
                    <button
                      onClick={() => handleDeleteBlog(blog.id, blog.title)}
                      disabled={deletingBlogId === blog.id}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all disabled:opacity-50"
                      title="Hapus Artikel"
                    >
                      {deletingBlogId === blog.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
