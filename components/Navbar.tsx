"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Sun, Moon, LogOut, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface NavLink {
  path: string;
  label: string;
}

const links: NavLink[] = [
  { path: "/", label: "Beranda" },
  { path :"/about", label:"About"},
  { path: "/portfolio", label: "Portofolio" },
  { path: "/layanan", label: "Layanan" },
  { path: "/blog", label: "Blog" },
  { path: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  
  // State Auth & Role
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  // Fungsi untuk mengambil role dari tabel profile
  const fetchRole = async (userId: string) => {
    const { data: profile } = await supabase
      .from("profile")
      .select("role")
      .eq("id", userId)
      .single();

    setRole(profile?.role ?? null);
  };

  // Cek status login & role user secara real-time
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await fetchRole(user.id);
      }
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          await fetchRole(currentUser.id);
        } else {
          setRole(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Tentukan path dashboard secara dinamis berdasarkan role
  const dashboardPath = role === "admin" ? "/admin/dashboard" : "/dashboard";

  // Fungsi Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Berhasil keluar dari akun!");
    setIsOpen(false);
    router.push("/login");
    router.refresh();
  };

  // Efek glassmorphism saat halaman di-scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cek tema saat komponen pertama kali dimuat (mencegah hydration mismatch)
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Fungsi toggle Dark Mode / Light Mode
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled 
          ? "bg-white/70 backdrop-blur-md shadow-sm dark:bg-neutral-950/70 border-b border-neutral-200/50 dark:border-neutral-800/50" 
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* --- Logo febriwebb --- */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-1.5 bg-indigo-600/10 dark:bg-indigo-400/10 rounded-xl"
          >
            <Code2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          </motion.div>
          <span className="text-xl font-extrabold tracking-tighter text-neutral-900 dark:text-white">
            febriwebb<span className="text-indigo-600">.</span>
          </span>
        </Link>

        {/* --- Desktop Nav Links --- */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.path} href={link.path} className="relative group overflow-hidden py-1">
              <motion.span
                whileHover={{ y: -2 }}
                className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {link.label}
              </motion.span>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          ))}
          
          <div className="flex items-center gap-4 pl-4 border-l border-neutral-200 dark:border-neutral-800">
            {/* Tombol Tema Desktop */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {mounted && isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              )}
            </motion.button>

            {/* Tombol Login / Auth Status Desktop */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link href={dashboardPath}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-full text-xs font-bold shadow-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all flex items-center gap-1.5"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </motion.div>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-full text-xs font-bold shadow-md hover:bg-red-700 transition-all flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <Link href="/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-sm font-semibold shadow-md hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-neutral-900 transition-all text-center"
                >
                  Login
                </motion.div>
              </Link>
            )}
          </div>
        </div>

        {/* --- Mobile Controls --- */}
        <div className="flex items-center gap-3 md:hidden z-50">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 text-neutral-600 dark:text-neutral-300"
            aria-label="Toggle Dark Mode"
          >
            {mounted && isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-neutral-600 dark:text-neutral-300"
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* --- Mobile Drawer Menu --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="md:hidden absolute top-0 left-0 w-full bg-white dark:bg-neutral-950 pt-24 px-6 overflow-hidden border-b border-neutral-200 dark:border-neutral-800"
          >
            <div className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-3xl font-bold text-neutral-800 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Dynamic Dashboard Link di Mobile Drawer */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: links.length * 0.08, duration: 0.3 }}
                >
                  <Link
                    href={dashboardPath}
                    onClick={() => setIsOpen(false)}
                    className="block text-3xl font-bold text-neutral-800 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                </motion.div>
              )}
              
              {/* User Info & Logout Button */}
              {user ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="mt-4 space-y-3"
                >
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                        {role === "admin" ? "Admin Aktif" : "Akun Aktif"}
                      </p>
                      <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full py-3.5 px-6 bg-red-600 text-white rounded-2xl font-semibold text-base hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Keluar / Logout</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <div className="w-full mt-6 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-semibold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all flex justify-center items-center gap-2">
                      Login
                    </div>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
