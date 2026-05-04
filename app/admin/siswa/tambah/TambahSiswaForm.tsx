"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { createStudentAction } from "@/app/actions/admin";

interface Program {
  id: string;
  nama_program: string;
}

export default function TambahSiswaForm({ programs }: { programs: Program[] }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    const result = await createStudentAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/admin/siswa" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Data Siswa</span>
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Tambah Siswa Baru</h1>
        <p className="text-slate-500">Buat akun santri baru dan daftarkan ke program kelas.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-slate-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              placeholder="Contoh: Ahmad Rizki"
            />
          </div>

          <div>
            <label htmlFor="nomor_wa" className="block text-sm font-medium text-slate-700 mb-2">
              Nomor WhatsApp
            </label>
            <input
              type="text"
              id="nomor_wa"
              name="nomor_wa"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              placeholder="Contoh: 081234567890"
            />
            <p className="mt-2 text-xs text-slate-500">Nomor ini akan digunakan sebagai username saat siswa login.</p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Kata Sandi Awal
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              defaultValue="kalam123"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            />
            <p className="mt-2 text-xs text-slate-500">Default: kalam123. Siswa dapat menggantinya nanti.</p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label htmlFor="programId" className="block text-sm font-bold text-slate-900 mb-3">
              Pilih Program Kelas
            </label>
            <select
              id="programId"
              name="programId"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
            >
              <option value="">-- Pilih Program --</option>
              {programs.map((prog) => (
                <option key={prog.id} value={prog.id}>
                  {prog.nama_program}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <Link 
              href="/admin/siswa"
              className="flex-1 py-3 px-4 border border-slate-200 rounded-xl text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <Save className="w-5 h-5" />
              )}
              {loading ? "Menyimpan..." : "Simpan Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
