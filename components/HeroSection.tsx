import { ArrowRight, Star, Users, Video } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="beranda" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor - Glassmorphism & Glowing Orbs */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50/50 via-white to-white"></div>
      
      {/* Orb 1: Emerald (Top Right) */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 w-[600px] h-[600px] bg-primary-200/40 rounded-full blur-[100px] animate-pulse-slow"></div>
      
      {/* Orb 2: Teal (Bottom Left) */}
      <div className="absolute bottom-10 left-0 -z-10 -translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-[100px] animate-pulse-slow delay-700"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-primary-700 text-sm font-semibold mb-8 border border-primary-100 shadow-sm animate-float">
            <Star className="w-4 h-4 fill-primary-500 text-primary-500" />
            <span>Platform Ngaji Online Premium #1</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Pahami Al-Qur&apos;an <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-500">
              Lebih Mudah & Terarah
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed font-medium">
            Belajar tahsin, tahfidz, dan bahasa Arab secara eksklusif 1-on-1 bersama asatidz berpengalaman. Jadwal fleksibel, kurikulum terstruktur.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
            <a 
              href="https://wa.me/6281234567890?text=Halo%20Kalam,%20saya%20ingin%20daftar%20program%20ngaji."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-teal-500 text-white font-bold hover:from-primary-500 hover:to-teal-400 transition-all shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1"
            >
              <span>Daftar via WA</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <a 
              href="#program"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/50 backdrop-blur-md text-slate-700 font-bold border border-slate-200 hover:border-slate-300 hover:bg-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              Lihat Program
            </a>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-slate-200/60 pt-12 relative z-10">
            <div className="flex flex-col items-center gap-3 animate-float">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center text-primary-600 mb-2 ring-1 ring-slate-100">
                <Users className="w-7 h-7" />
              </div>
              <span className="text-3xl font-extrabold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">500+</span>
              <span className="text-sm text-slate-500 font-bold uppercase tracking-wider">Santri Aktif</span>
            </div>
            <div className="flex flex-col items-center gap-3 animate-float-delayed">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center text-amber-500 mb-2 ring-1 ring-slate-100">
                <Star className="w-7 h-7" />
              </div>
              <span className="text-3xl font-extrabold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">50+</span>
              <span className="text-sm text-slate-500 font-bold uppercase tracking-wider">Asatidz Pilihan</span>
            </div>
            <div className="flex flex-col items-center gap-3 col-span-2 md:col-span-1 animate-float">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center text-teal-600 mb-2 ring-1 ring-slate-100">
                <Video className="w-7 h-7" />
              </div>
              <span className="text-3xl font-extrabold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">100%</span>
              <span className="text-sm text-slate-500 font-bold uppercase tracking-wider">Online Live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
