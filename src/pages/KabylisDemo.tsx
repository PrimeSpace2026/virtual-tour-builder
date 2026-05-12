import { useState } from "react";
import {
  Star, MapPin, ChevronLeft, ChevronRight, Eye,
  X, Heart, Users, BedDouble, Bath, Home as HomeIcon, Wifi, Snowflake, UtensilsCrossed,
  Clock, ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─── Kabylis exact palette & font ─── */
const C = {
  red: "#FF5A5F",
  teal: "#00A699",
  dark: "#282828",
  text: "#484848",
  gray: "#767676",
  border: "#EBEBEB",
  bg: "#F7F7F7",
  white: "#FFFFFF",
};
const FONT = `'Be Vietnam Pro', Arial, Helvetica, sans-serif`;

const TOUR_PATH = "/view/westpoint-way-residence-donegal-ie";
const KABYLIS_LOGO = "https://kabylis.tn/images/logo/a227e101f32b56e9319987acdf0dfd26.png";
const KABYLIS_URL = "https://kabylis.tn/rooms/l'hacienda-de-tamzrat-487?&guests=0";

/* ─── All 29 property images ─── */
const IMAGES = [
  "https://ucarecdn.com/cc32818a-9140-469a-ba82-12fbfd319f01/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/1a9e647b-e407-4f78-ba46-5f6b5ee1c346/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/baba97e6-ad8f-49ea-867a-47e5b0be5b9d/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/ef39b135-5314-4ad3-a318-43f3eef85fd9/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/29b4dd19-190e-431d-9c6e-24b5174d4fd7/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/9a04ae11-8d25-4861-8659-757a9a4860ba/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/5674fc9b-3a32-4665-9b8b-68efeb9ceb8a/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/0587b537-02e5-48ec-8302-5bb65896539e/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/c270f17e-bac5-44b9-9687-e930701eb972/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/b4eb7b66-e25f-4ae9-b4ed-ccccdc78e35c/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/10cf45fe-5cea-4ca4-991c-a9d343d1e91d/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/3896af77-58cb-4f12-94eb-5efb26f263dc/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/c95e9333-8317-45c1-b73c-5e0e4b90d48f/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/74f7b381-411c-4f8b-bdd3-b3f0dcfc00cc/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/9cc40086-5627-42a7-8ab5-6cfa62d099e4/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/3a59bd53-80f6-4773-a85b-76dcdd9a236d/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/55daa31a-aa5a-4ee4-a6d2-21eb8f0e9931/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/f21a4e14-3611-4735-a2f8-fe4f7bea318f/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/87aab6cb-75e7-4df0-8aa5-4ad01c111ef6/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/26912cc4-d903-448e-92f6-b139955b93a3/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/cc99de31-f572-42d8-9beb-9b7eadd3a23b/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/d332f3d9-a4d8-4580-ac05-4fe074d10980/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/7c212e54-37a7-4dcd-9855-f130c22eb01f/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/261f3a18-eb10-41d2-9b6c-69bf294cb0db/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/aa42bdd1-dd28-45a3-83f4-9bf54d377f10/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/3820db91-4ef2-4256-8e6b-d3313fa9861c/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/df0064c1-7a5e-4497-b289-bad6753a4350/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/c96ae125-4a50-4384-b258-0b822e14ab48/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/f624d19a-278c-4f07-90e7-514842048140/-/format/auto/-/scale_crop/1440x960/smart/",
];

const HOST_AVATAR = "https://ucarecdn.com/cb494072-52f5-42c8-8cf1-6ee41ef3f58c/-/format/auto/";

const EQUIP = [
  "Produits essentiels", "Climatiseur", "Cuisine équipée", "Wi-Fi",
  "Parking", "Piscine", "Chauffage", "Machine à laver",
  "Barbecue", "Jardin", "Télévision", "Fer à repasser",
  "Sèche-cheveux", "Espace de travail", "Extincteur", "Trousse de secours",
  "Détecteur de fumée",
];

const ROOMS = [
  { name: "Chambre 1", beds: "1 × Queen · 1 × Single" },
  { name: "Chambre 2", beds: "1 × Queen" },
  { name: "Chambre 3", beds: "1 × Queen" },
  { name: "Chambre 4", beds: "2 × Single" },
];

const SIMILAR = [
  { name: "Bungalow Capri : s+2 en bord de mer", price: "350 TND", type: "House", guests: 4, img: "https://ucarecdn.com/9a04ae11-8d25-4861-8659-757a9a4860ba/-/format/auto/-/scale_crop/720x480/smart/" },
  { name: "Dar Tamzrat", price: "900 TND", type: "House", guests: 10, img: "https://ucarecdn.com/c270f17e-bac5-44b9-9687-e930701eb972/-/format/auto/-/scale_crop/720x480/smart/" },
  { name: "Villa de Luxe - 200m plage ezzahra", price: "1 200 TND", type: "House", guests: 8, img: "https://ucarecdn.com/b4eb7b66-e25f-4ae9-b4ed-ccccdc78e35c/-/format/auto/-/scale_crop/720x480/smart/" },
  { name: "Les maisons en bois de Kélibia", price: "1 100 TND", type: "Cottage", guests: 14, img: "https://ucarecdn.com/10cf45fe-5cea-4ca4-991c-a9d343d1e91d/-/format/auto/-/scale_crop/720x480/smart/" },
];

const DESC = `Charmante villa de campagne à 4 km de Kelibia et 3 km de Hammam Larzez, elle se situe sur les collines de Tamzrat offrant une vue imprenable sur les plaines verdoyantes et la mer au loin.\n\nCette maison d'hôtes spacieuse et parfaitement équipée vous accueille dans un cadre authentique et paisible. Chaque détail a été pensé pour offrir un confort optimal : cuisine moderne entièrement équipée, salons lumineux, chambres confortables avec literie de qualité, et des espaces extérieurs généreux pour profiter du beau temps.\n\nL'Hacienda de Tamzrat est l'endroit idéal pour des vacances en famille, entre amis, ou simplement pour se ressourcer loin de l'agitation de la ville.`;

export default function KabylisDemo() {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [showAllEquip, setShowAllEquip] = useState(false);
  const [showAllDesc, setShowAllDesc] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const prevImg = () => setLightbox(p => p !== null ? (p - 1 + IMAGES.length) % IMAGES.length : null);
  const nextImg = () => setLightbox(p => p !== null ? (p + 1) % IMAGES.length : null);

  return (
    <div style={{ fontFamily: FONT, color: C.dark, backgroundColor: C.white, minHeight: "100vh" }}>
      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

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

      {/* ═══ Kabylis Navbar ═══ */}
      <nav style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.border}`, height: 70 }} className="sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <a href="https://kabylis.tn" target="_blank" rel="noopener noreferrer">
            <img src={KABYLIS_LOGO} alt="Kabylis" style={{ height: 40 }} />
          </a>
          {/* Search bar — kabylis style */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="flex items-center w-full border rounded-full px-4 py-2 text-sm" style={{ borderColor: C.border }}>
              <input type="text" readOnly placeholder="Destination ou nom du logement" className="flex-1 bg-transparent outline-none text-sm" style={{ color: C.gray }} />
              <button className="ml-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: C.red }}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-5 text-sm" style={{ color: C.text }}>
            <a href="https://kabylis.tn" className="hover:underline" style={{ color: C.text }}>Accueil</a>
            <a href="https://kabylis.tn/whyhost" className="hover:underline" style={{ color: C.text }}>Devenez hôte</a>
            <a href="https://kabylis.tn/help" className="hover:underline" style={{ color: C.text }}>Aide</a>
            <button className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: C.red }}>Se connecter</button>
          </div>
          {/* Mobile hamburger */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </nav>

      {/* ═══ Title Bar ═══ */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-2 sm:pb-3">
        <h1 className="text-lg sm:text-2xl font-bold" style={{ color: C.dark }}>L'Hacienda de Tamzrat</h1>
        <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" style={{ color: C.red }} />
            <span className="font-semibold text-sm" style={{ color: C.dark }}>5</span>
          </div>
          <span style={{ color: C.gray }}>·</span>
          <span className="text-sm underline cursor-pointer" style={{ color: C.dark }}>1 avis</span>
          <span style={{ color: C.gray }}>·</span>
          <span className="flex items-center gap-1 text-sm" style={{ color: C.dark }}>
            <MapPin className="w-3.5 h-3.5" />Kelibia, TN
          </span>
          <div className="ml-auto hidden sm:flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-sm underline" style={{ color: C.dark }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
              Partager
            </button>
            <button onClick={() => setSaved(!saved)} className="flex items-center gap-1.5 text-sm underline" style={{ color: C.dark }}>
              <Heart className={`w-4 h-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
              Sauvegarder
            </button>
          </div>
        </div>
      </div>

      {/* ═══ Photo Grid ═══ */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pb-4 sm:pb-6 relative">
        {/* Mobile: single hero image */}
        <div className="sm:hidden rounded-xl overflow-hidden relative" style={{ height: 250 }}>
          <img src={IMAGES[0]} alt="" className="w-full h-full object-cover" onClick={() => setLightbox(0)} />
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute right-3 bottom-3 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-medium"
            style={{ color: C.dark }}
          >
            {IMAGES.length} photos
          </button>
        </div>
        {/* Desktop: 5-image grid */}
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
        <button
          onClick={() => setShowAllPhotos(true)}
          className="hidden sm:flex absolute right-8 bottom-10 bg-white border border-gray-800 rounded-lg px-4 py-2 text-sm font-medium items-center gap-2 hover:bg-gray-100 transition"
          style={{ color: C.dark }}
        >
          Afficher toutes les photos
        </button>
      </div>

      {/* ═══ Main Content ═══ */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pb-20 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">

          {/* ── Left Column ── */}
          <div className="lg:col-span-2">

            {/* Host info bar */}
            <div className="flex items-center justify-between py-4 sm:py-6 border-b" style={{ borderColor: C.border }}>
              <div>
                <h2 className="text-base sm:text-xl font-semibold" style={{ color: C.dark }}>Villa hébergé par Samar</h2>
                <p className="text-xs sm:text-sm mt-1" style={{ color: C.gray }}>8 voyageurs · 4 chambres · 5 lits · 4 salles de bains</p>
              </div>
              <img src={HOST_AVATAR} alt="Samar" className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover" />
            </div>

            {/* L'espace */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: C.dark }}>L'espace</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: <HomeIcon className="w-5 h-5" />, label: "Type du logement", value: "House" },
                  { icon: <Users className="w-5 h-5" />, label: "Invité", value: "8 Invités" },
                  { icon: <BedDouble className="w-5 h-5" />, label: "Chambres", value: "4 Chambres" },
                  { icon: <BedDouble className="w-5 h-5" />, label: "Lits", value: "5 lits" },
                  { icon: <Bath className="w-5 h-5" />, label: "Salles de bains", value: "4 Salles de bains" },
                  { icon: <Clock className="w-5 h-5" />, label: "Arrivée", value: "3 PM - 11 AM" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span style={{ color: C.gray }}>{item.icon}</span>
                    <div>
                      <p className="text-xs" style={{ color: C.gray }}>{item.label}</p>
                      <p className="text-sm font-medium" style={{ color: C.dark }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* À propos */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h2 className="text-lg font-semibold mb-3" style={{ color: C.dark }}>À propos de cette annonce</h2>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: C.text }}>
                {showAllDesc ? DESC : DESC.slice(0, 260) + "..."}
              </p>
              <button onClick={() => setShowAllDesc(!showAllDesc)} className="mt-2 text-sm font-semibold underline" style={{ color: C.dark }}>
                {showAllDesc ? "Afficher moins" : "Afficher plus"}
              </button>
            </div>

            {/* Chambres */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: C.dark }}>Chambres</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ROOMS.map((r, i) => (
                  <div key={i} className="border rounded-xl p-4 text-center" style={{ borderColor: C.border }}>
                    <BedDouble className="w-6 h-6 mx-auto mb-2" style={{ color: C.dark }} />
                    <p className="font-semibold text-sm" style={{ color: C.dark }}>{r.name}</p>
                    <p className="text-xs mt-1" style={{ color: C.gray }}>{r.beds}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ★★★ 3D Virtual Tour — PrimeSpace ★★★ */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: C.dark }}>
                  🏠 Visite Virtuelle 3D — <span style={{ color: C.red }}>PrimeSpace</span>
                </h3>
                <span className="text-xs px-3 py-1 rounded-full font-semibold text-white" style={{ backgroundColor: C.teal }}>NOUVEAU</span>
              </div>
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: C.border }}>
                <div className="tour-container relative">
                  <style>{`.tour-container{padding-bottom:130vw}@media(min-width:640px){.tour-container{padding-bottom:75%}}@media(min-width:1024px){.tour-container{padding-bottom:56.25%}}`}</style>
                  <iframe
                    src={TOUR_PATH}
                    title="Visite 3D PrimeSpace — L'Hacienda de Tamzrat"
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
                    style={{ backgroundColor: C.red }}
                  >
                    Plein écran
                  </a>
                </div>
              </div>
            </div>

            {/* Équipements */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: C.dark }}>Équipements</h3>
              <div className="grid grid-cols-2 gap-y-3">
                {(showAllEquip ? EQUIP : EQUIP.slice(0, 8)).map((eq, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm" style={{ color: C.text }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.red }} />
                    {eq}
                  </div>
                ))}
              </div>
              {EQUIP.length > 8 && (
                <button onClick={() => setShowAllEquip(!showAllEquip)} className="mt-4 text-sm font-semibold underline" style={{ color: C.dark }}>
                  {showAllEquip ? "Afficher moins" : `Afficher les ${EQUIP.length} équipements`}
                </button>
              )}
            </div>

            {/* Règles */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: C.dark }}>Règles de l'hébergement</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.text }}>
                Nos invités sont priés de respecter les lieux, respecter le voisinage et respecter l'heure de Check out pour nous permettre de fournir les meilleurs services.
              </p>
            </div>

            {/* Annulation */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: C.dark }}>Politique d'annulation</h3>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" style={{ color: C.red }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: C.dark }}>Strict</p>
                  <p className="text-sm mt-1" style={{ color: C.text }}>Cancel up to 7 days prior to arrival and get a 50% refund</p>
                </div>
              </div>
            </div>

            {/* Avis */}
            <div className="py-6 border-b" style={{ borderColor: C.border }}>
              <div className="flex items-center gap-2 mb-5">
                <Star className="w-5 h-5 fill-current" style={{ color: C.red }} />
                <h3 className="text-lg font-semibold" style={{ color: C.dark }}>5 · 1 Avis</h3>
              </div>
              <div className="flex items-start gap-4">
                <img src="https://ucarecdn.com/9dce64d0-af45-4ad9-9766-67108dff2bbc/-/format/auto/" alt="Amine" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm" style={{ color: C.dark }}>Amine</p>
                  <p className="text-xs mb-2" style={{ color: C.gray }}>5 septembre 2025</p>
                  <p className="text-sm leading-relaxed" style={{ color: C.text }}>
                    Nous avons adoré notre séjour dans cette maison. Tout est pensé dans les moindres détails pour offrir un confort optimal : rien ne manque, tout est parfaitement fonctionnel. L'accueil a été d'une grande gentillesse, et la propreté des lieux irréprochable. Mais ce qui nous a le plus surpris, c'est que l'expérience était encore meilleure que ce que les photos laissaient imaginer — au-delà de toutes nos attentes ! Un sans-faute du début à la fin. Nous recommandons cette adresse les yeux fermés.
                  </p>
                </div>
              </div>
            </div>

            {/* Hébergé par */}
            <div className="py-6">
              <div className="flex items-center gap-4 mb-3">
                <img src={HOST_AVATAR} alt="Samar" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: C.dark }}>Hébergé par Samar</h3>
                  <p className="text-sm" style={{ color: C.gray }}>Rejoint octobre 2021</p>
                </div>
              </div>
              <a
                href={KABYLIS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-2.5 rounded-lg border font-medium text-sm hover:bg-gray-50 transition"
                style={{ borderColor: C.dark, color: C.dark }}
              >
                Contacter l'hôte
              </a>
            </div>
          </div>

          {/* ── Right Sidebar — Booking Card (hidden on mobile, shown via bottom bar) ── */}
          <div className="hidden lg:block">
            <div className="rounded-xl border shadow-xl p-6 sticky top-24" style={{ borderColor: C.border, backgroundColor: C.white }}>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-xl font-bold" style={{ color: C.dark }}>900 TND</span>
                <span className="text-sm" style={{ color: C.gray }}>/ Nuit</span>
              </div>

              <div className="border rounded-xl overflow-hidden mb-4" style={{ borderColor: C.dark }}>
                <div className="grid grid-cols-2">
                  <div className="p-3 border-r" style={{ borderColor: C.dark }}>
                    <p className="text-[10px] font-bold uppercase" style={{ color: C.dark }}>Arrivée</p>
                    <p className="text-sm" style={{ color: C.gray }}>Ajouter une date</p>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-bold uppercase" style={{ color: C.dark }}>Départ</p>
                    <p className="text-sm" style={{ color: C.gray }}>Ajouter une date</p>
                  </div>
                </div>
                <div className="border-t p-3" style={{ borderColor: C.dark }}>
                  <p className="text-[10px] font-bold uppercase" style={{ color: C.dark }}>Voyageurs</p>
                  <p className="text-sm" style={{ color: C.gray }}>1 voyageur</p>
                </div>
              </div>

              <a
                href={KABYLIS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-lg text-white font-bold text-sm text-center transition hover:opacity-90"
                style={{ backgroundColor: C.red }}
              >
                Réservez maintenant
              </a>

              {/* 3D Tour CTA in sidebar */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor: C.border }}>
                <button
                  onClick={() => navigate(TOUR_PATH)}
                  className="w-full py-3 rounded-lg text-white font-bold text-sm transition hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: C.teal }}
                >
                  <Eye className="w-4 h-4" />
                  Visite Virtuelle 3D
                </button>
                <p className="text-center text-xs mt-2" style={{ color: C.gray }}>
                  Propulsé par <span className="font-bold" style={{ color: C.red }}>PrimeSpace</span>
                </p>
              </div>

              <p className="text-center text-xs mt-4" style={{ color: C.gray }}>
                Durée min: 1 nuit · Durée max: 60 nuits
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Similar Listings ═══ */}
      <div style={{ backgroundColor: C.bg }}>
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-xl font-semibold mb-6" style={{ color: C.dark }}>Annonces similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SIMILAR.map((s, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-white border hover:shadow-lg transition cursor-pointer" style={{ borderColor: C.border }}>
                <div className="h-44 overflow-hidden relative">
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-3 right-3"><Heart className="w-5 h-5 text-white drop-shadow-md" /></button>
                </div>
                <div className="p-3">
                  <p className="font-bold text-sm" style={{ color: C.dark }}>{s.price} / Nuit</p>
                  <p className="text-sm mt-0.5 line-clamp-1" style={{ color: C.dark }}>{s.name}</p>
                  <p className="text-xs mt-1" style={{ color: C.gray }}>{s.type} / {s.guests} Invités</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Footer — Kabylis ═══ */}
      <footer style={{ backgroundColor: C.white, borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="font-semibold text-sm mb-3" style={{ color: C.dark }}>Kabylis</p>
              <div className="space-y-2">
                <a href="https://kabylis.tn/about" target="_blank" rel="noopener noreferrer" className="block text-sm hover:underline" style={{ color: C.gray }}>À propos</a>
                <a href="https://kabylis.tn/contact" target="_blank" rel="noopener noreferrer" className="block text-sm hover:underline" style={{ color: C.gray }}>Contactez-nous</a>
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3" style={{ color: C.dark }}>Découvrir</p>
              <div className="space-y-2">
                <a href="https://kabylis.tn/safety" target="_blank" rel="noopener noreferrer" className="block text-sm hover:underline" style={{ color: C.gray }}>Confiance et sécurité</a>
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3" style={{ color: C.dark }}>Hébergement</p>
              <div className="space-y-2">
                <a href="https://kabylis.tn/whyhost" target="_blank" rel="noopener noreferrer" className="block text-sm hover:underline" style={{ color: C.gray }}>Devenez hôte</a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: C.border }}>
            <p className="text-xs" style={{ color: C.gray }}>© Kabylis.</p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/kabylis.tn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
              <a href="https://www.instagram.com/kabylis.tn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ Bottom Sticky Bar (mobile) ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t shadow-lg" style={{ backgroundColor: C.white, borderColor: C.border }}>
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <span className="font-bold" style={{ color: C.dark }}>900 TND</span>
            <span className="text-sm ml-1" style={{ color: C.gray }}>/ Nuit</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3 fill-current" style={{ color: C.red }} />
              <span className="text-xs font-semibold" style={{ color: C.dark }}>5</span>
            </div>
          </div>
          <a
            href={KABYLIS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg text-white font-bold text-sm hover:opacity-90 transition"
            style={{ backgroundColor: C.red }}
          >
            Réservez maintenant
          </a>
        </div>
      </div>

      {/* ═══ All Photos Modal ═══ */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white border-b z-10 px-4 py-3 flex items-center justify-between" style={{ borderColor: C.border }}>
            <button onClick={() => setShowAllPhotos(false)} className="text-sm font-semibold flex items-center gap-1" style={{ color: C.dark }}>
              <ChevronLeft className="w-4 h-4" /> Retour
            </button>
            <span className="text-sm" style={{ color: C.gray }}>{IMAGES.length} photos</span>
          </div>
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-2">
            {IMAGES.map((img, i) => (
              <img key={i} src={img} alt="" className="w-full rounded-lg cursor-pointer" onClick={() => { setShowAllPhotos(false); setLightbox(i); }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
