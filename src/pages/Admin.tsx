import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "@/config/api";
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
import { Plus, Pencil, Trash2, Upload, X, Image as ImageIcon, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tour {
  id?: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  surface: number | null;
  tourUrl: string;
}

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
};

const Admin = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTour, setEditTour] = useState<Tour>(emptyTour);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [authed, setAuthed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) { navigate("/login"); return; }
    fetch(`${API_URL}/api/auth/verify`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => { if (!r.ok) throw new Error(); setAuthed(true); })
      .catch(() => { sessionStorage.removeItem("admin_token"); navigate("/login"); });
  }, [navigate]);

  const handleLogout = () => {
    const token = sessionStorage.getItem("admin_token");
    if (token) fetch(`${API_URL}/api/auth/logout`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    sessionStorage.removeItem("admin_token");
    navigate("/login");
  };

  const fetchTours = () => {
    fetch(`${API_URL}/api/tours`)
      .then((res) => res.json())
      .then(setTours)
      .catch(() => toast({ title: "Erreur", description: "Impossible de charger les visites", variant: "destructive" }));
  };

  useEffect(() => {
    if (authed) fetchTours();
  }, [authed]);

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Erreur", description: "Le fichier doit être une image", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_URL}/api/upload`, { method: "POST", body: formData });
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
    setDialogOpen(true);
  };

  const openEdit = (tour: Tour) => {
    setEditTour({ ...tour });
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editTour.name || !editTour.category) {
      toast({ title: "Erreur", description: "Nom et catégorie sont obligatoires", variant: "destructive" });
      return;
    }
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/api/tours/${editTour.id}` : `${API_URL}/api/tours`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editTour),
    });
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
    const res = await fetch(`${API_URL}/api/tours/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Visite supprimée" });
      fetchTours();
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
            <Button onClick={openCreate} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Ajouter une visite
            </Button>
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
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleSave} disabled={uploading}>Enregistrer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
