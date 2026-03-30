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

const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    value: "+216 52 664 495",
    link: "tel:+21652664495",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@primespace.studio",
    link: "mailto:info@primespace.studio",
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "Tunis, Tunisie",
    link: null,
  },
  {
    icon: Clock,
    title: "Horaires",
    value: "Lun-Sam: 8h-18h",
    link: null,
  },
];

const projectTypes = [
  "Immobilier résidentiel",
  "Immobilier commercial",
  "Hôtellerie & Tourisme",
  "Commerce & Retail",
  "Culture & Musées",
  "Entreprise & Bureaux",
  "Restaurant & Événementiel",
  "Autre",
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Message envoyé! ✅",
          description: "Nous vous répondrons dans les plus brefs délais.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
        });
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Échec de l'envoi",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erreur",
        description: "Échec de l'envoi, veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <WhatsAppButton />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20"
            >
              Contactez-Nous
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-4 md:mb-6"
            >
              Parlons de Votre Projet
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-primary-foreground/70"
            >
              Demandez un devis gratuit ou posez-nous vos questions. 
              Notre équipe vous répond sous 24 heures.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                Informations de Contact
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
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-secondary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-muted/50 rounded-2xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Réponse Rapide
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Besoin d'une réponse immédiate? Contactez-nous sur WhatsApp!
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <a
                    href="https://wa.me/00353894985067?text=Bonjour%2C%20je%20souhaite%20avoir%20plus%20d'informations%20sur%20vos%20services%20de%20visites%20virtuelles%203D."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Ouvrir WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl p-5 md:p-8 shadow-soft">
                <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                  Demande de Devis Gratuit
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom Complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+216 XX XXX XXX"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Type de Projet *</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, projectType: value })
                        }
                        required
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Décrivez votre projet *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre espace, sa superficie approximative, et vos besoins spécifiques..."
                      required
                      className="min-h-[150px] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer Ma Demande
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-sm text-muted-foreground mt-6 text-center">
                  En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Localisation"
            title="Basés à Tunis, Nous Intervenons Partout"
            description="Notre équipe se déplace sur tout le territoire tunisien pour vos projets"
          />

        
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-hero rounded-2xl md:rounded-3xl p-6 md:p-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-3xl font-display font-bold text-primary-foreground mb-3 md:mb-4"
            >
              Des Questions Fréquentes?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-primary-foreground/70 mb-6"
            >
              Consultez notre FAQ pour trouver rapidement des réponses à vos questions
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="hero" asChild>
                <Link to="/#faq" className="flex items-center gap-2">
                  Voir la FAQ
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
