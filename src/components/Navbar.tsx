import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, Building2, HardHat, Factory, ShieldCheck, Home, Plane, ShoppingCart, Building, Zap, Fuel } from "lucide-react";
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
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[340px] bg-card rounded-2xl shadow-elevated border border-border p-8 z-50"
                      >
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
            <a href="https://www.instagram.com/_primespacestudio_" target="_blank" rel="noopener noreferrer" className={cn("transition-colors hover:text-[#E1306C]", scrolled || lightHero ? "text-foreground" : "text-primary-foreground")}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@primespacestudio3d" target="_blank" rel="noopener noreferrer" className={cn("transition-colors hover:text-foreground", scrolled || lightHero ? "text-foreground" : "text-primary-foreground")}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.17V11.7a4.83 4.83 0 01-3.77-1.24V6.69z"/></svg>
            </a>
            <a href="https://www.facebook.com/primespacestudio" target="_blank" rel="noopener noreferrer" className={cn("transition-colors hover:text-[#1877F2]", scrolled || lightHero ? "text-foreground" : "text-primary-foreground")}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
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
              <div className="flex items-center gap-4 mt-4 justify-center">
                <a href="https://www.instagram.com/_primespacestudio_" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-[#E1306C] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@primespacestudio3d" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-foreground/70 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.17V11.7a4.83 4.83 0 01-3.77-1.24V6.69z"/></svg>
                </a>
                <a href="https://www.facebook.com/primespacestudio" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-[#1877F2] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
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
