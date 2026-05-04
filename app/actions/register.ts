"use server";

import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function registerAction(formData: FormData) {
  const nama = (formData.get("nama") as string)?.trim();
  const nomor_wa = (formData.get("nomor_wa") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();
  const programId = formData.get("programId") as string;

  // Validasi input
  if (!nama || !nomor_wa || !password || !programId) {
    return { error: "Semua kolom wajib diisi." };
  }
  if (password.length < 6) {
    return { error: "Kata sandi minimal 6 karakter." };
  }
  if (nomor_wa.length < 10) {
    return { error: "Nomor WhatsApp tidak valid." };
  }

  try {
    // Cek duplikasi nomor WA
    const existing = await prisma.user.findUnique({ where: { nomor_wa } });
    if (existing) {
      return { error: "Nomor WhatsApp ini sudah terdaftar. Silakan login." };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru + enrollment dengan status PENDING_PAYMENT
    const user = await prisma.user.create({
      data: {
        nama,
        nomor_wa,
        password: hashedPassword,
        role: "STUDENT",
        enrollments: {
          create: {
            programId,
            status: "PENDING_PAYMENT",
          },
        },
      },
    });

    // Auto-login: buat session langsung
    const sessionToken = await encrypt({
      userId: user.id,
      role: user.role,
      nama: user.nama,
    });

    cookies().set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  } catch (error) {
    console.error("Register error:", error);
    return { error: "Terjadi kesalahan pada sistem. Coba lagi." };
  }

  // Redirect ke dashboard setelah berhasil
  redirect("/dashboard");
}
