import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Upload, X, Image as ImageIcon, LogOut, Search, MapPin, Loader2, ShoppingBag, ExternalLink, BarChart3, Briefcase, Phone, MessageCircle, Tag, Scan, Wifi, Snowflake, Tv, Wine, Bath, DoorOpen, Lock, BedDouble, ChevronDown, ChevronUp, GripVertical, Sparkles, UtensilsCrossed, Dumbbell, CalendarDays, Heart, Home, Users, Star, Coffee, Music, Palmtree, ShieldCheck, PlayCircle, Layers, Clock, Banknote, Trophy, Droplets, Award, Mail, User, Link2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


interface TagInfo {
  sid: string;
  label: string;
  description: string;
}

// Fix default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Click handler component for the mini map
const MapClickHandler = ({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// Fly to position when marker changes
const FlyToMarker = ({ lat, lng }: { lat: number | null; lng: number | null }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.flyTo([lat, lng], 13, { duration: 0.8 });
  }, [lat, lng, map]);
  return null;
};

interface Tour {
  id?: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  surface: number | null;
  tourUrl: string;
  latitude: number | null;
  longitude: number | null;
  location: string;
  metadataJson?: string;
}

interface HotelRoom {
  name: string;
  tagSid: string;
  bedType: string;
  capacity: number | null;
  amenities: string[];
  imageUrl: string;
  price: number | null;
  currency: string;
  bookingUrl: string;
}

interface MenuItemData {
  name: string;
  icon: string;
  tagSid: string;
}

interface MenuSectionData {
  title: string;
  icon: string;
  items: MenuItemData[];
}

// ── Gym & Fitness types ──
interface GymSpace {
  name: string;
  tagSid: string;
  icon: string;
  schedule: string;
}

interface GymPlan {
  name: string;
  price: string;
  duration: string;
}

interface GymClass {
  name: string;
  icon: string;
  schedule: string;
}

interface GymCoach {
  name: string;
  title: string;
  imageUrl: string;
  description: string;
  specialties: string[];
  certifications: string;
  experience: string;
  schedule: string;
  price: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  tagSid: string;
}

interface GymMetadata {
  spaces: GymSpace[];
  equipment: string[];
  plans: GymPlan[];
  classes: GymClass[];
  sections: MenuSectionData[];
  coaches: GymCoach[];
}

// ── Immobilier types ──
interface ImmobilierData {
  propertyType: string;
  transactionType: string;
  price: number | null;
  currency: string;
  rooms: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  floor: number | null;
  totalFloors: number | null;
  yearBuilt: number | null;
  condition: string;
  heatingType: string;
  energyClass: string;
  furnished: boolean;
  parking: boolean;
  parkingSpaces: number | null;
  elevator: boolean;
  balcony: boolean;
  terrace: boolean;
  terraceArea: number | null;
  garden: boolean;
  gardenArea: number | null;
  pool: boolean;
  airConditioning: boolean;
  basement: boolean;
}

interface ImmobilierRoom {
  name: string;
  type: string;
  tagSid: string;
  imageUrl: string;
  description: string;
}

const IMMO_ROOM_TYPES = [
  "Salon", "Cuisine", "Chambre", "Salle de bain", "Bureau",
  "Terrasse", "Jardin", "Garage", "Entrée", "Couloir",
  "Balcon", "Buanderie", "Cave", "Grenier", "Dressing",
];

const DEFAULT_IMMOBILIER: ImmobilierData = {
  propertyType: "",
  transactionType: "",
  price: null,
  currency: "TND",
  rooms: null,
  bedrooms: null,
  bathrooms: null,
  floor: null,
  totalFloors: null,
  yearBuilt: null,
  condition: "",
  heatingType: "",
  energyClass: "",
  furnished: false,
  parking: false,
  parkingSpaces: null,
  elevator: false,
  balcony: false,
  terrace: false,
  terraceArea: null,
  garden: false,
  gardenArea: null,
  pool: false,
  airConditioning: false,
  basement: false,
};

const COACH_SPECIALTY_OPTIONS = [
  { key: "musculation", label: "Musculation", icon: Dumbbell },
  { key: "cardio", label: "Cardio", icon: Heart },
  { key: "yoga", label: "Yoga", icon: Sparkles },
  { key: "crossfit", label: "CrossFit", icon: Trophy },
  { key: "nutrition", label: "Nutrition", icon: Coffee },
  { key: "boxing", label: "Boxing", icon: ShieldCheck },
  { key: "stretching", label: "Stretching", icon: Heart },
  { key: "pilates", label: "Pilates", icon: Sparkles },
  { key: "cycling", label: "Cycling", icon: PlayCircle },
  { key: "swimming", label: "Natation", icon: Droplets },
  { key: "rehab", label: "Rééducation", icon: ShieldCheck },
  { key: "weight_loss", label: "Perte de poids", icon: Star },
];

const GYM_SPACE_ICONS = [
  { key: "dumbbell", label: "Musculation", icon: Dumbbell },
  { key: "heart", label: "Cardio", icon: Heart },
  { key: "bath", label: "Piscine", icon: Bath },
  { key: "sparkles", label: "Spa / Sauna", icon: Sparkles },
  { key: "users", label: "Cours collectif", icon: Users },
  { key: "trophy", label: "CrossFit", icon: Trophy },
  { key: "star", label: "Premium", icon: Star },
  { key: "layers", label: "Autre", icon: Layers },
];

const GYM_CLASS_ICONS = [
  { key: "heart", label: "Cardio", icon: Heart },
  { key: "sparkles", label: "Yoga", icon: Sparkles },
  { key: "dumbbell", label: "Musculation", icon: Dumbbell },
  { key: "trophy", label: "CrossFit", icon: Trophy },
  { key: "users", label: "Groupe", icon: Users },
  { key: "music", label: "Danse", icon: Music },
  { key: "layers", label: "Autre", icon: Layers },
];

const GYM_EQUIPMENT_OPTIONS = [
  { key: "cardio", label: "Cardio", icon: Heart },
  { key: "weights", label: "Poids libres", icon: Dumbbell },
  { key: "machines", label: "Machines guidées", icon: Star },
  { key: "crossfit", label: "CrossFit", icon: Trophy },
  { key: "pool", label: "Piscine", icon: Droplets },
  { key: "sauna", label: "Sauna", icon: Sparkles },
  { key: "hammam", label: "Hammam", icon: Bath },
  { key: "boxing", label: "Ring / Boxing", icon: ShieldCheck },
  { key: "yoga", label: "Studio yoga", icon: Heart },
  { key: "cycling", label: "Cycling", icon: PlayCircle },
  { key: "locker", label: "Vestiaires", icon: Lock },
  { key: "parking", label: "Parking", icon: ShieldCheck },
  { key: "wifi", label: "WiFi", icon: Wifi },
  { key: "ac", label: "Climatisation", icon: Snowflake },
];

const SECTION_ICON_OPTIONS = [
  { key: "bed", label: "Hébergement", icon: BedDouble },
  { key: "sparkles", label: "Wellness", icon: Sparkles },
  { key: "utensils", label: "Restauration", icon: UtensilsCrossed },
  { key: "dumbbell", label: "Fitness", icon: Dumbbell },
  { key: "calendar", label: "Événements", icon: CalendarDays },
  { key: "users", label: "Salle de réunion", icon: Users },
  { key: "briefcase", label: "Business", icon: Briefcase },
  { key: "heart", label: "Bien-être", icon: Heart },
  { key: "palmtree", label: "Loisirs", icon: Palmtree },
  { key: "shield", label: "Services", icon: ShieldCheck },
  { key: "play", label: "Bienvenue", icon: PlayCircle },
  { key: "star", label: "Premium", icon: Star },
  { key: "coffee", label: "Café", icon: Coffee },
  { key: "music", label: "Divertissement", icon: Music },
  { key: "layers", label: "Autre", icon: Layers },
];

const ITEM_ICON_OPTIONS = [
  { key: "bed", label: "Chambre", icon: BedDouble },
  { key: "home", label: "Résidence", icon: Home },
  { key: "heart", label: "Santé", icon: Heart },
  { key: "sparkles", label: "Spa", icon: Sparkles },
  { key: "dumbbell", label: "Fitness", icon: Dumbbell },
  { key: "utensils", label: "Restaurant", icon: UtensilsCrossed },
  { key: "coffee", label: "Café", icon: Coffee },
  { key: "music", label: "Musique", icon: Music },
  { key: "users", label: "Groupe", icon: Users },
  { key: "palmtree", label: "Détente", icon: Palmtree },
  { key: "star", label: "Premium", icon: Star },
  { key: "wifi", label: "WiFi", icon: Wifi },
  { key: "tv", label: "TV", icon: Tv },
  { key: "bath", label: "Bain", icon: Bath },
  { key: "briefcase", label: "Business", icon: Briefcase },
  { key: "calendar", label: "Événement", icon: CalendarDays },
  { key: "shield", label: "Sécurité", icon: ShieldCheck },
  { key: "layers", label: "Autre", icon: Layers },
];

const BED_TYPES = ["King", "Queen", "Twin", "Double", "Single", "Suite"];

const AMENITIES_OPTIONS = [
  { key: "wifi", label: "WiFi", icon: Wifi },
  { key: "ac", label: "Climatisation", icon: Snowflake },
  { key: "tv", label: "TV", icon: Tv },
  { key: "minibar", label: "Mini-bar", icon: Wine },
  { key: "bathroom", label: "Salle de bain", icon: Bath },
  { key: "balcony", label: "Balcon", icon: DoorOpen },
  { key: "safe", label: "Coffre-fort", icon: Lock },
];

const CATEGORIES = [
  "Hôtellerie",
  "Immobilier",
  "Commerce",
  "Wedding venue",
  "Restaurant",
  "Entreprise",
  "Gym & Fitness",
];

const emptyTour: Tour = {
  name: "",
  description: "",
  category: "",
  imageUrl: "",
  surface: null,
  tourUrl: "",
  latitude: null,
  longitude: null,
  location: "",
};

interface TourItem {
  id?: number;
  tourId: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number | null;
  currency: string;
  externalUrl: string;
  brand: string;
  tagSid: string;
  showAddToCart: boolean;
}

const emptyItem: TourItem = {
  tourId: 0,
  name: "",
  description: "",
  imageUrl: "",
  price: null,
  currency: "EUR",
  externalUrl: "",
  brand: "",
  tagSid: "",
  showAddToCart: true,
};

interface TourServiceItem {
  id?: number;
  tourId: number;
  name: string;
  description: string;
  imageUrl: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  tagSid: string;
}

const emptyService: TourServiceItem = {
  tourId: 0,
  name: "",
  description: "",
  imageUrl: "",
  phone: "",
  whatsapp: "",
  instagram: "",
  facebook: "",
  tagSid: "",
};

const Admin = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTour, setEditTour] = useState<Tour>(emptyTour);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [locationResults, setLocationResults] = useState<any[]>([]);
  const [searchingLocation, setSearchingLocation] = useState(false);
  // Items management
  const [itemsDialogOpen, setItemsDialogOpen] = useState(false);
  const [itemsTourId, setItemsTourId] = useState<number | null>(null);
  const [items, setItems] = useState<TourItem[]>([]);
  const [editItem, setEditItem] = useState<TourItem>(emptyItem);
  const [itemFormOpen, setItemFormOpen] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState(false);
  // Services management
  const [services, setServices] = useState<TourServiceItem[]>([]);
  const [editService, setEditService] = useState<TourServiceItem>(emptyService);
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const [isEditingService, setIsEditingService] = useState(false);
  const [serviceUploading, setServiceUploading] = useState(false);
  const [serviceDragOver, setServiceDragOver] = useState(false);
  const [activeEntityTab, setActiveEntityTab] = useState<"products" | "services">("products");
  // Tags for dropdown
  const [tourTags, setTourTags] = useState<{ name: string; sid: string; thumbnail?: string }[]>([]);
  const [tourTagsLoading, setTourTagsLoading] = useState(false);
  const [showAddTag, setShowAddTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  // Tag Finder modal
  const [itemsTourUrl, setItemsTourUrl] = useState("");
  const [tagFinderOpen, setTagFinderOpen] = useState(false);
  const [tagFinderTags, setTagFinderTags] = useState<TagInfo[]>([]);
  const [tagFinderLoading, setTagFinderLoading] = useState(false);
  const [tagFinderError, setTagFinderError] = useState("");
  // Hotel rooms
  const [hotelRooms, setHotelRooms] = useState<HotelRoom[]>([]);
  // Hotel menu sections (Canyon Ranch style)
  const [menuSections, setMenuSections] = useState<MenuSectionData[]>([]);
  // Gym & Fitness
  const [gymSpaces, setGymSpaces] = useState<GymSpace[]>([]);
  const [gymEquipment, setGymEquipment] = useState<string[]>([]);
  const [gymPlans, setGymPlans] = useState<GymPlan[]>([]);
  const [gymClasses, setGymClasses] = useState<GymClass[]>([]);
  const [gymSections, setGymSections] = useState<MenuSectionData[]>([]);
  const [gymCoaches, setGymCoaches] = useState<GymCoach[]>([]);
  // Immobilier
  const [immobilierData, setImmobilierData] = useState<ImmobilierData>({ ...DEFAULT_IMMOBILIER });
  const [immobilierRooms, setImmobilierRooms] = useState<ImmobilierRoom[]>([]);
  // Bottom strip visibility toggles
  const [bottomStrip, setBottomStrip] = useState<{ products: boolean; services: boolean; chambers: boolean; customSections?: Record<string, boolean> }>({ products: true, services: true, chambers: true, customSections: {} });
  // Matterport viewer feature toggles (all URL params)
  type MatterportFeatures = {
    dollhouse?: boolean; floorplan?: boolean;
    title?: boolean; vr?: boolean; floorSelector?: boolean;
    search?: boolean; guidedTour?: boolean;
    highlights?: boolean; highlightReel?: boolean;
    nameplate?: boolean; brand?: boolean; help?: boolean; mls?: boolean;
    measurements?: boolean; autoTour?: boolean;
    views?: boolean; pin?: boolean; portal?: boolean;
  };
  const [matterportFeatures, setMatterportFeatures] = useState<MatterportFeatures>({});
  // Tags for the create/edit dialog (auto-fetched from tour URL)
  const [dialogTags, setDialogTags] = useState<{ name: string; sid: string; thumbnail?: string }[]>([]);
  const [dialogTagsLoading, setDialogTagsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) { navigate("/login"); return; }
    fetch("/api/auth/verify", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => { if (!r.ok) throw new Error(); setAuthed(true); })
      .catch(() => { sessionStorage.removeItem("admin_token"); navigate("/login"); });
  }, [navigate]);

  const handleLogout = () => {
    const token = sessionStorage.getItem("admin_token");
    if (token) fetch("/api/auth/logout", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    sessionStorage.removeItem("admin_token");
    navigate("/login");
  };

  const fetchTours = () => {
    fetch("/api/tours")
      .then((res) => res.json())
      .then(setTours)
      .catch(() => toast({ title: "Erreur", description: "Impossible de charger les visites", variant: "destructive" }));
  };

  useEffect(() => {
    if (authed) fetchTours();
  }, [authed]);

  // Location search with Nominatim (debounced)
  useEffect(() => {
    if (locationQuery.length < 2) { setLocationResults([]); return; }
    const timer = setTimeout(() => {
      setSearchingLocation(true);
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}&limit=5&addressdetails=1`, {
        headers: { "Accept-Language": "fr" },
      })
        .then((res) => res.json())
        .then(setLocationResults)
        .catch(() => setLocationResults([]))
        .finally(() => setSearchingLocation(false));
    }, 400);
    return () => clearTimeout(timer);
  }, [locationQuery]);

  // Auto-fetch Matterport tags when tour URL changes in dialog
  const stripMdLinks = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const fetchDialogTags = async (tourUrl?: string, tourId?: number, editing?: boolean) => {
    const url = tourUrl ?? editTour.tourUrl;
    const id = tourId ?? editTour.id;
    const isEdit = editing ?? isEditing;
    if (!url) { setDialogTags([]); return; }
    let modelId: string | null = null;
    try { modelId = new URL(url).searchParams.get("m"); } catch {}
    if (!modelId) { setDialogTags([]); return; }
    setDialogTagsLoading(true);
    setDialogTags([]);

    // Try saved tags first (when editing existing tour)
    if (isEdit && id) {
      try {
        const savedRes = await fetch(`/api/tours/${id}/tags`);
        if (savedRes.ok) {
          const savedData = await savedRes.json();
          const saved = Array.isArray(savedData) ? savedData.map((t: any) => ({ name: t.name || "", sid: t.sid || "" })).filter((t: { name: string; sid: string }) => t.sid && !t.name.startsWith("360°")) : [];
          if (saved.length > 0) {
            setDialogTags(saved);
            setDialogTagsLoading(false);
            // Still fetch live in background to update
          }
        }
      } catch {}
    }

    // Fetch sweeps via hidden Matterport iframe + SDK (only reliable method)
    const fetchSdkData = (mid: string): Promise<{ sweeps: any[]; mattertags: any[] }> => {
      return new Promise((resolve) => {
        let done = false;
        const result = { sweeps: [] as any[], mattertags: [] as any[] };
        const finish = () => { if (done) return; done = true; clearTimeout(outerTimeout); cleanup(); resolve(result); };
        const outerTimeout = setTimeout(() => finish(), 30000);
        const iframe = document.createElement("iframe");
        iframe.style.cssText = "width:300px;height:300px;position:fixed;left:0;top:0;z-index:-1;opacity:0.01;pointer-events:none";
        iframe.allow = "xr-spatial-tracking";
        iframe.src = `https://my.matterport.com/show/?m=${mid}&applicationKey=b7uar4u57xdec0zw7dwygt7md&play=1&qs=1&title=0&brand=0&help=0&hl=0`;
        const cleanup = () => { try { document.body.removeChild(iframe); } catch {} };
        document.body.appendChild(iframe);

        const tryConnect = async () => {
          try {
            const { setupSdk } = await import("@matterport/sdk");
            console.log("[SdkFetch] connecting...");
            const sdk = await setupSdk("b7uar4u57xdec0zw7dwygt7md", { iframe, space: mid });
            console.log("[SdkFetch] connected, subscribing...");
            let pendingSubs = 2;
            const checkDone = () => { if (pendingSubs <= 0) { console.log("[SdkFetch] got", result.mattertags.length, "tags +", result.sweeps.length, "sweeps"); finish(); } };

            // Collect sweeps
            let sweepDebounce: any;
            const sweepSub = sdk.Sweep.data.subscribe({
              onAdded(_i: string, item: any) {
                result.sweeps.push(item);
                clearTimeout(sweepDebounce);
                sweepDebounce = setTimeout(() => { try { sweepSub.cancel(); } catch {} pendingSubs--; checkDone(); }, 3000);
              },
            });
            setTimeout(() => { try { sweepSub.cancel(); } catch {} if (pendingSubs > 0) { pendingSubs--; checkDone(); } }, 15000);

            // Collect mattertags
            let tagDebounce: any;
            const tagSub = sdk.Mattertag.data.subscribe({
              onAdded(_i: string, item: any) {
                result.mattertags.push(item);
                clearTimeout(tagDebounce);
                tagDebounce = setTimeout(() => { try { tagSub.cancel(); } catch {} pendingSubs--; checkDone(); }, 3000);
              },
            });
            setTimeout(() => { try { tagSub.cancel(); } catch {} if (pendingSubs > 0) { pendingSubs--; checkDone(); } }, 15000);
          } catch (err) {
            console.log("[SdkFetch] error:", err);
            finish();
          }
        };
        setTimeout(tryConnect, 3000);
        iframe.onerror = () => finish();
      });
    };

    let savedTags: { name: string; sid: string }[] = [];
    try {
      const sdkData = await fetchSdkData(modelId);

      const sweepOptions = sdkData.sweeps.map((s: any, idx: number) => {
        const sid = s.id || s.sid || s.uuid;
        const panoId = s.uuid || s.id || sid;
        return {
          name: `360° Vue ${idx + 1} — Étage ${s.floorInfo?.sequence ?? s.floor ?? '?'}`,
          sid,
          thumbnail: `https://my.matterport.com/api/player/models/${modelId}/panos/${panoId}/thumbnail`,
        };
      }).filter((t: any) => t.sid);

      const liveMattertags = sdkData.mattertags.map((t: any) => ({
        name: t.label || t.description || "(sans nom)",
        sid: t.sid || t.id,
      })).filter((t: { name: string; sid: string }) => t.sid);

      const combined = [...liveMattertags, ...sweepOptions];
      if (combined.length > 0) {
        setDialogTags(combined);
        savedTags = liveMattertags;
        if (isEdit && id) {
          fetch(`/api/tours/${id}/tags`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(savedTags),
          }).catch(() => {});
        }
      }
    } catch {}
    setDialogTagsLoading(false);
  };

  // Debounced auto-fetch when tour URL changes
  useEffect(() => {
    if (!dialogOpen || !editTour.tourUrl) { setDialogTags([]); return; }
    const timer = setTimeout(() => {
      fetchDialogTags(editTour.tourUrl, editTour.id, isEditing);
    }, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen, editTour.tourUrl]);

  const selectLocation = (place: any) => {
    setEditTour({
      ...editTour,
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon),
      location: place.display_name,
    });
    setLocationQuery(place.display_name);
    setLocationResults([]);
  };

  // Reverse geocoding: click on map → get address
  const handleMapClick = (lat: number, lng: number) => {
    setEditTour((prev) => ({ ...prev, latitude: lat, longitude: lng }));
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`, {
      headers: { "Accept-Language": "fr" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.display_name) {
          setEditTour((prev) => ({ ...prev, location: data.display_name }));
          setLocationQuery(data.display_name);
        }
      })
      .catch(() => {});
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Erreur", description: "Le fichier doit être une image", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setEditTour((prev) => ({ ...prev, imageUrl: data.url }));
        toast({ title: "Image uploadée" });
      } else {
        toast({ title: "Erreur upload", description: data.error || "Erreur inconnue", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur", description: "Échec de l'upload", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => setDragOver(false), []);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleServiceImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Erreur", description: "Le fichier doit être une image", variant: "destructive" });
      return;
    }
    setServiceUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setEditService((prev) => ({ ...prev, imageUrl: data.url }));
        toast({ title: "Image uploadée" });
      } else {
        toast({ title: "Erreur upload", description: data.error || "Erreur inconnue", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur", description: "Échec de l'upload", variant: "destructive" });
    } finally {
      setServiceUploading(false);
    }
  };

  const onServiceDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setServiceDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleServiceImageUpload(file);
  }, []);

  const onServiceDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setServiceDragOver(true);
  }, []);

  const onServiceDragLeave = useCallback(() => setServiceDragOver(false), []);

  const onServiceFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleServiceImageUpload(file);
  };

  // Item (product) image upload — drag & drop
  const [itemUploading, setItemUploading] = useState(false);
  const [itemDragOver, setItemDragOver] = useState(false);
  const handleItemImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Erreur", description: "Le fichier doit être une image", variant: "destructive" });
      return;
    }
    setItemUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setEditItem((prev) => ({ ...prev, imageUrl: data.url }));
        toast({ title: "Image uploadée" });
      } else {
        toast({ title: "Erreur upload", description: data.error || "Erreur inconnue", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur", description: "Échec de l'upload", variant: "destructive" });
    } finally {
      setItemUploading(false);
    }
  };
  const onItemDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setItemDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleItemImageUpload(file);
  }, []);
  const onItemDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setItemDragOver(true);
  }, []);
  const onItemDragLeave = useCallback(() => setItemDragOver(false), []);
  const onItemFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleItemImageUpload(file);
  };

  const openCreate = () => {
    setEditTour(emptyTour);
    setIsEditing(false);
    setLocationQuery("");
    setLocationResults([]);
    setHotelRooms([]);
    setMenuSections([]);
    setGymSpaces([]);
    setGymEquipment([]);
    setGymPlans([]);
    setGymClasses([]);
    setGymSections([]);
    setGymCoaches([]);
    setDialogOpen(true);
  };

  const openEdit = (tour: Tour) => {
    setEditTour({ ...tour });
    setIsEditing(true);
    setLocationQuery(tour.location || "");
    setLocationResults([]);
    // Restore hotel rooms from metadataJson
    if (tour.metadataJson) {
      try {
        const meta = JSON.parse(tour.metadataJson);
        setHotelRooms(meta.rooms || []);
        setMenuSections(meta.sections || []);
        // Gym data
        setGymSpaces(meta.spaces || []);
        setGymEquipment(meta.equipment || []);
        setGymPlans(meta.plans || []);
        setGymClasses(meta.classes || []);
        setGymSections(meta.gymSections || []);
        setGymCoaches(meta.coaches || []);
        setImmobilierData({ ...DEFAULT_IMMOBILIER, ...meta.immobilier });
        setImmobilierRooms(meta.immobilierRooms || []);
        setBottomStrip({ products: true, services: true, chambers: true, customSections: {}, ...(meta.bottomStrip || {}) });
        setMatterportFeatures({ ...(meta.matterportFeatures || {}) });
      } catch { setHotelRooms([]); setMenuSections([]); setGymSpaces([]); setGymEquipment([]); setGymPlans([]); setGymClasses([]); setGymSections([]); setGymCoaches([]); setImmobilierData({ ...DEFAULT_IMMOBILIER }); setImmobilierRooms([]); setBottomStrip({ products: true, services: true, chambers: true, customSections: {} }); setMatterportFeatures({}); }
    } else {
      setHotelRooms([]);
      setMenuSections([]);
      setGymSpaces([]);
      setGymEquipment([]);
      setGymPlans([]);
      setGymClasses([]);
      setGymSections([]);
      setGymCoaches([]);
      setImmobilierData({ ...DEFAULT_IMMOBILIER });
      setImmobilierRooms([]);
      setBottomStrip({ products: true, services: true, chambers: true, customSections: {} });
      setMatterportFeatures({});
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editTour.name || !editTour.category) {
      toast({ title: "Erreur", description: "Nom et catégorie sont obligatoires", variant: "destructive" });
      return;
    }
    // Attach hotel rooms as metadataJson when Hôtellerie
    const payload: Record<string, unknown> = { ...editTour };
    if (editTour.category === "Hôtellerie" && (hotelRooms.length > 0 || menuSections.length > 0)) {
      payload.metadataJson = JSON.stringify({ rooms: hotelRooms, sections: menuSections, bottomStrip, matterportFeatures });
    }
    if (editTour.category === "Gym & Fitness" && (gymSpaces.length > 0 || gymEquipment.length > 0 || gymPlans.length > 0 || gymClasses.length > 0 || gymSections.length > 0 || gymCoaches.length > 0)) {
      payload.metadataJson = JSON.stringify({ spaces: gymSpaces, equipment: gymEquipment, plans: gymPlans, classes: gymClasses, gymSections, coaches: gymCoaches, bottomStrip, matterportFeatures } as GymMetadata);
    }
    if (editTour.category === "Immobilier") {
      payload.metadataJson = JSON.stringify({ immobilier: immobilierData, immobilierRooms, bottomStrip, matterportFeatures });
    }
    // For other categories, save bottomStrip if any toggle is off
    if (!payload.metadataJson) {
      payload.metadataJson = JSON.stringify({ bottomStrip, matterportFeatures });
    } else {
      // Ensure bottomStrip is in existing metadataJson
      try {
        const existing = JSON.parse(payload.metadataJson as string);
        existing.bottomStrip = bottomStrip;
        existing.matterportFeatures = matterportFeatures;
        payload.metadataJson = JSON.stringify(existing);
      } catch {}
    }
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/tours/${editTour.id}` : "/api/tours";
    let res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    // Fallback: if 500 and we sent metadataJson, retry without it (column may not exist yet)
    if (!res.ok && payload.metadataJson) {
      const { metadataJson: _, ...fallback } = payload;
      res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fallback),
      });
    }
    if (res.ok) {
      const savedTour = await res.json().catch(() => null);
      const tourId = savedTour?.id || editTour.id;

      // Sync hotel rooms to chambers API so they appear in the bottom strip
      if (editTour.category === "Hôtellerie" && tourId) {
        try {
          // Delete existing chambers
          const existing = await fetch(`/api/tours/${tourId}/chambers`).then(r => r.ok ? r.json() : []).catch(() => []);
          for (const ch of existing) {
            await fetch(`/api/tours/${tourId}/chambers/${ch.id}`, { method: "DELETE" }).catch(() => {});
          }
          // Create new chambers from hotelRooms
          for (const room of hotelRooms) {
            if (!room.name) continue;
            await fetch(`/api/tours/${tourId}/chambers`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                tourId,
                name: room.name,
                description: [room.bedType, room.capacity ? `${room.capacity} pers.` : "", (room.amenities || []).join(", ")].filter(Boolean).join(" · "),
                imageUrl: room.imageUrl || "",
                price: room.price ?? null,
                currency: room.currency || "TND",
                tagSid: room.tagSid || "",
                bookingUrl: room.bookingUrl || "",
              }),
            }).catch(() => {});
          }
        } catch {}
      }

      toast({ title: isEditing ? "Visite modifiée" : "Visite créée" });
      setDialogOpen(false);
      fetchTours();
    } else {
      toast({ title: "Erreur", description: "Échec de l'enregistrement", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette visite ?")) return;
    const res = await fetch(`/api/tours/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Visite supprimée" });
      fetchTours();
    }
  };

  // ===== ITEMS MANAGEMENT =====
  const fetchItems = (tourId: number) => {
    fetch(`/api/tours/${tourId}/items`)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]));
  };

  const openItems = (tour: Tour) => {
    if (!tour.id) return;
    setItemsTourId(tour.id);
    setItemsTourUrl(tour.tourUrl || "");
    fetchItems(tour.id);
    fetchServices(tour.id);
    // Auto-fetch tags: try saved tags first, then fetch live from Matterport
    setTourTagsLoading(true);
    setTourTags([]);
    const tourUrl = tour.tourUrl || "";
    // Extract modelId from tour URL
    let modelId: string | null = null;
    try { modelId = new URL(tourUrl).searchParams.get("m"); } catch {}

    fetch(`/api/tours/${tour.id}/tags`)
      .then((r) => r.ok ? r.json() : [])
      .then(async (savedData) => {
        const saved = Array.isArray(savedData) ? savedData.map((t: any) => ({ name: t.name || "", sid: t.sid || "" })).filter((t: { name: string; sid: string }) => !t.name.startsWith("360°")) : [];
        if (saved.length > 0) {
          setTourTags(saved);
          setTourTagsLoading(false);
        }
        // Fetch live tags + sweeps via SDK iframe
        if (modelId) {
          try {
            const fetchSdkData = (mid: string): Promise<{ sweeps: any[]; mattertags: any[] }> => {
              return new Promise((resolve) => {
                let done = false;
                const result = { sweeps: [] as any[], mattertags: [] as any[] };
                const finish = () => { if (done) return; done = true; clearTimeout(outerTimeout); cleanup(); resolve(result); };
                const outerTimeout = setTimeout(() => finish(), 30000);
                const iframe = document.createElement("iframe");
                iframe.style.cssText = "width:300px;height:300px;position:fixed;left:0;top:0;z-index:-1;opacity:0.01;pointer-events:none";
                iframe.allow = "xr-spatial-tracking";
                iframe.src = `https://my.matterport.com/show/?m=${mid}&applicationKey=b7uar4u57xdec0zw7dwygt7md&play=1&qs=1&title=0&brand=0&help=0&hl=0`;
                const cleanup = () => { try { document.body.removeChild(iframe); } catch {} };
                document.body.appendChild(iframe);
                const tryConnect = async () => {
                  try {
                    const { setupSdk } = await import("@matterport/sdk");
                    const sdk = await setupSdk("b7uar4u57xdec0zw7dwygt7md", { iframe, space: mid });
                    let pendingSubs = 2;
                    const checkDone = () => { if (pendingSubs <= 0) finish(); };
                    let sweepDebounce: any;
                    const sweepSub = sdk.Sweep.data.subscribe({
                      onAdded(_i: string, item: any) {
                        result.sweeps.push(item);
                        clearTimeout(sweepDebounce);
                        sweepDebounce = setTimeout(() => { try { sweepSub.cancel(); } catch {} pendingSubs--; checkDone(); }, 3000);
                      },
                    });
                    setTimeout(() => { try { sweepSub.cancel(); } catch {} if (pendingSubs > 0) { pendingSubs--; checkDone(); } }, 15000);
                    let tagDebounce: any;
                    const tagSub = sdk.Mattertag.data.subscribe({
                      onAdded(_i: string, item: any) {
                        result.mattertags.push(item);
                        clearTimeout(tagDebounce);
                        tagDebounce = setTimeout(() => { try { tagSub.cancel(); } catch {} pendingSubs--; checkDone(); }, 3000);
                      },
                    });
                    setTimeout(() => { try { tagSub.cancel(); } catch {} if (pendingSubs > 0) { pendingSubs--; checkDone(); } }, 15000);
                  } catch { finish(); }
                };
                setTimeout(tryConnect, 3000);
                iframe.onerror = () => finish();
              });
            };

            const sdkData = await fetchSdkData(modelId);
            const liveMattertags = sdkData.mattertags.map((t: any) => ({
              name: t.label || t.description || "(sans nom)",
              sid: t.sid || t.id,
            })).filter((t: { name: string; sid: string }) => t.sid);
            const sweepOptions = sdkData.sweeps.map((s: any, idx: number) => {
              const sid = s.id || s.sid || s.uuid;
              const panoId = s.uuid || s.id || sid;
              return {
                name: `360° Vue ${idx + 1} — Étage ${s.floorInfo?.sequence ?? s.floor ?? '?'}`,
                sid,
                thumbnail: `https://my.matterport.com/api/player/models/${modelId}/panos/${panoId}/thumbnail`,
              };
            }).filter((t: any) => t.sid);

            const combined = [...(liveMattertags.length > 0 ? liveMattertags : saved), ...sweepOptions];
            if (combined.length > 0) {
              setTourTags(combined);
              // Save mattertags to DB
              if (liveMattertags.length > 0) {
                fetch(`/api/tours/${tour.id}/tags`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(liveMattertags),
                }).catch(() => {});
              }
            }
          } catch {}
        }
        setTourTagsLoading(false);
      })
      .catch(() => { setTourTags([]); setTourTagsLoading(false); });
    setItemsDialogOpen(true);
    setItemFormOpen(false);
    setServiceFormOpen(false);
    setActiveEntityTab("products");
  };

  const openCreateItem = () => {
    setEditItem({ ...emptyItem, tourId: itemsTourId || 0 });
    setIsEditingItem(false);
    setItemFormOpen(true);
  };

  const openEditItem = (item: TourItem) => {
    setEditItem({ ...item, showAddToCart: item.showAddToCart !== false });
    setIsEditingItem(true);
    setItemFormOpen(true);
  };

  const handleSaveItem = async () => {
    if (!editItem.name) {
      toast({ title: "Erreur", description: "Le nom est obligatoire", variant: "destructive" });
      return;
    }
    const method = isEditingItem ? "PUT" : "POST";
    const url = isEditingItem
      ? `/api/tours/${itemsTourId}/items/${editItem.id}`
      : `/api/tours/${itemsTourId}/items`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editItem),
    });
    if (res.ok) {
      toast({ title: isEditingItem ? "Produit modifié" : "Produit ajouté" });
      setItemFormOpen(false);
      if (itemsTourId) fetchItems(itemsTourId);
    } else {
      toast({ title: "Erreur", description: "Échec de l'enregistrement", variant: "destructive" });
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!confirm("Supprimer ce produit ?")) return;
    const res = await fetch(`/api/tours/${itemsTourId}/items/${itemId}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Produit supprimé" });
      if (itemsTourId) fetchItems(itemsTourId);
    }
  };

  // ===== TAG FINDER =====
  const extractModelId = (url: string): string | null => {
    try {
      const u = new URL(url);
      return u.searchParams.get("m");
    } catch { return null; }
  };

  const scanTags = async () => {
    const modelId = extractModelId(itemsTourUrl);
    if (!modelId) {
      setTagFinderError("URL invalide. Utilisez le format: https://my.matterport.com/show/?m=XXXX");
      return;
    }

    setTagFinderLoading(true);
    setTagFinderError("");
    setTagFinderTags([]);

    try {
      // Fetch mattertags via hidden iframe + SDK
      const rawTags: any[] = await new Promise((resolve) => {
        let done = false;
        const finish = (result: any[]) => { if (done) return; done = true; clearTimeout(outerTimeout); cleanup(); resolve(result); };
        const outerTimeout = setTimeout(() => finish([]), 30000);
        const iframe = document.createElement("iframe");
        iframe.style.cssText = "width:300px;height:300px;position:fixed;left:0;top:0;z-index:-1;opacity:0.01;pointer-events:none";
        iframe.allow = "xr-spatial-tracking";
        iframe.src = `https://my.matterport.com/show/?m=${modelId}&applicationKey=b7uar4u57xdec0zw7dwygt7md&play=1&qs=1&title=0&brand=0&help=0&hl=0`;
        const cleanup = () => { try { document.body.removeChild(iframe); } catch {} };
        document.body.appendChild(iframe);
        const tryConnect = async () => {
          try {
            const { setupSdk } = await import("@matterport/sdk");
            const sdk = await setupSdk("b7uar4u57xdec0zw7dwygt7md", { iframe, space: modelId });
            const collected: any[] = [];
            let debounce: any;
            const sub = sdk.Mattertag.data.subscribe({
              onAdded(_index: string, item: any) {
                collected.push(item);
                clearTimeout(debounce);
                debounce = setTimeout(() => { try { sub.cancel(); } catch {} finish(collected); }, 3000);
              },
            });
            setTimeout(() => { try { sub.cancel(); } catch {} finish(collected); }, 20000);
          } catch { finish([]); }
        };
        setTimeout(tryConnect, 3000);
        iframe.onerror = () => finish([]);
      });

      const allTags: TagInfo[] = rawTags.map((t: any) => ({
        sid: t.sid,
        label: stripMdLinks(t.label || "(sans nom)"),
        description: (t.description || "").slice(0, 100),
      }));

      setTagFinderTags(allTags);
      if (allTags.length === 0) {
        setTagFinderError("Aucun tag trouvé dans cette visite.");
      } else {
        // Auto-save discovered tags to the tour for future use
        const updatedTags = allTags.map((t) => ({ name: t.label, sid: t.sid }));
        setTourTags(updatedTags);
        if (itemsTourId) {
          fetch(`/api/tours/${itemsTourId}/tags`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTags),
          }).catch(() => {});
        }
      }
    } catch (err: any) {
      setTagFinderError(err.message || "Erreur lors de la récupération des tags");
    } finally {
      setTagFinderLoading(false);
    }
  };

  const selectTagForProduct = (tag: TagInfo) => {
    setEditItem((prev) => ({ ...prev, tagSid: tag.sid }));
    setTagFinderOpen(false);
    toast({ title: "Tag sélectionné", description: `${tag.label} (SID: ${tag.sid.slice(0, 12)}...)` });
  };

  // ===== SERVICES MANAGEMENT =====
  const fetchServices = (tourId: number) => {
    fetch(`/api/tours/${tourId}/services`)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => setServices([]));
  };

  const openCreateService = () => {
    setEditService({ ...emptyService, tourId: itemsTourId || 0 });
    setIsEditingService(false);
    setServiceFormOpen(true);
  };

  const openEditService = (svc: TourServiceItem) => {
    setEditService({ ...svc });
    setIsEditingService(true);
    setServiceFormOpen(true);
  };

  const handleSaveService = async () => {
    if (!editService.name) {
      toast({ title: "Erreur", description: "Le nom est obligatoire", variant: "destructive" });
      return;
    }
    const method = isEditingService ? "PUT" : "POST";
    const url = isEditingService
      ? `/api/tours/${itemsTourId}/services/${editService.id}`
      : `/api/tours/${itemsTourId}/services`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editService),
    });
    if (res.ok) {
      toast({ title: isEditingService ? "Service modifié" : "Service ajouté" });
      setServiceFormOpen(false);
      if (itemsTourId) fetchServices(itemsTourId);
    } else {
      toast({ title: "Erreur", description: "Échec de l'enregistrement", variant: "destructive" });
    }
  };

  const handleDeleteService = async (serviceId: number) => {
    if (!confirm("Supprimer ce service ?")) return;
    const res = await fetch(`/api/tours/${itemsTourId}/services/${serviceId}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Service supprimé" });
      if (itemsTourId) fetchServices(itemsTourId);
    }
  };

  if (!authed) return null;

  return (
    <Layout>
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4"
            >
              Gestion des Visites
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between mb-8">
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Déconnexion
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/admin/analytics")} className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Analytics Dashboard
              </Button>
              <Button onClick={openCreate} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Ajouter une visite
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl overflow-hidden bg-card shadow-soft"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  {tour.imageUrl ? (
                    <img src={tour.imageUrl} alt={tour.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">{tour.name}</h3>
                  <span className="text-xs text-secondary font-medium">{tour.category}</span>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{tour.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-muted-foreground">{tour.surface ? `${tour.surface} m²` : ""}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        const url = `${window.location.origin}/share/${tour.id}?clean=true`;
                        navigator.clipboard.writeText(url).then(() => {
                          toast({ title: "Lien copié", description: url });
                        });
                      }} title="Copier le lien direct (sans Retour / autres visites)">
                        <Link2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openItems(tour)} title="Gérer les produits">
                        <ShoppingBag className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/admin/stats/${tour.id}`)} title="Statistiques">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/admin/staging/${tour.id}`)} title="Virtual Staging">
                        <Layers className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openEdit(tour)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(tour.id!)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Modifier la visite" : "Nouvelle visite"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Nom</label>
              <Input value={editTour.name} onChange={(e) => setEditTour({ ...editTour, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea value={editTour.description} onChange={(e) => setEditTour({ ...editTour, description: e.target.value })} rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Catégorie</label>
              <Select value={editTour.category} onValueChange={(v) => setEditTour({ ...editTour, category: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Image</label>
              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
                  dragOver ? "border-secondary bg-secondary/10" : "border-muted-foreground/30 hover:border-secondary/50"
                }`}
              >
                {editTour.imageUrl ? (
                  <div className="relative">
                    <img src={editTour.imageUrl} alt="preview" className="w-full h-40 object-cover rounded-lg" />
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditTour({ ...editTour, imageUrl: "" }); }}
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploading ? "Upload en cours..." : "Glisser-déposer une image ici ou cliquer"}
                    </p>
                    <input type="file" accept="image/*" className="hidden" onChange={onFileSelect} />
                  </label>
                )}
              </div>
            </div>

            {/* Bottom Strip Visibility Toggles */}
            <div className="rounded-xl border p-4 space-y-3">
              <label className="text-sm font-medium block">Barre inférieure (Tour Viewer)</label>
              <p className="text-xs text-muted-foreground">Choisir les sections visibles dans la barre en bas du tour</p>
              <div className="flex flex-wrap gap-3">
                {(["products", "services", "chambers"] as const).map((key) => {
                  const labels = { products: "Produits", services: "Services", chambers: editTour.category === "Immobilier" ? "Pièces" : "Chambres" };
                  const active = bottomStrip[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setBottomStrip({ ...bottomStrip, [key]: !active })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/50 text-muted-foreground border-muted-foreground/20"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        active ? "border-primary-foreground" : "border-muted-foreground/40"
                      }`}>
                        {active && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                      </div>
                      {labels[key]}
                    </button>
                  );
                })}
                {/* Custom sections toggles (hotel menuSections + gym gymSections) */}
                {(() => {
                  const customs: { key: string; label: string; iconKey: string }[] = [];
                  if (editTour.category === "Hôtellerie") {
                    menuSections.forEach((s, i) => {
                      const title = (s.title || "").trim();
                      if (title) customs.push({ key: title, label: title, iconKey: s.icon });
                    });
                  }
                  if (editTour.category === "Gym & Fitness") {
                    (gymSections || []).forEach((s: { title?: string; icon?: string }, i: number) => {
                      const title = (s.title || "").trim();
                      if (title) customs.push({ key: title, label: title, iconKey: s.icon || "layers" });
                    });
                  }
                  return customs.map(({ key, label, iconKey }) => {
                    const cs = bottomStrip.customSections || {};
                    const active = cs[key] !== false; // default ON
                    const IconObj = SECTION_ICON_OPTIONS.find(o => o.key === iconKey);
                    const Icn = IconObj?.icon || Layers;
                    return (
                      <button
                        key={`cs-${key}`}
                        type="button"
                        onClick={() => setBottomStrip({ ...bottomStrip, customSections: { ...cs, [key]: !active } })}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                          active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted/50 text-muted-foreground border-muted-foreground/20"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          active ? "border-primary-foreground" : "border-muted-foreground/40"
                        }`}>
                          {active && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                        </div>
                        <Icn className="w-3.5 h-3.5" />
                        {label}
                      </button>
                    );
                  });
                })()}
              </div>
              {((editTour.category === "Hôtellerie" && menuSections.filter(s => (s.title || "").trim()).length === 0) ||
                (editTour.category === "Gym & Fitness" && (gymSections || []).filter((s: { title?: string }) => (s.title || "").trim()).length === 0)) && (
                <p className="text-xs text-muted-foreground italic">💡 Ajoutez des sections personnalisées ci-dessous pour les afficher dans la barre inférieure.</p>
              )}
            </div>

            {/* Matterport Viewer Features */}
            <div className="rounded-xl border p-4 space-y-4">
              <label className="text-sm font-medium block">Fonctionnalités Matterport</label>
              <p className="text-xs text-muted-foreground">Choisir les contrôles et fonctionnalités affichés dans le viewer Matterport</p>
              {(() => {
                const groups: { title: string; items: { key: keyof typeof matterportFeatures; label: string }[] }[] = [
                  {
                    title: "Modes de vue",
                    items: [
                      { key: "dollhouse", label: "Dollhouse" },
                      { key: "floorplan", label: "Plan d'étage" },
                      { key: "floorSelector", label: "Sélecteur d'étage" },
                      { key: "vr", label: "Mode VR" },
                    ],
                  },
                  {
                    title: "Highlights & Tour",
                    items: [
                      { key: "highlights", label: "Highlights" },
                      { key: "highlightReel", label: "Bande de highlights" },
                      { key: "guidedTour", label: "Visite guidée" },
                      { key: "autoTour", label: "Auto Tour" },
                      { key: "views", label: "Vues" },
                    ],
                  },
                  {
                    title: "Outils",
                    items: [
                      { key: "measurements", label: "Mesures" },
                      { key: "search", label: "Recherche" },
                      { key: "pin", label: "Pin" },
                      { key: "portal", label: "Portail" },
                    ],
                  },
                  {
                    title: "Branding & Infos",
                    items: [
                      { key: "title", label: "Titre" },
                      { key: "nameplate", label: "Nameplate" },
                      { key: "brand", label: "Branding Matterport" },
                      { key: "mls", label: "MLS" },
                      { key: "help", label: "Aide" },
                    ],
                  },
                ];
                return groups.map((g) => (
                  <div key={g.title} className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{g.title}</p>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map(({ key, label }) => {
                        const active = !!matterportFeatures[key];
                        return (
                          <button
                            key={String(key)}
                            type="button"
                            onClick={() => setMatterportFeatures({ ...matterportFeatures, [key]: !active })}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                              active
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted/50 text-muted-foreground border-muted-foreground/20"
                            }`}
                          >
                            <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                              active ? "border-primary-foreground" : "border-muted-foreground/40"
                            }`}>
                              {active && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                            </div>
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Hotel Rooms — only for Hôtellerie */}
            {editTour.category === "Hôtellerie" && (
              <div className="space-y-4">
                {/* ── Menu Sections (Canyon Ranch style) ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Layers className="w-4 h-4" /> Sections du menu
                    </label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setMenuSections([...menuSections, { title: "", icon: "layers", items: [] }])}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Section
                    </Button>
                  </div>
                  {menuSections.map((sec, sIdx) => {
                    const SecIconObj = SECTION_ICON_OPTIONS.find(o => o.key === sec.icon);
                    return (
                      <div key={sIdx} className="border border-border rounded-xl overflow-hidden">
                        {/* Section header */}
                        <div className="bg-muted/50 px-3 py-2 flex items-center gap-2">
                          <Select
                            value={sec.icon}
                            onValueChange={(v) => {
                              const updated = [...menuSections];
                              updated[sIdx] = { ...sec, icon: v };
                              setMenuSections(updated);
                            }}
                          >
                            <SelectTrigger className="w-[110px] h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {SECTION_ICON_OPTIONS.map((o) => (
                                <SelectItem key={o.key} value={o.key}>
                                  <span className="flex items-center gap-1.5"><o.icon className="w-3.5 h-3.5" />{o.label}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            value={sec.title}
                            onChange={(e) => {
                              const updated = [...menuSections];
                              updated[sIdx] = { ...sec, title: e.target.value };
                              setMenuSections(updated);
                            }}
                            placeholder="Titre de la section"
                            className="h-8 text-sm flex-1"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => setMenuSections(menuSections.filter((_, i) => i !== sIdx))}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        {/* Section items */}
                        <div className="p-3 space-y-2">
                          {sec.items.map((item, iIdx) => (
                            <div key={iIdx} className="flex items-center gap-2">
                              <Select
                                value={item.icon}
                                onValueChange={(v) => {
                                  const updated = [...menuSections];
                                  const items = [...sec.items];
                                  items[iIdx] = { ...item, icon: v };
                                  updated[sIdx] = { ...sec, items };
                                  setMenuSections(updated);
                                }}
                              >
                                <SelectTrigger className="w-[90px] h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {ITEM_ICON_OPTIONS.map((o) => (
                                    <SelectItem key={o.key} value={o.key}>
                                      <span className="flex items-center gap-1.5"><o.icon className="w-3 h-3" />{o.label}</span>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Input
                                value={item.name}
                                onChange={(e) => {
                                  const updated = [...menuSections];
                                  const items = [...sec.items];
                                  items[iIdx] = { ...item, name: e.target.value };
                                  updated[sIdx] = { ...sec, items };
                                  setMenuSections(updated);
                                }}
                                placeholder="Nom de l'élément"
                                className="h-8 text-sm flex-1"
                              />
                              <Select
                                value={item.tagSid?.startsWith("http") ? "__link__" : (item.tagSid || "__none__")}
                                onValueChange={(v) => {
                                  const updated = [...menuSections];
                                  const items = [...sec.items];
                                  items[iIdx] = { ...item, tagSid: v === "__none__" ? "" : v === "__link__" ? "https://" : v };
                                  updated[sIdx] = { ...sec, items };
                                  setMenuSections(updated);
                                }}
                              >
                                <SelectTrigger className="h-8 text-xs w-[200px]">
                                  <SelectValue placeholder={dialogTagsLoading ? "Chargement..." : dialogTags.length === 0 ? "Aucun tag" : "Tag"} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="__none__">Aucun tag</SelectItem>
                                  <SelectItem value="__link__">📍 Coller un lien 360°</SelectItem>
                                  {dialogTags.map((tag) => (
                                    <SelectItem key={tag.sid} value={tag.sid}>
                                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{tag.name}</span>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {item.tagSid?.startsWith("http") && (
                                <Input
                                  value={item.tagSid?.startsWith("http") ? item.tagSid : ""}
                                  onChange={(e) => {
                                    const updated = [...menuSections];
                                    const items = [...sec.items];
                                    items[iIdx] = { ...item, tagSid: e.target.value };
                                    updated[sIdx] = { ...sec, items };
                                    setMenuSections(updated);
                                  }}
                                  placeholder="https://my.matterport.com/show/?m=...&ss=48&sr=..."
                                  className="h-8 text-xs w-[280px]"
                                />
                              )}
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                                onClick={() => {
                                  const updated = [...menuSections];
                                  updated[sIdx] = { ...sec, items: sec.items.filter((_, i) => i !== iIdx) };
                                  setMenuSections(updated);
                                }}
                              >
                                <X className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="w-full h-8 text-xs text-muted-foreground"
                            onClick={() => {
                              const updated = [...menuSections];
                              updated[sIdx] = { ...sec, items: [...sec.items, { name: "", icon: "layers", tagSid: "" }] };
                              setMenuSections(updated);
                            }}
                          >
                            <Plus className="w-3.5 h-3.5 mr-1" /> Ajouter un élément
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  {menuSections.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-2">Aucune section ajoutée — Cliquez + Section pour créer un menu style Canyon Ranch</p>
                  )}
                </div>

                {/* ── Chambres détaillées ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <BedDouble className="w-4 h-4" /> Chambres
                    </label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setHotelRooms([...hotelRooms, { name: "", tagSid: "", bedType: "", capacity: null, amenities: [], imageUrl: "", price: null, currency: "TND", bookingUrl: "" }])}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Chambre
                    </Button>
                  </div>
                  {hotelRooms.map((room, idx) => (
                    <div key={idx} className="border border-border rounded-xl p-4 space-y-3 relative">
                      <button
                        type="button"
                        onClick={() => setHotelRooms(hotelRooms.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-xs font-semibold text-muted-foreground">Chambre {idx + 1}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Nom de la chambre</label>
                          <Input
                            value={room.name}
                            onChange={(e) => {
                              const updated = [...hotelRooms];
                              updated[idx] = { ...room, name: e.target.value };
                              setHotelRooms(updated);
                            }}
                            placeholder="Suite Deluxe"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Tag Matterport (SID)</label>
                          <Select
                            value={room.tagSid?.startsWith("http") ? "__link__" : (room.tagSid || "__none__")}
                            onValueChange={(v) => {
                              const updated = [...hotelRooms];
                              updated[idx] = { ...room, tagSid: v === "__none__" ? "" : v === "__link__" ? "https://" : v };
                              setHotelRooms(updated);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={dialogTagsLoading ? "Chargement..." : dialogTags.length === 0 ? "Aucun tag" : "Choisir un tag"} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__none__">Aucun tag</SelectItem>
                              <SelectItem value="__link__">📍 Coller un lien 360°</SelectItem>
                              {dialogTags.map((tag) => (
                                <SelectItem key={tag.sid} value={tag.sid}>
                                  <span className="flex items-center gap-2">
                                    {tag.thumbnail ? (
                                      <img src={tag.thumbnail} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    ) : (
                                      <Tag className="w-3 h-3 flex-shrink-0" />
                                    )}
                                    <span className="truncate">{tag.name}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {room.tagSid?.startsWith("http") && (
                            <Input
                              value={room.tagSid}
                              onChange={(e) => {
                                const updated = [...hotelRooms];
                                updated[idx] = { ...room, tagSid: e.target.value };
                                setHotelRooms(updated);
                              }}
                              placeholder="https://my.matterport.com/show/?m=...&ss=48&sr=..."
                              className="mt-2 text-xs"
                            />
                          )}
                        </div>
                      </div>
                      {/* Image URL */}
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Image de la chambre</label>
                        <div className="flex gap-2 items-center">
                          <Input
                            value={room.imageUrl || ""}
                            onChange={(e) => {
                              const updated = [...hotelRooms];
                              updated[idx] = { ...room, imageUrl: e.target.value };
                              setHotelRooms(updated);
                            }}
                            placeholder="https://..."
                            className="flex-1"
                          />
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const formData = new FormData();
                                formData.append("file", file);
                                try {
                                  const res = await fetch("/api/upload", { method: "POST", body: formData });
                                  const data = await res.json();
                                  if (data.url) {
                                    const updated = [...hotelRooms];
                                    updated[idx] = { ...room, imageUrl: data.url };
                                    setHotelRooms(updated);
                                    toast({ title: "Image uploadée ✓" });
                                  }
                                } catch {
                                  toast({ title: "Erreur upload", variant: "destructive" });
                                }
                              }}
                            />
                          </label>
                        </div>
                        {room.imageUrl && (
                          <img src={room.imageUrl} alt={room.name} className="w-16 h-16 rounded-lg object-cover mt-2 border border-border" />
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Type de lit</label>
                          <Select
                            value={room.bedType}
                            onValueChange={(v) => {
                              const updated = [...hotelRooms];
                              updated[idx] = { ...room, bedType: v };
                              setHotelRooms(updated);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir" />
                            </SelectTrigger>
                            <SelectContent>
                              {BED_TYPES.map((bt) => (
                                <SelectItem key={bt} value={bt}>{bt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Capacité</label>
                          <Input
                            type="number"
                            min={1}
                            value={room.capacity ?? ""}
                            onChange={(e) => {
                              const updated = [...hotelRooms];
                              updated[idx] = { ...room, capacity: e.target.value ? Number(e.target.value) : null };
                              setHotelRooms(updated);
                            }}
                            placeholder="2"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Prix / nuit</label>
                          <Input
                            type="number"
                            min={0}
                            step="any"
                            value={room.price ?? ""}
                            onChange={(e) => {
                              const updated = [...hotelRooms];
                              updated[idx] = { ...room, price: e.target.value ? Number(e.target.value) : null };
                              setHotelRooms(updated);
                            }}
                            placeholder="150"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Devise</label>
                          <Input
                            value={room.currency || "TND"}
                            onChange={(e) => {
                              const updated = [...hotelRooms];
                              updated[idx] = { ...room, currency: e.target.value };
                              setHotelRooms(updated);
                            }}
                            placeholder="TND"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Lien de réservation (optionnel)</label>
                        <Input
                          type="url"
                          value={room.bookingUrl || ""}
                          onChange={(e) => {
                            const updated = [...hotelRooms];
                            updated[idx] = { ...room, bookingUrl: e.target.value };
                            setHotelRooms(updated);
                          }}
                          placeholder="https://booking.com/..."
                        />
                        <p className="text-[11px] text-muted-foreground mt-1">Si vide, le bouton "Réserver maintenant" ouvrira WhatsApp.</p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Équipements</label>
                        <div className="flex flex-wrap gap-2">
                          {AMENITIES_OPTIONS.map((a) => {
                            const active = room.amenities.includes(a.key);
                            return (
                              <button
                                key={a.key}
                                type="button"
                                onClick={() => {
                                  const updated = [...hotelRooms];
                                  const newAmenities = active
                                    ? room.amenities.filter((k) => k !== a.key)
                                    : [...room.amenities, a.key];
                                  updated[idx] = { ...room, amenities: newAmenities };
                                  setHotelRooms(updated);
                                }}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                  active
                                    ? "bg-secondary text-secondary-foreground border-secondary"
                                    : "bg-muted text-muted-foreground border-border hover:border-secondary/50"
                                }`}
                              >
                                <a.icon className="w-3.5 h-3.5" />
                                {a.label}
                              </button>
                            );
                          })}
                          {/* Custom amenities */}
                          {room.amenities.filter(k => !AMENITIES_OPTIONS.some(a => a.key === k)).map((custom) => (
                            <span
                              key={custom}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border bg-secondary text-secondary-foreground border-secondary"
                            >
                              <Star className="w-3.5 h-3.5" />
                              {custom}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...hotelRooms];
                                  updated[idx] = { ...room, amenities: room.amenities.filter(k => k !== custom) };
                                  setHotelRooms(updated);
                                }}
                                className="ml-0.5 hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                          {/* + Add custom amenity */}
                          <button
                            type="button"
                            onClick={() => {
                              const name = prompt("Nom de l'équipement :");
                              if (name && name.trim()) {
                                const key = name.trim();
                                if (!room.amenities.includes(key)) {
                                  const updated = [...hotelRooms];
                                  updated[idx] = { ...room, amenities: [...room.amenities, key] };
                                  setHotelRooms(updated);
                                }
                              }
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-dashed border-muted-foreground/40 text-muted-foreground hover:border-secondary hover:text-secondary transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {hotelRooms.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-3">Aucune chambre ajoutée</p>
                  )}
                </div>
              </div>
            )}

            {/* ══════ Immobilier Form ══════ */}
            {editTour.category === "Immobilier" && (
              <div className="space-y-4">
                {/* Type de bien & Transaction */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block flex items-center gap-2"><Home className="w-4 h-4" /> Type de bien</label>
                    <Select value={immobilierData.propertyType} onValueChange={(v) => setImmobilierData({ ...immobilierData, propertyType: v })}>
                      <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                      <SelectContent>
                        {["Appartement", "Maison", "Villa", "Studio", "Duplex", "Penthouse", "Terrain", "Local commercial", "Bureau"].map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block flex items-center gap-2"><Banknote className="w-4 h-4" /> Type de transaction</label>
                    <Select value={immobilierData.transactionType} onValueChange={(v) => setImmobilierData({ ...immobilierData, transactionType: v })}>
                      <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                      <SelectContent>
                        {["Vente", "Location", "Location saisonnière", "Colocation"].map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Prix */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="text-sm font-medium mb-1 block">Prix</label>
                    <Input type="number" value={immobilierData.price ?? ""} onChange={(e) => setImmobilierData({ ...immobilierData, price: e.target.value ? Number(e.target.value) : null })} placeholder="350000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Devise</label>
                    <Select value={immobilierData.currency} onValueChange={(v) => setImmobilierData({ ...immobilierData, currency: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["TND", "EUR", "USD"].map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Pièces */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block flex items-center gap-2"><DoorOpen className="w-4 h-4" /> Pièces</label>
                    <Input type="number" min={0} value={immobilierData.rooms ?? ""} onChange={(e) => setImmobilierData({ ...immobilierData, rooms: e.target.value ? Number(e.target.value) : null })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block flex items-center gap-2"><BedDouble className="w-4 h-4" /> Chambres</label>
                    <Input type="number" min={0} value={immobilierData.bedrooms ?? ""} onChange={(e) => setImmobilierData({ ...immobilierData, bedrooms: e.target.value ? Number(e.target.value) : null })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block flex items-center gap-2"><Bath className="w-4 h-4" /> Salles de bain</label>
                    <Input type="number" min={0} value={immobilierData.bathrooms ?? ""} onChange={(e) => setImmobilierData({ ...immobilierData, bathrooms: e.target.value ? Number(e.target.value) : null })} />
                  </div>
                </div>

                {/* Étage & Année */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Étage</label>
                    <Input type="number" min={0} value={immobilierData.floor ?? ""} onChange={(e) => setImmobilierData({ ...immobilierData, floor: e.target.value ? Number(e.target.value) : null })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Nb. étages</label>
                    <Input type="number" min={0} value={immobilierData.totalFloors ?? ""} onChange={(e) => setImmobilierData({ ...immobilierData, totalFloors: e.target.value ? Number(e.target.value) : null })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Année construction</label>
                    <Input type="number" min={1900} max={2099} value={immobilierData.yearBuilt ?? ""} onChange={(e) => setImmobilierData({ ...immobilierData, yearBuilt: e.target.value ? Number(e.target.value) : null })} />
                  </div>
                </div>

                {/* État & Chauffage & Énergie */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">État</label>
                    <Select value={immobilierData.condition} onValueChange={(v) => setImmobilierData({ ...immobilierData, condition: v })}>
                      <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                      <SelectContent>
                        {["Neuf", "Bon état", "Rénové", "À rénover"].map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Chauffage</label>
                    <Select value={immobilierData.heatingType} onValueChange={(v) => setImmobilierData({ ...immobilierData, heatingType: v })}>
                      <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                      <SelectContent>
                        {["Central", "Individuel", "Gaz", "Électrique", "Climatisation réversible", "Aucun"].map((h) => (<SelectItem key={h} value={h}>{h}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Classe énergie</label>
                    <Select value={immobilierData.energyClass} onValueChange={(v) => setImmobilierData({ ...immobilierData, energyClass: v })}>
                      <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        {["A", "B", "C", "D", "E", "F", "G"].map((e) => (<SelectItem key={e} value={e}>{e}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Commodités (toggles) */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Commodités</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "furnished" as const, label: "Meublé" },
                      { key: "parking" as const, label: "Parking" },
                      { key: "elevator" as const, label: "Ascenseur" },
                      { key: "balcony" as const, label: "Balcon" },
                      { key: "terrace" as const, label: "Terrasse" },
                      { key: "garden" as const, label: "Jardin" },
                      { key: "pool" as const, label: "Piscine" },
                      { key: "airConditioning" as const, label: "Climatisation" },
                      { key: "basement" as const, label: "Sous-sol / Cave" },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between rounded-md border px-3 py-2">
                        <span className="text-sm">{label}</span>
                        <Switch checked={immobilierData[key] as boolean} onCheckedChange={(v) => setImmobilierData({ ...immobilierData, [key]: v })} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parking spaces (conditional) */}
                {immobilierData.parking && (
                  <div>
                    <label className="text-sm font-medium mb-1 block">Nombre de places parking</label>
                    <Input type="number" min={1} value={immobilierData.parkingSpaces ?? ""} onChange={(e) => setImmobilierData({ ...immobilierData, parkingSpaces: e.target.value ? Number(e.target.value) : null })} />
                  </div>
                )}

                {/* Terrace area (conditional) */}
                {immobilierData.terrace && (
                  <div>
                    <label className="text-sm font-medium mb-1 block">Surface terrasse (m²)</label>
                    <Input type="number" min={0} value={immobilierData.terraceArea ?? ""} onChange={(e) => setImmobilierData({ ...immobilierData, terraceArea: e.target.value ? Number(e.target.value) : null })} />
                  </div>
                )}

                {/* Garden area (conditional) */}
                {immobilierData.garden && (
                  <div>
                    <label className="text-sm font-medium mb-1 block">Surface jardin (m²)</label>
                    <Input type="number" min={0} value={immobilierData.gardenArea ?? ""} onChange={(e) => setImmobilierData({ ...immobilierData, gardenArea: e.target.value ? Number(e.target.value) : null })} />
                  </div>
                )}

                {/* ── Pièces / Rooms ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <DoorOpen className="w-4 h-4" /> Pièces de la propriété
                    </label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setImmobilierRooms([...immobilierRooms, { name: "", type: "", tagSid: "", imageUrl: "", description: "" }])}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Pièce
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {immobilierRooms.map((room, idx) => (
                      <div key={idx} className="relative border rounded-xl p-4 space-y-3">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => setImmobilierRooms(immobilierRooms.filter((_, i) => i !== idx))}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Type de pièce</label>
                            <Select
                              value={room.type}
                              onValueChange={(v) => {
                                const u = [...immobilierRooms]; u[idx] = { ...room, type: v, name: room.name || v }; setImmobilierRooms(u);
                              }}
                            >
                              <SelectTrigger><SelectValue placeholder="Choisir..." /></SelectTrigger>
                              <SelectContent>
                                {IMMO_ROOM_TYPES.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Nom affiché</label>
                            <Input
                              value={room.name}
                              onChange={(e) => { const u = [...immobilierRooms]; u[idx] = { ...room, name: e.target.value }; setImmobilierRooms(u); }}
                              placeholder="Salon principal"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Description (optionnel)</label>
                          <Input
                            value={room.description}
                            onChange={(e) => { const u = [...immobilierRooms]; u[idx] = { ...room, description: e.target.value }; setImmobilierRooms(u); }}
                            placeholder="Grande pièce lumineuse avec vue mer..."
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Tag Matterport (SID)</label>
                          <Select
                            value={room.tagSid?.startsWith("http") ? "__link__" : (room.tagSid || "__none__")}
                            onValueChange={(v) => {
                              const u = [...immobilierRooms]; u[idx] = { ...room, tagSid: v === "__none__" ? "" : v === "__link__" ? "https://" : v }; setImmobilierRooms(u);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={dialogTagsLoading ? "Chargement..." : dialogTags.length === 0 ? "Aucun tag" : "Choisir un tag"} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__none__">Aucun tag</SelectItem>
                              <SelectItem value="__link__">📍 Coller un lien 360°</SelectItem>
                              {dialogTags.map((tag) => (
                                <SelectItem key={tag.sid} value={tag.sid}>
                                  <span className="flex items-center gap-2">
                                    {tag.thumbnail ? (
                                      <img src={tag.thumbnail} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    ) : (
                                      <Tag className="w-3 h-3 flex-shrink-0" />
                                    )}
                                    <span className="truncate">{tag.name}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {room.tagSid?.startsWith("http") && (
                            <Input
                              value={room.tagSid}
                              onChange={(e) => { const u = [...immobilierRooms]; u[idx] = { ...room, tagSid: e.target.value }; setImmobilierRooms(u); }}
                              placeholder="https://my.matterport.com/show/?m=...&ss=48&sr=..."
                              className="mt-2 text-xs"
                            />
                          )}
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Image de la pièce</label>
                          <div className="flex gap-2 items-center">
                            <Input
                              value={room.imageUrl || ""}
                              onChange={(e) => { const u = [...immobilierRooms]; u[idx] = { ...room, imageUrl: e.target.value }; setImmobilierRooms(u); }}
                              placeholder="https://..."
                              className="flex-1"
                            />
                            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              Upload
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const formData = new FormData();
                                  formData.append("file", file);
                                  try {
                                    const res = await fetch("/api/upload", { method: "POST", body: formData });
                                    const data = await res.json();
                                    if (data.url) {
                                      const u = [...immobilierRooms]; u[idx] = { ...room, imageUrl: data.url }; setImmobilierRooms(u);
                                      toast({ title: "Image uploadée ✓" });
                                    }
                                  } catch { toast({ title: "Erreur upload", variant: "destructive" }); }
                                }}
                              />
                            </label>
                          </div>
                          {room.imageUrl && (
                            <img src={room.imageUrl} alt={room.name} className="w-16 h-16 rounded-lg object-cover mt-2 border border-border" />
                          )}
                        </div>
                      </div>
                    ))}
                    {immobilierRooms.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-3">Aucune pièce ajoutée</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ══════ Gym & Fitness Form ══════ */}
            {editTour.category === "Gym & Fitness" && (
              <div className="space-y-4">

                {/* ── Espaces / Facilities ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Dumbbell className="w-4 h-4" /> Espaces
                    </label>
                    <Button type="button" size="sm" variant="outline" onClick={() => setGymSpaces([...gymSpaces, { name: "", tagSid: "", icon: "dumbbell", schedule: "" }])}>
                      <Plus className="w-4 h-4 mr-1" /> Espace
                    </Button>
                  </div>
                  {gymSpaces.map((space, idx) => (
                    <div key={idx} className="border border-border rounded-xl p-4 space-y-3 relative">
                      <button type="button" onClick={() => setGymSpaces(gymSpaces.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-xs font-semibold text-muted-foreground">Espace {idx + 1}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Nom</label>
                          <Input value={space.name} onChange={(e) => { const u = [...gymSpaces]; u[idx] = { ...space, name: e.target.value }; setGymSpaces(u); }} placeholder="Salle de musculation" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Icône</label>
                          <Select value={space.icon} onValueChange={(v) => { const u = [...gymSpaces]; u[idx] = { ...space, icon: v }; setGymSpaces(u); }}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {GYM_SPACE_ICONS.map((o) => (
                                <SelectItem key={o.key} value={o.key}><span className="flex items-center gap-1.5"><o.icon className="w-3.5 h-3.5" />{o.label}</span></SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1"><Clock className="w-3 h-3" /> Horaires</label>
                          <Input value={space.schedule} onChange={(e) => { const u = [...gymSpaces]; u[idx] = { ...space, schedule: e.target.value }; setGymSpaces(u); }} placeholder="06:00 - 22:00" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Tag Matterport</label>
                          <Select value={space.tagSid || "__none__"} onValueChange={(v) => { const u = [...gymSpaces]; u[idx] = { ...space, tagSid: v === "__none__" ? "" : v }; setGymSpaces(u); }}>
                            <SelectTrigger><SelectValue placeholder={dialogTagsLoading ? "Chargement..." : dialogTags.length === 0 ? "Aucun tag" : "Choisir un tag"} /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__none__">Aucun tag</SelectItem>
                              {dialogTags.map((tag) => (
                                <SelectItem key={tag.sid} value={tag.sid}><span className="flex items-center gap-1"><Tag className="w-3 h-3" />{tag.name}</span></SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                  {gymSpaces.length === 0 && <p className="text-xs text-muted-foreground text-center py-2">Aucun espace ajouté</p>}
                </div>

                {/* ── Équipements (chips) ── */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Star className="w-4 h-4" /> Équipements
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {GYM_EQUIPMENT_OPTIONS.map((opt) => {
                      const active = gymEquipment.includes(opt.key);
                      return (
                        <button key={opt.key} type="button" onClick={() => setGymEquipment(active ? gymEquipment.filter(k => k !== opt.key) : [...gymEquipment, opt.key])}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${active ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                        >
                          <opt.icon className="w-3.5 h-3.5" />
                          {opt.label}
                        </button>
                      );
                    })}
                    <button type="button" onClick={() => { const name = prompt("Nom de l'équipement :"); if (name?.trim() && !gymEquipment.includes(name.trim())) setGymEquipment([...gymEquipment, name.trim()]); }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-dashed border-muted-foreground/40 text-muted-foreground hover:border-secondary hover:text-secondary transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {/* Show custom equipment as removable chips */}
                  {gymEquipment.filter(k => !GYM_EQUIPMENT_OPTIONS.find(o => o.key === k)).map(custom => (
                    <span key={custom} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-medium mr-1">
                      {custom}
                      <button type="button" onClick={() => setGymEquipment(gymEquipment.filter(k => k !== custom))} className="ml-0.5 hover:text-destructive"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>

                {/* ── Abonnements / Plans ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Banknote className="w-4 h-4" /> Abonnements
                    </label>
                    <Button type="button" size="sm" variant="outline" onClick={() => setGymPlans([...gymPlans, { name: "", price: "", duration: "" }])}>
                      <Plus className="w-4 h-4 mr-1" /> Plan
                    </Button>
                  </div>
                  {gymPlans.map((plan, idx) => (
                    <div key={idx} className="border border-border rounded-lg p-3 relative">
                      <button type="button" onClick={() => setGymPlans(gymPlans.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"><X className="w-3.5 h-3.5" /></button>
                      <div className="grid grid-cols-3 gap-2">
                        <Input value={plan.name} onChange={(e) => { const u = [...gymPlans]; u[idx] = { ...plan, name: e.target.value }; setGymPlans(u); }} placeholder="Plan mensuel" className="text-sm" />
                        <Input value={plan.price} onChange={(e) => { const u = [...gymPlans]; u[idx] = { ...plan, price: e.target.value }; setGymPlans(u); }} placeholder="30€" className="text-sm" />
                        <Input value={plan.duration} onChange={(e) => { const u = [...gymPlans]; u[idx] = { ...plan, duration: e.target.value }; setGymPlans(u); }} placeholder="1 mois" className="text-sm" />
                      </div>
                    </div>
                  ))}
                  {gymPlans.length === 0 && <p className="text-xs text-muted-foreground text-center py-2">Aucun abonnement ajouté</p>}
                </div>

                {/* ── Cours collectifs ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" /> Cours collectifs
                    </label>
                    <Button type="button" size="sm" variant="outline" onClick={() => setGymClasses([...gymClasses, { name: "", icon: "heart", schedule: "" }])}>
                      <Plus className="w-4 h-4 mr-1" /> Cours
                    </Button>
                  </div>
                  {gymClasses.map((cls, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Select value={cls.icon} onValueChange={(v) => { const u = [...gymClasses]; u[idx] = { ...cls, icon: v }; setGymClasses(u); }}>
                        <SelectTrigger className="w-[100px] h-8 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {GYM_CLASS_ICONS.map((o) => (<SelectItem key={o.key} value={o.key}><span className="flex items-center gap-1.5"><o.icon className="w-3 h-3" />{o.label}</span></SelectItem>))}
                        </SelectContent>
                      </Select>
                      <Input value={cls.name} onChange={(e) => { const u = [...gymClasses]; u[idx] = { ...cls, name: e.target.value }; setGymClasses(u); }} placeholder="Yoga, Spinning..." className="h-8 text-sm flex-1" />
                      <Input value={cls.schedule} onChange={(e) => { const u = [...gymClasses]; u[idx] = { ...cls, schedule: e.target.value }; setGymClasses(u); }} placeholder="Lun-Ven 18h" className="h-8 text-sm w-[130px]" />
                      <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" onClick={() => setGymClasses(gymClasses.filter((_, i) => i !== idx))}>
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                  {gymClasses.length === 0 && <p className="text-xs text-muted-foreground text-center py-2">Aucun cours ajouté</p>}
                </div>

                {/* ── Coachs ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4" /> Coachs
                    </label>
                    <Button type="button" size="sm" variant="outline" onClick={() => setGymCoaches([...gymCoaches, { name: "", title: "", imageUrl: "", description: "", specialties: [], certifications: "", experience: "", schedule: "", price: "", phone: "", whatsapp: "", instagram: "", tagSid: "" }])}>
                      <Plus className="w-4 h-4 mr-1" /> Coach
                    </Button>
                  </div>
                  {gymCoaches.map((coach, idx) => (
                    <div key={idx} className="border border-border rounded-xl p-4 space-y-3 relative">
                      <button type="button" onClick={() => setGymCoaches(gymCoaches.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-3">
                        {coach.imageUrl ? (
                          <img src={coach.imageUrl} alt={coach.name} className="w-14 h-14 rounded-full object-cover border-2 border-purple-200" />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center border-2 border-purple-200">
                            <User className="w-6 h-6 text-purple-400" />
                          </div>
                        )}
                        <p className="text-xs font-semibold text-muted-foreground">Coach {idx + 1}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Nom *</label>
                          <Input value={coach.name} onChange={(e) => { const u = [...gymCoaches]; u[idx] = { ...coach, name: e.target.value }; setGymCoaches(u); }} placeholder="Ahmed Ben Ali" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Titre / Rôle</label>
                          <Input value={coach.title} onChange={(e) => { const u = [...gymCoaches]; u[idx] = { ...coach, title: e.target.value }; setGymCoaches(u); }} placeholder="Personal Trainer" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Photo URL</label>
                        <Input value={coach.imageUrl} onChange={(e) => { const u = [...gymCoaches]; u[idx] = { ...coach, imageUrl: e.target.value }; setGymCoaches(u); }} placeholder="https://..." />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Bio / Description</label>
                        <Textarea value={coach.description} onChange={(e) => { const u = [...gymCoaches]; u[idx] = { ...coach, description: e.target.value }; setGymCoaches(u); }} placeholder="Expérience, philosophie..." rows={2} className="text-sm" />
                      </div>
                      {/* Specialties chips */}
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1"><Award className="w-3 h-3" /> Spécialités</label>
                        <div className="flex flex-wrap gap-1.5">
                          {COACH_SPECIALTY_OPTIONS.map((opt) => {
                            const active = coach.specialties.includes(opt.key);
                            return (
                              <button key={opt.key} type="button" onClick={() => { const u = [...gymCoaches]; u[idx] = { ...coach, specialties: active ? coach.specialties.filter(k => k !== opt.key) : [...coach.specialties, opt.key] }; setGymCoaches(u); }}
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium transition-colors ${active ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                              >
                                <opt.icon className="w-3 h-3" />
                                {opt.label}
                              </button>
                            );
                          })}
                          <button type="button" onClick={() => { const name = prompt("Spécialité :"); if (name?.trim() && !coach.specialties.includes(name.trim())) { const u = [...gymCoaches]; u[idx] = { ...coach, specialties: [...coach.specialties, name.trim()] }; setGymCoaches(u); } }}
                            className="flex items-center gap-0.5 px-2 py-1 rounded-full text-[10px] font-medium border border-dashed border-muted-foreground/40 text-muted-foreground hover:border-secondary hover:text-secondary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        {/* Custom specialties as removable chips */}
                        {coach.specialties.filter(k => !COACH_SPECIALTY_OPTIONS.find(o => o.key === k)).map(custom => (
                          <span key={custom} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-medium mr-1 mt-1">
                            {custom}
                            <button type="button" onClick={() => { const u = [...gymCoaches]; u[idx] = { ...coach, specialties: coach.specialties.filter(k => k !== custom) }; setGymCoaches(u); }} className="ml-0.5 hover:text-destructive"><X className="w-2.5 h-2.5" /></button>
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1"><Award className="w-3 h-3" /> Certifications</label>
                          <Input value={coach.certifications} onChange={(e) => { const u = [...gymCoaches]; u[idx] = { ...coach, certifications: e.target.value }; setGymCoaches(u); }} placeholder="NASM-CPT, ACE..." />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Expérience</label>
                          <Input value={coach.experience} onChange={(e) => { const u = [...gymCoaches]; u[idx] = { ...coach, experience: e.target.value }; setGymCoaches(u); }} placeholder="10 ans" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1"><Clock className="w-3 h-3" /> Disponibilité</label>
                          <Input value={coach.schedule} onChange={(e) => { const u = [...gymCoaches]; u[idx] = { ...coach, schedule: e.target.value }; setGymCoaches(u); }} placeholder="Lun-Ven 08:00-18:00" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1"><Banknote className="w-3 h-3" /> Tarif</label>
                          <Input value={coach.price} onChange={(e) => { const u = [...gymCoaches]; u[idx] = { ...coach, price: e.target.value }; setGymCoaches(u); }} placeholder="50€/séance" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1"><Phone className="w-3 h-3" /> Téléphone</label>
                          <Input value={coach.phone} onChange={(e) => { const u = [...gymCoaches]; u[idx] = { ...coach, phone: e.target.value }; setGymCoaches(u); }} placeholder="+216 XX XXX XXX" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1"><MessageCircle className="w-3 h-3" /> WhatsApp</label>
                          <Input value={coach.whatsapp} onChange={(e) => { const u = [...gymCoaches]; u[idx] = { ...coach, whatsapp: e.target.value }; setGymCoaches(u); }} placeholder="+216 XX XXX XXX" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Instagram</label>
                        <Input value={coach.instagram} onChange={(e) => { const u = [...gymCoaches]; u[idx] = { ...coach, instagram: e.target.value }; setGymCoaches(u); }} placeholder="https://instagram.com/..." />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Tag Matterport</label>
                        <Select value={coach.tagSid || "__none__"} onValueChange={(v) => { const u = [...gymCoaches]; u[idx] = { ...coach, tagSid: v === "__none__" ? "" : v }; setGymCoaches(u); }}>
                          <SelectTrigger><SelectValue placeholder={dialogTagsLoading ? "Chargement..." : dialogTags.length === 0 ? "Aucun tag" : "Choisir un tag"} /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="__none__">Aucun tag</SelectItem>
                            {dialogTags.map((tag) => (
                              <SelectItem key={tag.sid} value={tag.sid}><span className="flex items-center gap-1"><Tag className="w-3 h-3" />{tag.name}</span></SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                  {gymCoaches.length === 0 && <p className="text-xs text-muted-foreground text-center py-2">Aucun coach ajouté</p>}
                </div>

                {/* ── Custom Sections (reuse Canyon Ranch builder) ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2"><Layers className="w-4 h-4" /> Sections personnalisées</label>
                    <Button type="button" size="sm" variant="outline" onClick={() => setGymSections([...gymSections, { title: "", icon: "layers", items: [] }])}><Plus className="w-4 h-4 mr-1" /> Section</Button>
                  </div>
                  {gymSections.map((sec, sIdx) => (
                    <div key={sIdx} className="border border-border rounded-xl overflow-hidden">
                      <div className="bg-muted/50 px-3 py-2 flex items-center gap-2">
                        <Select value={sec.icon} onValueChange={(v) => { const u = [...gymSections]; u[sIdx] = { ...sec, icon: v }; setGymSections(u); }}>
                          <SelectTrigger className="w-[110px] h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>{SECTION_ICON_OPTIONS.map((o) => (<SelectItem key={o.key} value={o.key}><span className="flex items-center gap-1.5"><o.icon className="w-3.5 h-3.5" />{o.label}</span></SelectItem>))}</SelectContent>
                        </Select>
                        <Input value={sec.title} onChange={(e) => { const u = [...gymSections]; u[sIdx] = { ...sec, title: e.target.value }; setGymSections(u); }} placeholder="Titre de la section" className="h-8 text-sm flex-1" />
                        <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" onClick={() => setGymSections(gymSections.filter((_, i) => i !== sIdx))}><X className="w-4 h-4" /></Button>
                      </div>
                      <div className="p-3 space-y-2">
                        {sec.items.map((item, iIdx) => (
                          <div key={iIdx} className="flex items-center gap-2">
                            <Select value={item.icon} onValueChange={(v) => { const u = [...gymSections]; const items = [...sec.items]; items[iIdx] = { ...item, icon: v }; u[sIdx] = { ...sec, items }; setGymSections(u); }}>
                              <SelectTrigger className="w-[90px] h-8 text-xs"><SelectValue /></SelectTrigger>
                              <SelectContent>{ITEM_ICON_OPTIONS.map((o) => (<SelectItem key={o.key} value={o.key}><span className="flex items-center gap-1.5"><o.icon className="w-3 h-3" />{o.label}</span></SelectItem>))}</SelectContent>
                            </Select>
                            <Input value={item.name} onChange={(e) => { const u = [...gymSections]; const items = [...sec.items]; items[iIdx] = { ...item, name: e.target.value }; u[sIdx] = { ...sec, items }; setGymSections(u); }} placeholder="Nom" className="h-8 text-sm flex-1" />
                            <Select value={item.tagSid || "__none__"} onValueChange={(v) => { const u = [...gymSections]; const items = [...sec.items]; items[iIdx] = { ...item, tagSid: v === "__none__" ? "" : v }; u[sIdx] = { ...sec, items }; setGymSections(u); }}>
                              <SelectTrigger className="h-8 text-xs w-[200px]"><SelectValue placeholder={dialogTagsLoading ? "Chargement..." : dialogTags.length === 0 ? "Aucun tag" : "Tag"} /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="__none__">Aucun tag</SelectItem>
                                {dialogTags.map((tag) => (<SelectItem key={tag.sid} value={tag.sid}><span className="flex items-center gap-1"><Tag className="w-3 h-3" />{tag.name}</span></SelectItem>))}
                              </SelectContent>
                            </Select>
                            <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" onClick={() => { const u = [...gymSections]; u[sIdx] = { ...sec, items: sec.items.filter((_, i) => i !== iIdx) }; setGymSections(u); }}><X className="w-3.5 h-3.5" /></Button>
                          </div>
                        ))}
                        <Button type="button" size="sm" variant="ghost" className="w-full h-8 text-xs text-muted-foreground" onClick={() => { const u = [...gymSections]; u[sIdx] = { ...sec, items: [...sec.items, { name: "", icon: "layers", tagSid: "" }] }; setGymSections(u); }}>
                          <Plus className="w-3.5 h-3.5 mr-1" /> Ajouter un élément
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1 block">Surface (m²)</label>
              <Input
                type="number"
                value={editTour.surface ?? ""}
                onChange={(e) => setEditTour({ ...editTour, surface: e.target.value ? Number(e.target.value) : null })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">URL de la visite virtuelle</label>
              <div className="flex gap-2">
                <Input value={editTour.tourUrl} onChange={(e) => setEditTour({ ...editTour, tourUrl: e.target.value })} placeholder="https://my.matterport.com/show/..." className="flex-1" />
                {editTour.tourUrl && (
                  <Button type="button" size="sm" variant="outline" onClick={() => fetchDialogTags()} disabled={dialogTagsLoading} className="shrink-0 h-10">
                    {dialogTagsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scan className="w-4 h-4" />}
                  </Button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Latitude</label>
                <Input
                  type="number"
                  step="any"
                  value={editTour.latitude ?? ""}
                  onChange={(e) => setEditTour({ ...editTour, latitude: e.target.value ? Number(e.target.value) : null })}
                  placeholder="36.8065"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Longitude</label>
                <Input
                  type="number"
                  step="any"
                  value={editTour.longitude ?? ""}
                  onChange={(e) => setEditTour({ ...editTour, longitude: e.target.value ? Number(e.target.value) : null })}
                  placeholder="10.1815"
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-sm font-medium mb-1 block">Emplacement</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={locationQuery}
                  onChange={(e) => { setLocationQuery(e.target.value); }}
                  onFocus={() => { if (editTour.location && !locationQuery) setLocationQuery(editTour.location); }}
                  placeholder="Rechercher un lieu..."
                  className="pl-9"
                />
                {searchingLocation && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />}
              </div>
              {locationResults.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {locationResults.map((place: any) => (
                    <button
                      key={place.place_id}
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors flex items-start gap-2"
                      onClick={() => selectLocation(place)}
                    >
                      <MapPin className="w-4 h-4 mt-0.5 text-secondary flex-shrink-0" />
                      <span className="line-clamp-2">{place.display_name}</span>
                    </button>
                  ))}
                </div>
              )}
              {editTour.location && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {editTour.location}
                </p>
              )}
            </div>
            {/* Mini map - click to place marker */}
            <div>
              <label className="text-sm font-medium mb-1 block">Ou cliquez sur la carte</label>
              <div className="rounded-xl overflow-hidden border border-border" style={{ height: "220px" }}>
                <MapContainer
                  center={[editTour.latitude || 34.5, editTour.longitude || 9.5]}
                  zoom={editTour.latitude ? 13 : 3}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; Esri'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  />
                  <MapClickHandler onMapClick={handleMapClick} />
                  <FlyToMarker lat={editTour.latitude} lng={editTour.longitude} />
                  {editTour.latitude && editTour.longitude && (
                    <Marker position={[editTour.latitude, editTour.longitude]} />
                  )}
                </MapContainer>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleSave} disabled={uploading}>Enregistrer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Items & Services Management Dialog */}
      <Dialog open={itemsDialogOpen} onOpenChange={setItemsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {activeEntityTab === "products" ? <ShoppingBag className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
              {activeEntityTab === "products" ? "Produits" : "Services"} de la visite
            </DialogTitle>
          </DialogHeader>

          {/* Tab switcher */}
          {!itemFormOpen && !serviceFormOpen && (
            <div className="flex border-b border-border mb-2">
              <button
                type="button"
                onClick={() => setActiveEntityTab("products")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeEntityTab === "products"
                    ? "border-secondary text-secondary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <ShoppingBag className="w-4 h-4" /> Produits ({items.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveEntityTab("services")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeEntityTab === "services"
                    ? "border-secondary text-secondary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Briefcase className="w-4 h-4" /> Services ({services.length})
              </button>
            </div>
          )}

          {/* ===== PRODUCTS TAB ===== */}
          {activeEntityTab === "products" && !serviceFormOpen && (
            <>
              {!itemFormOpen ? (
                <div className="space-y-4 mt-2">
                  <Button onClick={openCreateItem} className="flex items-center gap-2" size="sm">
                    <Plus className="w-4 h-4" /> Ajouter un produit
                  </Button>

                  {items.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Aucun produit ajouté à cette visite</p>
                      <p className="text-sm mt-1">Ajoutez des produits que les visiteurs pourront découvrir.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                          ) : (
                            <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center shrink-0">
                              <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            {item.brand && <p className="text-xs text-muted-foreground">{item.brand}</p>}
                            <div className="flex items-center gap-2 mt-0.5">
                              {item.price != null && (
                                <span className="text-xs font-semibold text-secondary">{item.price} {item.currency}</span>
                              )}
                              {item.externalUrl && (
                                <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 flex items-center gap-0.5">
                                  <ExternalLink className="w-3 h-3" /> Lien
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            <Button variant="outline" size="sm" onClick={() => openEditItem(item)}>
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id!)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Product Create/Edit Form */
                <div className="space-y-4 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Button variant="ghost" size="sm" onClick={() => setItemFormOpen(false)}>← Retour</Button>
                    <span className="text-sm font-medium">{isEditingItem ? "Modifier le produit" : "Nouveau produit"}</span>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Nom du produit *</label>
                    <Input value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} placeholder="Ex: Table KALLAX" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Marque</label>
                    <Input value={editItem.brand} onChange={(e) => setEditItem({ ...editItem, brand: e.target.value })} placeholder="Ex: IKEA, Zara Home..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Description</label>
                    <Textarea value={editItem.description} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} rows={3} placeholder="Description du produit..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Image du produit</label>
                    <div
                      onDrop={onItemDrop}
                      onDragOver={onItemDragOver}
                      onDragLeave={onItemDragLeave}
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
                        itemDragOver ? "border-secondary bg-secondary/10" : "border-muted-foreground/30 hover:border-secondary/50"
                      }`}
                    >
                      {editItem.imageUrl ? (
                        <div className="relative">
                          <img src={editItem.imageUrl} alt="preview" className="w-full h-40 object-cover rounded-lg" />
                          <button
                            onClick={(e) => { e.stopPropagation(); setEditItem({ ...editItem, imageUrl: "" }); }}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            {itemUploading ? "Upload en cours..." : "Glisser-déposer une image ici ou cliquer"}
                          </p>
                          <input type="file" accept="image/*" className="hidden" onChange={onItemFileSelect} />
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Prix</label>
                      <Input type="number" step="0.01" value={editItem.price ?? ""} onChange={(e) => setEditItem({ ...editItem, price: e.target.value ? Number(e.target.value) : null })} placeholder="299.99" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Devise</label>
                      <Select value={editItem.currency} onValueChange={(v) => setEditItem({ ...editItem, currency: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EUR">EUR €</SelectItem>
                          <SelectItem value="USD">USD $</SelectItem>
                          <SelectItem value="TND">TND</SelectItem>
                          <SelectItem value="GBP">GBP £</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Lien externe (boutique)</label>
                    <Input value={editItem.externalUrl} onChange={(e) => setEditItem({ ...editItem, externalUrl: e.target.value })} placeholder="https://www.ikea.com/..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tag Matterport (optionnel)</label>
                    <div className="space-y-2">
                      {tourTagsLoading ? (
                        <div className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/50">
                          <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                          <span className="text-sm text-muted-foreground">Chargement des tags Matterport...</span>
                        </div>
                      ) : tourTags.length > 0 ? (
                        <>
                          <Select value={editItem.tagSid || "__none__"} onValueChange={(v) => setEditItem({ ...editItem, tagSid: v === "__none__" ? "" : v })}>
                            <SelectTrigger><SelectValue placeholder="Choisir un tag..." /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__none__">— Aucun tag —</SelectItem>
                              {tourTags.map((tag, i) => (
                                <SelectItem key={`${tag.sid}-${i}`} value={tag.sid || tag.name}>
                                  <span className="flex items-center gap-2">
                                    {tag.thumbnail ? (
                                      <img src={tag.thumbnail} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    ) : null}
                                    <span className="truncate">{tag.name}{tag.sid ? ` (${tag.sid.slice(0, 10)}…)` : " (pas de SID)"}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">{tourTags.length} tag{tourTags.length > 1 ? "s" : ""} disponible{tourTags.length > 1 ? "s" : ""} — sélectionnez celui à lier au produit</p>
                        </>
                      ) : (
                        <>
                          <Input value={editItem.tagSid} onChange={(e) => setEditItem({ ...editItem, tagSid: e.target.value })} placeholder="SID du tag Matterport..." />
                          <p className="text-xs text-muted-foreground">Aucun tag trouvé. Collez le SID manuellement ou vérifiez l'URL de la visite.</p>
                        </>
                      )}
                      {editItem.tagSid && (
                        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-purple-50 border border-purple-200">
                          <Tag className="w-3.5 h-3.5 text-purple-500" />
                          <span className="text-xs text-purple-700 font-mono flex-1 truncate">{editItem.tagSid}</span>
                          <button type="button" onClick={() => setEditItem({ ...editItem, tagSid: "" })} className="text-purple-400 hover:text-red-500">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <label className="text-sm font-medium">Bouton "Ajouter au panier"</label>
                      <p className="text-xs text-muted-foreground">Afficher le bouton d'achat sur ce produit</p>
                    </div>
                    <Switch checked={editItem.showAddToCart} onCheckedChange={(checked) => setEditItem({ ...editItem, showAddToCart: checked })} />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" onClick={() => setItemFormOpen(false)}>Annuler</Button>
                    <Button onClick={handleSaveItem}>Enregistrer</Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ===== SERVICES TAB ===== */}
          {activeEntityTab === "services" && !itemFormOpen && (
            <>
              {!serviceFormOpen ? (
                <div className="space-y-4 mt-2">
                  <Button onClick={openCreateService} className="flex items-center gap-2" size="sm">
                    <Plus className="w-4 h-4" /> Ajouter un service
                  </Button>

                  {services.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Aucun service ajouté à cette visite</p>
                      <p className="text-sm mt-1">Ajoutez des services avec leurs coordonnées de contact.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {services.map((svc) => (
                        <div key={svc.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
                          {svc.imageUrl ? (
                            <img src={svc.imageUrl} alt={svc.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                          ) : (
                            <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center shrink-0">
                              <Briefcase className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate">{svc.name}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{svc.description}</p>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              {svc.phone && (
                                <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                                  <Phone className="w-3 h-3" /> {svc.phone}
                                </span>
                              )}
                              {svc.whatsapp && (
                                <span className="text-xs text-green-600 flex items-center gap-0.5">
                                  <MessageCircle className="w-3 h-3" /> WhatsApp
                                </span>
                              )}
                              {svc.instagram && (
                                <span className="text-xs text-pink-500">IG</span>
                              )}
                              {svc.facebook && (
                                <span className="text-xs text-blue-600">FB</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            <Button variant="outline" size="sm" onClick={() => openEditService(svc)}>
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteService(svc.id!)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Service Create/Edit Form */
                <div className="space-y-4 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Button variant="ghost" size="sm" onClick={() => setServiceFormOpen(false)}>← Retour</Button>
                    <span className="text-sm font-medium">{isEditingService ? "Modifier le service" : "Nouveau service"}</span>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Nom du service *</label>
                    <Input value={editService.name} onChange={(e) => setEditService({ ...editService, name: e.target.value })} placeholder="Ex: Nettoyage, Conciergerie..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Description</label>
                    <Textarea value={editService.description} onChange={(e) => setEditService({ ...editService, description: e.target.value })} rows={3} placeholder="Description du service..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Image</label>
                    <div
                      onDrop={onServiceDrop}
                      onDragOver={onServiceDragOver}
                      onDragLeave={onServiceDragLeave}
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
                        serviceDragOver ? "border-secondary bg-secondary/10" : "border-muted-foreground/30 hover:border-secondary/50"
                      }`}
                    >
                      {editService.imageUrl ? (
                        <div className="relative">
                          <img src={editService.imageUrl} alt="preview" className="w-full h-40 object-cover rounded-lg" />
                          <button
                            onClick={(e) => { e.stopPropagation(); setEditService({ ...editService, imageUrl: "" }); }}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            {serviceUploading ? "Upload en cours..." : "Glisser-déposer une image ici ou cliquer"}
                          </p>
                          <input type="file" accept="image/*" className="hidden" onChange={onServiceFileSelect} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Contact fields */}
                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Coordonnées de contact
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Téléphone</label>
                        <Input value={editService.phone} onChange={(e) => setEditService({ ...editService, phone: e.target.value })} placeholder="+216 XX XXX XXX" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">WhatsApp</label>
                        <Input value={editService.whatsapp} onChange={(e) => setEditService({ ...editService, whatsapp: e.target.value })} placeholder="+216 XX XXX XXX ou lien wa.me/..." />
                      </div>
                    </div>
                  </div>

                  {/* Social media fields */}
                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-semibold mb-3">Réseaux sociaux</p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Instagram</label>
                        <Input value={editService.instagram} onChange={(e) => setEditService({ ...editService, instagram: e.target.value })} placeholder="https://instagram.com/..." />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Facebook</label>
                        <Input value={editService.facebook} onChange={(e) => setEditService({ ...editService, facebook: e.target.value })} placeholder="https://facebook.com/..." />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Tag Matterport (optionnel)</label>
                    <div className="space-y-2">
                      {tourTagsLoading ? (
                        <div className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/50">
                          <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                          <span className="text-sm text-muted-foreground">Chargement des tags Matterport...</span>
                        </div>
                      ) : tourTags.length > 0 ? (
                        <>
                          <Select value={editService.tagSid || "__none__"} onValueChange={(v) => setEditService({ ...editService, tagSid: v === "__none__" ? "" : v })}>
                            <SelectTrigger><SelectValue placeholder="Choisir un tag..." /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__none__">— Aucun tag —</SelectItem>
                              {tourTags.map((tag, i) => (
                                <SelectItem key={`svc-${tag.sid}-${i}`} value={tag.sid || tag.name}>
                                  <span className="flex items-center gap-2">
                                    {tag.thumbnail ? (
                                      <img src={tag.thumbnail} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    ) : null}
                                    <span className="truncate">{tag.name}{tag.sid ? ` (${tag.sid.slice(0, 10)}…)` : " (pas de SID)"}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">{tourTags.length} tag{tourTags.length > 1 ? "s" : ""} disponible{tourTags.length > 1 ? "s" : ""} — sélectionnez celui à lier au service</p>
                        </>
                      ) : (
                        <>
                          <Input value={editService.tagSid} onChange={(e) => setEditService({ ...editService, tagSid: e.target.value })} placeholder="SID du tag Matterport..." />
                          <p className="text-xs text-muted-foreground">Aucun tag trouvé. Collez le SID manuellement ou vérifiez l'URL de la visite.</p>
                        </>
                      )}
                      {editService.tagSid && (
                        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-purple-50 border border-purple-200">
                          <Tag className="w-3.5 h-3.5 text-purple-500" />
                          <span className="text-xs text-purple-700 font-mono flex-1 truncate">{editService.tagSid}</span>
                          <button type="button" onClick={() => setEditService({ ...editService, tagSid: "" })} className="text-purple-400 hover:text-red-500">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" onClick={() => setServiceFormOpen(false)}>Annuler</Button>
                    <Button onClick={handleSaveService}>Enregistrer</Button>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ===== TAG FINDER MODAL ===== */}
      <Dialog open={tagFinderOpen} onOpenChange={setTagFinderOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scan className="w-5 h-5 text-purple-500" />
              Scanner les Tags Matterport
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* Tour URL (read-only) */}
            <div>
              <label className="text-sm font-medium mb-1 block">URL de la visite</label>
              <Input value={itemsTourUrl} readOnly className="bg-muted text-muted-foreground" />
            </div>

            {/* Scan button */}
            <Button
              onClick={scanTags}
              disabled={tagFinderLoading || !itemsTourUrl}
              className="flex items-center gap-2 w-full"
            >
              {tagFinderLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {tagFinderLoading ? "Chargement des tags..." : "Charger les Tags"}
            </Button>

            {/* Error */}
            {tagFinderError && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-destructive text-sm">
                {tagFinderError}
              </div>
            )}

            {/* Tags list */}
            {tagFinderTags.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {tagFinderTags.length} tag{tagFinderTags.length > 1 ? "s" : ""} trouvé{tagFinderTags.length > 1 ? "s" : ""}
                </p>
                {tagFinderTags.map((tag) => (
                  <div
                    key={tag.sid}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                      <Tag className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{tag.label}</p>
                      {tag.description && (
                        <p className="text-xs text-muted-foreground truncate">{tag.description}</p>
                      )}
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">SID: {tag.sid}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => selectTagForProduct(tag)}
                      className="shrink-0"
                    >
                      Sélectionner
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Manual fallback */}
            {!tagFinderLoading && tagFinderTags.length === 0 && !tagFinderError && (
              <div className="bg-muted/50 border border-border rounded-xl p-4">
                <p className="text-sm font-semibold mb-2">Méthode alternative</p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Ouvrez votre visite dans le Workshop Matterport</li>
                  <li>Cliquez sur un tag dans la liste à droite</li>
                  <li>Le tag SID apparaît dans l'URL après <code className="text-purple-600">&tag=</code></li>
                  <li>Copiez ce SID et collez-le dans le champ Tag ci-dessus</li>
                </ol>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
