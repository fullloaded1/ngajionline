import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, FileEdit } from "lucide-react";

export default async function AdminPenilaianPage() {
  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    include: {
      enrollments: {
        include: { program: true }
      },
      learningRecords: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Penilaian & E-Rapor</h1>
        <p className="text-slate-500">Pilih santri untuk menambahkan nilai pertemuan atau evaluasi.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
              placeholder="Cari nama santri..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Nama Siswa</th>
                <th className="px-6 py-4 font-semibold">Program</th>
                <th className="px-6 py-4 font-semibold">Total Pertemuan</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Belum ada data siswa terdaftar.
                  </td>
                </tr>
              )}
              {students.map((student) => {
                const activeProgram = student.enrollments.find(e => e.status === "ACTIVE")?.program.nama_program || "-";
                const totalPertemuan = student.learningRecords.length;

                return (
                  <tr key={student.id} className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{student.nama}</td>
                    <td className="px-6 py-4 text-slate-600">{activeProgram}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md font-bold text-xs border border-amber-100">
                        {totalPertemuan} Sesi
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/admin/penilaian/${student.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        <FileEdit className="w-4 h-4" />
                        Input Nilai
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
