"use client";

import Link from "next/link";
import { BookOpen, LogIn, ArrowLeft, AlertCircle } from "lucide-react";
import { useState } from "react";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Visual Section - Kiri (Desktop) */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary-900/30 mix-blend-multiply"></div>
          {/* Ornamen Abstrak (Sebagai visual menarik) */}
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-600/20 blur-3xl"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-lg">
          <div className="inline-flex items-center justify-center p-4 bg-primary-500 rounded-2xl text-white mb-8 shadow-2xl shadow-primary-500/40">
            <BookOpen className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Pantau Perkembangan Mengaji Anda
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Akses E-Rapor, riwayat kehadiran, dan evaluasi berkala dari asatidz secara *real-time* melalui portal eksklusif santri Kalam.
          </p>
        </div>
      </div>

      {/* Form Section - Kanan */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Tombol Kembali ke Beranda */}
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 mb-10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          {/* Logo Mobile */}
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="bg-primary-600 p-2 rounded-xl text-white">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">Kalam</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Selamat Datang</h2>
            <p className="text-slate-500">Silakan masuk ke akun portal santri Anda.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form action={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-700 mb-2">
                Nomor WhatsApp
              </label>
              <input
                type="text"
                id="whatsapp"
                name="whatsapp"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all placeholder:text-slate-400"
                placeholder="Contoh: 081234567890"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all placeholder:text-slate-400"
                placeholder="Masukkan kata sandi"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                  Ingat Saya
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Lupa kata sandi?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {loading ? "Memproses..." : "Masuk Dashboard"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Belum punya akun?{" "}
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-primary-600 hover:text-primary-500"
            >
              Hubungi Admin via WA
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
