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
    <section id="program" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Program Unggulan Kami</h2>
          <p className="text-lg text-slate-600">Pilih program yang sesuai dengan kebutuhan dan target belajar Anda. Semua kelas didesain khusus agar efektif dan terukur.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
                program.recommended 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-100 md:scale-105 z-10' 
                  : 'bg-white text-slate-900 border border-slate-200 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/5'
              }`}
            >
              {program.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                    Paling Diminati
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${program.recommended ? 'text-white' : 'text-slate-900'}`}>{program.name}</h3>
                <p className={`text-sm ${program.recommended ? 'text-slate-300' : 'text-slate-500'} min-h-[40px]`}>{program.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{program.price}</span>
                  <span className={`text-sm font-medium ${program.recommended ? 'text-slate-400' : 'text-slate-500'}`}>{program.period}</span>
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {program.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm font-medium">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${program.recommended ? 'text-primary-400' : 'text-primary-500'}`} />
                    <span className={program.recommended ? 'text-slate-200' : 'text-slate-700'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={`https://wa.me/6281234567890?text=Halo%20Kalam,%20saya%20ingin%20daftar%20program%20${program.name}.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-xl text-center font-semibold transition-colors ${
                  program.recommended
                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                    : 'bg-slate-50 hover:bg-primary-50 text-slate-900 hover:text-primary-700 border border-slate-200 hover:border-primary-200'
                }`}
              >
                Pilih Program
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
