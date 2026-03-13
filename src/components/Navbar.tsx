import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, Building2, HardHat, Factory, ShieldCheck, Home, Plane, ShoppingCart, Building, Zap, Fuel, User } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/benefits", label: "Solutions", hasMega: true },
  { href: "/about", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

const megaIndustries = [
  { icon: Building2, label: "Immobilier Commercial", href: "/industries/commercial-real-estate" },
  { icon: HardHat, label: "Architecture & Construction", href: "/industries/architecture-construction" },
  { icon: Factory, label: "Industrie", href: "/industries/manufacturing" },
  { icon: ShieldCheck, label: "Assurance", href: "/industries/insurance" },
  { icon: Home, label: "Construction Résidentielle", href: "/industries/residential-construction" },
  { icon: Plane, label: "Tourisme & Hôtellerie", href: "/industries/travel-hospitality" },
  { icon: ShoppingCart, label: "Commerce & Retail", href: "/industries/commerce-retail" },
  { icon: Home, label: "Immobilier Résidentiel", href: "/industries/residential-real-estate" },
  { icon: Building, label: "Gouvernement", href: "/industries/government" },
  { icon: Zap, label: "Énergie & Utilités", href: "/industries/energy-utilities" },
  { icon: Fuel, label: "Pétrole & Gaz", href: "/industries/oil-gas" },
];

const megaRoles = [
  "Propriétaire",
  "Occupant Commercial",
  "Gestionnaire Immobilier",
  "Architecte",
  "Designer",
  "Professionnel Construction",
  "Facility Manager",
  "Agent Immobilier",
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const lightHero = location.pathname === "/industries/architecture-construction" || location.pathname === "/industries/commercial-real-estate" || location.pathname === "/industries/manufacturing" || location.pathname === "/industries/insurance" || location.pathname === "/industries/residential-construction" || location.pathname === "/industries/travel-hospitality" || location.pathname === "/industries/commerce-retail" || location.pathname === "/industries/residential-real-estate" || location.pathname === "/industries/government" || location.pathname === "/industries/energy-utilities" || location.pathname === "/industries/oil-gas";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMegaOpen(false);
    setMobileSolutionsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-card/95 backdrop-blur-lg shadow-elevated py-3"
          : lightHero
            ? "bg-transparent py-5"
            : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="PrimeSpace" className="w-10 h-10 rounded-xl object-contain" />
            <span className={cn(
              "font-display font-bold text-xl transition-colors",
              scrolled ? "text-foreground" : lightHero ? "text-foreground" : "text-primary-foreground"
            )}>
              PrimeSpace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.hasMega ? (
                <div key={link.href} className="relative" ref={megaRef}>
                  <button
                    onClick={() => setMegaOpen(!megaOpen)}
                    className={cn(
                      "font-medium transition-colors relative group flex items-center gap-1",
                      scrolled ? "text-foreground" : lightHero ? "text-foreground" : "text-primary-foreground",
                      location.pathname === link.href && (scrolled || lightHero ? "text-[#2c0a71]" : "text-[#b088f9]")
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", megaOpen && "rotate-180")} />
                    <span className={cn(
                      "absolute -bottom-1 left-0 h-0.5 transition-all duration-300",
                      scrolled || lightHero ? "bg-[#2c0a71]" : "bg-[#b088f9]",
                      location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </button>

                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[560px] bg-card rounded-2xl shadow-elevated border border-border p-8 z-50"
                      >
                        <div className="grid grid-cols-2 gap-8">
                          {/* For Your Industry */}
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Pour Votre Secteur</h4>
                            <div className="space-y-3">
                              {megaIndustries.map((item) => (
                                <Link
                                  key={item.label}
                                  to={item.href || "/benefits"}
                                  className="flex items-center gap-3 group/item"
                                  onClick={() => setMegaOpen(false)}
                                >
                                  <item.icon className="w-4 h-4 text-muted-foreground group-hover/item:text-[#2c0a71] transition-colors" />
                                  <span className="text-sm text-foreground group-hover/item:text-[#2c0a71] transition-colors">{item.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* For Your Role */}
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Pour Votre Rôle</h4>
                            <div className="space-y-3">
                              {megaRoles.map((role) => (
                                <Link
                                  key={role}
                                  to="/benefits"
                                  className="flex items-center gap-3 group/item"
                                  onClick={() => setMegaOpen(false)}
                                >
                                  <User className="w-4 h-4 text-muted-foreground group-hover/item:text-[#2c0a71] transition-colors" />
                                  <span className="text-sm text-foreground group-hover/item:text-[#2c0a71] transition-colors">{role}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "font-medium transition-colors relative group",
                    scrolled ? "text-foreground" : lightHero ? "text-foreground" : "text-primary-foreground",
                    location.pathname === link.href && (scrolled || lightHero ? "text-[#2c0a71]" : "text-[#b088f9]")
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 transition-all duration-300",
                    scrolled || lightHero ? "bg-[#2c0a71]" : "bg-[#b088f9]",
                    location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant={scrolled ? "secondary" : lightHero ? "secondary" : "hero"} size="default" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Demander un Devis
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-foreground hover:bg-muted" : lightHero ? "text-foreground hover:bg-muted" : "text-primary-foreground hover:bg-primary-foreground/10"
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                      className={cn(
                        "w-full flex items-center justify-between font-medium py-2 transition-colors",
                        location.pathname === link.href
                          ? "text-[#2c0a71] font-semibold"
                          : "text-foreground hover:text-[#2c0a71]"
                      )}
                    >
                      {link.label}
                      <ChevronDown className={cn("w-4 h-4 transition-transform", mobileSolutionsOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {mobileSolutionsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-2 pt-2 pb-3 space-y-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Pour Votre Secteur</p>
                              <div className="space-y-2">
                                {megaIndustries.map((item) => (
                                  <Link
                                    key={item.label}
                                    to={item.href || "/benefits"}
                                    className="flex items-center gap-2 py-1 text-sm text-foreground hover:text-[#2c0a71] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <item.icon className="w-4 h-4 text-muted-foreground" />
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Pour Votre Rôle</p>
                              <div className="space-y-2">
                                {megaRoles.map((role) => (
                                  <Link
                                    key={role}
                                    to="/benefits"
                                    className="flex items-center gap-2 py-1 text-sm text-foreground hover:text-[#2c0a71] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <User className="w-4 h-4 text-muted-foreground" />
                                    {role}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "font-medium py-2 transition-colors",
                      location.pathname === link.href
                        ? "text-[#2c0a71] font-semibold"
                        : "text-foreground hover:text-[#2c0a71]"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Button variant="secondary" className="mt-2 w-full" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Demander un Devis
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
