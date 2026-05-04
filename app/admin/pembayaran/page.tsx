export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { CheckCircle, Clock, Users, ExternalLink } from "lucide-react";

// Server Action: verifikasi pembayaran
async function verifyPaymentAction(enrollmentId: string) {
  "use server";
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: { status: "ACTIVE" },
  });
  revalidatePath("/admin/pembayaran");
}

// Server Action: tolak pembayaran (kembali ke PENDING_PAYMENT)
async function rejectPaymentAction(enrollmentId: string) {
  "use server";
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: { status: "PENDING_PAYMENT", bukti_bayar: null },
  });
  revalidatePath("/admin/pembayaran");
}

export default async function AdminPembayaranPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  const pendingEnrollments = await prisma.enrollment.findMany({
    where: { status: "PENDING_VERIFICATION" },
    include: {
      user: true,
      program: true,
    },
    orderBy: { tanggal_daftar: "asc" },
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Verifikasi Pembayaran
          </h1>
          <p className="text-silver-400 mt-1 font-medium">
            Siswa yang sudah upload bukti transfer dan menunggu persetujuan.
          </p>
        </div>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold"
          style={{
            background: "rgba(201,168,76,0.1)",
            borderColor: "rgba(201,168,76,0.3)",
            color: "#E8C97A",
          }}
        >
          <Clock className="w-4 h-4" />
          {pendingEnrollments.length} Menunggu
        </div>
      </div>

      {/* Empty state */}
      {pendingEnrollments.length === 0 && (
        <div
          className="p-16 rounded-3xl border text-center"
          style={{
            background: "rgba(28,36,68,0.5)",
            borderColor: "rgba(168,178,192,0.15)",
          }}
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: "rgba(201,168,76,0.1)" }}
          >
            <Users className="w-8 h-8 text-gold-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Semua Sudah Terverifikasi</h3>
          <p className="text-silver-400 font-medium">
            Tidak ada pembayaran yang menunggu verifikasi saat ini.
          </p>
        </div>
      )}

      {/* List */}
      <div className="space-y-6">
        {pendingEnrollments.map((enrollment) => (
          <div
            key={enrollment.id}
            className="p-6 rounded-3xl border"
            style={{
              background: "rgba(28,36,68,0.6)",
              borderColor: "rgba(201,168,76,0.2)",
            }}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Info Siswa */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl text-navy-700 bg-gold-gradient"
                  >
                    {enrollment.user.nama[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{enrollment.user.nama}</h3>
                    <p className="text-silver-400 text-sm font-medium">
                      WA: {enrollment.user.nomor_wa}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="p-3 rounded-xl border"
                    style={{
                      background: "rgba(20,26,51,0.5)",
                      borderColor: "rgba(168,178,192,0.1)",
                    }}
                  >
                    <p className="text-xs text-silver-500 font-medium mb-1">Program</p>
                    <p className="text-sm font-bold text-white">
                      {enrollment.program.nama_program}
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-xl border"
                    style={{
                      background: "rgba(20,26,51,0.5)",
                      borderColor: "rgba(168,178,192,0.1)",
                    }}
                  >
                    <p className="text-xs text-silver-500 font-medium mb-1">Biaya</p>
                    <p className="text-sm font-bold text-gold-400">
                      Rp {enrollment.program.harga.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div
                    className="col-span-2 p-3 rounded-xl border"
                    style={{
                      background: "rgba(20,26,51,0.5)",
                      borderColor: "rgba(168,178,192,0.1)",
                    }}
                  >
                    <p className="text-xs text-silver-500 font-medium mb-1">Tanggal Daftar</p>
                    <p className="text-sm font-bold text-white">
                      {new Date(enrollment.tanggal_daftar).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bukti Transfer */}
              <div className="lg:w-64 flex flex-col gap-4">
                <div>
                  <p className="text-sm font-semibold text-silver-300 mb-2">Bukti Transfer:</p>
                  {enrollment.bukti_bayar ? (
                    <div className="relative group">
                      <img
                        src={enrollment.bukti_bayar}
                        alt="Bukti Transfer"
                        className="w-full rounded-2xl border object-cover max-h-48"
                        style={{ borderColor: "rgba(201,168,76,0.3)" }}
                      />
                      <a
                        href={enrollment.bukti_bayar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "rgba(13,16,34,0.8)" }}
                      >
                        <ExternalLink className="w-4 h-4 text-gold-400" />
                      </a>
                    </div>
                  ) : (
                    <div
                      className="w-full h-32 rounded-2xl border flex items-center justify-center"
                      style={{
                        borderColor: "rgba(168,178,192,0.2)",
                        background: "rgba(20,26,51,0.5)",
                      }}
                    >
                      <p className="text-silver-500 text-sm font-medium">Belum ada bukti</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <form
                    action={async () => {
                      "use server";
                      await verifyPaymentAction(enrollment.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-navy-700 bg-gold-gradient transition-all hover:-translate-y-0.5"
                      style={{ boxShadow: "0 4px 16px rgba(201,168,76,0.3)" }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Verifikasi Pembayaran
                    </button>
                  </form>

                  <form
                    action={async () => {
                      "use server";
                      await rejectPaymentAction(enrollment.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm border transition-all hover:-translate-y-0.5"
                      style={{
                        borderColor: "rgba(200,50,50,0.4)",
                        background: "rgba(200,50,50,0.08)",
                        color: "#f87171",
                      }}
                    >
                      Tolak / Minta Upload Ulang
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
