export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Users, GraduationCap, ClipboardList, LogOut, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = async () => {
    "use server";
    cookies().delete("session");
    redirect("/login");
  };

  // Hitung pending verifikasi untuk badge
  const pendingCount = await prisma.enrollment.count({
    where: { status: "PENDING_VERIFICATION" },
  });

  const navItems = [
    { href: "/admin", icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
    { href: "/admin/siswa", icon: <Users className="w-5 h-5" />, label: "Data Siswa" },
    { href: "/admin/program", icon: <GraduationCap className="w-5 h-5" />, label: "Program Kelas" },
    { href: "/admin/penilaian", icon: <ClipboardList className="w-5 h-5" />, label: "Penilaian (E-Rapor)" },
    {
      href: "/admin/pembayaran",
      icon: <ShieldCheck className="w-5 h-5" />,
      label: "Verifikasi Pembayaran",
      badge: pendingCount > 0 ? pendingCount : null,
    },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#0D1022" }}>
      {/* Sidebar Desktop */}
      <aside
        className="hidden md:flex flex-col w-64 fixed h-full z-10 border-r"
        style={{ background: "rgba(13,16,34,0.97)", borderColor: "rgba(201,168,76,0.15)" }}
      >
        {/* Logo */}
        <div className="p-5 border-b" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
          <Link href="/admin" className="flex items-center gap-3">
            <div className="rounded-xl overflow-hidden">
              <Image src="/logo.jpg" alt="Kalaam" width={40} height={40} className="object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-base font-extrabold tracking-tight"
                style={{ background: "linear-gradient(135deg, #E8C97A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                KALAAM
              </span>
              <span className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: "#A8B2C0" }}>
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all group"
              style={{ color: "#A8B2C0" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-silver-400 group-hover:text-gold-400 transition-colors">{item.icon}</span>
                <span className="text-sm font-semibold group-hover:text-white transition-colors">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full text-navy-700 bg-gold-gradient"
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
          <form action={handleLogout}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold w-full text-left transition-colors"
              style={{ color: "#f87171" }}
            >
              <LogOut className="w-5 h-5" />
              <span>Keluar</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header
          className="md:hidden p-4 flex justify-between items-center sticky top-0 z-20 border-b"
          style={{ background: "rgba(13,16,34,0.95)", borderColor: "rgba(201,168,76,0.15)" }}
        >
          <div className="flex items-center gap-2">
            <div className="rounded-lg overflow-hidden">
              <Image src="/logo.jpg" alt="Kalaam" width={32} height={32} className="object-cover" />
            </div>
            <span className="font-bold text-white">Kalaam Admin</span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
