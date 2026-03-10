import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export const SectionHeading = ({
  badge,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "max-w-3xl mb-8 md:mb-12",
        centered && "mx-auto text-center"
      )}
    >
      {badge && (
        <span className={cn(
          "inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4",
          light 
            ? "bg-primary-foreground/10 text-primary-foreground" 
            : "bg-secondary/10 text-secondary"
        )}>
          {badge}
        </span>
      )}
      <h2 className={cn(
        "text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-3 md:mb-4",
        light ? "text-primary-foreground" : "text-foreground"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "text-base md:text-lg",
          light ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
};
