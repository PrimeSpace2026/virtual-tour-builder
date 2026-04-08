import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { SectionHeading } from "./SectionHeading";
import { useI18n } from "@/i18n";

export const FAQSection = () => {
  const { lang, t } = useI18n();
  const T = (obj: { fr: string; en: string }) => obj[lang];
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title={T(t.home.faqTitle)}
          description={lang === "fr" ? "Trouvez les réponses à vos questions sur nos services de visites virtuelles 3D" : "Find answers to your questions about our 3D virtual tour services"}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {t.home.faq.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl px-6 shadow-soft border-none"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-secondary py-5">
                  {T(faq.q)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {T(faq.a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
