"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { registerAction } from "@/app/actions/register";

// Data program dengan harga (dummy sesuai ProgramSection)
type ProgramOption = { id: string; name: string; price: string };

const PROGRAMS: ProgramOption[] = [
  { id: "", name: "-- Pilih Program --", price: "" },
  { id: "dasar", name: "Dasar (Pemula)", price: "Rp 150.000/bulan" },
  { id: "menengah", name: "Menengah (Tahsin)", price: "Rp 250.000/bulan" },
  { id: "lanjutan", name: "Lanjutan (Tahfidz)", price: "Rp 350.000/bulan" },
];

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<ProgramOption[]>([{ id: "", name: "-- Pilih Program --", price: "" }]);
  const [selectedProgram, setSelectedProgram] = useState<ProgramOption | null>(null);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  // Fetch program dari DB
  useEffect(() => {
    fetch("/api/programs")
      .then((r) => r.json())
      .then((data) => {
        if (data?.programs && data.programs.length > 0) {
          setPrograms([
            { id: "", name: "-- Pilih Program --", price: "" },
            ...data.programs.map((p: { id: string; nama_program: string; harga: number }) => ({
              id: p.id,
              name: p.nama_program,
              price: `Rp ${p.harga.toLocaleString("id-ID")}/bulan`,
            })),
          ]);
        } else {
          // Fallback dummy jika DB kosong
          setPrograms(PROGRAMS);
        }
      })
      .catch(() => {
        setPrograms(PROGRAMS); // fallback ke dummy jika API gagal
      })
      .finally(() => setLoadingPrograms(false));
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    const result = await registerAction(formData);
    if (result?.error) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{ background: "#0D1022" }}
    >
      {/* Panel Kiri — Visual */}
      <div
        className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center p-12"
        style={{
          background:
            "linear-gradient(145deg, #0D1022 0%, #1C2444 60%, #141A33 100%)",
        }}
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #C9A84C 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full opacity-15 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #A8B2C0 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <div className="flex justify-center mb-10">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 16px 48px rgba(201,168,76,0.3)" }}
            >
              <Image
                src="/logo.jpg"
                alt="Kalaam Logo"
                width={160}
                height={160}
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="mb-5">
            <span
              className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full border"
              style={{
                background: "rgba(201,168,76,0.1)",
                borderColor: "rgba(201,168,76,0.3)",
                color: "#E8C97A",
              }}
            >
              Daftar Sekarang
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Mulai Perjalanan <br />
            <span className="text-gold-gradient">Qur&apos;animu</span>
          </h1>
          <p className="text-lg text-silver-400 leading-relaxed font-medium">
            Daftar mandiri, pilih program, dan mulai belajar Al-Qur&apos;an bersama
            asatidz berpengalaman.
          </p>

          {/* Steps */}
          <div className="mt-10 space-y-4 text-left">
            {[
              "Isi form pendaftaran",
              "Transfer biaya program",
              "Upload bukti transfer",
              "Tunggu verifikasi Admin",
              "Akses E-Rapor & mulai belajar",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-navy-700 bg-gold-gradient"
                >
                  {i + 1}
                </div>
                <span className="text-silver-300 text-sm font-medium">
                  {step}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-10 pt-8 border-t"
            style={{ borderColor: "rgba(201,168,76,0.2)" }}
          >
            <p className="text-silver-500 text-sm font-medium tracking-widest">
              — تعليم القرآن · فهم · عمل · أثر —
            </p>
          </div>
        </div>
      </div>

      {/* Panel Kanan — Form */}
      <div
        className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 relative overflow-y-auto"
        style={{
          background: "rgba(13,16,34,0.97)",
          borderLeft: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        <div className="mx-auto w-full max-w-md">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors font-medium text-silver-400 hover:text-gold-400"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          {/* Mobile Logo */}
          <div className="md:hidden flex items-center gap-3 mb-8">
            <div className="rounded-xl overflow-hidden">
              <Image
                src="/logo.jpg"
                alt="Kalaam"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-extrabold tracking-tight text-gold-gradient">
                KALAAM
              </span>
              <span className="text-[9px] font-semibold text-silver-400 tracking-widest uppercase">
                Ngaji Online
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
              Daftar Akun Baru
            </h2>
            <p className="text-silver-400 font-medium">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="font-bold text-gold-400 hover:text-gold-300 transition-colors"
              >
                Login di sini
              </Link>
            </p>
          </div>

          {error && (
            <div
              className="mb-6 p-4 rounded-2xl flex items-start gap-3 border"
              style={{
                background: "rgba(200,50,50,0.1)",
                borderColor: "rgba(200,50,50,0.3)",
              }}
            >
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 font-medium">{error}</p>
            </div>
          )}

          <form action={handleSubmit} className="space-y-5">
            {/* Nama */}
            <div>
              <label
                htmlFor="nama"
                className="block text-sm font-semibold text-silver-300 mb-2"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                required
                className="w-full px-4 py-3.5 rounded-2xl outline-none transition-all font-medium text-white placeholder:text-silver-600"
                style={{
                  background: "rgba(28,36,68,0.7)",
                  border: "1px solid rgba(168,178,192,0.2)",
                }}
                placeholder="Contoh: Ahmad Fauzi"
              />
            </div>

            {/* Nomor WA */}
            <div>
              <label
                htmlFor="nomor_wa"
                className="block text-sm font-semibold text-silver-300 mb-2"
              >
                Nomor WhatsApp{" "}
                <span className="text-silver-500 font-normal">
                  (digunakan untuk login)
                </span>
              </label>
              <input
                type="text"
                id="nomor_wa"
                name="nomor_wa"
                required
                className="w-full px-4 py-3.5 rounded-2xl outline-none transition-all font-medium text-white placeholder:text-silver-600"
                style={{
                  background: "rgba(28,36,68,0.7)",
                  border: "1px solid rgba(168,178,192,0.2)",
                }}
                placeholder="Contoh: 08123456789"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-silver-300 mb-2"
              >
                Kata Sandi{" "}
                <span className="text-silver-500 font-normal">
                  (min. 6 karakter)
                </span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={6}
                className="w-full px-4 py-3.5 rounded-2xl outline-none transition-all font-medium text-white placeholder:text-silver-600"
                style={{
                  background: "rgba(28,36,68,0.7)",
                  border: "1px solid rgba(168,178,192,0.2)",
                }}
                placeholder="Buat kata sandi"
              />
            </div>

            {/* Pilih Program */}
            <div>
              <label
                htmlFor="programId"
                className="block text-sm font-semibold text-silver-300 mb-2"
              >
                Pilih Program Kelas
              </label>
              <div className="relative">
                <select
                  id="programId"
                  name="programId"
                  required
                  disabled={loadingPrograms}
                  onChange={(e) => {
                    const p = programs.find((x) => x.id === e.target.value);
                    setSelectedProgram(p || null);
                  }}
                  className="w-full px-4 py-3.5 rounded-2xl outline-none transition-all font-medium"
                  style={{
                    background: "#1C2444",
                    border: "1px solid rgba(168,178,192,0.2)",
                    color: "#ffffff",
                    colorScheme: "dark",
                  }}
                >
                  {loadingPrograms ? (
                    <option value="">Memuat program...</option>
                  ) : (
                    programs.map((p) => (
                      <option key={p.id} value={p.id} style={{ background: "#1C2444", color: "#ffffff" }}>
                        {p.name}{p.price ? ` — ${p.price}` : ""}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Info harga */}
              {selectedProgram?.price && (
                <div
                  className="mt-2 px-4 py-2.5 rounded-xl flex items-center gap-2 border"
                  style={{
                    background: "rgba(201,168,76,0.08)",
                    borderColor: "rgba(201,168,76,0.25)",
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span className="text-sm font-semibold text-gold-300">
                    Biaya program:{" "}
                    <span className="text-gold-400">{selectedProgram.price}</span>
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl text-sm font-bold text-navy-700 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 bg-gold-gradient"
              style={{ boxShadow: "0 8px 24px rgba(201,168,76,0.3)" }}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-navy-700/30 border-t-navy-700 rounded-full animate-spin" />
              ) : (
                <UserPlus className="w-5 h-5" />
              )}
              {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs font-medium text-silver-600 leading-relaxed">
            Dengan mendaftar, Anda setuju mengikuti proses verifikasi pembayaran
            sebelum dapat mengakses E-Rapor.
          </p>
        </div>
      </div>
    </div>
  );
}
