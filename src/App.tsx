import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
 import Portfolio from "./pages/Portfolio"; 
import About from "./pages/About";
import Contact from "./pages/Contact";
import Benefits from "./pages/Benefits";
import CommercialRealEstate from "./pages/CommercialRealEstate";
import ArchitectureConstruction from "./pages/ArchitectureConstruction";
import TravelHospitality from "./pages/Industries";
import Manufacturing from "./pages/Manufacturing";
import Insurance from "./pages/Insurance";
import ResidentialConstruction from "./pages/ResidentialConstruction";
import CommerceRetail from "./pages/CommerceRetail";
import ResidentialRealEstate from "./pages/ResidentialRealEstate";
import Government from "./pages/Government";
import EnergyUtilities from "./pages/EnergyUtilities";
import OilGas from "./pages/OilGas";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
         <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/industries/commercial-real-estate" element={<CommercialRealEstate />} />
          <Route path="/industries/architecture-construction" element={<ArchitectureConstruction />} />
          <Route path="/industries/travel-hospitality" element={<TravelHospitality />} />
          <Route path="/industries/manufacturing" element={<Manufacturing />} />
          <Route path="/industries/insurance" element={<Insurance />} />
          <Route path="/industries/residential-construction" element={<ResidentialConstruction />} />
          <Route path="/industries/commerce-retail" element={<CommerceRetail />} />
          <Route path="/industries/residential-real-estate" element={<ResidentialRealEstate />} />
          <Route path="/industries/government" element={<Government />} />
          <Route path="/industries/energy-utilities" element={<EnergyUtilities />} />
          <Route path="/industries/oil-gas" element={<OilGas />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
