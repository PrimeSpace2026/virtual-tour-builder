import { motion } from "framer-motion";
import { Play } from "lucide-react";

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
      className="group flex flex-col items-center gap-4"
    >
      <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 ring-4 ring-border group-hover:ring-secondary">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <Play className="w-10 h-10 text-white drop-shadow-lg" />
        </div>
      </div>
      <div className="text-center">
        <span className="text-secondary text-xs font-medium uppercase tracking-wider">{category}</span>
        <h3 className="text-foreground font-display font-semibold text-lg mt-1">{title}</h3>
      </div>
    </motion.div>
  );
};
