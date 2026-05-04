"use client";

import Link from "next/link";
import Image from "next/image";
import { LogIn, ArrowLeft, AlertCircle } from "lucide-react";
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
    <div className="min-h-screen flex flex-col md:flex-row"
      style={{ background: '#0D1022' }}>
      {/* Visual Section - Kiri (Desktop) */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center p-12"
        style={{ background: 'linear-gradient(145deg, #0D1022 0%, #1C2444 60%, #141A33 100%)' }}>
        {/* Decorative orbs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-25 blur-3xl"
            style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #A8B2C0 0%, transparent 70%)' }}></div>
          {/* Gold grid */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        
        <div className="relative z-10 text-center max-w-lg">
          {/* Logo besar */}
          <div className="flex justify-center mb-10">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 16px 48px rgba(201,168,76,0.3)' }}>
              <Image
                src="/logo.jpg"
                alt="Kalaam Logo"
                width={176}
                height={176}
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          <div className="mb-5">
            <span className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full border"
              style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#E8C97A' }}>
              Portal Santri Eksklusif
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Sistem Evaluasi <br/>
            <span className="text-gold-gradient">Terpadu &amp; Presisi</span>
          </h1>
          
          <p className="text-lg text-silver-400 leading-relaxed font-medium">
            Pantau capaian E-Rapor, statistik kehadiran bulanan, serta umpan balik langsung dari Asatidz secara transparan dalam satu layar utama.
          </p>

          {/* Divider with Kalaam tagline */}
          <div className="mt-10 pt-8 border-t"
            style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
            <p className="text-silver-500 text-sm font-medium tracking-widest">
              — تعليم القرآن · فهم · عمل · أثر —
            </p>
          </div>
        </div>
      </div>

      {/* Form Section - Kanan */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 relative"
        style={{ background: 'rgba(13,16,34,0.95)', borderLeft: '1px solid rgba(201,168,76,0.15)' }}>
        <div className="mx-auto w-full max-w-md">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-sm mb-10 transition-colors font-medium text-silver-400 hover:text-gold-400">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          {/* Logo Mobile */}
          <div className="md:hidden flex items-center gap-3 mb-8">
            <div className="rounded-xl overflow-hidden">
              <Image src="/logo.jpg" alt="Kalaam" width={40} height={40} className="object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-extrabold tracking-tight text-gold-gradient">KALAAM</span>
              <span className="text-[9px] font-semibold text-silver-400 tracking-widest uppercase">Ngaji Online</span>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Selamat Datang</h2>
            <p className="text-silver-400 font-medium">Silakan masuk ke akun portal santri Anda.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl flex items-start gap-3 border"
              style={{ background: 'rgba(200,50,50,0.1)', borderColor: 'rgba(200,50,50,0.3)' }}>
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 font-medium">{error}</p>
            </div>
          )}

          <form action={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-semibold text-silver-300 mb-2">
                Nomor WhatsApp
              </label>
              <input
                type="text"
                id="whatsapp"
                name="whatsapp"
                required
                className="w-full px-4 py-3.5 rounded-2xl outline-none transition-all font-medium text-white placeholder:text-silver-600"
                style={{
                  background: 'rgba(28,36,68,0.7)',
                  border: '1px solid rgba(168,178,192,0.2)',
                }}
                placeholder="Contoh: 081234567890"
                onFocus={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168,178,192,0.2)'}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-silver-300 mb-2">
                Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3.5 rounded-2xl outline-none transition-all font-medium text-white placeholder:text-silver-600"
                style={{
                  background: 'rgba(28,36,68,0.7)',
                  border: '1px solid rgba(168,178,192,0.2)',
                }}
                placeholder="Masukkan kata sandi"
                onFocus={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168,178,192,0.2)'}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600"
                  style={{ accentColor: '#C9A84C' }}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-silver-400">
                  Ingat Saya
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                  Lupa kata sandi?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl text-sm font-bold text-navy-700 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 bg-gold-gradient"
              style={{ boxShadow: '0 8px 24px rgba(201,168,76,0.3)' }}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-navy-700/30 border-t-navy-700 rounded-full animate-spin"></span>
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {loading ? "Memproses..." : "Masuk Dashboard"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-silver-500">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-bold text-gold-400 hover:text-gold-300 transition-colors"
            >
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
