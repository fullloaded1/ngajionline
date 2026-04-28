import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding...');

  // 1. Buat 3 Program Utama
  const programDasar = await prisma.program.create({
    data: {
      nama_program: 'Dasar (Pemula)',
      deskripsi: 'Pengenalan huruf Hijaiyah dan dasar membaca Al-Qur\'an.',
      harga: 250000,
    },
  });

  const programMenengah = await prisma.program.create({
    data: {
      nama_program: 'Menengah (Tahsin)',
      deskripsi: 'Perbaikan makharijul huruf dan tajwid sesuai kaidah yang benar.',
      harga: 400000,
    },
  });

  const programLanjutan = await prisma.program.create({
    data: {
      nama_program: 'Lanjutan (Tahfidz)',
      deskripsi: 'Setoran hafalan Al-Qur\'an dan muraja\'ah dengan target mutqin.',
      harga: 600000,
    },
  });

  console.log('✅ Program berhasil dibuat.');

  // 2. Buat Akun Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      nama: 'Administrator Kalam',
      nomor_wa: '08000000000',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Akun Admin berhasil dibuat.');

  // 3. Buat Akun Siswa (Budi Santoso)
  const studentPassword = await bcrypt.hash('password123', 10);
  const budi = await prisma.user.create({
    data: {
      nama: 'Budi Santoso',
      nomor_wa: '08123456789',
      password: studentPassword,
      role: 'STUDENT',
    },
  });

  console.log('✅ Akun Siswa (Budi) berhasil dibuat.');

  // 4. Buat Pendaftaran (Enrollment) Budi ke Program Menengah
  await prisma.enrollment.create({
    data: {
      userId: budi.id,
      programId: programMenengah.id,
      status: 'ACTIVE',
    },
  });

  console.log('✅ Enrollment Budi ke program Menengah berhasil dibuat.');

  // 5. Buat 3 Learning Records (Riwayat Nilai) untuk Budi
  await prisma.learningRecord.create({
    data: {
      studentId: budi.id,
      tanggal_pertemuan: new Date('2026-04-10T10:00:00Z'),
      topik_bahasan: 'Pengenalan Sifat Huruf Hams',
      nilai: 85,
      catatan_ustadz: 'Alhamdulillah Budi cepat menangkap. Perlu dilatih lagi pelafalan huruf Ta dan Kaf agar lebih mengalir.',
    },
  });

  await prisma.learningRecord.create({
    data: {
      studentId: budi.id,
      tanggal_pertemuan: new Date('2026-04-17T10:00:00Z'),
      topik_bahasan: 'Makharijul Huruf: Rongga Tenggorokan',
      nilai: 88,
      catatan_ustadz: 'Pelafalan huruf Ha dan Kho sudah sangat tepat dan tebal.',
    },
  });

  await prisma.learningRecord.create({
    data: {
      studentId: budi.id,
      tanggal_pertemuan: new Date('2026-04-24T10:00:00Z'),
      topik_bahasan: 'Hukum Nun Mati & Tanwin (Idzhar)',
      nilai: 92,
      catatan_ustadz: 'MasyaAllah, bacaan Idzhar sudah sangat jelas tanpa dengung.',
    },
  });

  console.log('✅ 3 Riwayat Pembelajaran (E-Rapor) berhasil dibuat.');
  console.log('Seeding selesai!');
}

main()
  .catch((e) => {
    console.error('Terjadi kesalahan saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
