import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ExternalLink, Filter, Loader2, MapPin, LayoutGrid } from "lucide-react";
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
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom flag marker
const createFlagIcon = (imageUrl: string) => {
  return L.divIcon({
    className: "custom-flag-marker",
    html: `
      <div style="position:relative;width:48px;height:62px;">
        <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;border:3px solid #D4A853;box-shadow:0 2px 8px rgba(0,0,0,0.3);background:#fff;">
          <img src="${imageUrl}" style="width:100%;height:100%;object-fit:cover;" />
        </div>
        <div style="width:3px;height:18px;background:#1a1a2e;margin:0 auto;border-radius:0 0 2px 2px;"></div>
      </div>
    `,
    iconSize: [48, 62],
    iconAnchor: [24, 62],
    popupAnchor: [0, -62],
  });
};

import portfolioHotel from "@/assets/portfolio-hotel.jpg";
import portfolioApartment from "@/assets/portfolio-apartment.jpg";
import portfolioRetail from "@/assets/portfolio-retail.jpg";
import portfolioMuseum from "@/assets/portfolio-museum.jpg";
import portfolioRestaurant from "@/assets/portfolio-restaurant1.png";
import portfolioOffice from "@/assets/portfolio-office.jpg";
import portfolioWedding from "@/assets/wedding-venue.png";

// Fallback images by category
const fallbackImages: Record<string, string> = {
  "Hôtellerie": portfolioHotel,
  "Immobilier": portfolioApartment,
  "Commerce": portfolioRetail,
  "Culture": portfolioMuseum,
  "Restaurant": portfolioRestaurant,
  "Entreprise": portfolioOffice,
  "Wedding venue": portfolioWedding,
};

// Component to expose map instance
const MapRef = ({ mapRef }: { mapRef: React.MutableRefObject<L.Map | null> }) => {
  const map = useMap();
  mapRef.current = map;
  return null;
};

interface Project {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  size: string;
  tourUrl: string;
  latitude: number | null;
  longitude: number | null;
  location: string;
}

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const mapRef = useRef<L.Map | null>(null);

  const fetchTours = () => {
    fetch("/api/tours")
      .then((res) => res.json())
      .then((tours) => {
        const mapped = tours.map((t: any) => ({
          id: t.id,
          image: t.imageUrl || fallbackImages[t.category] || portfolioHotel,
          title: t.name,
          category: t.category,
          description: t.description,
          size: t.surface ? `${t.surface} m²` : "",
          tourUrl: t.tourUrl || "",
          latitude: t.latitude,
          longitude: t.longitude,
          location: t.location || "",
        }));
        setProjects(mapped);
      })
      .catch((err) => console.error("Failed to fetch tours:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTours();
    const interval = setInterval(fetchTours, 5000);
    return () => clearInterval(interval);
  }, []);

  const allCategories = ["Tous", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = activeCategory === "Tous"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
              Nos Réalisations
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-4 md:mb-6"
            >
              Portfolio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-primary-foreground/70"
            >
              Explorez nos visites virtuelles 3D réalisées pour des clients 
              dans toute la Tunisie et découvrez la qualité de notre travail.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* View Toggle + Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 mb-8 md:mb-12"
          >
            {/* View Toggle */}
            <div className="flex gap-2 bg-muted rounded-full p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Grille
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === "map"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MapPin className="w-4 h-4" />
                Carte
              </button>
            </div>

            {/* Category Filter - only in grid mode */}
            {viewMode === "grid" && (
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
            </div>
            )}
          </motion.div>

          {/* Projects Grid or Map */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-secondary" />
            </div>
          ) : viewMode === "map" ? (
            /* Map View */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-soft" style={{ height: "500px" }}>
                <MapContainer
                  center={[34.5, 9.5]}
                  zoom={7}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <MapRef mapRef={mapRef} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredProjects
                    .filter((p) => p.latitude && p.longitude)
                    .map((project) => (
                      <Marker
                        key={project.id}
                        position={[project.latitude!, project.longitude!]}
                        icon={createFlagIcon(project.image)}
                      >
                        <Popup>
                          <div className="text-center">
                            <img src={project.image} alt={project.title} className="w-32 h-20 object-cover rounded mb-2" />
                            <strong>{project.title}</strong>
                            <br />
                            {project.location && (
                              <><span className="text-xs text-gray-600">{project.location}</span><br /></>
                            )}
                            <span className="text-xs">{project.category} • {project.size}</span>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                </MapContainer>
              </div>
              {/* Tour cards below map */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    className="flex items-center gap-3 p-3 rounded-xl bg-card shadow-soft cursor-pointer hover:shadow-elevated transition-all"
                    onClick={() => {
                      if (project.latitude && project.longitude && mapRef.current) {
                        mapRef.current.flyTo([project.latitude, project.longitude], 15, { duration: 1.5 });
                      }
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-foreground truncate">{project.title}</h4>
                      {project.location && (
                        <p className="text-xs text-secondary flex items-center gap-0.5 truncate">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          {project.location}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">{project.category}</p>
                      <p className="text-xs text-secondary font-medium">{project.size}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
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
                
                <div className="p-4 md:p-6">
                  <h3 className="font-display font-semibold text-lg md:text-xl text-foreground mb-2">
                    {project.title}
                  </h3>
                  {project.location && (
                    <p className="text-secondary text-sm mb-2 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location}
                    </p>
                  )}
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
          )}

          {/* Empty State */}
          {!loading && filteredProjects.length === 0 && (
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

     

      {/* CTA */}
      <section className="py-12 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-display font-bold text-primary-foreground mb-4 md:mb-6"
            >
              Votre Espace Mérite D'être Vu
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-primary-foreground/70 mb-8 md:mb-10"
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
