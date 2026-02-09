import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { SectionHeading } from "./SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

export const FAQSection = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t("Qu'est-ce qu'une visite virtuelle 3D ?", "What is a 3D virtual tour?"),
      answer: t(
        "Une visite virtuelle est une expérience immersive qui permet aux visiteurs d'explorer un espace en 3D depuis n'importe quel appareil. Notre technologie capture chaque détail avec une précision exceptionnelle, créant une réplique numérique parfaite de votre espace.",
        "A virtual tour is an immersive experience that allows visitors to explore a space in 3D from any device. Our technology captures every detail with exceptional precision, creating a perfect digital replica of your space."
      ),
    },
    {
      question: t("Combien de temps prend la réalisation d'une visite virtuelle?", "How long does it take to create a virtual tour?"),
      answer: t(
        "Le temps de capture dépend de la taille de l'espace. En général, nous pouvons scanner jusqu'à 300m² en 2-3 heures. Le traitement et la livraison finale sont effectués sous 24 à 48 heures après la capture.",
        "Capture time depends on the space size. Generally, we can scan up to 300m² in 2-3 hours. Processing and final delivery are completed within 24 to 48 hours after capture."
      ),
    },
    {
      question: t("Quels types d'espaces pouvez-vous scanner?", "What types of spaces can you scan?"),
      answer: t(
        "Nous pouvons scanner tout type d'espace : appartements, villas, hôtels, restaurants, bureaux, commerces, musées, sites historiques, et bien plus. Notre technologie s'adapte à tous les environnements.",
        "We can scan any type of space: apartments, villas, hotels, restaurants, offices, shops, museums, historic sites, and more. Our technology adapts to all environments."
      ),
    },
    {
      question: t("Comment les visiteurs accèdent-ils à la visite virtuelle?", "How do visitors access the virtual tour?"),
      answer: t(
        "La visite virtuelle est hébergée en ligne et accessible via un simple lien. Elle fonctionne sur tous les navigateurs web, smartphones, tablettes et est même compatible avec les casques VR. Vous pouvez l'intégrer directement sur votre site web.",
        "The virtual tour is hosted online and accessible via a simple link. It works on all web browsers, smartphones, tablets and is even compatible with VR headsets. You can embed it directly on your website."
      ),
    },
    {
      question: t("Quels sont vos tarifs?", "What are your rates?"),
      answer: t(
        "Nos tarifs dépendent de la superficie à scanner et des options choisies (plans 2D/3D, photos HDR, etc.). Contactez-nous pour un devis personnalisé gratuit. Nous proposons également des forfaits pour les agences immobilières.",
        "Our rates depend on the area to scan and options chosen (2D/3D plans, HDR photos, etc.). Contact us for a free personalized quote. We also offer packages for real estate agencies."
      ),
    },
    {
      question: t("Couvrez-vous toute la Tunisie?", "Do you cover all of Tunisia?"),
      answer: t(
        "Oui, nous intervenons sur l'ensemble du territoire tunisien. Notre équipe est basée à Tunis mais se déplace partout pour vos projets. Des frais de déplacement peuvent s'appliquer selon la localisation.",
        "Yes, we operate across all of Tunisia. Our team is based in Tunis but travels everywhere for your projects. Travel fees may apply depending on location."
      ),
    },
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title={t("Questions Fréquentes", "Frequently Asked Questions")}
          description={t("Trouvez les réponses à vos questions sur nos services de visites virtuelles 3D", "Find answers to your questions about our 3D virtual tour services")}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl px-6 shadow-soft border-none"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-secondary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
