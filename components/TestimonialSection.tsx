import { Star, Quote } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pegawai Swasta",
      content: "Alhamdulillah, sejak ikut program Tahsin di Kalaam, bacaan Al-Qur'an saya jadi jauh lebih baik. Ustadznya sangat sabar dan detail dalam mengoreksi makharijul huruf.",
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
    <section id="testimoni" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1C2444 0%, #0D1022 100%)' }}>
      {/* Top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border"
            style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
            Testimoni
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Apa Kata Mereka?</h2>
          <p className="text-lg md:text-xl font-medium text-silver-300">
            Kisah sukses dan pengalaman para santri yang telah belajar bersama kami di platform Kalaam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, idx) => (
            <div key={idx}
              className="p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 relative flex flex-col h-full"
              style={{
                background: 'rgba(20,26,51,0.7)',
                border: '1px solid rgba(168,178,192,0.15)',
                backdropFilter: 'blur(8px)',
              }}>
              <Quote className="absolute top-8 right-8 w-10 h-10 opacity-10"
                style={{ color: '#C9A84C' }} />
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-gold-400 fill-gold-400" />
                ))}
              </div>
              
              <p className="text-silver-200 font-medium mb-8 leading-relaxed relative z-10 text-lg flex-1">
                &quot;{testi.content}&quot;
              </p>
              
              <div className="flex items-center gap-4 relative z-10 pt-6 border-t mt-auto"
                style={{ borderColor: 'rgba(168,178,192,0.15)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl text-navy-700 bg-gold-gradient shadow-md">
                  {testi.initial}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{testi.name}</h4>
                  <p className="text-sm font-medium text-silver-400">{testi.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
