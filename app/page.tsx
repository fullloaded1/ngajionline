import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProgramSection from "@/components/ProgramSection";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <ProgramSection />
      <TestimonialSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
