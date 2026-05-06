import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/6281234567890?text=Halo%20Kalaam,%20saya%20ingin%20bertanya%20tentang%20program%20ngaji%20online."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, #E8C97A 0%, #C9A84C 50%, #A07830 100%)',
        boxShadow: '0 8px 32px rgba(201,168,76,0.4), 0 0 0 1px rgba(201,168,76,0.3)',
      }}
      aria-label="Hubungi via WhatsApp"
    >
      <WhatsappLogo size={34} weight="duotone" style={{ color: '#1C2444' }} />
    </a>
  );
}
