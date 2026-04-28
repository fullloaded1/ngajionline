import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/6281234567890?text=Halo%20Kalam,%20saya%20ingin%20bertanya%20tentang%20program%20ngaji%20online."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/30 hover:bg-green-600 hover:scale-110 transition-all duration-300"
      aria-label="Hubungi via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
