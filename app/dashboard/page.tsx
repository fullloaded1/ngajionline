export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { BookMarked, CheckCircle, Clock, Lock, AlertCircle, Upload, Clock3 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import PaymentForm from "./PaymentForm";

async function handleLogout() {
  "use server";
  cookies().delete("session");
  redirect("/login");
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      enrollments: { include: { program: true } },
      learningRecords: { orderBy: { tanggal_pertemuan: "desc" } },
    },
  });

  if (!user) redirect("/login");

  const totalPertemuan = user.learningRecords.length;
  const rataRataNilai =
    totalPertemuan > 0
      ? (
          user.learningRecords.reduce((acc, curr) => acc + curr.nilai, 0) /
          totalPertemuan
        ).toFixed(1)
      : 0;

  const activeEnrollment = user.enrollments[0] ?? null;
  const enrollmentStatus = activeEnrollment?.status ?? null;
  const programName = activeEnrollment?.program?.nama_program ?? "Belum Ada Program";

  // Info rekening dummy — ganti sesuai rekening asli
  const REKENING = {
    bank: "BSI (Bank Syariah Indonesia)",
    nomor: "1234567890",
    atas_nama: "Yayasan Kalaam",
    nominal: activeEnrollment?.program?.harga
      ? `Rp ${activeEnrollment.program.harga.toLocaleString("id-ID")}`
      : "Sesuai program",
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #0D1022 0%, #1C2444 100%)" }}
    >
      {/* Navbar */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(13,16,34,0.92)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(201,168,76,0.2)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-xl overflow-hidden">
                <Image src="/logo.jpg" alt="Kalaam" width={40} height={40} className="object-cover" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-tight text-gold-gradient">KALAAM</span>
                <span className="text-[9px] font-semibold text-silver-400 tracking-widest uppercase">Ngaji Online</span>
              </div>
            </Link>
            <form action={handleLogout}>
              <button
                type="submit"
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-all text-silver-400 hover:text-red-400"
                style={{ borderColor: "rgba(168,178,192,0.2)", background: "rgba(28,36,68,0.4)" }}
              >
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ===== STATE 1: PENDING_PAYMENT — Instruksi Transfer ===== */}
        {enrollmentStatus === "PENDING_PAYMENT" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ background: "rgba(201,168,76,0.15)" }}
              >
                <AlertCircle className="w-8 h-8 text-gold-400" />
              </div>
              <h1 className="text-2xl font-extrabold text-white mb-2">
                Selamat Datang, {user.nama}!
              </h1>
              <p className="text-silver-400 font-medium">
                Akun Anda berhasil dibuat. Silakan selesaikan pembayaran untuk mulai belajar.
              </p>
            </div>

            {/* Kartu Info Rekening */}
            <div
              className="p-8 rounded-3xl border mb-6"
              style={{
                background: "rgba(28,36,68,0.7)",
                borderColor: "rgba(201,168,76,0.3)",
                boxShadow: "0 16px 48px rgba(201,168,76,0.1)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(201,168,76,0.15)" }}
                >
                  <BookMarked className="w-5 h-5 text-gold-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Instruksi Pembayaran</h2>
              </div>

              <div className="space-y-4">
                <div
                  className="flex justify-between items-center py-3 border-b"
                  style={{ borderColor: "rgba(168,178,192,0.15)" }}
                >
                  <span className="text-silver-400 font-medium">Program</span>
                  <span className="text-white font-semibold">{programName}</span>
                </div>
                <div
                  className="flex justify-between items-center py-3 border-b"
                  style={{ borderColor: "rgba(168,178,192,0.15)" }}
                >
                  <span className="text-silver-400 font-medium">Nominal Transfer</span>
                  <span className="text-gold-400 font-bold text-lg">{REKENING.nominal}</span>
                </div>
                <div
                  className="flex justify-between items-center py-3 border-b"
                  style={{ borderColor: "rgba(168,178,192,0.15)" }}
                >
                  <span className="text-silver-400 font-medium">Bank Tujuan</span>
                  <span className="text-white font-semibold">{REKENING.bank}</span>
                </div>
                <div
                  className="flex justify-between items-center py-3 border-b"
                  style={{ borderColor: "rgba(168,178,192,0.15)" }}
                >
                  <span className="text-silver-400 font-medium">Nomor Rekening</span>
                  <span
                    className="text-gold-gradient font-extrabold text-xl tracking-widest select-all cursor-copy"
                    title="Klik untuk menyalin"
                  >
                    {REKENING.nomor}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-silver-400 font-medium">Atas Nama</span>
                  <span className="text-white font-semibold">{REKENING.atas_nama}</span>
                </div>
              </div>

              <div
                className="mt-6 p-4 rounded-2xl border"
                style={{
                  background: "rgba(201,168,76,0.05)",
                  borderColor: "rgba(201,168,76,0.2)",
                }}
              >
                <p className="text-sm text-silver-400 leading-relaxed">
                  ⚠️ Pastikan nominal transfer <strong className="text-gold-300">tepat</strong> sesuai harga program.
                  Setelah transfer, upload foto/screenshot bukti transfer di bawah ini.
                </p>
              </div>
            </div>

            {/* Form Upload Bukti */}
            <PaymentForm enrollmentId={activeEnrollment!.id} />
          </div>
        )}

        {/* ===== STATE 2: PENDING_VERIFICATION — Menunggu Verifikasi ===== */}
        {enrollmentStatus === "PENDING_VERIFICATION" && (
          <div className="max-w-2xl mx-auto">
            <div
              className="p-10 rounded-3xl border text-center"
              style={{
                background: "rgba(28,36,68,0.7)",
                borderColor: "rgba(201,168,76,0.3)",
                boxShadow: "0 16px 48px rgba(201,168,76,0.1)",
              }}
            >
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                style={{ background: "rgba(201,168,76,0.15)" }}
              >
                <Clock3 className="w-10 h-10 text-gold-400" />
              </div>
              <h1 className="text-2xl font-extrabold text-white mb-4">
                Pembayaran Dalam Proses Verifikasi
              </h1>
              <p className="text-silver-300 leading-relaxed mb-6 font-medium">
                Terima kasih, <strong className="text-gold-300">{user.nama}</strong>! Bukti transfer Anda
                sudah kami terima dan sedang dalam proses verifikasi oleh Admin.
                Biasanya membutuhkan waktu <strong className="text-white">1×24 jam kerja</strong>.
              </p>

              {activeEnrollment?.bukti_bayar && (
                <div className="mb-6">
                  <p className="text-silver-500 text-sm mb-3 font-medium">Bukti transfer yang Anda upload:</p>
                  <div className="rounded-2xl overflow-hidden border inline-block"
                    style={{ borderColor: "rgba(201,168,76,0.3)" }}>
                    <img
                      src={activeEnrollment.bukti_bayar}
                      alt="Bukti Transfer"
                      className="max-w-[280px] w-full"
                    />
                  </div>
                </div>
              )}

              <div
                className="p-4 rounded-2xl border"
                style={{
                  background: "rgba(201,168,76,0.05)",
                  borderColor: "rgba(201,168,76,0.2)",
                }}
              >
                <p className="text-sm text-silver-400">
                  Ada pertanyaan? Hubungi Admin via{" "}
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-gold-400 hover:text-gold-300"
                  >
                    WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===== STATE 3: ACTIVE — E-Rapor ===== */}
        {enrollmentStatus === "ACTIVE" && (
          <>
            {/* Header Profile */}
            <section className="mb-10">
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 rounded-3xl border"
                style={{
                  background: "rgba(28,36,68,0.6)",
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(201,168,76,0.2)",
                }}
              >
                <div>
                  <p className="text-sm font-medium mb-1.5 text-silver-400">Portal E-Rapor Santri</p>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Ahlan wa Sahlan, {user.nama}
                  </h1>
                </div>
                <div>
                  <div
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold border"
                    style={{
                      background: "rgba(201,168,76,0.1)",
                      borderColor: "rgba(201,168,76,0.3)",
                      color: "#E8C97A",
                    }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400" />
                    </span>
                    Level {programName} - Aktif
                  </div>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {[
                { icon: <BookMarked className="w-6 h-6 text-gold-400" />, label: "Total Pertemuan", value: `${totalPertemuan} Sesi`, bg: "rgba(201,168,76,0.15)" },
                { icon: <CheckCircle className="w-6 h-6 text-silver-300" />, label: "Rata-rata Nilai", value: String(rataRataNilai), bg: "rgba(168,178,192,0.15)" },
                { icon: <Clock className="w-6 h-6 text-gold-400" />, label: "Kehadiran", value: "100%", bg: "rgba(201,168,76,0.15)" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl border flex items-start gap-5 hover:-translate-y-1 transition-all"
                  style={{ background: "rgba(28,36,68,0.5)", borderColor: "rgba(168,178,192,0.15)" }}
                >
                  <div className="p-3.5 rounded-2xl" style={{ background: stat.bg }}>{stat.icon}</div>
                  <div>
                    <p className="text-sm font-medium mb-1 text-silver-400">{stat.label}</p>
                    <h3 className="text-2xl font-extrabold text-white">{stat.value}</h3>
                  </div>
                </div>
              ))}
            </section>

            {/* Tabel E-Rapor */}
            <section
              className="mb-10 rounded-3xl border overflow-hidden"
              style={{ background: "rgba(20,26,51,0.8)", borderColor: "rgba(201,168,76,0.2)" }}
            >
              <div className="px-8 py-6 border-b" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
                <h2 className="text-xl font-extrabold text-white tracking-tight">Riwayat Pembelajaran &amp; Evaluasi</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead
                    className="text-xs uppercase tracking-wider border-b"
                    style={{ color: "#A8B2C0", background: "rgba(28,36,68,0.5)", borderColor: "rgba(168,178,192,0.15)" }}
                  >
                    <tr>
                      <th scope="col" className="px-8 py-5 font-bold">Tanggal</th>
                      <th scope="col" className="px-8 py-5 font-bold">Topik Bahasan</th>
                      <th scope="col" className="px-8 py-5 font-bold text-center">Nilai</th>
                      <th scope="col" className="px-8 py-5 font-bold">Catatan Ustadz</th>
                    </tr>
                  </thead>
                  <tbody style={{ borderColor: "rgba(168,178,192,0.1)" }}>
                    {user.learningRecords.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-8 py-10 text-center font-medium text-silver-500">
                          Belum ada riwayat pertemuan/evaluasi.
                        </td>
                      </tr>
                    )}
                    {user.learningRecords.map((row) => (
                      <tr key={row.id} className="transition-colors border-t"
                        style={{ borderColor: "rgba(168,178,192,0.08)" }}>
                        <td className="px-8 py-5 whitespace-nowrap font-medium text-silver-300">
                          {new Date(row.tanggal_pertemuan).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-8 py-5 font-semibold text-white">{row.topik_bahasan}</td>
                        <td className="px-8 py-5 text-center">
                          <span
                            className="inline-flex items-center justify-center px-3 py-1 text-xs font-bold rounded-full text-navy-700 bg-gold-gradient"
                            style={{ boxShadow: "0 2px 8px rgba(201,168,76,0.3)" }}
                          >
                            {row.nilai}
                          </span>
                        </td>
                        <td className="px-8 py-5 italic font-medium leading-relaxed text-silver-400">
                          {row.catatan_ustadz ? `"${row.catatan_ustadz}"` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Sertifikat */}
            <section
              className="p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
              style={{
                background: "linear-gradient(135deg, rgba(40,52,90,0.9) 0%, rgba(20,26,51,0.95) 100%)",
                border: "1px solid rgba(201,168,76,0.3)",
                boxShadow: "0 16px 48px rgba(201,168,76,0.1)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)" }} />
              <div className="relative z-10 flex-1">
                <h2 className="text-2xl font-extrabold mb-3 tracking-tight text-white">
                  Sertifikat Kelulusan Level {programName}
                </h2>
                <p className="text-sm md:text-base font-medium max-w-2xl leading-relaxed text-silver-400">
                  Sertifikat ini akan terbuka setelah Anda menyelesaikan seluruh pertemuan dan lulus evaluasi akhir.
                </p>
              </div>
              <div className="relative z-10 shrink-0 w-full md:w-auto">
                <button
                  disabled
                  className="w-full md:w-auto flex justify-center items-center gap-3 px-8 py-4 rounded-2xl font-bold cursor-not-allowed border"
                  style={{ background: "rgba(28,36,68,0.7)", borderColor: "rgba(168,178,192,0.2)", color: "#A8B2C0" }}
                >
                  <Lock className="w-5 h-5" />
                  <span>Unduh PDF (Terkunci)</span>
                </button>
              </div>
            </section>
          </>
        )}

        {/* Tidak ada enrollment */}
        {!enrollmentStatus && (
          <div className="text-center py-20">
            <p className="text-silver-400 font-medium">Anda belum terdaftar di program apapun.</p>
            <Link href="/" className="mt-4 inline-block text-gold-400 font-bold hover:text-gold-300">
              Lihat Program →
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}
