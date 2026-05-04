"use server";

import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function uploadPaymentProofAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") {
    return { error: "Akses ditolak." };
  }

  const file = formData.get("bukti_bayar") as File;
  const enrollmentId = formData.get("enrollmentId") as string;

  if (!file || file.size === 0) {
    return { error: "Pilih file gambar bukti transfer terlebih dahulu." };
  }
  if (!enrollmentId) {
    return { error: "Data enrollment tidak ditemukan." };
  }

  // Validasi tipe & ukuran file (max 5MB)
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    return { error: "Format file harus JPG, PNG, atau WebP." };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: "Ukuran file maksimal 5MB." };
  }

  try {
    // Upload ke Supabase Storage bucket "payments"
    const supabase = createSupabaseServerClient();
    const fileName = `${session.userId}_${Date.now()}.${file.type.split("/")[1]}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("payments")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return { error: "Gagal mengupload gambar. Pastikan bucket 'payments' sudah dibuat di Supabase." };
    }

    // Ambil public URL
    const { data: urlData } = supabase.storage
      .from("payments")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    // Update enrollment: simpan URL & ubah status ke PENDING_VERIFICATION
    await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        bukti_bayar: publicUrl,
        status: "PENDING_VERIFICATION",
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Payment action error:", error);
    return { error: "Terjadi kesalahan. Silakan coba lagi." };
  }
}
