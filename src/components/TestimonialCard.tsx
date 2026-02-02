import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  delay?: number;
}

export const TestimonialCard = ({
  content,
  author,
  role,
  company,
  rating,
  delay = 0,
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300 relative"
    >
      <Quote className="absolute top-6 right-6 w-10 h-10 text-secondary/20" />
      
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-secondary fill-secondary" : "text-muted"
            }`}
          />
        ))}
      </div>
      
      <p className="text-foreground mb-6 leading-relaxed">{content}</p>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-secondary-foreground font-display font-bold">
          {author.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{author}</h4>
          <p className="text-sm text-muted-foreground">{role}, {company}</p>
        </div>
      </div>
    </motion.div>
  );
};
