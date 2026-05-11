import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, X, Check } from "lucide-react";

/* ── SVG icon catalog ───────────────────────────────────────────────── */
// Each icon: 24×24 viewBox, stroke-based, 2px stroke, round caps/joins
// Stored as raw path data so we can render both as React elements and data-URI PNGs

interface IconDef {
  name: string;
  /** SVG inner content (paths, circles, rects, etc.) */
  paths: string;
}

interface IconCategory {
  label: string;
  icons: IconDef[];
}

const ICON_CATALOG: IconCategory[] = [
  {
    label: "Mobilier",
    icons: [
      { name: "Canapé", paths: `<path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1H6v-1a2 2 0 0 0-4 0z"/><path d="M4 18v2"/><path d="M20 18v2"/>` },
      { name: "Lit", paths: `<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>` },
      { name: "Chaise", paths: `<path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0H7a2 2 0 0 0-4 0z"/><path d="M5 18v2"/><path d="M19 18v2"/>` },
      { name: "Table", paths: `<rect x="2" y="6" width="20" height="4" rx="1"/><path d="M4 10v10"/><path d="M20 10v10"/><path d="M8 10v10"/><path d="M16 10v10"/>` },
      { name: "Bureau", paths: `<rect x="1" y="4" width="22" height="4" rx="1"/><path d="M3 8v12"/><path d="M21 8v12"/><rect x="9" y="8" width="6" height="6" rx="1"/>` },
      { name: "Armoire", paths: `<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="2" x2="12" y2="22"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/>` },
      { name: "Étagère", paths: `<rect x="3" y="2" width="18" height="20" rx="1"/><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="14" x2="21" y2="14"/>` },
      { name: "Lampe", paths: `<path d="M9 2h6l3 7H6L9 2z"/><path d="M12 9v8"/><path d="M8 21h8"/><path d="M10 17h4"/>` },
      { name: "Miroir", paths: `<circle cx="12" cy="10" r="7"/><path d="M12 17v4"/><path d="M8 21h8"/>` },
      { name: "Tapis", paths: `<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 6v12"/><path d="M18 6v12"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>` },
    ],
  },
  {
    label: "Électroménager",
    icons: [
      { name: "Réfrigérateur", paths: `<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="17" y1="5" x2="17" y2="7"/><line x1="17" y1="13" x2="17" y2="16"/>` },
      { name: "Lave-linge", paths: `<rect x="3" y="2" width="18" height="20" rx="2"/><circle cx="12" cy="13" r="5"/><circle cx="12" cy="13" r="2"/><circle cx="7" cy="5" r="1"/><circle cx="10" cy="5" r="1"/>` },
      { name: "Four", paths: `<rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="8" x2="22" y2="8"/><rect x="5" y="11" width="14" height="6" rx="1"/><circle cx="6" cy="6" r="0.8"/><circle cx="10" cy="6" r="0.8"/>` },
      { name: "Micro-ondes", paths: `<rect x="2" y="6" width="20" height="12" rx="2"/><rect x="4" y="8" width="11" height="8" rx="1"/><circle cx="19" cy="10" r="0.8"/><circle cx="19" cy="13" r="0.8"/><circle cx="19" cy="16" r="0.8"/>` },
      { name: "Climatisation", paths: `<rect x="2" y="4" width="20" height="10" rx="2"/><path d="M6 14c0 3 2 4 6 4s6-1 6-4"/><line x1="6" y1="8" x2="18" y2="8"/><path d="M6 11h12"/>` },
      { name: "TV", paths: `<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>` },
      { name: "Ventilateur", paths: `<circle cx="12" cy="12" r="2"/><path d="M12 2C12 2 12 8 12 10"/><path d="M12 14c0 2 0 8 0 8"/><path d="M2 12c0 0 6 0 10 0"/><path d="M14 12c2 0 8 0 8 0"/><circle cx="12" cy="5" r="3"/><circle cx="12" cy="19" r="3"/><circle cx="5" cy="12" r="3"/><circle cx="19" cy="12" r="3"/>` },
    ],
  },
  {
    label: "Cuisine & Salle de bain",
    icons: [
      { name: "Évier", paths: `<path d="M3 10h18"/><path d="M5 10v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-6"/><path d="M12 4v6"/><circle cx="12" cy="3" r="1"/>` },
      { name: "Baignoire", paths: `<path d="M2 12h20"/><path d="M4 12v4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4"/><path d="M6 12V6a2 2 0 0 1 2-2h1"/><circle cx="7" cy="4" r="0.8"/>` },
      { name: "Douche", paths: `<circle cx="12" cy="4" r="2"/><path d="M8 6h8"/><path d="M7 8l1 2"/><path d="M17 8l-1 2"/><path d="M9 12v1"/><path d="M12 11v2"/><path d="M15 12v1"/><path d="M10 15v1"/><path d="M14 15v1"/><path d="M12 17v1"/>` },
      { name: "WC", paths: `<path d="M7 12h10a5 5 0 0 1-5 8H12a5 5 0 0 1-5-8z"/><path d="M7 12V8a5 5 0 0 1 10 0v4"/><ellipse cx="12" cy="12" rx="5" ry="1"/>` },
      { name: "Cuisinière", paths: `<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="8" cy="6" r="1.5"/><circle cx="16" cy="6" r="1.5"/><rect x="6" y="13" width="12" height="5" rx="1"/>` },
      { name: "Cafetière", paths: `<path d="M6 20h8"/><path d="M6 4h8v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4z"/><path d="M14 8h2a2 2 0 0 1 0 4h-2"/>` },
    ],
  },
  {
    label: "Extérieur & Structure",
    icons: [
      { name: "Porte", paths: `<rect x="5" y="2" width="14" height="20" rx="1"/><circle cx="15" cy="12" r="1"/>` },
      { name: "Fenêtre", paths: `<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/>` },
      { name: "Escalier", paths: `<path d="M22 5h-5v4h-4v4H9v4H4v4"/><path d="M22 5v16H4"/>` },
      { name: "Garage", paths: `<path d="M2 20V8l10-6 10 6v12"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="4" y1="18" x2="20" y2="18"/>` },
      { name: "Piscine", paths: `<path d="M2 16c1.5-1 3-1.5 4.5 0s3 1 4.5 0 3-1.5 4.5 0 3 1 4.5 0"/><path d="M2 20c1.5-1 3-1.5 4.5 0s3 1 4.5 0 3-1.5 4.5 0 3 1 4.5 0"/><rect x="4" y="4" width="16" height="10" rx="2"/>` },
      { name: "Jardin", paths: `<path d="M12 10V22"/><path d="M8 6c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4z"/><path d="M4 14c0-2 2-3 4-2"/><path d="M20 14c0-2-2-3-4-2"/><path d="M2 22h20"/>` },
      { name: "Balcon", paths: `<rect x="2" y="4" width="20" height="4" rx="1"/><path d="M4 8v12"/><path d="M20 8v12"/><line x1="2" y1="20" x2="22" y2="20"/><line x1="8" y1="8" x2="8" y2="20"/><line x1="12" y1="8" x2="12" y2="20"/><line x1="16" y1="8" x2="16" y2="20"/>` },
      { name: "Clôture", paths: `<path d="M4 4v16"/><path d="M12 4v16"/><path d="M20 4v16"/><path d="M2 8h20"/><path d="M2 14h20"/><path d="M4 2l-2 2"/><path d="M4 2l2 2"/><path d="M12 2l-2 2"/><path d="M12 2l2 2"/><path d="M20 2l-2 2"/><path d="M20 2l2 2"/>` },
    ],
  },
  {
    label: "Objets & Décoration",
    icons: [
      { name: "Tableau", paths: `<rect x="3" y="4" width="18" height="14" rx="1"/><path d="M8 22l4-4 4 4"/>` },
      { name: "Horloge", paths: `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>` },
      { name: "Vase", paths: `<path d="M9 2h6"/><path d="M10 2v2c0 2-3 4-3 8a5 5 0 0 0 10 0c0-4-3-6-3-8V2"/>` },
      { name: "Livre", paths: `<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/>` },
      { name: "Plante", paths: `<path d="M12 22V12"/><path d="M7 12c0-4 2.5-7 5-7s5 3 5 7"/><path d="M4 16c2-2 4-3 8-3s6 1 8 3"/><path d="M12 12c-2-3-1-7 2-9"/><path d="M12 12c2-3 1-7-2-9"/>` },
      { name: "Bougie", paths: `<rect x="9" y="10" width="6" height="12" rx="1"/><path d="M12 2c1 2 2 3 2 5s-1 3-2 3-2-1-2-3 1-3 2-5z"/>` },
      { name: "Cadre photo", paths: `<rect x="3" y="3" width="18" height="18" rx="2"/><rect x="6" y="6" width="12" height="12" rx="1"/><circle cx="12" cy="11" r="2"/><path d="M6 18l4-4 2 2 2-2 4 4"/>` },
      { name: "Trophée", paths: `<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a1 1 0 0 0-1 1v1a3 3 0 0 0 3 3h1"/><path d="M17 6h3a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3h-1"/>` },
    ],
  },
  {
    label: "Sécurité & Technique",
    icons: [
      { name: "Caméra", paths: `<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>` },
      { name: "Alarme", paths: `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>` },
      { name: "Serrure", paths: `<rect x="5" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="16" r="1.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>` },
      { name: "Extincteur", paths: `<rect x="8" y="6" width="8" height="16" rx="2"/><path d="M12 2v4"/><path d="M10 4h4"/><path d="M12 6V2l3-1"/>` },
      { name: "Prise", paths: `<rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="9" cy="9" r="1.5"/><circle cx="15" cy="9" r="1.5"/><path d="M9 15h6" />` },
      { name: "Interrupteur", paths: `<rect x="6" y="2" width="12" height="20" rx="3"/><rect x="9" y="5" width="6" height="8" rx="1"/><circle cx="12" cy="17" r="1"/>` },
      { name: "Wifi", paths: `<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/>` },
    ],
  },
  {
    label: "Transport",
    icons: [
      { name: "Voiture", paths: `<path d="M5 17h14"/><path d="M5 17a2 2 0 0 1-2-2V9l3-5h12l3 5v6a2 2 0 0 1-2 2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/>` },
      { name: "Vélo", paths: `<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17L9 6h4l3 11"/><path d="M9 6l6 11"/><path d="M13 6l-1 4"/>` },
      { name: "Parking", paths: `<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>` },
    ],
  },
  {
    label: "Commerce & Info",
    icons: [
      { name: "Info", paths: `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>` },
      { name: "Panier", paths: `<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>` },
      { name: "Restaurant", paths: `<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>` },
      { name: "Café", paths: `<path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>` },
      { name: "Réception", paths: `<path d="M2 18h20"/><path d="M12 4v8"/><circle cx="12" cy="3" r="1"/><path d="M4 18v-4a8 8 0 0 1 16 0v4"/>` },
      { name: "Téléphone", paths: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>` },
      { name: "Spa", paths: `<path d="M12 22c-4-2-8-7-8-12 4 0 8 3 8 7 0-4 4-7 8-7 0 5-4 10-8 12z"/><path d="M12 2C8 6 6 10 6 14"/><path d="M12 2c4 4 6 8 6 12"/>` },
    ],
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────── */

/** Build a full SVG string from icon paths */
function buildSvg(paths: string, color = "#1a1a2e", size = 24): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

/** Convert icon to a data:image/svg+xml URI usable by Matterport editIcon */
export function iconToDataUri(paths: string, color = "#1a1a2e"): string {
  const svg = buildSvg(paths, color, 64);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Convert icon SVG to a PNG data URI via canvas (for Matterport editIcon which needs raster) */
export function iconToPngDataUri(paths: string, color = "#1a1a2e", bgColor = "#ffffff"): Promise<string> {
  return new Promise((resolve) => {
    const size = 128;
    const svg = buildSvg(paths, color, size);
    const svgBase64 = btoa(unescape(encodeURIComponent(svg)));
    const imgSrc = `data:image/svg+xml;base64,${svgBase64}`;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      // Circle background with tag color
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = bgColor;
      ctx.fill();
      // Draw icon centered with padding
      const pad = 24;
      ctx.drawImage(img, pad, pad, size - pad * 2, size - pad * 2);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      // Fallback: just return the SVG data URI
      resolve(imgSrc);
    };
    img.src = imgSrc;
  });
}

/** Find icon def by name */
export function findIconByName(name: string): IconDef | undefined {
  for (const cat of ICON_CATALOG) {
    const found = cat.icons.find((i) => i.name === name);
    if (found) return found;
  }
  return undefined;
}

/* ── Component ───────────────────────────────────────────────────────── */

interface TagIconPickerProps {
  value: string; // selected icon name (empty = none)
  onChange: (iconName: string, dataUri: string) => void;
  color?: string;
}

export default function TagIconPicker({ value, onChange, color = "#1a1a2e" }: TagIconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return ICON_CATALOG;
    const q = search.toLowerCase();
    return ICON_CATALOG.map((cat) => ({
      ...cat,
      icons: cat.icons.filter((i) => i.name.toLowerCase().includes(q)),
    })).filter((cat) => cat.icons.length > 0);
  }, [search]);

  const selectedDef = value ? findIconByName(value) : null;

  const handleSelect = (icon: IconDef) => {
    onChange(icon.name, iconToDataUri(icon.paths, color));
    setOpen(false);
    setSearch("");
  };

  const handleClear = () => {
    onChange("", "");
    setOpen(false);
    setSearch("");
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-1 w-full flex items-center gap-3 h-10 px-3 rounded-md border border-white/20 bg-white/10 text-sm text-white hover:bg-white/15 transition-colors"
      >
        {selectedDef ? (
          <>
            <span
              className="w-6 h-6 shrink-0"
              dangerouslySetInnerHTML={{ __html: buildSvg(selectedDef.paths, "currentColor") }}
            />
            <span className="truncate flex-1 text-left">{selectedDef.name}</span>
            <span
              className="shrink-0 text-gray-400 hover:text-white"
              onClick={(e) => { e.stopPropagation(); handleClear(); }}
            >
              <X className="w-4 h-4" />
            </span>
          </>
        ) : (
          <span className="text-gray-500">Choisir une icône...</span>
        )}
      </button>
    );
  }

  return (
    <div className="mt-1 rounded-lg border border-white/20 bg-[#12122a] overflow-hidden">
      {/* Search bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher..."
          className="flex-1 bg-transparent text-white text-sm placeholder:text-gray-500 outline-none"
        />
        <button onClick={() => { setOpen(false); setSearch(""); }} className="text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Icon grid */}
      <div className="max-h-[200px] sm:max-h-[260px] overflow-y-auto p-2">
        {filtered.length === 0 && (
          <p className="text-gray-500 text-xs text-center py-4">Aucune icône trouvée</p>
        )}
        {filtered.map((cat) => (
          <div key={cat.label} className="mb-2">
            <p className="text-[10px] text-blue-400 font-medium uppercase tracking-wider px-1 mb-1">{cat.label}</p>
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-1">
              {cat.icons.map((icon) => {
                const isSelected = value === icon.name;
                return (
                  <button
                    key={icon.name}
                    type="button"
                    title={icon.name}
                    onClick={() => handleSelect(icon)}
                    className={`relative w-full aspect-square flex items-center justify-center rounded-md border transition-colors ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-transparent hover:bg-white/10"
                    }`}
                  >
                    <span
                      className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300"
                      dangerouslySetInnerHTML={{ __html: buildSvg(icon.paths, "currentColor") }}
                    />
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer with selected name + confirm */}
      {selectedDef && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-gray-300">
            <span
              className="w-5 h-5"
              dangerouslySetInnerHTML={{ __html: buildSvg(selectedDef.paths, "currentColor") }}
            />
            <span>{selectedDef.name}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={handleClear} className="text-gray-400 hover:text-white px-2 py-1">
              <X className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => { setOpen(false); setSearch(""); }} className="text-blue-400 hover:text-blue-300 px-2 py-1">
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
