import { useState } from "react";
import {
  Star, MapPin, ChevronLeft, ChevronRight, Eye,
  X, Heart, Users, BedDouble, Bath, Home as HomeIcon, Wifi, Snowflake,
  Clock, ShieldCheck, Waves, TreePalm, Car, UtensilsCrossed,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─── Superhost palette ─── */
const C = {
  coral: "#FF5A5F",
  dark: "#1a1a2e",
  text: "#333333",
  gray: "#767676",
  border: "#e8e8e8",
  bg: "#f9f9f9",
  white: "#FFFFFF",
  accent: "#FF5A5F",
};
const FONT = `'Poppins', 'Inter', Arial, sans-serif`;

const TOUR_PATH = "/view/la-perla-pieds-dans-l-eau";
const SUPERHOST_LOGO = "https://superhost.com.tn/assets/miniLogo-BMsTPNSh.svg";
const SUPERHOST_URL = "https://kabylis.tn/rooms/la-perla---pieds-dans-l'eau-883?&guests=1";

/* ─── Property images ─── */
const IMAGES = [
  "https://orpnrybtrnuqxfkrrnvx.supabase.co/storage/v1/object/public/tour-images/la-perla-1.jpg",
  "https://orpnrybtrnuqxfkrrnvx.supabase.co/storage/v1/object/public/tour-images/la-perla-2.jpg",
  "https://orpnrybtrnuqxfkrrnvx.supabase.co/storage/v1/object/public/tour-images/la-perla-3.jpg",
  "https://orpnrybtrnuqxfkrrnvx.supabase.co/storage/v1/object/public/tour-images/la-perla-4.jpg",
  "https://orpnrybtrnuqxfkrrnvx.supabase.co/storage/v1/object/public/tour-images/la-perla-5.jpg",
];

const DESC = `Magnifique villa S+4 climatisée située à Haouaria, parfaite pour des vacances inoubliables. Cette propriété luxueuse offre un confort exceptionnel avec un accès direct à la plage — les pieds dans l'eau.

Profitez d'une grande piscine privée, d'espaces de vie spacieux et lumineux, et d'une vue imprenable sur la mer. Idéale pour des séjours en famille ou entre amis dans un cadre paisible et exclusif.

La maison dispose de 4 chambres confortables, 5 salles de bains, une cuisine entièrement équipée et des espaces extérieurs généreux pour profiter du beau temps tunisien.`;

const EQUIP = [
  { icon: <Snowflake className="w-4 h-4" />, label: "Climatiseur" },
  { icon: <UtensilsCrossed className="w-4 h-4" />, label: "Cuisine équipée" },
  { icon: <Waves className="w-4 h-4" />, label: "Piscine" },
  { icon: <Eye className="w-4 h-4" />, label: "Pieds dans l'eau" },
  { icon: <Bath className="w-4 h-4" />, label: "5 Salles de bains" },
  { icon: <BedDouble className="w-4 h-4" />, label: "4 Chambres Queen" },
  { icon: <ShieldCheck className="w-4 h-4" />, label: "Quartier calme" },
  { icon: <Car className="w-4 h-4" />, label: "Parking" },
];

const ROOMS = [
  { name: "Chambre 1", beds: "1 × Queen" },
  { name: "Chambre 2", beds: "1 × Queen" },
  { name: "Chambre 3", beds: "1 × Queen" },
  { name: "Chambre 4", beds: "1 × Queen" },
];

export default function SuperhostDemo() {
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

      {/* ═══ Superhost Navbar ═══ */}
      <nav style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.border}`, height: 70 }} className="sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <a href="https://superhost.com.tn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <img src={SUPERHOST_LOGO} alt="SuperHost" style={{ height: 36 }} />
            <span className="font-bold text-lg" style={{ color: C.dark }}>SuperHost</span>
          </a>
          <div className="hidden md:flex items-center gap-5 text-sm" style={{ color: C.text }}>
            <a href="https://superhost.com.tn" className="hover:underline" style={{ color: C.text }}>Accueil</a>
            <a href="https://superhost.com.tn/blogs" className="hover:underline" style={{ color: C.text }}>Blog</a>
            <button className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: C.coral }}>Réserver</button>
          </div>
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </nav>

      {/* ═══ Title Bar ═══ */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-2 sm:pb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs px-2 py-0.5 rounded-full font-medium text-white" style={{ backgroundColor: C.coral }}>Superhost Exclusive</span>
        </div>
        <h1 className="text-lg sm:text-2xl font-bold" style={{ color: C.dark }}>La Perla - Pieds dans l'eau</h1>
        <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" style={{ color: C.coral }} />
            <span className="font-semibold text-sm" style={{ color: C.dark }}>4</span>
            <span className="text-sm" style={{ color: C.gray }}>(2 avis)</span>
          </div>
          <span style={{ color: C.gray }}>·</span>
          <span className="flex items-center gap-1 text-sm" style={{ color: C.dark }}>
            <MapPin className="w-3.5 h-3.5" />Haouaria, TN
          </span>
          <span style={{ color: C.gray }}>·</span>
          <span className="text-sm" style={{ color: C.gray }}>House</span>
          <span style={{ color: C.gray }}>·</span>
          <span className="text-sm" style={{ color: C.gray }}>8 Invités</span>
          <div className="ml-auto hidden sm:flex items-center gap-4">
            <button onClick={() => setSaved(!saved)} className="flex items-center gap-1.5 text-sm underline" style={{ color: C.dark }}>
              <Heart className={`w-4 h-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
              Sauvegarder
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
            🏠 Visite Virtuelle 3D — <span style={{ color: C.coral }}>PrimeSpace</span>
          </h3>
          <span className="text-xs px-3 py-1 rounded-full font-semibold text-white" style={{ backgroundColor: "#00A699" }}>NOUVEAU</span>
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
              style={{ backgroundColor: C.coral }}
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

            {/* Host info */}
            <div className="flex items-center justify-between py-4 sm:py-6 border-b" style={{ borderColor: C.border }}>
              <div>
                <h2 className="text-base sm:text-xl font-semibold" style={{ color: C.dark }}>House hébergé par Kabylis</h2>
                <p className="text-xs sm:text-sm mt-1" style={{ color: C.gray }}>8 voyageurs · 4 chambres · 4 lits · 5 salles de bains</p>
              </div>
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                K
              </div>
            </div>

            {/* Highlights */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: C.dark }}>Highlights</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: <Waves className="w-5 h-5" />, label: "Pieds dans l'eau" },
                  { icon: <Waves className="w-5 h-5" />, label: "Piscine" },
                  { icon: <Snowflake className="w-5 h-5" />, label: "Climatiseur" },
                  { icon: <HomeIcon className="w-5 h-5" />, label: "Villa S+4" },
                  { icon: <UtensilsCrossed className="w-5 h-5" />, label: "Cuisine équipée" },
                  { icon: <ShieldCheck className="w-5 h-5" />, label: "Quartier calme" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.border }}>
                    <span style={{ color: C.coral }}>{item.icon}</span>
                    <span className="text-sm font-medium" style={{ color: C.dark }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h2 className="text-lg font-semibold mb-3" style={{ color: C.dark }}>About the property</h2>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: C.text }}>
                {showAllDesc ? DESC : DESC.slice(0, 280) + "..."}
              </p>
              <button onClick={() => setShowAllDesc(!showAllDesc)} className="mt-2 text-sm font-semibold underline" style={{ color: C.coral }}>
                {showAllDesc ? "See Less" : "See More"}
              </button>
            </div>

            {/* Rooms */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: C.dark }}>Chambres</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ROOMS.map((r, i) => (
                  <div key={i} className="border rounded-xl p-4 text-center" style={{ borderColor: C.border }}>
                    <BedDouble className="w-6 h-6 mx-auto mb-2" style={{ color: C.coral }} />
                    <p className="font-semibold text-sm" style={{ color: C.dark }}>{r.name}</p>
                    <p className="text-xs mt-1" style={{ color: C.gray }}>{r.beds}</p>
                  </div>
                ))}
              </div>
            </div>


            {/* Équipements */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: C.dark }}>Features</h3>
              <div className="grid grid-cols-2 gap-y-3">
                {(showAllEquip ? EQUIP : EQUIP.slice(0, 6)).map((eq, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm" style={{ color: C.text }}>
                    <span style={{ color: C.coral }}>{eq.icon}</span>
                    {eq.label}
                  </div>
                ))}
              </div>
              {EQUIP.length > 6 && (
                <button onClick={() => setShowAllEquip(!showAllEquip)} className="mt-4 text-sm font-semibold underline" style={{ color: C.coral }}>
                  {showAllEquip ? "Afficher moins" : `Voir tous les équipements (${EQUIP.length})`}
                </button>
              )}
            </div>

            {/* House Rules */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: C.dark }}>House rules</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm" style={{ color: C.text }}>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" style={{ color: C.gray }} /><span>Check-in: 15h00</span></div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" style={{ color: C.gray }} /><span>Check-out: Avant 11:00</span></div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4" style={{ color: C.gray }} /><span>Max 11 guests</span></div>
              </div>
              <div className="mt-4 p-3 rounded-lg text-xs" style={{ backgroundColor: C.bg, color: C.gray }}>
                <p>• A valid ID will be required upon arrival</p>
                <p>• A security deposit may be required</p>
                <p>• Please respect the neighbors' peace, especially after 10:00 PM</p>
              </div>
            </div>

            {/* Host */}
            <div className="py-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl">
                  K
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: C.dark }}>Hébergé par Kabylis</h3>
                  <p className="text-sm" style={{ color: C.gray }}>2 avis · 4.0 rating · Rejoint décembre 2020</p>
                </div>
              </div>
              <a
                href={SUPERHOST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-2.5 rounded-lg border font-medium text-sm hover:bg-gray-50 transition"
                style={{ borderColor: C.dark, color: C.dark }}
              >
                Contact Host
              </a>
            </div>
          </div>

          {/* ── Right Sidebar — Booking Card ── */}
          <div className="hidden lg:block">
            <div className="rounded-xl border shadow-xl p-6 sticky top-24" style={{ borderColor: C.border, backgroundColor: C.white }}>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-xl font-bold" style={{ color: C.dark }}>1 200 TND</span>
                <span className="text-sm" style={{ color: C.gray }}>/ Nuit</span>
              </div>
              <p className="text-sm mb-5" style={{ color: C.gray }}>La Perla - Pieds dans l'eau</p>

              <div className="border rounded-xl overflow-hidden mb-4" style={{ borderColor: C.border }}>
                <div className="grid grid-cols-2">
                  <div className="p-3 border-r" style={{ borderColor: C.border }}>
                    <p className="text-[10px] font-bold uppercase" style={{ color: C.dark }}>Check-in</p>
                    <p className="text-sm" style={{ color: C.gray }}>Add date</p>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-bold uppercase" style={{ color: C.dark }}>Check-out</p>
                    <p className="text-sm" style={{ color: C.gray }}>Add date</p>
                  </div>
                </div>
                <div className="border-t p-3" style={{ borderColor: C.border }}>
                  <p className="text-[10px] font-bold uppercase" style={{ color: C.dark }}>Guests</p>
                  <p className="text-sm" style={{ color: C.gray }}>1 guest</p>
                </div>
              </div>

              <a
                href={SUPERHOST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-lg text-white font-bold text-sm text-center transition hover:opacity-90"
                style={{ backgroundColor: C.coral }}
              >
                Book Now
              </a>

              {/* 3D Tour CTA */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor: C.border }}>
                <button
                  onClick={() => navigate(TOUR_PATH)}
                  className="w-full py-3 rounded-lg text-white font-bold text-sm transition hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#00A699" }}
                >
                  <Eye className="w-4 h-4" />
                  Visite Virtuelle 3D
                </button>
                <p className="text-center text-xs mt-2" style={{ color: C.gray }}>
                  Propulsé par <span className="font-bold" style={{ color: C.coral }}>PrimeSpace</span>
                </p>
              </div>

              <div className="mt-4 pt-4 border-t text-center" style={{ borderColor: C.border }}>
                <p className="text-xs" style={{ color: C.gray }}>
                  4 bedrooms · 4 beds · 5 baths · 8 guests
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Footer ═══ */}
      <footer style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={SUPERHOST_LOGO} alt="SuperHost" style={{ height: 28 }} />
              <span className="font-semibold text-sm" style={{ color: C.dark }}>SuperHost Tunisia — Creating Memories</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/superhosttunisie" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
              <a href="https://www.instagram.com/superhost.tunisia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t text-xs" style={{ borderColor: C.border, color: C.gray }}>
            <a href="https://superhost.com.tn/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
            <a href="https://superhost.com.tn/terms-of-use" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms of Use</a>
            <span>© SuperHost Tunisia</span>
          </div>
        </div>
      </footer>

      {/* ═══ Bottom Sticky Bar (mobile) ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t shadow-lg" style={{ backgroundColor: C.white, borderColor: C.border }}>
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <span className="font-bold" style={{ color: C.dark }}>1 200 TND / Nuit</span>
            <p className="text-xs" style={{ color: C.gray }}>Haouaria · 8 Invités</p>
          </div>
          <a
            href={SUPERHOST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-white font-bold text-sm"
            style={{ backgroundColor: C.coral }}
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
