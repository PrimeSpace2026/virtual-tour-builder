import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const phoneNumber = "+21652664495";
  const message = encodeURIComponent("Bonjour, je souhaite avoir plus d'informations sur vos services de visites virtuelles 3D.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-elevated hover:scale-110 transition-transform duration-300"
      aria-label="Contacter via WhatsApp"
    >
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full" />
    </motion.a>
  );
};
