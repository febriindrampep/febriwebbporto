'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Buat User di Auth Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      toast.error('Registrasi Gagal', {
        description: authError.message,
      });
      setLoading(false);
      return;
    }

    // 2. Masukkan ke tabel 'profile' dengan role default 'user'
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profile')
        .insert([
          { 
            id: authData.user.id, 
            email: authData.user.email, 
            role: 'user' 
          }
        ]);

      if (profileError) {
        toast.error('Gagal Membuat Profil', {
          description: profileError.message,
        });
        setLoading(false);
        return;
      }
    }

    // Notifikasi Sukses
    toast.success('Registrasi Berhasil!', {
      description: 'Akun Anda telah dibuat. Silakan login.',
    });

    router.push('/login');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mt-16 transition-colors duration-300">
        
        {/* Header Form */}
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Register Akun Baru
        </h2>
        
        {/* Form Register */}
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Email
            </label>
            <input 
              type="email" 
              placeholder="nama@email.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full p-3.5 mt-2 rounded-xl font-semibold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
          >
            {loading ? 'Mendaftarkan...' : 'Daftar'}
          </button>
        </form>
        
        {/* Footer Link */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Sudah punya akun?{' '}
          <Link 
            href="/login" 
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
