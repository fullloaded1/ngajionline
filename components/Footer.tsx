import Link from "next/link";
import Image from "next/image";
import { MapPin, Envelope, Phone, InstagramLogo, YoutubeLogo, WhatsappLogo, FacebookLogo } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="py-16 border-t"
      style={{ background: '#070813', borderColor: 'rgba(201,168,76,0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl overflow-hidden">
                <Image src="/logo.jpg" alt="Kalaam Logo" width={48} height={48} className="object-cover" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight text-gold-gradient">KALAAM</span>
                <span className="text-[10px] font-semibold text-silver-400 tracking-widest uppercase">Ngaji Online</span>
              </div>
            </div>
            <p className="text-base font-medium text-silver-400 leading-relaxed mb-6">
              Platform Ngaji Online Premium. Solusi terbaik belajar Al-Qur&apos;an dan Ilmu Agama secara terstruktur, kapan saja, dan di mana saja.
            </p>
            {/* Sosial Media */}
            <div className="flex items-center gap-3">
              {[
                { icon: <InstagramLogo size={20} weight="duotone" />, href: 'https://instagram.com', label: 'Instagram' },
                { icon: <YoutubeLogo size={20} weight="duotone" />, href: 'https://youtube.com', label: 'YouTube' },
                { icon: <WhatsappLogo size={20} weight="duotone" />, href: 'https://wa.me/6281234567890', label: 'WhatsApp' },
                { icon: <FacebookLogo size={20} weight="duotone" />, href: 'https://facebook.com', label: 'Facebook' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Navigasi</h3>
            <ul className="space-y-4 text-base font-medium text-silver-400">
              <li><Link href="#beranda" className="hover:text-gold-400 transition-colors">Beranda</Link></li>
              <li><Link href="#program" className="hover:text-gold-400 transition-colors">Program Kami</Link></li>
              <li><Link href="#testimoni" className="hover:text-gold-400 transition-colors">Testimoni</Link></li>
              <li><Link href="/login" className="hover:text-gold-400 transition-colors">Portal Siswa</Link></li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Hubungi Kami</h3>
            <ul className="space-y-4 text-base font-medium text-silver-400">
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-xl border"
                  style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.2)' }}>
                  <MapPin size={18} weight="duotone" className="shrink-0 text-gold-400" />
                </div>
                <span className="mt-1">Jl. Pendidikan No. 123, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-xl border"
                  style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.2)' }}>
                  <Phone size={18} weight="duotone" className="shrink-0 text-gold-400" />
                </div>
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-xl border"
                  style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.2)' }}>
                  <Envelope size={18} weight="duotone" className="shrink-0 text-gold-400" />
                </div>
                <span>halo@kalaam.id</span>
              </li>
            </ul>
          </div>

          {/* Pembayaran */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Metode Pembayaran</h3>
            <div className="flex flex-wrap gap-3">
              {['BCA', 'Mandiri', 'BNI', 'BSI', 'GoPay', 'OVO'].map((bank) => (
                <div key={bank}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-silver-300 border"
                  style={{ background: 'rgba(28,36,68,0.5)', borderColor: 'rgba(168,178,192,0.2)' }}>
                  {bank}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t text-center text-sm font-medium text-silver-500"
          style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
          <p>&copy; {new Date().getFullYear()} Kalaam Ngaji Online. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
