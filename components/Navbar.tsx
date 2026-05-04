import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-gold-400/20 transition-all duration-300"
      style={{ background: 'rgba(20, 26, 51, 0.92)', backdropFilter: 'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="group-hover:-translate-y-1 transition-transform duration-300 rounded-xl overflow-hidden">
              <Image
                src="/logo.jpg"
                alt="Kalaam Logo"
                width={48}
                height={48}
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-extrabold tracking-tight text-gold-gradient">KALAAM</span>
              <span className="text-[10px] font-semibold text-silver-300 tracking-widest uppercase">Ngaji Online</span>
            </div>
          </Link>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-8 text-sm font-semibold text-silver-200">
              <Link href="#program" className="hover:text-gold-400 transition-colors duration-200">Program</Link>
              <Link href="#testimoni" className="hover:text-gold-400 transition-colors duration-200">Testimoni</Link>
            </nav>

            <Link
              href="/register"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 hover:-translate-y-1 text-silver-200"
              style={{ borderColor: 'rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.08)' }}
            >
              Daftar
            </Link>
            
            <Link 
              href="/login" 
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-navy-700 text-sm font-bold shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-gold-gradient"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
