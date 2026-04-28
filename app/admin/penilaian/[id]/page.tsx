import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import GradeForm from "./GradeForm";
import { redirect } from "next/navigation";

export default async function StudentGradePage({ params }: { params: { id: string } }) {
  const studentId = params.id;

  const student = await prisma.user.findUnique({
    where: { id: studentId },
    include: {
      enrollments: { include: { program: true } },
      learningRecords: { orderBy: { tanggal_pertemuan: 'desc' } }
    }
  });

  if (!student) {
    redirect("/admin/penilaian");
  }

  const activeProgram = student.enrollments.find(e => e.status === "ACTIVE")?.program.nama_program || "Belum Ada Program";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/penilaian" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Penilaian</span>
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Input Nilai: {student.nama}</h1>
        <p className="text-slate-500">Program Aktif: {activeProgram}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Form Input */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
              <BookOpen className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-bold text-slate-900">Form E-Rapor</h2>
            </div>
            
            <GradeForm studentId={studentId} />
          </div>
        </div>

        {/* Kolom Kanan: Riwayat Nilai */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">Riwayat Pertemuan Sebelumnya</h2>
            </div>
            
            <div className="divide-y divide-slate-100">
              {student.learningRecords.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  Belum ada riwayat pertemuan untuk santri ini.
                </div>
              ) : (
                student.learningRecords.map((record) => (
                  <div key={record.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="text-sm text-slate-500 mb-1">
                          {new Date(record.tanggal_pertemuan).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{record.topik_bahasan}</h3>
                      </div>
                      <div className="shrink-0">
                        <span className="inline-flex flex-col items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-50 to-teal-50 text-primary-700 border border-primary-100 rounded-2xl shadow-sm">
                          <span className="text-xs font-medium text-primary-500 -mb-1">Nilai</span>
                          <span className="text-xl font-black">{record.nilai}</span>
                        </span>
                      </div>
                    </div>
                    {record.catatan_ustadz && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 italic">
                        "{record.catatan_ustadz}"
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
