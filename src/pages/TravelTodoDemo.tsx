import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* ─── TravelTodo colors & font ─── */
const C = {
  brand: "#E53935",
  brandDark: "#C62828",
  dark: "#1a1a2e",
  text: "#4a4a4a",
  gray: "#757575",
  lightGray: "#bdbdbd",
  border: "#e0e0e0",
  bg: "#f5f5f5",
  white: "#FFFFFF",
  gold: "#FFB400",
  green: "#43A047",
};
const FONT = `'Poppins', 'Segoe UI', Arial, sans-serif`;

const TOUR_PATH = "/view/the-samuel-hotel-dublin";
const TRAVELTODO_LOGO = "https://www.traveltodo.com/dist/img/logo.png";
const TRAVELTODO_URL = "https://www.traveltodo.com/hotels-tunisie/korba/africa-jade-thalasso-1112.html";

const IMAGES = [
  "https://www.resabo.com/cr.fwk/images/hotels/Hotel-1876-20260330-123156.jpg",
  "https://www.resabo.com/cr.fwk/images/hotels/Hotel-1876-20221104-025212.jpg",
  "https://www.resabo.com/cr.fwk/images/hotels/Hotel-1876-20221104-025411.jpg",
  "https://www.resabo.com/cr.fwk/images/hotels/Hotel-1876-20221104-025356.jpg",
  "https://www.resabo.com/cr.fwk/images/hotels/Hotel-1876-20221104-025600.jpg",
  "https://www.resabo.com/cr.fwk/images/hotels/Hotel-1876-20221104-025642.jpg",
  "https://www.resabo.com/cr.fwk/images/hotels/Hotel-1876-20221104-025657.jpg",
];

const SERVICES = [
  { label: "Climatisation" },
  { label: "Téléphone avec ligne directe" },
  { label: "Restaurant" },
  { label: "Plage" },
  { label: "Club de remise en forme" },
  { label: "Coffre fort" },
  { label: "Centre d'affaires" },
  { label: "Massage" },
  { label: "Centre de remise en forme" },
  { label: "Piscine" },
  { label: "Télévision" },
];

const CHAMBRES = [
  "Chambre Standards (2 Pax)",
  "Chambre Standard Single",
  "Suite Junior (Max 2 Pax)",
  "Chambre Single Vue Mer",
  "Chambre Standards Vue Mer Partielle (2 Pax)",
  "Chambre Triple",
  "Chambre Quadruple 2AD + 2ENF",
];

const PENSIONS = [
  "Logement Petit Déjeuner",
  "Demi Pension",
  "Pension Complète",
];

export default function TravelTodoDemo() {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setImgIdx(i => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setImgIdx(i => (i + 1) % IMAGES.length);

  return (
    <div style={{ fontFamily: FONT, color: C.dark, backgroundColor: C.white, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* ═══ Lightbox ═══ */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={e => { e.stopPropagation(); setLightbox(null); }} className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 z-10"><X className="w-7 h-7" /></button>
          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + IMAGES.length) % IMAGES.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full hover:bg-white/20"><ChevronLeft className="w-8 h-8" /></button>
          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % IMAGES.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full hover:bg-white/20"><ChevronRight className="w-8 h-8" /></button>
          <img src={IMAGES[lightbox]} alt="" className="max-w-[90vw] max-h-[85vh] object-contain" onClick={e => e.stopPropagation()} />
          <div className="absolute bottom-4 text-white/70 text-sm">{lightbox + 1} / {IMAGES.length}</div>
        </div>
      )}

      {/* ═══ Navbar — TravelTodo style ═══ */}
      <nav className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: C.white }}>
        <div className="max-w-[1100px] mx-auto px-4 h-[64px] flex items-center justify-between">
          <a href="https://www.traveltodo.com" target="_blank" rel="noopener noreferrer">
            <img src={TRAVELTODO_LOGO} alt="Traveltodo" style={{ height: 32 }} />
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: C.dark }}>
            <span className="cursor-pointer hover:text-red-600">Séjour en Tunisie</span>
            <span className="cursor-pointer hover:text-red-600">Hôtels dans le monde</span>
            <span className="cursor-pointer hover:text-red-600">Voyages</span>
            <span className="cursor-pointer hover:text-red-600">Promos</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://api.whatsapp.com/send?phone=21670103103" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "#25D366" }}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.252-.149-2.838.744.744-2.838-.149-.252A8 8 0 1112 20z"/></svg>
            </a>
            <button className="w-9 h-9 border rounded-md flex items-center justify-center md:hidden" style={{ borderColor: C.border }}>
              <svg className="w-5 h-5" fill="none" stroke={C.dark} strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ Breadcrumb ═══ */}
      <div className="max-w-[1100px] mx-auto px-4 py-3 text-xs flex items-center gap-1" style={{ color: C.gray }}>
        <a href="https://www.traveltodo.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Accueil</a>
        <span>|</span>
        <a href="https://www.traveltodo.com/sejours-en-tunisie/hotels-tunisie/" target="_blank" rel="noopener noreferrer" className="hover:underline">Hôtels</a>
        <span>|</span>
        <span style={{ color: C.dark }}>Africa Jade Thalasso</span>
      </div>

      {/* ═══ Content ═══ */}
      <div className="max-w-[1100px] mx-auto px-4">

        {/* Title + location */}
        <div className="pb-4">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: C.dark }}>Africa Jade Thalasso</h1>
              <p className="text-sm mt-1 flex items-center gap-2" style={{ color: C.gray }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Korba, Tunisie — Station touristique
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-center px-3 py-1 rounded-lg" style={{ backgroundColor: C.green, color: C.white }}>
                <span className="text-lg font-bold">15</span><span className="text-xs">/20</span>
              </div>
              <span className="text-sm font-medium" style={{ color: C.dark }}>Adorable</span>
            </div>
          </div>
        </div>

        {/* Image Gallery Slider */}
        <div className="pb-4">
          <div className="relative rounded-xl overflow-hidden" style={{ height: 420 }}>
            <img src={IMAGES[imgIdx]} alt="Africa Jade Thalasso" className="w-full h-full object-cover cursor-pointer" onClick={() => setLightbox(imgIdx)} />
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" style={{ color: C.dark }} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center">
              <ChevronRight className="w-5 h-5" style={{ color: C.dark }} />
            </button>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full font-medium">{imgIdx + 1} / {IMAGES.length}</div>
          </div>
        </div>

        {/* ═══ Virtual Tour — PrimeSpace ═══ */}
        <div className="py-6 border-b" style={{ borderColor: C.border }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold" style={{ color: C.dark }}>
              🏠 Visite Virtuelle 3D — <span style={{ color: C.brand }}>PrimeSpace</span>
            </h3>
          </div>
          <div className="rounded-xl overflow-hidden border shadow-sm" style={{ borderColor: C.border }}>
            <div className="relative pb-[80vh] sm:pb-[56.25%]">
              <iframe
                src={TOUR_PATH}
                title="Visite 3D PrimeSpace — Africa Jade Thalasso"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="xr-spatial-tracking"
              />
            </div>
            <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: C.bg }}>
              <p className="text-xs" style={{ color: C.gray }}>Naviguez librement dans l'espace 3D</p>
              <a href={TOUR_PATH} target="_blank" rel="noopener noreferrer" className="text-xs font-bold px-4 py-1.5 rounded-md text-white hover:opacity-90 transition" style={{ backgroundColor: C.brand }}>
                Plein écran
              </a>
            </div>
          </div>
        </div>

        {/* ═══ Two column layout: content + booking sidebar ═══ */}
        <div className="flex flex-col lg:flex-row gap-8 py-6">

          {/* Left Column — Main content */}
          <div className="flex-1 min-w-0">

            {/* Services & Équipements */}
            <div className="pb-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: C.dark }}>Services & équipements</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICES.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg border" style={{ borderColor: C.border }}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke={C.brand} strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                    <span className="text-sm" style={{ color: C.dark }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hébergement */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-bold mb-3" style={{ color: C.dark }}>Hébergement</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text }}>
                Africa Jade Thalasso, c'est le premier hôtel de son genre en Tunisie. Un concept de vacances inédit dédié au tourisme tunisien, offrant un accueil spécial et personnalisé 24h/7j.
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text }}>
                Situé à Korba, le Africa Jade Thalasso se trouve au cœur d'un majestueux jardin de neuf hectares, bordé par une plage de sable blanc. Son architecture mauresque, son décor africain, et ses 257 chambres et suites offrent un séjour unique.
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text }}>
                Profitez d'une plage privée, de 3 piscines, et d'un centre de spa pour une expérience inoubliable. L'hôtel propose 257 chambres et suites bien pensées — des chambres standards, des suites juniors spacieuses avec coin salon, et des suites seniors avec une seconde chambre. Toutes avec balcons ou terrasses privées offrant des vues magnifiques.
              </p>
              <button className="text-sm font-semibold underline" style={{ color: C.brand }}>Lire la suite</button>
            </div>

            {/* Chambres */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: C.dark }}>Chambres</h3>
              <div className="space-y-2">
                {CHAMBRES.map((ch, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: C.border }}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke={C.gray} strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    <span className="text-sm" style={{ color: C.dark }}>{ch}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pensions */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: C.dark }}>Pensions</h3>
              <div className="flex flex-wrap gap-3">
                {PENSIONS.map((p, i) => (
                  <div key={i} className="px-4 py-2 rounded-full border text-sm font-medium" style={{ borderColor: C.brand, color: C.brand }}>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Avis */}
            <div className="py-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: C.dark }}>Avis</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center px-4 py-2 rounded-lg" style={{ backgroundColor: C.green, color: C.white }}>
                  <span className="text-2xl font-bold">15</span><span className="text-sm">/20</span>
                </div>
                <div>
                  <p className="font-semibold" style={{ color: C.dark }}>Adorable</p>
                  <p className="text-xs" style={{ color: C.gray }}>Basé sur 3963 avis</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {[
                  { label: "Voyageurs individuels", count: 305 },
                  { label: "Couples jeunes", count: 1134 },
                  { label: "Familles avec enfants", count: 1483 },
                  { label: "Familles avec ados", count: 352 },
                ].map((r, i) => (
                  <div key={i} className="border rounded-lg p-3" style={{ borderColor: C.border }}>
                    <p className="text-lg font-bold" style={{ color: C.dark }}>{r.count}</p>
                    <p className="text-xs mt-1" style={{ color: C.gray }}>{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Booking card */}
          <div className="w-full lg:w-[340px] flex-shrink-0">
            <div className="sticky top-[80px] border rounded-xl p-5 shadow-md" style={{ borderColor: C.border }}>
              <h3 className="text-base font-bold mb-1" style={{ color: C.dark }}>Vérifier la disponibilité</h3>
              <p className="text-xs mb-4" style={{ color: C.gray }}>Les prix peuvent augmenter — réservez maintenant!</p>

              <div className="border rounded-lg overflow-hidden mb-4" style={{ borderColor: C.border }}>
                <div className="grid grid-cols-2">
                  <div className="p-3 border-r" style={{ borderColor: C.border }}>
                    <p className="text-xs font-semibold" style={{ color: C.dark }}>Arrivée</p>
                    <p className="text-sm mt-0.5" style={{ color: C.gray }}>29/05/2026</p>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold" style={{ color: C.dark }}>Départ</p>
                    <p className="text-sm mt-0.5" style={{ color: C.gray }}>30/05/2026</p>
                  </div>
                </div>
                <div className="border-t p-3 flex items-center justify-between" style={{ borderColor: C.border }}>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: C.dark }}>Chambre & occupation</p>
                    <p className="text-sm mt-0.5" style={{ color: C.dark }}>1 chambre, 2 adultes</p>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke={C.gray} strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              <a href={TRAVELTODO_URL} target="_blank" rel="noopener noreferrer" className="block w-full py-3 rounded-lg text-white font-bold text-center text-sm transition hover:opacity-90" style={{ backgroundColor: C.brand }}>
                VÉRIFIER LA DISPONIBILITÉ
              </a>

              <div className="mt-4 space-y-2 text-xs" style={{ color: C.gray }}>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.green} strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                  <span>Annulation gratuite pour la plupart des hébergements</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.green} strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                  <span>Confirmation instantanée</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.green} strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                  <span>Paiement sécurisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Footer ═══ */}
      <footer className="mt-10 py-8" style={{ backgroundColor: C.dark }}>
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <img src={TRAVELTODO_LOGO} alt="Traveltodo" style={{ height: 28, filter: "brightness(10)" }} />
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/traveltodo.tn/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
              </a>
              <a href="https://www.instagram.com/traveltodo/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
            <p className="text-xs text-white/50">©2024 Traveltodo - Tous droits réservés.</p>
            <p className="text-xs text-white/50">Tél: +(216) 70 103 103</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
