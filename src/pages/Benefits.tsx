import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe,
  Ruler,
  ShieldCheck,
  Clock,
  Eye,
  Heart,
  Brain,
  Share2,
  Layout as LayoutIcon,
  Accessibility,
  Building2,
  Hotel,
  Store,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const benefits = [
  {
    icon: Globe,
    title: "Explore Anytime, Anywhere",
    description:
      "Visit the space remotely without travel or scheduling. Whether it's midnight or midday, the digital twin is always open for you.",
  },
  {
    icon: Ruler,
    title: "True Understanding of the Space",
    description:
      "Get accurate layouts, room sizes, and spatial flow — not just curated photos that hide the real picture.",
  },
  {
    icon: ShieldCheck,
    title: "More Confidence, Fewer Surprises",
    description:
      "What you see online closely matches the real space. Walk through every corner before you commit.",
  },
  {
    icon: Clock,
    title: "Save Time & Effort",
    description:
      "Shortlist faster and eliminate unnecessary physical visits. Focus only on spaces that truly match your needs.",
  },
  {
    icon: Eye,
    title: "Build Trust Through Transparency",
    description:
      "Nothing is hidden. Inspect every detail freely and feel confident that you're seeing the full picture.",
  },
  {
    icon: Heart,
    title: "Stronger Emotional Connection",
    description:
      "The immersive experience helps you imagine yourself in the space — picture your furniture, your life, your business there.",
  },
  {
    icon: Brain,
    title: "Better Decisions, Lower Risk",
    description:
      "Make informed choices with less uncertainty. Reduce the chance of regret by exploring thoroughly before deciding.",
  },
  {
    icon: Share2,
    title: "Easy to Share & Collaborate",
    description:
      "Share the digital twin instantly with family, partners, or stakeholders. Everyone can explore independently.",
  },
  {
    icon: LayoutIcon,
    title: "Plan & Visualize Ahead of Time",
    description:
      "Use measurements and detailed views to plan furniture placement, layouts, or renovations before moving in.",
  },
  {
    icon: Accessibility,
    title: "Accessible for Everyone",
    description:
      "Evaluate spaces without physical barriers or mobility limitations. Everyone gets equal access to explore.",
  },
];

const industries = [
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "Buyers and tenants can tour properties remotely, shortlist with confidence, and make faster decisions without multiple site visits.",
  },
  {
    icon: Hotel,
    title: "Hospitality",
    description:
      "Travelers can explore hotel rooms, lobbies, and amenities before booking, leading to higher satisfaction and fewer complaints.",
  },
  {
    icon: Store,
    title: "Retail",
    description:
      "Retail decision-makers can evaluate store layouts, foot traffic flow, and space potential without being on-site.",
  },
  {
    icon: Briefcase,
    title: "Commercial & Office",
    description:
      "Teams can assess office spaces collaboratively, measure areas for fit-out planning, and align stakeholders remotely.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Benefits = () => {
  return (
    <Layout>
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20"
            >
              Customer Benefits
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight"
            >
              See It. Feel It.{" "}
              <span className="text-gradient-accent">Decide with Confidence.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
            >
              Matterport digital twins let you explore any space remotely with full spatial accuracy — so you can make smarter decisions without stepping foot inside.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Why Customers Love It"
            title="Benefits That Make a Real Difference"
            description="Every benefit is designed around what matters most to you — clarity, confidence, and convenience."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="group p-6 rounded-2xl bg-card shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Industry Examples"
            title="How Customers Benefit Across Industries"
            description="From real estate to hospitality, digital twins empower customers in every sector."
          />

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300 flex gap-5"
              >
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center bg-accent/10 text-accent">
                  <industry.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                    {industry.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6"
            >
              Feel Informed. Feel Confident. Feel in Control.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-foreground/70 mb-10"
            >
              Matterport digital twins give you everything you need to evaluate, compare, and decide — all before your first physical visit.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/portfolio">Explore Our Portfolio</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Benefits;
