import Link from "next/link";
import { BookOpen, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary-500 p-1.5 rounded-lg text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Kalam</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Platform Ngaji Online Premium. Solusi terbaik belajar Al-Qur&apos;an dan Ilmu Agama secara terstruktur, kapan saja, dan di mana saja.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-white font-semibold mb-6">Navigasi</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#beranda" className="hover:text-primary-400 transition-colors">Beranda</Link></li>
              <li><Link href="#program" className="hover:text-primary-400 transition-colors">Program Kami</Link></li>
              <li><Link href="#testimoni" className="hover:text-primary-400 transition-colors">Testimoni</Link></li>
              <li><Link href="/login" className="hover:text-primary-400 transition-colors">Portal Siswa</Link></li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="text-white font-semibold mb-6">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                <span>Jl. Pendidikan No. 123, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span>halo@kalam.id</span>
              </li>
            </ul>
          </div>

          {/* Pembayaran */}
          <div>
            <h3 className="text-white font-semibold mb-6">Metode Pembayaran</h3>
            <div className="flex flex-wrap gap-3">
              <div className="bg-slate-800 px-4 py-2 rounded-md text-xs font-medium border border-slate-700">BCA</div>
              <div className="bg-slate-800 px-4 py-2 rounded-md text-xs font-medium border border-slate-700">Mandiri</div>
              <div className="bg-slate-800 px-4 py-2 rounded-md text-xs font-medium border border-slate-700">BNI</div>
              <div className="bg-slate-800 px-4 py-2 rounded-md text-xs font-medium border border-slate-700">BSI</div>
              <div className="bg-slate-800 px-4 py-2 rounded-md text-xs font-medium border border-slate-700">GoPay</div>
              <div className="bg-slate-800 px-4 py-2 rounded-md text-xs font-medium border border-slate-700">OVO</div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Kalam Ngaji Online. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
