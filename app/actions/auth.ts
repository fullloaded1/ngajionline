"use server";

import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function loginAction(formData: FormData) {
  const nomor_wa = formData.get("whatsapp") as string;
  const password = formData.get("password") as string;

  if (!nomor_wa || !password) {
    return { error: "Nomor WhatsApp dan Kata Sandi wajib diisi." };
  }

  // 1. Cari user di database berdasarkan nomor WA
  const user = await prisma.user.findUnique({
    where: { nomor_wa },
  });

  if (!user) {
    return { error: "Akun tidak ditemukan. Silakan hubungi Admin." };
  }

  // 2. Verifikasi Password menggunakan bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { error: "Kata sandi salah. Silakan coba lagi." };
  }

  // 3. Buat JWT Session Token
  const sessionData = {
    userId: user.id,
    role: user.role,
    nama: user.nama,
  };

  const sessionToken = await encrypt(sessionData);

  // 4. Set cookie 'session'
  cookies().set("session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 Hari
  });

  // 5. Redirect ke dashboard
  redirect("/dashboard");
}

export async function logoutAction() {
  cookies().delete("session");
  redirect("/login");
}
