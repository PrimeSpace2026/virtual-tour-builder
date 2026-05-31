import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Menu } from "lucide-react";

/* ─── Royal Tulip Korbous / Les eaux de Carpis colors ─── */
const C = {
  navy: "#1a2744",
  navyLight: "#223356",
  gold: "#c9a96e",
  goldLight: "#d4b97e",
  goldDark: "#b08a50",
  white: "#ffffff",
  offWhite: "#f8f6f3",
  text: "#e8e4df",
  darkText: "#222222",
  gray: "#888888",
  border: "rgba(201,169,110,0.3)",
};
const FONT = `'Cormorant Garamond', 'Georgia', serif`;
const FONT_BODY = `'Lato', 'Segoe UI', Arial, sans-serif`;

const TOUR_URL = "https://my.matterport.com/show?play=1&lang=en-US&m=paAemusufeL";

const IMAGES = [
  "https://eauxdecarpis.com/wp-content/uploads/2026/01/Photo-Piscine-Korbus-2026.jpg",
  "https://eauxdecarpis.com/wp-content/uploads/2026/02/Piscine-Eau-de-Mer-5.jpg",
  "https://eauxdecarpis.com/wp-content/uploads/2026/02/ZSK06818.jpg",
  "https://eauxdecarpis.com/wp-content/uploads/2026/02/ZSK06778.jpg",
  "https://eauxdecarpis.com/wp-content/uploads/2026/01/Slide-1Carpis.jpg",
];

const UNIVERS = [
  { name: "Espace Thermal & Marin", desc: "Soins thermaux et marins d'exception" },
  { name: "Espace Évasion", desc: "Massages et rituels du monde" },
  { name: "Espace Beauté & Séduction", desc: "Soins visage et corps" },
  { name: "Espace Rééducation", desc: "Rééducation fonctionnelle en milieu thermal" },
  { name: "Espace Sérénité", desc: "Relaxation et méditation" },
  { name: "Espace Forme & Détente", desc: "Fitness, piscine et aquagym" },
];

const NAV_LINKS = ["Le Centre", "Histoire", "L'Hôtel", "Destination", "Tarifs", "Contact"];

export default function TulipKorbousDemo() {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const prev = () => setImgIdx(i => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setImgIdx(i => (i + 1) % IMAGES.length);

  return (
    <div style={{ fontFamily: FONT_BODY, color: C.text, backgroundColor: C.navy, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />

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

      {/* ═══ Mobile Menu Overlay ═══ */}
      {menuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/80 flex flex-col items-center justify-center gap-6" onClick={() => setMenuOpen(false)}>
          {NAV_LINKS.map(link => (
            <span key={link} className="text-xl tracking-wide cursor-pointer hover:opacity-80 transition" style={{ fontFamily: FONT, color: C.gold }}>{link}</span>
          ))}
        </div>
      )}

      {/* ═══ Top announcement bar ═══ */}
      <div className="text-center py-2 text-xs tracking-widest uppercase" style={{ backgroundColor: C.goldDark, color: C.white }}>
        <span>Découvrez le Royal Tulip Korbous Bay 5* — reservation@royaltulipkorbous.com</span>
      </div>

      {/* ═══ Header / Navbar ═══ */}
      <header className="relative border-b" style={{ borderColor: C.border }}>
        <div className="max-w-[1200px] mx-auto px-4 h-[90px] flex items-center justify-between">
          {/* Left — Menu */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 text-sm tracking-widest uppercase hover:opacity-80 transition" style={{ color: C.text }}>
            <Menu className="w-5 h-5" />
            <span className="hidden sm:inline">Menu</span>
          </button>

          {/* Center — Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <div className="text-3xl sm:text-4xl italic" style={{ fontFamily: FONT, color: C.gold }}>
              Les eaux de Carpis
            </div>
          </div>

          {/* Right — CTA */}
          <a
            href="https://heyzine.com/flip-book/7ec149933d.html#page/1"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block px-5 py-2 text-xs tracking-widest uppercase font-bold transition hover:opacity-90"
            style={{ backgroundColor: C.gold, color: C.navy }}
          >
            LA BROCHURE
          </a>
        </div>
      </header>

      {/* ═══ Hero Section ═══ */}
      <section className="relative overflow-hidden" style={{ minHeight: 420 }}>
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={IMAGES[0]}
            alt="Royal Tulip Korbous Bay"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${C.navy}dd 0%, ${C.navy}88 50%, ${C.navy}dd 100%)` }} />
        </div>
        <div className="relative z-10 max-w-[900px] mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4" style={{ fontFamily: FONT, color: C.gold }}>
            Les eaux de Carpis
          </h1>
          <p className="text-lg sm:text-xl italic opacity-90 mb-2" style={{ fontFamily: FONT, color: C.text }}>
            l'alliance du thermalisme et de la thalassothérapie
          </p>
          <div className="w-16 h-[2px] mx-auto my-6" style={{ backgroundColor: C.gold }} />
          <p className="text-sm sm:text-base leading-relaxed max-w-[650px] mx-auto opacity-80">
            Korbous... Quand tes eaux thermales et marines nous racontent 2000 ans d'histoire !
          </p>
        </div>
      </section>

      {/* ═══ Virtual Tour Section — PrimeSpace ═══ */}
      <section className="py-16 px-4" style={{ backgroundColor: C.navy }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl mb-3" style={{ fontFamily: FONT, color: C.gold }}>
              Visite Virtuelle 3D
            </h2>
            <p className="text-sm opacity-70">Explorez nos espaces comme si vous y étiez — propulsé par <span className="font-bold" style={{ color: C.gold }}>PrimeSpace</span></p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl" style={{ border: `1px solid ${C.border}` }}>
            <div className="relative pb-[80vh] sm:pb-[56.25%]">
              <iframe
                src={TOUR_URL}
                title="Visite Virtuelle 3D — Les Eaux de Carpis"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="xr-spatial-tracking"
              />
            </div>
            <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: C.navyLight }}>
              <p className="text-xs opacity-60">Naviguez librement dans l'espace 3D</p>
              <a href={TOUR_URL} target="_blank" rel="noopener noreferrer" className="text-xs font-bold px-4 py-1.5 rounded transition hover:opacity-90" style={{ backgroundColor: C.gold, color: C.navy }}>
                Plein écran
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ About the Hotel ═══ */}
      <section className="py-16 px-4" style={{ backgroundColor: C.navyLight }}>
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: C.gold }}>ROYAL TULIP KORBOUS BAY</p>
          <h2 className="text-3xl sm:text-4xl mb-6" style={{ fontFamily: FONT, color: C.gold }}>
            Thermes & Thalasso
          </h2>
          <p className="text-sm sm:text-base leading-relaxed opacity-80 mb-6">
            Ouvert en 2022, le Royal Tulip Korbous Bay Thalasso & Springs a été bâti dans un site spectaculaire, encore préservé. Son design contemporain et raffiné abrite 160 chambres et suites ainsi que trois villas privées. Vue mer ou montagne : le décor change au fil du jour, pour des levers et couchers de soleil inoubliables.
          </p>
          <p className="text-sm sm:text-base leading-relaxed opacity-80">
            L'attention portée aux détails et la Conciergerie «Clefs d'Or» confirment le positionnement haut de gamme de l'établissement et garantissent une expérience personnalisée, du séjour bien-être à l'escapade découverte.
          </p>
          <div className="flex items-center justify-center gap-8 mt-10 text-center">
            <div>
              <p className="text-3xl font-bold" style={{ fontFamily: FONT, color: C.gold }}>160</p>
              <p className="text-xs uppercase tracking-wider opacity-60 mt-1">Chambres & Suites</p>
            </div>
            <div className="w-px h-12" style={{ backgroundColor: C.border }} />
            <div>
              <p className="text-3xl font-bold" style={{ fontFamily: FONT, color: C.gold }}>3 675</p>
              <p className="text-xs uppercase tracking-wider opacity-60 mt-1">m² de Spa</p>
            </div>
            <div className="w-px h-12" style={{ backgroundColor: C.border }} />
            <div>
              <p className="text-3xl font-bold" style={{ fontFamily: FONT, color: C.gold }}>5★</p>
              <p className="text-xs uppercase tracking-wider opacity-60 mt-1">Classification</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Image Gallery ═══ */}
      <section className="py-16 px-4" style={{ backgroundColor: C.navy }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl" style={{ fontFamily: FONT, color: C.gold }}>Galerie</h2>
          </div>
          <div className="relative rounded-lg overflow-hidden" style={{ height: 420 }}>
            <img
              src={IMAGES[imgIdx]}
              alt="Royal Tulip Korbous"
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setLightbox(imgIdx)}
            />
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition hover:opacity-100 opacity-70" style={{ backgroundColor: `${C.navy}cc` }}>
              <ChevronLeft className="w-5 h-5" style={{ color: C.gold }} />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition hover:opacity-100 opacity-70" style={{ backgroundColor: `${C.navy}cc` }}>
              <ChevronRight className="w-5 h-5" style={{ color: C.gold }} />
            </button>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {IMAGES.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-[120px] h-[75px] object-cover rounded cursor-pointer flex-shrink-0 transition"
                style={{ border: i === imgIdx ? `2px solid ${C.gold}` : "2px solid transparent", opacity: i === imgIdx ? 1 : 0.6 }}
                onClick={() => setImgIdx(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Les Univers / Spa Spaces ═══ */}
      <section className="py-16 px-4" style={{ backgroundColor: C.navyLight }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl mb-3" style={{ fontFamily: FONT, color: C.gold }}>
              Les eaux de Carpis & ses univers
            </h2>
            <p className="text-sm opacity-70 max-w-[600px] mx-auto">
              Les eaux de Carpis couvre une superficie de 3 675 m² répartis sur quatre étages, dédié au bien-être et à l'expérience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {UNIVERS.map((u, i) => (
              <div
                key={i}
                className="rounded-lg p-6 text-center transition hover:scale-[1.02]"
                style={{ backgroundColor: C.navy, border: `1px solid ${C.border}` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${C.gold}22`, border: `1px solid ${C.gold}44` }}>
                  <svg className="w-5 h-5" fill={C.gold} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ fontFamily: FONT, color: C.gold }}>{u.name}</h3>
                <p className="text-xs opacity-60">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Destination Section ═══ */}
      <section className="py-16 px-4" style={{ backgroundColor: C.navy }}>
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl mb-6" style={{ fontFamily: FONT, color: C.gold }}>
            La Tunisie, perle méditerranéenne !
          </h2>
          <p className="text-sm sm:text-base leading-relaxed opacity-80 mb-4">
            Le village de Korbous se love au pied d'un massif montagneux qui domine le somptueux golfe de Tunis, dans un paysage naturel rare, digne des plus belles baies de la Méditerranée.
          </p>
          <p className="text-sm sm:text-base leading-relaxed opacity-80">
            C'est dans ce décor majestueux que jaillissent des profondeurs de la terre des eaux chaudes réputées pour leurs vertus depuis l'ère carthaginoise et romaine : les sources de Carpis, nom antique de Korbous.
          </p>
        </div>
      </section>

      {/* ═══ Contact Section ═══ */}
      <section className="py-16 px-4" style={{ backgroundColor: C.navyLight }}>
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-3xl text-center mb-10" style={{ fontFamily: FONT, color: C.gold }}>Contactez-nous</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: C.gold }}>Notre adresse</p>
                <p className="text-sm opacity-80">Aïn Oktor, 8041 Soliman, Tunisie</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: C.gold }}>Contact</p>
                <p className="text-sm opacity-80">directrice.thalasso@shpp.com.tn</p>
                <p className="text-sm opacity-80">Tel. +216 98 184 160</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: C.gold }}>Réservation</p>
                <p className="text-sm opacity-80">Tel. +216 98 184 166</p>
                <p className="text-sm opacity-80">reservation@royaltulipkorbous.com</p>
              </div>
              <div className="flex gap-3 pt-2">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center transition hover:opacity-80" style={{ backgroundColor: C.gold }}>
                  <svg className="w-4 h-4" fill={C.navy} viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center transition hover:opacity-80" style={{ backgroundColor: C.gold }}>
                  <svg className="w-4 h-4" fill={C.navy} viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center transition hover:opacity-80" style={{ backgroundColor: C.gold }}>
                  <svg className="w-4 h-4" fill={C.navy} viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Votre nom" className="w-full bg-transparent border-b px-0 py-3 text-sm outline-none placeholder:opacity-50" style={{ borderColor: C.border, color: C.text }} />
              <input type="email" placeholder="Votre email" className="w-full bg-transparent border-b px-0 py-3 text-sm outline-none placeholder:opacity-50" style={{ borderColor: C.border, color: C.text }} />
              <input type="text" placeholder="Sujet" className="w-full bg-transparent border-b px-0 py-3 text-sm outline-none placeholder:opacity-50" style={{ borderColor: C.border, color: C.text }} />
              <textarea placeholder="Votre message (optionnel)" rows={3} className="w-full bg-transparent border-b px-0 py-3 text-sm outline-none resize-none placeholder:opacity-50" style={{ borderColor: C.border, color: C.text }} />
              <button className="mt-2 px-8 py-3 text-xs font-bold tracking-widest uppercase transition hover:opacity-90" style={{ backgroundColor: C.gold, color: C.navy }}>
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t py-8 px-4" style={{ borderColor: C.border, backgroundColor: C.navy }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs opacity-50">© LES EAUX DE CARPIS 2026</p>
            <div className="flex items-center gap-4 text-xs opacity-50">
              <span>Les eaux de Carpis</span>
              <span>|</span>
              <span>directrice.thalasso@shpp.com.tn</span>
              <span>|</span>
              <span>Mob. +216 98 184 160</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 mt-6">
            <span className="text-sm tracking-wider uppercase" style={{ fontFamily: FONT, color: C.gold, opacity: 0.7 }}>Royal Tulip</span>
            <span className="text-sm tracking-wider uppercase" style={{ fontFamily: FONT, color: C.gold, opacity: 0.7 }}>Cinq Mondes</span>
            <span className="text-sm tracking-wider uppercase" style={{ fontFamily: FONT, color: C.gold, opacity: 0.7 }}>Amarante</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
