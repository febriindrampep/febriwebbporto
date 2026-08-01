"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Cek apakah pengguna sudah pernah menerima cookie sebelumnya
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:max-w-md z-50 p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-4"
        >
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
              Kebijakan Privasi & Cookie 🍪
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Kami menggunakan cookie untuk meningkatkan pengalaman browsing Anda, menganalisis traffic, dan mendukung integrasi iklan. Dengan melanjutkan, Anda menyetujui hal ini.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleAccept}
              className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-600/20 text-center"
            >
              Saya Mengerti
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
