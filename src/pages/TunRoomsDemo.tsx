import { useState } from "react";
import {
  Star, MapPin, ChevronLeft, ChevronRight, Eye,
  X, Heart, Users, BedDouble, Bath, Home as HomeIcon, Wifi, Snowflake,
  Clock, ShieldCheck, Waves, Flame, Car, UtensilsCrossed, Tv,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─── TunRooms palette ─── */
const C = {
  primary: "#FF5A5F",
  dark: "#1a1a2e",
  text: "#484848",
  gray: "#767676",
  border: "#EBEBEB",
  bg: "#F7F7F7",
  white: "#FFFFFF",
  accent: "#008489",
};
const FONT = `'Poppins', 'Inter', Arial, sans-serif`;

const TOUR_PATH = "/view/la-perla-pieds-dans-l-eau";
const TUNROOMS_LOGO = "https://www.tunrooms.com/images/logos/logo.png?v=jcw9pU";
const TUNROOMS_URL = "https://www.tunrooms.com/rooms/11131";

/* ─── TunRooms Logo ─── */
const TunRoomsLogo = ({ height = 36 }: { height?: number }) => (
  <img src={TUNROOMS_LOGO} alt="TunRooms" style={{ height }} />
);

/* ─── Property images ─── */
const IMAGES = [
  "https://kabylis.tn/images/upload/fe39128b2da1746d42fc62fecce5a457.jpeg",
  "https://ucarecdn.com/c5c6dcfc-29e3-4f63-ba70-da58a5a861fc/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/87f9967b-2a7e-481e-ad65-e525c3c9f71b/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/994a698f-010a-419a-bb52-09fa9d61f3b3/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://www.tunrooms.com/images/rooms/11131/01777286923.jpg",
];

const DESC = `Magnifique villa S+4 climatisée située à Haouaria, parfaite pour des vacances inoubliables. Cette propriété luxueuse offre un confort exceptionnel avec un accès direct à la plage — les pieds dans l'eau.

Profitez d'une grande piscine privée, d'espaces de vie spacieux et lumineux, et d'une vue imprenable sur la mer. Idéale pour des séjours en famille ou entre amis dans un cadre paisible et exclusif.

La maison dispose de 4 chambres confortables, 5 salles de bains, une cuisine entièrement équipée et des espaces extérieurs généreux pour profiter du beau temps tunisien.`;

const EQUIP = [
  { icon: <Wifi className="w-4 h-4" />, label: "Essentials" },
  { icon: <Tv className="w-4 h-4" />, label: "TV" },
  { icon: <Flame className="w-4 h-4" />, label: "Hot Water" },
  { icon: <Snowflake className="w-4 h-4" />, label: "Climatisation / AC" },
  { icon: <Flame className="w-4 h-4" />, label: "Heating" },
  { icon: <UtensilsCrossed className="w-4 h-4" />, label: "Kitchen" },
  { icon: <Waves className="w-4 h-4" />, label: "Piscine" },
  { icon: <Eye className="w-4 h-4" />, label: "Pieds dans l'eau" },
  { icon: <Car className="w-4 h-4" />, label: "Parking" },
  { icon: <ShieldCheck className="w-4 h-4" />, label: "Quartier calme" },
];

const ROOMS = [
  { name: "Chambre 1", beds: "1 × Lit double" },
  { name: "Chambre 2", beds: "1 × Lit double" },
  { name: "Chambre 3", beds: "1 × Lit double" },
  { name: "Chambre 4", beds: "1 × Lit double" },
];

export default function TunRoomsDemo() {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [showAllEquip, setShowAllEquip] = useState(false);
  const [showAllDesc, setShowAllDesc] = useState(false);

  const prevImg = () => setLightbox(p => p !== null ? (p - 1 + IMAGES.length) % IMAGES.length : null);
  const nextImg = () => setLightbox(p => p !== null ? (p + 1) % IMAGES.length : null);

  return (
    <div style={{ fontFamily: FONT, color: C.dark, backgroundColor: C.white, minHeight: "100vh" }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* ═══ Lightbox ═══ */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={e => { e.stopPropagation(); setLightbox(null); }} className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 z-10"><X className="w-7 h-7" /></button>
          <button onClick={e => { e.stopPropagation(); prevImg(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full hover:bg-white/20"><ChevronLeft className="w-8 h-8" /></button>
          <button onClick={e => { e.stopPropagation(); nextImg(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full hover:bg-white/20"><ChevronRight className="w-8 h-8" /></button>
          <img src={IMAGES[lightbox]} alt="" className="max-w-[90vw] max-h-[85vh] object-contain" onClick={e => e.stopPropagation()} />
          <div className="absolute bottom-4 text-white/70 text-sm">{lightbox + 1} / {IMAGES.length}</div>
        </div>
      )}

      {/* ═══ TunRooms Navbar ═══ */}
      <nav style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.border}`, height: 70 }} className="sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <a href="https://www.tunrooms.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <TunRoomsLogo />
          </a>
          <div className="hidden md:flex items-center gap-5 text-sm" style={{ color: C.text }}>
            <a href="https://www.tunrooms.com" className="hover:underline" style={{ color: C.text }}>Accueil</a>
            <a href="https://www.tunrooms.com/about_us" className="hover:underline" style={{ color: C.text }}>À propos</a>
            <button className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: C.primary }}>Réserver</button>
          </div>
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </nav>

      {/* ═══ Title Bar ═══ */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-2 sm:pb-3">
        <h1 className="text-lg sm:text-2xl font-bold" style={{ color: C.dark }}>La Perla - Pieds dans l'eau</h1>
        <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" style={{ color: C.primary }} />
            <span className="font-semibold text-sm" style={{ color: C.dark }}>5</span>
            <span className="text-sm" style={{ color: C.gray }}>(9 Avis)</span>
          </div>
          <span style={{ color: C.gray }}>·</span>
          <span className="flex items-center gap-1 text-sm" style={{ color: C.dark }}>
            <MapPin className="w-3.5 h-3.5" />Haouaria, TN
          </span>
          <div className="ml-auto hidden sm:flex items-center gap-4">
            <button onClick={() => setSaved(!saved)} className="flex items-center gap-1.5 text-sm underline" style={{ color: C.dark }}>
              <Heart className={`w-4 h-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
              Coup De Coeur
            </button>
          </div>
        </div>
      </div>

      {/* ═══ Photo Grid ═══ */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pb-4 sm:pb-6 relative">
        <div className="sm:hidden rounded-xl overflow-hidden relative" style={{ height: 250 }}>
          <img src={IMAGES[0]} alt="" className="w-full h-full object-cover" onClick={() => setLightbox(0)} />
          <button onClick={() => setLightbox(0)} className="absolute right-3 bottom-3 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-medium" style={{ color: C.dark }}>
            {IMAGES.length} photos
          </button>
        </div>
        <div className="hidden sm:grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden" style={{ height: 420 }}>
          <div className="col-span-2 row-span-2 cursor-pointer overflow-hidden group" onClick={() => setLightbox(0)}>
            <img src={IMAGES[0]} alt="" className="w-full h-full object-cover group-hover:brightness-90 transition" />
          </div>
          {IMAGES.slice(1, 5).map((img, i) => (
            <div key={i} className="cursor-pointer overflow-hidden group" onClick={() => setLightbox(i + 1)}>
              <img src={img} alt="" className="w-full h-full object-cover group-hover:brightness-90 transition" />
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Virtual Tour — right below photos ═══ */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pb-4 sm:pb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold" style={{ color: C.dark }}>
            🏠 Visite Virtuelle 3D — <span style={{ color: C.primary }}>PrimeSpace</span>
          </h3>
          <span className="text-xs px-3 py-1 rounded-full font-semibold text-white" style={{ backgroundColor: C.accent }}>NOUVEAU</span>
        </div>
        <div className="rounded-xl overflow-hidden border" style={{ borderColor: C.border }}>
          <div className="tour-container relative">
            <style>{`.tour-container{padding-bottom:130vw}@media(min-width:640px){.tour-container{padding-bottom:75%}}@media(min-width:1024px){.tour-container{padding-bottom:56.25%}}`}</style>
            <iframe
              src={TOUR_PATH}
              title="Visite 3D PrimeSpace — La Perla"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="xr-spatial-tracking"
            />
          </div>
          <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: C.bg }}>
            <p className="text-xs" style={{ color: C.gray }}>Naviguez librement dans l'espace 3D · Cliquez et déplacez-vous</p>
            <a
              href={TOUR_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-1.5 rounded-lg text-white hover:opacity-90 transition"
              style={{ backgroundColor: C.primary }}
            >
              Plein écran
            </a>
          </div>
        </div>
      </div>

      {/* ═══ Main Content ═══ */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pb-20 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">

          {/* ── Left Column ── */}
          <div className="lg:col-span-2">

            {/* Property type info */}
            <div className="flex items-center justify-between py-4 sm:py-6 border-b" style={{ borderColor: C.border }}>
              <div>
                <h2 className="text-base sm:text-xl font-semibold" style={{ color: C.dark }}>Logement entier</h2>
                <p className="text-xs sm:text-sm mt-1" style={{ color: C.gray }}>8 Invités · 4 Chambres · 4 Lits · 5 Salles de bain</p>
              </div>
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden">
                <img src="https://www.tunrooms.com/images/users/10005/p7cpqi3zh3buf3hbpesi_225x225.jpeg" alt="Host" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Highlights */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: C.dark }}>Détails du logement</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: <HomeIcon className="w-5 h-5" />, label: "Maison" },
                  { icon: <Users className="w-5 h-5" />, label: "8 Membres" },
                  { icon: <BedDouble className="w-5 h-5" />, label: "4 Chambres" },
                  { icon: <BedDouble className="w-5 h-5" />, label: "4 Lits" },
                  { icon: <Bath className="w-5 h-5" />, label: "5 SdB / Privé" },
                  { icon: <Waves className="w-5 h-5" />, label: "Piscine" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.border }}>
                    <span style={{ color: C.primary }}>{item.icon}</span>
                    <span className="text-sm font-medium" style={{ color: C.dark }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h2 className="text-lg font-semibold mb-3" style={{ color: C.dark }}>Description</h2>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: C.text }}>
                {showAllDesc ? DESC : DESC.slice(0, 280) + "..."}
              </p>
              <button onClick={() => setShowAllDesc(!showAllDesc)} className="mt-2 text-sm font-semibold underline" style={{ color: C.primary }}>
                {showAllDesc ? "Voir moins" : "Voir plus"}
              </button>
            </div>

            {/* Couchages */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: C.dark }}>Couchages</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ROOMS.map((r, i) => (
                  <div key={i} className="border rounded-xl p-4 text-center" style={{ borderColor: C.border }}>
                    <BedDouble className="w-6 h-6 mx-auto mb-2" style={{ color: C.primary }} />
                    <p className="font-semibold text-sm" style={{ color: C.dark }}>{r.name}</p>
                    <p className="text-xs mt-1" style={{ color: C.gray }}>{r.beds}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Équipements */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: C.dark }}>Equipements</h3>
              <div className="grid grid-cols-2 gap-y-3">
                {(showAllEquip ? EQUIP : EQUIP.slice(0, 6)).map((eq, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm" style={{ color: C.text }}>
                    <span style={{ color: C.primary }}>{eq.icon}</span>
                    {eq.label}
                  </div>
                ))}
              </div>
              {EQUIP.length > 6 && (
                <button onClick={() => setShowAllEquip(!showAllEquip)} className="mt-4 text-sm font-semibold underline" style={{ color: C.primary }}>
                  {showAllEquip ? "Afficher moins" : `Afficher Tout ${EQUIP.length} Commodités`}
                </button>
              )}
            </div>

            {/* Règles */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: C.dark }}>Règles de la maison</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm" style={{ color: C.text }}>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" style={{ color: C.gray }} /><span>Check-in: 15:00</span></div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" style={{ color: C.gray }} /><span>Check-out: 11:00</span></div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4" style={{ color: C.gray }} /><span>Max 8 invités</span></div>
              </div>
              <div className="mt-4 p-3 rounded-lg text-xs" style={{ backgroundColor: C.bg, color: C.gray }}>
                <p>• Les événements ne sont pas acceptés</p>
                <p>• Les animaux ne sont pas acceptés</p>
                <p>• Les enfants doivent rester sous surveillance des parents</p>
              </div>
            </div>

            {/* Host */}
            <div className="py-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: C.dark }}>Hébergé par</h3>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img src="https://www.tunrooms.com/images/users/10005/p7cpqi3zh3buf3hbpesi_225x225.jpeg" alt="TunRooms Properties" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-base font-semibold" style={{ color: C.dark }}>TunRooms Properties</h4>
                  <div className="flex items-center gap-3 text-sm mt-1" style={{ color: C.gray }}>
                    <span>53 Avis</span>
                    <span>·</span>
                    <span>Vérifié</span>
                    <span>·</span>
                    <span>Rejoint Jan 2019</span>
                  </div>
                </div>
              </div>
              <a
                href="https://www.tunrooms.com/users/show/10005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-2.5 rounded-lg border font-medium text-sm hover:bg-gray-50 transition"
                style={{ borderColor: C.dark, color: C.dark }}
              >
                Voir Le Profil
              </a>
            </div>
          </div>

          {/* ── Right Sidebar — Booking Card ── */}
          <div className="hidden lg:block">
            <div className="rounded-xl border shadow-xl p-6 sticky top-24" style={{ borderColor: C.border, backgroundColor: C.white }}>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-xl font-bold" style={{ color: C.dark }}>TND 1 200</span>
                <span className="text-sm" style={{ color: C.gray }}>Par nuit</span>
              </div>
              <p className="text-sm mb-1" style={{ color: C.gray }}>+ TND 150 frais de nettoyage</p>
              <p className="text-xs mb-5" style={{ color: C.gray }}>Séjour minimum: 2 nuits</p>

              <div className="border rounded-xl overflow-hidden mb-4" style={{ borderColor: C.border }}>
                <div className="grid grid-cols-2">
                  <div className="p-3 border-r" style={{ borderColor: C.border }}>
                    <p className="text-[10px] font-bold uppercase" style={{ color: C.dark }}>Arrivée</p>
                    <p className="text-sm" style={{ color: C.gray }}>Ajouter</p>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-bold uppercase" style={{ color: C.dark }}>Départ</p>
                    <p className="text-sm" style={{ color: C.gray }}>Ajouter</p>
                  </div>
                </div>
                <div className="border-t p-3" style={{ borderColor: C.border }}>
                  <p className="text-[10px] font-bold uppercase" style={{ color: C.dark }}>Invités</p>
                  <p className="text-sm" style={{ color: C.gray }}>1 invité</p>
                </div>
              </div>

              <a
                href={TUNROOMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-lg text-white font-bold text-sm text-center transition hover:opacity-90"
                style={{ backgroundColor: C.primary }}
              >
                Demande De Réservation
              </a>
              <p className="text-center text-[10px] mt-2" style={{ color: C.gray }}>
                La reservation ne vous engage en rien
              </p>

              {/* 3D Tour CTA */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor: C.border }}>
                <button
                  onClick={() => navigate(TOUR_PATH)}
                  className="w-full py-3 rounded-lg text-white font-bold text-sm transition hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: C.accent }}
                >
                  <Eye className="w-4 h-4" />
                  Visite Virtuelle 3D
                </button>
                <p className="text-center text-xs mt-2" style={{ color: C.gray }}>
                  Propulsé par <span className="font-bold" style={{ color: C.primary }}>PrimeSpace</span>
                </p>
              </div>

              <div className="mt-4 pt-4 border-t text-center" style={{ borderColor: C.border }}>
                <p className="text-xs" style={{ color: C.gray }}>
                  4 chambres · 4 lits · 5 SdB · 8 invités
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Annonces Similaires ═══ */}
      <div style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: C.dark }}>Annonces Similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <a href="https://www.tunrooms.com/rooms/11131" target="_blank" rel="noopener noreferrer" className="group rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition" style={{ borderColor: C.border }}>
              <div className="relative h-48 overflow-hidden">
                <img src="https://www.tunrooms.com/images/rooms/11131/01777286923.jpg" alt="La Villa du Cap" className="w-full h-full object-cover group-hover:scale-105 transition" />
                <span className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full bg-white/90 font-medium" style={{ color: C.dark }}>Maison</span>
              </div>
              <div className="p-4">
                <p className="text-xs mb-1" style={{ color: C.gray }}>Bizerte, TN</p>
                <h3 className="text-sm font-semibold line-clamp-2 mb-2" style={{ color: C.dark }}>La Villa du Cap — Vue mer & Piscine à débordement</h3>
                <div className="flex items-center gap-2 text-xs mb-3" style={{ color: C.gray }}>
                  <span>8 invités</span><span>·</span><span>4 lits</span><span>·</span><span>3 SdB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm" style={{ color: C.dark }}>TND 1 200 <span className="font-normal text-xs" style={{ color: C.gray }}>/ Nuit</span></span>
                  <span className="text-xs px-3 py-1.5 rounded-lg text-white font-medium" style={{ backgroundColor: C.primary }}>Réserver</span>
                </div>
              </div>
            </a>
            {/* Card 2 */}
            <a href="https://www.tunrooms.com/rooms/14191" target="_blank" rel="noopener noreferrer" className="group rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition" style={{ borderColor: C.border }}>
              <div className="relative h-48 overflow-hidden">
                <img src="https://www.tunrooms.com/images/rooms/14191/01778931870.jpg" alt="Villa Sunset" className="w-full h-full object-cover group-hover:scale-105 transition" />
                <span className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full bg-white/90 font-medium" style={{ color: C.dark }}>Vue mer</span>
              </div>
              <div className="p-4">
                <p className="text-xs mb-1" style={{ color: C.gray }}>Metline, Bizerte</p>
                <h3 className="text-sm font-semibold line-clamp-2 mb-2" style={{ color: C.dark }}>Villa Sunset — Piscine & Vue Méditerranée</h3>
                <div className="flex items-center gap-2 text-xs mb-3" style={{ color: C.gray }}>
                  <span>6 invités</span><span>·</span><span>3 lits</span><span>·</span><span>4 SdB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm" style={{ color: C.dark }}>TND 1 200 <span className="font-normal text-xs" style={{ color: C.gray }}>/ Nuit</span></span>
                  <span className="text-xs px-3 py-1.5 rounded-lg text-white font-medium" style={{ backgroundColor: C.primary }}>Réserver</span>
                </div>
              </div>
            </a>
            {/* Card 3 */}
            <a href="https://www.tunrooms.com/s?location=Nabeul" target="_blank" rel="noopener noreferrer" className="group rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition" style={{ borderColor: C.border }}>
              <div className="relative h-48 overflow-hidden">
                <img src="https://www.tunrooms.com/images/rooms/11131/11726137922.jpg" alt="Locations Nabeul" className="w-full h-full object-cover group-hover:scale-105 transition" />
                <span className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full bg-white/90 font-medium" style={{ color: C.dark }}>Maison</span>
              </div>
              <div className="p-4">
                <p className="text-xs mb-1" style={{ color: C.gray }}>Nabeul, TN</p>
                <h3 className="text-sm font-semibold line-clamp-2 mb-2" style={{ color: C.dark }}>Découvrez plus de locations sur TunRooms</h3>
                <div className="flex items-center gap-2 text-xs mb-3" style={{ color: C.gray }}>
                  <span>Locations de vacances en Tunisie</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-3 py-1.5 rounded-lg text-white font-medium" style={{ backgroundColor: C.primary }}>Explorer</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ═══ Footer ═══ */}
      <footer style={{ backgroundColor: C.white, borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TunRoomsLogo />
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/Tunrooms/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
              <a href="https://www.instagram.com/tunrooms/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t text-xs" style={{ borderColor: C.border, color: C.gray }}>
            <a href="https://www.tunrooms.com/terms_of_service" target="_blank" rel="noopener noreferrer" className="hover:underline">Conditions Générales</a>
            <a href="https://www.tunrooms.com/privacy_policy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
            <span>© Tunrooms, Inc.</span>
          </div>
        </div>
      </footer>

      {/* ═══ Bottom Sticky Bar (mobile) ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t shadow-lg" style={{ backgroundColor: C.white, borderColor: C.border }}>
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <span className="font-bold" style={{ color: C.dark }}>TND 1 200 / Nuit</span>
            <p className="text-xs" style={{ color: C.gray }}>Haouaria · 8 Invités</p>
          </div>
          <a
            href={TUNROOMS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-white font-bold text-sm"
            style={{ backgroundColor: C.primary }}
          >
            Réserver
          </a>
        </div>
      </div>
    </div>
  );
}
