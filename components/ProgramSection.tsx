import { CheckCircle2 } from "lucide-react";

export default function ProgramSection() {
  const programs = [
    {
      name: "Dasar (Pemula)",
      description: "Pengenalan huruf Hijaiyah dan dasar membaca Al-Qur'an (Iqra/Dirosa).",
      price: "Rp 150.000",
      period: "/bulan",
      features: [
        "4x Pertemuan / bulan",
        "Durasi 60 Menit / sesi",
        "Kelas Private 1-on-1",
        "E-Rapor Perkembangan",
        "Grup Konsultasi WA"
      ],
      recommended: false
    },
    {
      name: "Menengah (Tahsin)",
      description: "Perbaikan makharijul huruf dan tajwid sesuai kaidah yang benar.",
      price: "Rp 250.000",
      period: "/bulan",
      features: [
        "8x Pertemuan / bulan",
        "Durasi 60 Menit / sesi",
        "Kelas Private 1-on-1",
        "Modul Materi Eksklusif",
        "E-Rapor Perkembangan",
        "Sertifikat Kelulusan"
      ],
      recommended: true
    },
    {
      name: "Lanjutan (Tahfidz)",
      description: "Setoran hafalan Al-Qur'an dan muraja'ah dengan target mutqin.",
      price: "Rp 350.000",
      period: "/bulan",
      features: [
        "12x Pertemuan / bulan",
        "Durasi 60 Menit / sesi",
        "Kelas Private 1-on-1",
        "Evaluasi Hafalan Rutin",
        "E-Rapor Perkembangan",
        "Sertifikat Sanad (Bagi yang lulus)"
      ],
      recommended: false
    }
  ];

  return (
    <section id="program" className="py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #141A33 0%, #1C2444 100%)' }}>
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }}></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border"
            style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
            Program Unggulan
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Program Unggulan Kami</h2>
          <p className="text-lg md:text-xl text-silver-300 font-medium">
            Pilih program yang sesuai dengan kebutuhan dan target belajar Anda. Semua kelas didesain khusus agar efektif dan terukur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
                program.recommended ? 'scale-105 z-10' : 'hover:-translate-y-2'
              }`}
              style={program.recommended ? {
                background: 'linear-gradient(145deg, rgba(40,52,90,0.95) 0%, rgba(28,36,68,0.98) 100%)',
                border: '1px solid rgba(201,168,76,0.5)',
                boxShadow: '0 20px 60px rgba(201,168,76,0.2), 0 0 0 1px rgba(201,168,76,0.3)',
              } : {
                background: 'rgba(20,26,51,0.7)',
                border: '1px solid rgba(168,178,192,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {program.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="text-navy-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md bg-gold-gradient">
                    Paling Diminati
                  </div>
                </div>
              )}
              
              <div className="mb-8 mt-4">
                <h3 className="text-2xl font-bold mb-3 text-white">{program.name}</h3>
                <p className="text-base font-medium leading-relaxed text-silver-300 min-h-[60px]">{program.description}</p>
              </div>

              <div className="mb-10">
                <div className="flex flex-wrap items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-extrabold tracking-tighter whitespace-nowrap text-gold-gradient">{program.price}</span>
                  <span className="text-sm font-semibold text-silver-400 whitespace-nowrap">{program.period}</span>
                </div>
              </div>

              <ul className="flex-1 space-y-5 mb-10">
                {program.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-base font-medium text-silver-200">
                    <div className="mt-0.5 rounded-full">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${program.recommended ? 'text-gold-400' : 'text-silver-400'}`} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/6281234567890?text=Halo%20Kalaam,%20saya%20ingin%20daftar%20program%20${program.name}.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 rounded-full text-center font-bold hover:-translate-y-1 transition-all duration-300 ${
                  program.recommended
                    ? 'text-navy-700 bg-gold-gradient'
                    : 'text-silver-200 border border-silver-400/30 hover:border-gold-400/50 hover:text-gold-300'
                }`}
                style={program.recommended ? { boxShadow: '0 8px 24px rgba(201,168,76,0.3)' } : {}}
              >
                Pilih Program Ini
              </a>
            </div>
          ))}
        </div>

        {/* ====== STRUKTUR PROGRAM KELAS ====== */}
        <div className="mt-28">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border"
              style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}
            >
              Jenjang Belajar
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Struktur Program Kelas
            </h2>
            <p className="text-lg md:text-xl text-silver-300 font-medium">
              Tersedia enam jenjang kelas yang dirancang sesuai usia dan kemampuan belajar.
            </p>
          </div>

          {/* Grid 6 Kartu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                level: 'LEVEL 1 · USIA 4–7 TAHUN',
                name: 'Kelas Iqra & Pra-Baca',
                desc: 'Pengenalan huruf hijaiyah, harakat dasar, dan hafalan doa harian',
                price: 'Rp 200–300rb / bulan',
                tags: ['Tersedia Online', 'Ramah Anak'],
              },
              {
                level: 'LEVEL 2 · USIA 7–12 TAHUN',
                name: 'Kelas Tartil Al-Qur\'an',
                desc: 'Membaca Al-Qur\'an dengan lancar, hafalan juz 30, dan tajwid dasar',
                price: 'Rp 300–400rb / bulan',
                tags: ['Tersedia Online', 'E-Rapor'],
              },
              {
                level: 'LEVEL 3 · REMAJA & DEWASA',
                name: 'Kelas Tahsin',
                desc: 'Perbaikan bacaan, makharijul huruf, dan hukum tajwid lengkap',
                price: 'Rp 400–500rb / bulan',
                tags: ['Bersertifikat', 'Tersedia Online'],
              },
              {
                level: 'LEVEL 4 · SEMUA USIA',
                name: 'Kelas Tahfidz',
                desc: 'Hafalan Al-Qur\'an dengan muraja\'ah terstruktur dan mutqin',
                price: 'Rp 500–700rb / bulan',
                tags: ['Bersertifikat', 'Evaluasi Rutin'],
              },
              {
                level: 'KELAS KHUSUS · DEWASA',
                name: 'Private Dewasa',
                desc: 'Sesi 1-on-1 fleksibel, jadwal menyesuaikan, progress cepat',
                price: 'Rp 600–900rb / bulan',
                tags: ['Jadwal Fleksibel', '1-on-1'],
              },
              {
                level: 'PROGRAM · SEMUA USIA',
                name: 'Kelas Intensif Ramadan',
                desc: 'Program khusus 30 hari, khatam Al-Qur\'an dan peningkatan spiritual',
                price: 'Rp 500rb / paket',
                tags: ['30 Hari', 'Khatam Qur\'an'],
              },
            ].map((kelas, i) => (
              <div
                key={i}
                className="flex flex-col p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 group cursor-default"
                style={{
                  background: 'rgba(20,26,51,0.7)',
                  border: '1px solid rgba(168,178,192,0.15)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Level badge */}
                <span
                  className="text-[10px] font-bold uppercase tracking-widest mb-4 block"
                  style={{ color: 'rgba(201,168,76,0.75)' }}
                >
                  {kelas.level}
                </span>

                {/* Nama kelas */}
                <h3 className="text-2xl font-bold text-white mb-3 leading-snug group-hover:text-gold-300 transition-colors">
                  {kelas.name}
                </h3>

                {/* Deskripsi */}
                <p className="text-base font-medium leading-relaxed flex-1 mb-6 text-silver-300">
                  {kelas.desc}
                </p>

                {/* Harga */}
                <span className="text-xl font-extrabold text-gold-gradient mb-4">
                  {kelas.price}
                </span>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {kelas.tags.map((tag, t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(201,168,76,0.08)',
                        border: '1px solid rgba(201,168,76,0.25)',
                        color: 'rgba(201,168,76,0.8)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ====== END STRUKTUR PROGRAM KELAS ====== */}

      </div>
    </section>
  );
}
