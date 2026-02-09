import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { SectionHeading } from "./SectionHeading";

export const FAQSection = () => {
  const t = (fr: string) => fr;

  const faqs = [
    {
      question: t("Qu'est-ce qu'une visite virtuelle 3D ?"),
      answer: t(
        "Une visite virtuelle est une expérience immersive qui permet aux visiteurs d'explorer un espace en 3D depuis n'importe quel appareil. Notre technologie capture chaque détail avec une précision exceptionnelle, créant une réplique numérique parfaite de votre espace."
      ),
    },
    {
      question: t("Combien de temps prend la réalisation d'une visite virtuelle?"),
      answer: t(
        "Le temps de capture dépend de la taille de l'espace. En général, nous pouvons scanner jusqu'à 300m² en 2-3 heures. Le traitement et la livraison finale sont effectués sous 24 à 48 heures après la capture."
      ),
    },
    {
      question: t("Quels types d'espaces pouvez-vous scanner?"),
      answer: t(
        "Nous pouvons scanner tout type d'espace : appartements, villas, hôtels, restaurants, bureaux, commerces, musées, sites historiques, et bien plus. Notre technologie s'adapte à tous les environnements."
      ),
    },
    {
      question: t("Comment les visiteurs accèdent-ils à la visite virtuelle?"),
      answer: t(
        "La visite virtuelle est hébergée en ligne et accessible via un simple lien. Elle fonctionne sur tous les navigateurs web, smartphones, tablettes et est même compatible avec les casques VR. Vous pouvez l'intégrer directement sur votre site web."
      ),
    },
    {
      question: t("Quels sont vos tarifs?"),
      answer: t(
        "Nos tarifs dépendent de la superficie à scanner et des options choisies (plans 2D/3D, photos HDR, etc.). Contactez-nous pour un devis personnalisé gratuit. Nous proposons également des forfaits pour les agences immobilières."
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
