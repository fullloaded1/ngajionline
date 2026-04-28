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
    <section id="program" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-b from-primary-50 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Program Unggulan Kami</h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium">Pilih program yang sesuai dengan kebutuhan dan target belajar Anda. Semua kelas didesain khusus agar efektif dan terukur.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {programs.map((program, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-8 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 ${
                program.recommended 
                  ? 'bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl shadow-slate-900/30 scale-100 md:scale-105 z-10 border border-slate-700' 
                  : 'bg-white text-slate-900 border border-slate-200 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-500/10'
              }`}
            >
              {program.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-primary-500 to-teal-500 text-white text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-primary-500/30">
                    Paling Diminati
                  </div>
                </div>
              )}
              
              <div className="mb-8 mt-2">
                <h3 className={`text-2xl font-extrabold mb-3 ${program.recommended ? 'text-white' : 'text-slate-900'}`}>{program.name}</h3>
                <p className={`text-sm leading-relaxed ${program.recommended ? 'text-slate-300' : 'text-slate-500'} min-h-[60px]`}>{program.description}</p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl xl:text-5xl font-black tracking-tight whitespace-nowrap ${program.recommended ? 'bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400' : 'text-slate-900'}`}>{program.price}</span>
                  <span className={`text-sm font-bold ${program.recommended ? 'text-slate-400' : 'text-slate-400'}`}>{program.period}</span>
                </div>
              </div>

              <ul className="flex-1 space-y-5 mb-10">
                {program.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-4 text-sm font-medium">
                    <div className={`mt-0.5 rounded-full p-0.5 ${program.recommended ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-50 text-primary-500'}`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    </div>
                    <span className={program.recommended ? 'text-slate-200' : 'text-slate-700'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={`https://wa.me/6281234567890?text=Halo%20Kalam,%20saya%20ingin%20daftar%20program%20${program.name}.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-2xl text-center font-bold transition-all duration-300 ${
                  program.recommended
                    ? 'bg-gradient-to-r from-primary-500 to-teal-500 hover:from-primary-400 hover:to-teal-400 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40'
                    : 'bg-slate-50 hover:bg-primary-50 text-slate-900 hover:text-primary-700 border border-slate-200 hover:border-primary-200'
                }`}
              >
                Pilih Program Ini
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
