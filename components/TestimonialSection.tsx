import { Star, Quote } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pegawai Swasta",
      content: "Alhamdulillah, sejak ikut program Tahsin di Kalam, bacaan Al-Qur'an saya jadi jauh lebih baik. Ustadznya sangat sabar dan detail dalam mengoreksi makharijul huruf.",
      initial: "B"
    },
    {
      name: "Aisyah Putri",
      role: "Mahasiswi",
      content: "Jadwalnya fleksibel banget! Sangat cocok untuk saya yang jadwal kuliahnya padat. Fitur e-rapor juga sangat membantu melihat progres hafalan saya.",
      initial: "A"
    },
    {
      name: "Ahmad Rizki",
      role: "Wirausaha",
      content: "Platform ngaji online paling profesional yang pernah saya coba. Pelayanannya ramah, materi terstruktur, dan ustadznya sangat mumpuni. Sangat direkomendasikan!",
      initial: "A"
    }
  ];

  return (
    <section id="testimoni" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Apa Kata Mereka?</h2>
          <p className="text-lg text-slate-600">Kisah sukses dan pengalaman para santri yang telah belajar bersama kami di platform Kalam.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-100 -z-0" />
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-slate-700 mb-8 leading-relaxed relative z-10">
                "{testi.content}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-slate-50">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                  {testi.initial}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{testi.name}</h4>
                  <p className="text-sm text-slate-500">{testi.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
