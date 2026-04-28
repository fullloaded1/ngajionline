"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";

export async function createStudentAction(formData: FormData) {
  // Verifikasi role admin
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Akses ditolak. Anda bukan admin." };
  }

  const nama = formData.get("nama") as string;
  const nomor_wa = formData.get("nomor_wa") as string;
  const programId = formData.get("programId") as string;
  const passwordText = formData.get("password") as string;

  if (!nama || !nomor_wa || !programId || !passwordText) {
    return { error: "Semua kolom wajib diisi." };
  }

  try {
    // Cek apakah nomor WA sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { nomor_wa },
    });

    if (existingUser) {
      return { error: "Nomor WhatsApp ini sudah terdaftar." };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(passwordText, 10);

    // Buat User dan Enroll ke program sekaligus
    await prisma.user.create({
      data: {
        nama,
        nomor_wa,
        password: hashedPassword,
        role: "STUDENT",
        enrollments: {
          create: {
            programId,
            status: "ACTIVE",
          }
        }
      }
    });

    revalidatePath("/admin/siswa");
  } catch (error) {
    console.error(error);
    return { error: "Terjadi kesalahan pada sistem." };
  }

  // Redirect harus diletakkan di luar try-catch jika berhasil
  redirect("/admin/siswa");
}

export async function addGradeAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Akses ditolak." };
  }

  const studentId = formData.get("studentId") as string;
  const tanggal = formData.get("tanggal_pertemuan") as string;
  const topik = formData.get("topik_bahasan") as string;
  const nilaiStr = formData.get("nilai") as string;
  const catatan = formData.get("catatan_ustadz") as string;

  if (!studentId || !tanggal || !topik || !nilaiStr) {
    return { error: "Semua kolom bertanda bintang (*) wajib diisi." };
  }

  try {
    await prisma.learningRecord.create({
      data: {
        studentId,
        tanggal_pertemuan: new Date(tanggal),
        topik_bahasan: topik,
        nilai: parseInt(nilaiStr),
        catatan_ustadz: catatan || null,
      }
    });

    revalidatePath(`/admin/penilaian/${studentId}`);
  } catch (error) {
    console.error(error);
    return { error: "Terjadi kesalahan saat menyimpan nilai." };
  }

  redirect(`/admin/penilaian/${studentId}`);
}
