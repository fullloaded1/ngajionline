import Link from "next/link";
import { BookOpen, LayoutDashboard, Users, GraduationCap, ClipboardList, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 fixed h-full z-10">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2 text-white">
            <div className="bg-primary-500 p-1.5 rounded-lg text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Kalam Admin</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white bg-slate-800 font-medium">
            <LayoutDashboard className="w-5 h-5 text-primary-400" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/siswa" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Users className="w-5 h-5" />
            <span>Data Siswa</span>
          </Link>
          <Link href="/admin/program" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <GraduationCap className="w-5 h-5" />
            <span>Program Kelas</span>
          </Link>
          <Link href="/admin/penilaian" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <ClipboardList className="w-5 h-5" />
            <span>Penilaian (E-Rapor)</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-slate-800 transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-400" />
            <span className="font-bold">Kalam Admin</span>
          </div>
          <button className="p-2 bg-slate-800 rounded-md">
            <LayoutDashboard className="w-5 h-5" />
          </button>
        </header>

        {/* Content Wrapper */}
        <div className="flex-1 p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
