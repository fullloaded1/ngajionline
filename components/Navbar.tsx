import Link from "next/link";
import { BookOpen, LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-50 border-b border-slate-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-gradient-to-br from-primary-500 to-teal-600 p-2.5 rounded-xl text-white shadow-lg shadow-primary-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">Kalam</span>
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 text-sm font-bold text-slate-500">
              <Link href="#program" className="hover:text-primary-600 transition-colors">Program</Link>
              <Link href="#testimoni" className="hover:text-primary-600 transition-colors">Testimoni</Link>
            </nav>
            
            <Link 
              href="/login" 
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm font-semibold hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Login Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
