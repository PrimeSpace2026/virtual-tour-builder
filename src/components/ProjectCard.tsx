import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { Button } from "./ui/button";

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  delay?: number;
}

export const ProjectCard = ({
  image,
  title,
  category,
  delay = 0,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        <span className="text-secondary text-sm font-medium mb-1">{category}</span>
        <h3 className="text-primary-foreground font-display font-semibold text-xl mb-4">{title}</h3>
        <div className="flex gap-3">
          <Button variant="hero" size="sm" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Voir la Visite
          </Button>
          <Button variant="hero-outline" size="sm">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Category badge */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground">
        {category}
      </div>
    </motion.div>
  );
};
