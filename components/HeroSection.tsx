import { ArrowRight, Star, Users, Video } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="beranda" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50 via-white to-white"></div>
      <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-3xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-8 border border-primary-100">
            <Star className="w-4 h-4 fill-primary-500 text-primary-500" />
            <span>Platform Ngaji Online Premium #1</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Pahami Al-Qur&apos;an <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-green-500">
              Lebih Mudah & Terarah
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Belajar tahsin, tahfidz, dan bahasa Arab secara eksklusif 1-on-1 bersama asatidz berpengalaman. Jadwal fleksibel, kurikulum terstruktur.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://wa.me/6281234567890?text=Halo%20Kalam,%20saya%20ingin%20daftar%20program%20ngaji."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 hover:-translate-y-0.5"
            >
              <span>Daftar via WA</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <a 
              href="#program"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              Lihat Program
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-slate-100 pt-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-2">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-slate-900">500+</span>
              <span className="text-sm text-slate-500 font-medium">Santri Aktif</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-2">
                <Star className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-slate-900">50+</span>
              <span className="text-sm text-slate-500 font-medium">Asatidz Pilihan</span>
            </div>
            <div className="flex flex-col items-center gap-2 col-span-2 md:col-span-1">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-2">
                <Video className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-slate-900">100%</span>
              <span className="text-sm text-slate-500 font-medium">Online Live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
