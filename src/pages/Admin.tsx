import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Pencil, Trash2, Upload, X, Image as ImageIcon, LogOut, Search, MapPin, Loader2, ShoppingBag, ExternalLink, BarChart3, Briefcase, Phone, MessageCircle, Tag, Scan, Wifi, Snowflake, Tv, Wine, Bath, DoorOpen, Lock, BedDouble, ChevronDown, ChevronUp, GripVertical, Sparkles, UtensilsCrossed, Dumbbell, CalendarDays, Heart, Home, Users, Star, Coffee, Music, Palmtree, ShieldCheck, PlayCircle, Layers } from "lucide-react";
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

const SECTION_ICON_OPTIONS = [
  { key: "bed", label: "Hébergement", icon: BedDouble },
  { key: "sparkles", label: "Wellness", icon: Sparkles },
  { key: "utensils", label: "Restauration", icon: UtensilsCrossed },
  { key: "dumbbell", label: "Fitness", icon: Dumbbell },
  { key: "calendar", label: "Événements", icon: CalendarDays },
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
  const [activeEntityTab, setActiveEntityTab] = useState<"products" | "services">("products");
  // Tags for dropdown
  const [tourTags, setTourTags] = useState<{ name: string; sid: string }[]>([]);
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
  // Tags for the create/edit dialog (auto-fetched from tour URL)
  const [dialogTags, setDialogTags] = useState<{ name: string; sid: string }[]>([]);
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
  useEffect(() => {
    if (!dialogOpen || !editTour.tourUrl) { setDialogTags([]); return; }
    let modelId: string | null = null;
    try { modelId = new URL(editTour.tourUrl).searchParams.get("m"); } catch {}
    if (!modelId) { setDialogTags([]); return; }
    setDialogTagsLoading(true);
    fetch(`/api/matterport/tags?modelId=${encodeURIComponent(modelId)}`)
      .then(r => r.ok ? r.json() : { tags: [] })
      .then(data => {
        const tags = (data.tags || []).map((t: any, i: number) => ({
          name: t.label || t.description || `Tag ${i + 1}`,
          sid: t.sid,
        }));
        setDialogTags(tags);
      })
      .catch(() => setDialogTags([]))
      .finally(() => setDialogTagsLoading(false));
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

  const openCreate = () => {
    setEditTour(emptyTour);
    setIsEditing(false);
    setLocationQuery("");
    setLocationResults([]);
    setHotelRooms([]);
    setMenuSections([]);
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
      } catch { setHotelRooms([]); setMenuSections([]); }
    } else {
      setHotelRooms([]);
      setMenuSections([]);
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
      payload.metadataJson = JSON.stringify({ rooms: hotelRooms, sections: menuSections });
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
        const saved = Array.isArray(savedData) ? savedData.map((t: any) => ({ name: t.name || "", sid: t.sid || "" })) : [];
        if (saved.length > 0) {
          setTourTags(saved);
          setTourTagsLoading(false);
        }
        // Always fetch live tags from Matterport to merge
        if (modelId) {
          try {
            const res = await fetch(`/api/matterport/tags?modelId=${encodeURIComponent(modelId)}`);
            if (res.ok) {
              const data = await res.json();
              const liveTags: { name: string; sid: string }[] = (data.tags || []).map((t: any, i: number) => ({
                name: t.label || t.description || `Tag ${i + 1}`,
                sid: t.sid,
              }));
              if (liveTags.length > 0) {
                // Merge: keep names from saved tags, add any new from live
                const merged = liveTags.map((lt) => {
                  const existing = saved.find((s) => s.sid === lt.sid);
                  return existing && existing.name ? existing : lt;
                });
                setTourTags(merged);
                // Save merged tags for future use
                fetch(`/api/tours/${tour.id}/tags`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(merged),
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
    setEditItem({ ...item });
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
      const res = await fetch(`/api/matterport/tags?modelId=${encodeURIComponent(modelId)}`);
      if (!res.ok) {
        throw new Error(`Erreur serveur (${res.status})`);
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const allTags: TagInfo[] = (data.tags || []).map((t: any) => ({
        sid: t.sid,
        label: t.label || "(sans nom)",
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
                      <Button variant="outline" size="sm" onClick={() => openItems(tour)} title="Gérer les produits">
                        <ShoppingBag className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/admin/stats/${tour.id}`)} title="Statistiques">
                        <BarChart3 className="w-4 h-4" />
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
                              {dialogTags.length > 0 ? (
                                <Select
                                  value={item.tagSid || "__none__"}
                                  onValueChange={(v) => {
                                    const updated = [...menuSections];
                                    const items = [...sec.items];
                                    items[iIdx] = { ...item, tagSid: v === "__none__" ? "" : v };
                                    updated[sIdx] = { ...sec, items };
                                    setMenuSections(updated);
                                  }}
                                >
                                  <SelectTrigger className="h-8 text-xs w-[120px]">
                                    <SelectValue placeholder={dialogTagsLoading ? "Chargement..." : "Tag"} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="__none__">Aucun tag</SelectItem>
                                    {dialogTags.map((tag) => (
                                      <SelectItem key={tag.sid} value={tag.sid}>
                                        <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{tag.name}</span>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  value={item.tagSid || ""}
                                  onChange={(e) => {
                                    const updated = [...menuSections];
                                    const items = [...sec.items];
                                    items[iIdx] = { ...item, tagSid: e.target.value };
                                    updated[sIdx] = { ...sec, items };
                                    setMenuSections(updated);
                                  }}
                                  placeholder={dialogTagsLoading ? "Chargement..." : "Tag SID"}
                                  className="h-8 text-xs w-[100px]"
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
                      onClick={() => setHotelRooms([...hotelRooms, { name: "", tagSid: "", bedType: "", capacity: null, amenities: [] }])}
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
                          {dialogTags.length > 0 ? (
                            <Select
                              value={room.tagSid || "__none__"}
                              onValueChange={(v) => {
                                const updated = [...hotelRooms];
                                updated[idx] = { ...room, tagSid: v === "__none__" ? "" : v };
                                setHotelRooms(updated);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={dialogTagsLoading ? "Chargement..." : "Choisir un tag"} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="__none__">Aucun tag</SelectItem>
                                {dialogTags.map((tag) => (
                                  <SelectItem key={tag.sid} value={tag.sid}>
                                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{tag.name}</span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              value={room.tagSid}
                              onChange={(e) => {
                                const updated = [...hotelRooms];
                                updated[idx] = { ...room, tagSid: e.target.value };
                                setHotelRooms(updated);
                              }}
                              placeholder={dialogTagsLoading ? "Chargement..." : "abcDEF123"}
                            />
                          )}
                        </div>
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
              <Input value={editTour.tourUrl} onChange={(e) => setEditTour({ ...editTour, tourUrl: e.target.value })} placeholder="https://my.matterport.com/show/..." />
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
                  readOnly
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
                  readOnly
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
                    <label className="text-sm font-medium mb-1 block">Image du produit (URL)</label>
                    <Input value={editItem.imageUrl} onChange={(e) => setEditItem({ ...editItem, imageUrl: e.target.value })} placeholder="https://..." />
                    {editItem.imageUrl && (
                      <img src={editItem.imageUrl} alt="preview" className="w-24 h-24 object-cover rounded-lg mt-2 border" />
                    )}
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
                                  {tag.name}{tag.sid ? ` (${tag.sid.slice(0, 10)}…)` : " (pas de SID)"}
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
                    <label className="text-sm font-medium mb-1 block">Image (URL)</label>
                    <Input value={editService.imageUrl} onChange={(e) => setEditService({ ...editService, imageUrl: e.target.value })} placeholder="https://..." />
                    {editService.imageUrl && (
                      <img src={editService.imageUrl} alt="preview" className="w-24 h-24 object-cover rounded-lg mt-2 border" />
                    )}
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
                                  {tag.name}{tag.sid ? ` (${tag.sid.slice(0, 10)}…)` : " (pas de SID)"}
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
