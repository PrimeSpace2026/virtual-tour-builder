import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ExternalLink, Filter } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import portfolioHotel from "@/assets/portfolio-hotel.jpg";
import portfolioApartment from "@/assets/portfolio-apartment.jpg";
import portfolioRetail from "@/assets/portfolio-retail.jpg";
import portfolioMuseum from "@/assets/portfolio-museum.jpg";
import portfolioRestaurant from "@/assets/portfolio-restaurant.jpg";
import portfolioOffice from "@/assets/portfolio-office.jpg";

const categories = [
  "Tous",
  "Immobilier",
  "Hôtellerie",
  "Commerce",
  "Culture",
  "Restaurant",
  "Entreprise",
];

const projects = [
  {
    id: 1,
    image: portfolioHotel,
    title: "Hôtel The Residence Tunis",
    category: "Hôtellerie",
    description: "Visite virtuelle complète de l'hôtel 5 étoiles avec chambres, lobby et espaces communs.",
    size: "2500 m²",
    tourUrl: "https://my.matterport.com/show/?m=t84zwhnXjvJ",
  },
  {
    id: 2,
    image: portfolioApartment,
    title: "Penthouse Lac 2",
    category: "Immobilier",
    description: "Appartement de luxe avec vue panoramique sur le lac. Visite 3D avec plans interactifs.",
    size: "280 m²",
    tourUrl: "https://my.matterport.com/show/?m=t84zwhnXjvJ",
  },
  {
    id: 3,
    image: portfolioRetail,
    title: "Boutique Mode Avenue",
    category: "Commerce",
    description: "Showroom de mode haut de gamme capturé pour expérience shopping virtuel.",
    size: "450 m²",
    tourUrl: "https://my.matterport.com/show/?m=t84zwhnXjvJ",
  },
  {
    id: 4,
    image: portfolioMuseum,
    title: "Galerie d'Art Contemporain",
    category: "Culture",
    description: "Exposition permanente digitalisée pour visites à distance et archives numériques.",
    size: "800 m²",
    tourUrl: "https://my.matterport.com/show/?m=t84zwhnXjvJ",
  },
  {
    id: 5,
    image: portfolioRestaurant,
    title: "Restaurant Le Méditerranéen",
    category: "Restaurant",
    description: "Capture de l'ambiance unique du restaurant pour prévisualisation et événements.",
    size: "320 m²",
    tourUrl: "https://my.matterport.com/show/?m=t84zwhnXjvJ",
  },
  {
    id: 6,
    image: portfolioOffice,
    title: "Siège Social TechCorp",
    category: "Entreprise",
    description: "Bureaux modernes capturés pour recrutement virtuel et visite clients.",
    size: "1200 m²",
    tourUrl: "https://my.matterport.com/show/?m=t84zwhnXjvJ",
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === "Tous"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
              Nos Réalisations
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6"
            >
              Portfolio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-primary-foreground/70"
            >
              Explorez nos visites virtuelles 3D réalisées pour des clients 
              dans toute la Tunisie et découvrez la qualité de notre travail.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                layout
                className="group rounded-2xl overflow-hidden bg-card shadow-soft hover:shadow-elevated transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="flex gap-3">
                      <Button variant="hero" size="sm" className="flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Explorer
                      </Button>
                    </div>
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground">
                    {project.category}
                  </span>
                </div>
                
                <div className="p-6">
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary font-medium">
                      {project.size}
                    </span>
                    <span className="text-sm text-foreground hover:text-secondary transition-colors flex items-center gap-1">
                      Voir la visite
                      <Play className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Aucun projet dans cette catégorie
              </h3>
              <p className="text-muted-foreground">
                Sélectionnez une autre catégorie ou contactez-nous pour un projet similaire.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Embedded Tour Demo */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Démo Interactive"
            title="Essayez Une Visite Virtuelle"
            description="Découvrez l'expérience immersive Matterport directement depuis cette page"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-elevated bg-primary/10 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Visite Virtuelle Interactive
                </h3>
                <p className="text-muted-foreground mb-6">
                  Cliquez pour charger une démonstration Matterport
                </p>
                <Button variant="secondary">
                  Charger la Visite
                </Button>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              💡 Astuce: Utilisez votre souris pour naviguer, la molette pour zoomer, 
              et cliquez sur les cercles pour vous déplacer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6"
            >
              Votre Espace Mérite D'être Vu
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-foreground/70 mb-10"
            >
              Rejoignez nos clients satisfaits et offrez une expérience unique 
              à vos visiteurs avec une visite virtuelle professionnelle.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Démarrer Mon Projet
                  <ArrowRight className="w-5 h-5" />
                </Link>
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

export default Portfolio;
