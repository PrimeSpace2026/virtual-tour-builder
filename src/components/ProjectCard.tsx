import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  label?: string;
  delay?: number;
}

export const ProjectCard = ({
  image,
  title,
  category,
  label,
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
        {/* Play button — always visible */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
            <Play className="w-6 h-6 text-primary ml-0.5" fill="currentColor" />
          </div>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="text-center">
        {label && <span className="text-muted-foreground text-[11px] font-medium uppercase tracking-widest">{label}</span>}
        <h3 className="text-foreground font-display font-semibold text-lg mt-0.5">{title}</h3>
        <span className="text-secondary text-xs font-medium">{category}</span>
      </div>
    </motion.div>
  );
};
