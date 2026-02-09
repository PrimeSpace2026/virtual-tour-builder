import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatItem = ({ value, suffix, label, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-2">
        {count}
        <span className="text-secondary">{suffix}</span>
      </div>
      <p className="text-primary-foreground/70">{label}</p>
    </motion.div>
  );
};

export const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: 250, suffix: "+", label: t("Projets Réalisés", "Completed Projects") },
    { value: 98, suffix: "%", label: t("Clients Satisfaits", "Satisfied Clients") },
    { value: 10, suffix: "+", label: t("Années d'Expérience", "Years of Experience") },
    { value: 48, suffix: "h", label: t("Délai de Livraison", "Delivery Time") },
  ];

  return (
    <section className="bg-gradient-hero py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
