import Link from "next/link";
import { BookOpen, CheckCircle, Clock, BookMarked, Download, Lock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";

export default async function DashboardPage() {
  // Ambil data session
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  // Fetch data profil user beserta relasi enrollments dan learningRecords
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      enrollments: {
        include: {
          program: true
        }
      },
      learningRecords: {
        orderBy: {
          tanggal_pertemuan: 'desc'
        }
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  // Proses data stat
  const totalPertemuan = user.learningRecords.length;
  const rataRataNilai = totalPertemuan > 0 
    ? (user.learningRecords.reduce((acc, curr) => acc + curr.nilai, 0) / totalPertemuan).toFixed(1)
    : 0;
  
  // Ambil program aktif pertama (asumsi 1 siswa 1 program untuk MVP ini)
  const activeEnrollment = user.enrollments.find(e => e.status === "ACTIVE");
  const programName = activeEnrollment ? activeEnrollment.program.nama_program : "Belum Ada Program";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar Dashboard */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary-600 p-1.5 rounded-lg text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Kalam</span>
            </Link>
            
            <form action={logoutAction}>
              <button 
                type="submit"
                className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-medium"
              >
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Profile */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">Portal E-Rapor Santri</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Ahlan wa Sahlan, {user.nama}</h1>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Level {programName} - Aktif
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Pertemuan</p>
              <h3 className="text-2xl font-bold text-slate-900">{totalPertemuan} Sesi</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Rata-rata Nilai</p>
              <h3 className="text-2xl font-bold text-slate-900">{rataRataNilai}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Persentase Kehadiran</p>
              <h3 className="text-2xl font-bold text-slate-900">100%</h3>
            </div>
          </div>
        </section>

        {/* Tabel E-Rapor */}
        <section className="mb-10 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-900">Riwayat Pembelajaran & Evaluasi</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Tanggal</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Topik Bahasan</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center">Nilai</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Catatan Ustadz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {user.learningRecords.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      Belum ada riwayat pertemuan/evaluasi.
                    </td>
                  </tr>
                )}
                {user.learningRecords.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">
                      {new Date(row.tanggal_pertemuan).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{row.topik_bahasan}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold bg-primary-50 text-primary-700 rounded-lg">
                        {row.nilai}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 italic">
                      {row.catatan_ustadz ? `"${row.catatan_ustadz}"` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sertifikat Section */}
        <section className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat"></div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Sertifikat Kelulusan Level {programName}</h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Sertifikat ini akan terbuka dan dapat diunduh setelah Anda menyelesaikan seluruh pertemuan dan lulus evaluasi akhir.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button 
              disabled
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-400 font-medium cursor-not-allowed border border-slate-700 transition-all"
            >
              <Lock className="w-5 h-5" />
              <span>Unduh PDF (Terkunci)</span>
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
