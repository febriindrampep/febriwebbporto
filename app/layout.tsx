import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { Toaster } from "sonner"; // <-- 1. Import Toaster di sini

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "febriweb. - Web Developer Profesional",
  description: "Portofolio dan Jasa Pembuatan Website Profesional, Modern, dan Cepat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${jakarta.variable} font-sans bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white antialiased`}>
        {/* Navbar Global */}
        <Navbar />

        {/* Konten Halaman Utama */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer Global */}
        <Footer />

        {/* Cookie Banner Persetujuan */}
        <CookieBanner />

        {/* 2. Pasang Toaster di sini agar notifikasi melayang bisa muncul */}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
