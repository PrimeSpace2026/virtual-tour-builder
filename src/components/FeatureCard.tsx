import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  variant?: "default" | "glass";
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  variant = "default",
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group p-6 rounded-2xl transition-all duration-300",
        variant === "default" && "bg-card shadow-soft hover:shadow-elevated hover:-translate-y-1",
        variant === "glass" && "bg-glass border border-primary-foreground/10"
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300",
        variant === "default" && "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground",
        variant === "glass" && "bg-primary-foreground/10 text-primary-foreground"
      )}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className={cn(
        "font-display font-semibold text-xl mb-2",
        variant === "glass" ? "text-primary-foreground" : "text-foreground"
      )}>
        {title}
      </h3>
      <p className={cn(
        variant === "glass" ? "text-primary-foreground/70" : "text-muted-foreground"
      )}>
        {description}
      </p>
    </motion.div>
  );
};
