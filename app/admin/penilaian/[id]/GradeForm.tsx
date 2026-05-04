"use client";

import { useState } from "react";
import { Save, AlertCircle } from "lucide-react";
import { addGradeAction } from "@/app/actions/admin";

export default function GradeForm({ studentId }: { studentId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    const result = await addGradeAction(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      // Form akan di-reset karena redirect terjadi, tapi untuk amannya:
      (document.getElementById("gradeForm") as HTMLFormElement)?.reset();
    }
    setLoading(false);
  };

  return (
    <form id="gradeForm" action={handleSubmit} className="space-y-6">
      <input type="hidden" name="studentId" value={studentId} />
      
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="tanggal_pertemuan" className="block text-sm font-medium text-slate-700 mb-2">
            Tanggal Pertemuan *
          </label>
          <input
            type="date"
            id="tanggal_pertemuan"
            name="tanggal_pertemuan"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="nilai" className="block text-sm font-medium text-slate-700 mb-2">
            Nilai Angka (1-100) *
          </label>
          <input
            type="number"
            id="nilai"
            name="nilai"
            min="0"
            max="100"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            placeholder="Contoh: 85"
          />
        </div>
      </div>

      <div>
        <label htmlFor="topik_bahasan" className="block text-sm font-medium text-slate-700 mb-2">
          Topik Bahasan *
        </label>
        <input
          type="text"
          id="topik_bahasan"
          name="topik_bahasan"
          required
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
          placeholder="Contoh: Makharijul Huruf (Rongga Mulut)"
        />
      </div>

      <div>
        <label htmlFor="catatan_ustadz" className="block text-sm font-medium text-slate-700 mb-2">
          Catatan & Evaluasi Ustadz
        </label>
        <textarea
          id="catatan_ustadz"
          name="catatan_ustadz"
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
          placeholder="Tuliskan perkembangan, kekurangan, atau nasehat untuk santri..."
        ></textarea>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors disabled:opacity-70"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            <Save className="w-5 h-5" />
          )}
          {loading ? "Menyimpan..." : "Simpan Nilai E-Rapor"}
        </button>
      </div>
    </form>
  );
}
