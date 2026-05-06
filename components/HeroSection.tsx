import { ArrowRight, Star, Users, Video } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="beranda" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0D1022 0%, #1C2444 50%, #141A33 100%)' }}>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #A8B2C0 0%, transparent 70%)' }}></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border"
            style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#E8C97A' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
            </span>
            <span>Platform Ngaji Online Premium #1</span>
          </div>
          
          {/* Logo besar di hero */}
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 16px 48px rgba(201,168,76,0.3)' }}>
              <Image
                src="/logo.jpg"
                alt="Kalaam"
                width={160}
                height={160}
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
            Pahami Al-Qur&apos;an <br className="hidden md:block" />
            <span className="text-gold-gradient inline-block mt-2">
              Lebih Mudah &amp; Terarah
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-silver-300 mb-10 leading-relaxed font-medium">
            Belajar tahsin, tahfidz, dan bahasa Arab secara eksklusif 1-on-1 bersama asatidz berpengalaman. Jadwal fleksibel, kurikulum terstruktur.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
            <a 
              href="/register"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold shadow-lg hover:-translate-y-1 transition-all duration-300 text-navy-700 bg-gold-gradient"
              style={{ boxShadow: '0 8px 32px rgba(201,168,76,0.35)' }}
            >
              <span>Daftar Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <a 
              href="#program"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold hover:-translate-y-1 transition-all duration-300 border text-silver-100"
              style={{ background: 'rgba(168, 178, 192, 0.1)', borderColor: 'rgba(168, 178, 192, 0.3)' }}
            >
              Lihat Program
            </a>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 relative z-10">
            <div className="flex flex-col items-center gap-3 p-6 rounded-3xl border"
              style={{ background: 'rgba(28,36,68,0.6)', backdropFilter: 'blur(12px)', borderColor: 'rgba(201,168,76,0.2)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2"
                style={{ background: 'rgba(201,168,76,0.15)' }}>
                <Users className="w-7 h-7 text-gold-400" />
              </div>
              <span className="text-4xl font-extrabold text-white">500+</span>
              <span className="text-sm text-silver-400 font-semibold tracking-wide">Santri Aktif</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-3xl border"
              style={{ background: 'rgba(28,36,68,0.6)', backdropFilter: 'blur(12px)', borderColor: 'rgba(201,168,76,0.2)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2"
                style={{ background: 'rgba(168,178,192,0.15)' }}>
                <Star className="w-7 h-7 text-silver-300 fill-silver-300" />
              </div>
              <span className="text-4xl font-extrabold text-white">50+</span>
              <span className="text-sm text-silver-400 font-semibold tracking-wide">Asatidz Pilihan</span>
            </div>
            <div className="flex flex-col items-center gap-3 col-span-2 md:col-span-1 p-6 rounded-3xl border"
              style={{ background: 'rgba(28,36,68,0.6)', backdropFilter: 'blur(12px)', borderColor: 'rgba(201,168,76,0.2)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2"
                style={{ background: 'rgba(201,168,76,0.15)' }}>
                <Video className="w-7 h-7 text-gold-400" />
              </div>
              <span className="text-4xl font-extrabold text-white">100%</span>
              <span className="text-sm text-silver-400 font-semibold tracking-wide">Online Live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
