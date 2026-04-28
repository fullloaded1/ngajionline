import Link from "next/link";
import { BookOpen, LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-2 rounded-xl text-white">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">Kalam</span>
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
              <Link href="#program" className="hover:text-primary-600 transition-colors">Program</Link>
              <Link href="#testimoni" className="hover:text-primary-600 transition-colors">Testimoni</Link>
            </nav>
            
            <Link 
              href="/login" 
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm"
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
