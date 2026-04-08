import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HomeTour {
  id: number;
  image: string;
  title: string;
  category: string;
  tourUrl: string;
}

const testimonials = [
  {
    content: "La visite virtuelle a transformé notre façon de vendre. Nos clients peuvent explorer les propriétés depuis chez eux, ce qui a augmenté nos ventes de 40%.",
    author: "Ahmed Ben Ali",
    role: "Directeur",
    company: "Immobilière Tunisia",
    rating: 5,
  },
  {
    content: "Un service exceptionnel et un rendu professionnel. Notre hôtel reçoit maintenant des réservations de clients qui ont 'visité' virtuellement nos chambres.",
    author: "Sarah Mansouri",
    role: "Responsable Marketing",
    company: "Hôtel Majestic",
    rating: 5,
  },
  {
    content: "L'équipe est réactive et professionnelle. La qualité de la visite virtuelle a impressionné tous nos visiteurs et partenaires.",
    author: "Mohamed Gharbi",
    role: "Conservateur",
    company: "Galerie d'Art Contemporain",
    rating: 5,
  },
];

const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<HomeTour | null>(null);
  const [projects, setProjects] = useState<HomeTour[]>([]);
  const { lang, t } = useI18n();
  const T = (obj: { fr: string; en: string }) => obj[lang];

  useEffect(() => {
    fetch(`${API_BASE}/api/tours`)
      .then((res) => res.json())
      .then((tours: any[]) => {
        setProjects(
          tours.slice(0, 4).map((t) => ({
            id: t.id,
            image: t.imageUrl || "/placeholder.svg",
            title: t.name,
            category: t.category || "",
            tourUrl: t.tourUrl || "",
          }))
        );
      })
      .catch(() => {});
  }, []);

  const features = [
    { icon: Scan, title: T(t.home.features.capture), description: T(t.home.features.captureDesc) },
    { icon: Eye, title: T(t.home.features.immersion), description: T(t.home.features.immersionDesc) },
    { icon: Smartphone, title: T(t.home.features.compatible), description: T(t.home.features.compatibleDesc) },
    { icon: Globe, title: T(t.home.features.sharing), description: T(t.home.features.sharingDesc) },
    { icon: Zap, title: T(t.home.features.delivery), description: T(t.home.features.deliveryDesc) },
    { icon: Shield, title: T(t.home.features.quality), description: T(t.home.features.qualityDesc) },
  ];

  return (
    <Layout>
      <WhatsAppButton />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/Boost_Buyer_Engagement_slow.gif"
            alt="Visite virtuelle 3D PrimeSpace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20 md:pt-24 pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-4 md:mb-6 backdrop-blur-sm border border-primary-foreground/20">
                ✨ 
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-primary-foreground mb-4 md:mb-6 leading-tight"
            >
              {T(t.home.heroTitle).split("**")[0]}
              <span className="text-gradient-accent">{T(t.home.heroTitle).split("**")[1]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto"
            >
              {T(t.home.heroSubtitle)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  {T(t.home.heroCta)}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
             {/* <Button variant="hero-outline" size="lg" className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Voir une Démo
              </Button>  */}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
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
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={T(t.home.portfolioBadge)}
            title={T(t.home.portfolioTitle)}
            description={T(t.home.portfolioDesc)}
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
                {T(t.home.viewPortfolio)}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={T(t.home.featuresBadge)}
            title={T(t.home.featuresTitle)}
            description="Notre technologie offre une qualité inégalée pour vos visites virtuelles"
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

      {/* Stats Section */}
      <StatsSection />

     

      {/* Testimonials */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={T(t.home.testimonialsBadge)}
            title={T(t.home.testimonialsTitle)}
            description="Découvrez l'impact de nos visites virtuelles sur leur activité"
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

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-4 md:mb-6"
            >
              {T(t.home.ctaTitle)}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-primary-foreground/70 mb-8 md:mb-10"
            >
              {T(t.home.ctaSubtitle)}
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
                  {T(t.home.ctaButton)}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/services">{T(t.home.ctaButton2)}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Matterport Tour Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="font-display">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full relative">
            <iframe
              src={selectedProject?.tourUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              allow="xr-spatial-tracking"
              className="w-full h-full"
            />
            {/* Overlay PrimeSpace branding over Matterport footer */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/90 to-transparent flex items-end justify-center pb-3 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-white/50">Powered by</span>
                <img src="/logo.jpg" alt="PrimeSpace" className="h-6 w-6 rounded-sm" />
                <span className="text-sm font-semibold text-white tracking-tight">PrimeSpace</span>
              </div>
            </div>
          </div>
          {selectedProject && (
            <div className="p-4 pt-2 text-center">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/view/${selectedProject.id}`}>
                  {lang === "fr" ? "Voir la visite complète" : "View full tour"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Index;
