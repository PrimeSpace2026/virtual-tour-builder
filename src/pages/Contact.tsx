import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Send, Check, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Phone,
      title: t("Téléphone", "Phone"),
      value: "+353 89 498 5067",
      link: "tel:+353 89 498 5067",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@primespace.studio",
      link: "mailto:info@primespace.studio",
    },
    {
      icon: MapPin,
      title: t("Adresse", "Address"),
      value: "Tunis, Tunisie",
      link: null,
    },
    {
      icon: Clock,
      title: t("Horaires", "Hours"),
      value: t("Lun-Sam: 8h-18h", "Mon-Sat: 8am-6pm"),
      link: null,
    },
  ];

  const projectTypes = [
    t("Immobilier résidentiel", "Residential Real Estate"),
    t("Immobilier commercial", "Commercial Real Estate"),
    t("Hôtellerie & Tourisme", "Hospitality & Tourism"),
    t("Commerce & Retail", "Retail & Shopping"),
    t("Culture & Musées", "Culture & Museums"),
    t("Entreprise & Bureaux", "Business & Offices"),
    t("Restaurant & Événementiel", "Restaurant & Events"),
    t("Autre", "Other"),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: t("Message envoyé! ✅", "Message sent! ✅"),
      description: t("Nous vous répondrons dans les plus brefs délais.", "We will get back to you as soon as possible."),
    });
    setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <WhatsAppButton />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20"
            >
              {t("Contactez-Nous", "Contact Us")}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6"
            >
              {t("Parlons de Votre Projet", "Let's Talk About Your Project")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-primary-foreground/70"
            >
              {t(
                "Demandez un devis gratuit ou posez-nous vos questions. Notre équipe vous répond sous 24 heures.",
                "Request a free quote or ask us your questions. Our team responds within 24 hours."
              )}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                {t("Informations de Contact", "Contact Information")}
              </h2>
              
              <div className="space-y-6 mb-10">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{info.title}</h3>
                      {info.link ? (
                        <a href={info.link} className="text-muted-foreground hover:text-secondary transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-2xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  {t("Réponse Rapide", "Quick Response")}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("Besoin d'une réponse immédiate? Contactez-nous sur WhatsApp!", "Need an immediate response? Contact us on WhatsApp!")}
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <a
                    href="https://wa.me/00353894985067?text=Bonjour%2C%20je%20souhaite%20avoir%20plus%20d'informations%20sur%20vos%20services%20de%20visites%20virtuelles%203D."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    {t("Ouvrir WhatsApp", "Open WhatsApp")}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                  {t("Demande de Devis Gratuit", "Free Quote Request")}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("Nom Complet *", "Full Name *")}</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t("Votre nom", "Your name")} required className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t("votre@email.com", "your@email.com")} required className="h-12" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("Téléphone", "Phone")}</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+216 XX XXX XXX" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectType">{t("Type de Projet *", "Project Type *")}</Label>
                      <Select value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })} required>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={t("Sélectionnez un type", "Select a type")} />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("Décrivez votre projet *", "Describe your project *")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("Décrivez votre espace, sa superficie approximative, et vos besoins spécifiques...", "Describe your space, its approximate area, and your specific needs...")}
                      required
                      className="min-h-[150px] resize-none"
                    />
                  </div>

                  <Button type="submit" variant="secondary" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        {t("Envoi en cours...", "Sending...")}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t("Envoyer Ma Demande", "Send My Request")}
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-sm text-muted-foreground mt-6 text-center">
                  {t("En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.", "By submitting this form, you agree to be contacted by our team.")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={t("Localisation", "Location")}
            title={t("Basés à Tunis, Nous Intervenons Partout", "Based in Tunis, We Operate Everywhere")}
            description={t("Notre équipe se déplace sur tout le territoire tunisien pour vos projets", "Our team travels across all of Tunisia for your projects")}
          />
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4"
            >
              {t("Des Questions Fréquentes?", "Frequently Asked Questions?")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-primary-foreground/70 mb-6"
            >
              {t("Consultez notre FAQ pour trouver rapidement des réponses à vos questions", "Check our FAQ to quickly find answers to your questions")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="hero" asChild>
                <Link to="/#faq" className="flex items-center gap-2">
                  {t("Voir la FAQ", "View FAQ")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
