import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Scan, Eye, Smartphone, Globe, Zap, Shield } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { ProjectCard } from "@/components/ProjectCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { StatsSection } from "@/components/StatsSection";
import { FAQSection } from "@/components/FAQSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import heroImage from "@/assets/hero-villa.jpg";
import portfolioHotel from "@/assets/portfolio-hotel.jpg";
import portfolioApartment from "@/assets/portfolio-apartment.jpg";
import portfolioCoffee from "@/assets/hard-rock.jpg";
import portfolioMuseum from "@/assets/portfolio-museum.jpg";
import westwoodGym from "@/assets/westwood-gym-sandymount-1.jpg.webp";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { t } = useLanguage();

  const features = [
    {
      icon: Scan,
      title: t("Capture 3D Précise", "Precise 3D Capture"),
      description: t("Technologie intelligente pour une reproduction fidèle de chaque détail de votre espace.", "Smart technology for a faithful reproduction of every detail of your space."),
    },
    {
      icon: Eye,
      title: t("Immersion Totale", "Total Immersion"),
      description: t("Expérience de visite fluide et interactive permettant une exploration libre en 360°.", "Smooth and interactive tour experience allowing free 360° exploration."),
    },
    {
      icon: Smartphone,
      title: t("Compatible Tous Appareils", "All Devices Compatible"),
      description: t("Accès depuis n'importe quel navigateur, smartphone, tablette ou casque VR.", "Access from any browser, smartphone, tablet or VR headset."),
    },
    {
      icon: Globe,
      title: t("Partage Facile", "Easy Sharing"),
      description: t("Intégration simple sur votre site web et partage via un lien unique.", "Simple integration on your website and sharing via a unique link."),
    },
    {
      icon: Zap,
      title: t("Livraison Rapide", "Fast Delivery"),
      description: t("Traitement professionnel et livraison de votre visite virtuelle sous 24-48h.", "Professional processing and delivery of your virtual tour within 24-48h."),
    },
    {
      icon: Shield,
      title: t("Qualité Garantie", "Guaranteed Quality"),
      description: t("Résolution 4K, mesures précises et rendu photoréaliste de haute qualité.", "4K resolution, precise measurements and high quality photorealistic rendering."),
    },
  ];

  const projects = [
    { image: portfolioHotel, title: "Clayton Hotel Belfast", category: t("Hôtellerie", "Hospitality"), tourUrl: "https://my.matterport.com/show/?m=1aWQXDdxWnG" },
    { image: portfolioApartment, title: "Villa Ireland", category: t("Immobilier", "Real Estate"), tourUrl: "https://my.matterport.com/show/?m=t84zwhnXjvJ" },
    { image: portfolioCoffee, title: "Hard Rock Cafe", category: t("Restaurant", "Restaurant"), tourUrl: "https://my.matterport.com/show/?m=RMhsBq27hzy" },
    { image: westwoodGym, title: "Westwood Gym", category: t("Gym", "Gym"), tourUrl: "https://my.matterport.com/show/?m=8VnahNUYHfX" },
  ];

  const testimonials = [
    {
      content: t(
        "La visite virtuelle a transformé notre façon de vendre. Nos clients peuvent explorer les propriétés depuis chez eux, ce qui a augmenté nos ventes de 40%.",
        "The virtual tour has transformed the way we sell. Our clients can explore properties from home, which has increased our sales by 40%."
      ),
      author: "Ahmed Ben Ali",
      role: t("Directeur", "Director"),
      company: "Immobilière Tunisia",
      rating: 5,
    },
    {
      content: t(
        "Un service exceptionnel et un rendu professionnel. Notre hôtel reçoit maintenant des réservations de clients qui ont 'visité' virtuellement nos chambres.",
        "Exceptional service and professional rendering. Our hotel now receives bookings from clients who have virtually 'visited' our rooms."
      ),
      author: "Sarah Mansouri",
      role: t("Responsable Marketing", "Marketing Manager"),
      company: "Hôtel Majestic",
      rating: 5,
    },
    {
      content: t(
        "L'équipe est réactive et professionnelle. La qualité de la visite virtuelle a impressionné tous nos visiteurs et partenaires.",
        "The team is responsive and professional. The quality of the virtual tour has impressed all our visitors and partners."
      ),
      author: "Mohamed Gharbi",
      role: t("Conservateur", "Curator"),
      company: t("Galerie d'Art Contemporain", "Contemporary Art Gallery"),
      rating: 5,
    },
  ];

  return (
    <Layout>
      <WhatsAppButton />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={t("Villa de luxe avec visite virtuelle 3D", "Luxury villa with 3D virtual tour")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-24 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20">
                ✨ 
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight"
            >
              {t("Offrez la visite", "Offer the tour")}{" "}
              <span className="text-gradient-accent">{t("avant la réservation", "before the booking")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
            >
              {t(
                "Augmentez vos réservations et facilitez les visites grâce à nos visites virtuelles 3D.",
                "Increase your bookings and simplify visits with our 3D virtual tours."
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  {t("Demander un Devis", "Get a Quote")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary-foreground"
            />
          </div>
        </motion.div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Portfolio"
            title={t("Nos Dernières Réalisations", "Our Latest Projects")}
            description={t("Découvrez quelques-unes de nos visites virtuelles les plus récentes", "Discover some of our most recent virtual tours")}
          />

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={project.title} onClick={() => setSelectedProject(project)} className="cursor-pointer">
                <ProjectCard
                  image={project.image}
                  title={project.title}
                  category={project.category}
                  delay={index * 0.1}
                />
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <Link to="/portfolio" className="flex items-center gap-2">
                {t("Voir Tout le Portfolio", "View Full Portfolio")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={t("Nos Avantages", "Our Advantages")}
            title={t("Pourquoi Choisir PrimeSpace ?", "Why Choose PrimeSpace?")}
            description={t("Notre technologie offre une qualité inégalée pour vos visites virtuelles", "Our technology offers unmatched quality for your virtual tours")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Testimonials */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={t("Témoignages", "Testimonials")}
            title={t("Ce Que Disent Nos Clients", "What Our Clients Say")}
            description={t("Découvrez l'impact de nos visites virtuelles sur leur activité", "Discover the impact of our virtual tours on their business")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author}
                {...testimonial}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6"
            >
              {t("Prêt à Transformer Votre Espace?", "Ready to Transform Your Space?")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-foreground/70 mb-10"
            >
              {t(
                "Contactez-nous dès aujourd'hui pour un devis gratuit et découvrez comment nos visites virtuelles peuvent booster votre activité.",
                "Contact us today for a free quote and discover how our virtual tours can boost your business."
              )}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  {t("Demander un Devis Gratuit", "Get a Free Quote")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/services">{t("Découvrir Nos Services", "Discover Our Services")}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="font-display">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              src={selectedProject?.tourUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              allow="xr-spatial-tracking"
              className="w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Index;
