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
        "max-w-3xl mb-12",
        centered && "mx-auto text-center"
      )}
    >
      {badge && (
        <span className={cn(
          "inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4",
          light 
            ? "bg-primary-foreground/10 text-primary-foreground" 
            : "bg-secondary/10 text-secondary"
        )}>
          {badge}
        </span>
      )}
      <h2 className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4",
        light ? "text-primary-foreground" : "text-foreground"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "text-lg",
          light ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
};
