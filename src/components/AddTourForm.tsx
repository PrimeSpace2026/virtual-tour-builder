import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  BedDouble,
  Building2,
  ConciergeBell,
  ImagePlus,
  Link2,
  MapPin,
  Plus,
  Sparkles,
  Trash2,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type BusinessCategory = "hotellerie" | "restaurant" | "wellness";
type BedType = "King" | "Queen" | "Twin";

type HotspotItem = {
  title: string;
  link: string;
  description: string;
};

interface TourFormData {
  title: string;
  location: string;
  category: BusinessCategory;
  shortDescription: string;
  coverImageUrl: string;
  tour3DUrl: string;
  galleryFolder: string;
  roomName: string;
  bedType: BedType;
  capacity: string;
  amenities: string[];
  bookNowUrl: string;
  diningStyle: string;
  menuUrl: string;
  reservationUrl: string;
  wellnessFocus: string;
  consultationUrl: string;
  hotspots: HotspotItem[];
}

const HOTEL_AMENITIES = ["WiFi", "Mini-bar", "Ocean View", "Balcony", "AC"];

const CATEGORY_META: Record<BusinessCategory, { label: string; hint: string; icon: LucideIcon }> = {
  hotellerie: {
    label: "Hôtellerie",
    hint: "Chambres, suites, services, liens de réservation et sous-espaces.",
    icon: BedDouble,
  },
  restaurant: {
    label: "Restaurant",
    hint: "Espaces de restauration, menu, réservations et zones mises en avant.",
    icon: UtensilsCrossed,
  },
  wellness: {
    label: "Wellness",
    hint: "Spa, performance, consultation et expériences bien-être.",
    icon: Sparkles,
  },
};

const initialFormData: TourFormData = {
  title: "",
  location: "",
  category: "hotellerie",
  shortDescription: "",
  coverImageUrl: "",
  tour3DUrl: "",
  galleryFolder: "",
  roomName: "",
  bedType: "King",
  capacity: "2",
  amenities: ["WiFi", "AC"],
  bookNowUrl: "",
  diningStyle: "",
  menuUrl: "",
  reservationUrl: "",
  wellnessFocus: "",
  consultationUrl: "",
  hotspots: [{ title: "", link: "", description: "" }],
};

function SectionCard({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-2 text-indigo-300">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function FieldWrapper({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      {children}
    </label>
  );
}

const inputClassName =
  "w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20";

export function AddTourForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<TourFormData>(initialFormData);
  const [saving, setSaving] = useState(false);

  const categoryMeta = useMemo(() => CATEGORY_META[formData.category], [formData.category]);
  const ActiveCategoryIcon = categoryMeta.icon;

  const updateField = <K extends keyof TourFormData>(field: K, value: TourFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const updateHotspot = (index: number, field: keyof HotspotItem, value: string) => {
    setFormData((prev) => ({
      ...prev,
      hotspots: prev.hotspots.map((hotspot, hotspotIndex) =>
        hotspotIndex === index ? { ...hotspot, [field]: value } : hotspot,
      ),
    }));
  };

  const addHotspot = () => {
    setFormData((prev) => ({
      ...prev,
      hotspots: [...prev.hotspots, { title: "", link: "", description: "" }],
    }));
  };

  const removeHotspot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      hotspots:
        prev.hotspots.length === 1
          ? prev.hotspots
          : prev.hotspots.filter((_, hotspotIndex) => hotspotIndex !== index),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a tour title before saving.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const payload = {
      name: formData.title.trim(),
      description: formData.shortDescription.trim(),
      category: categoryMeta.label,
      imageUrl: formData.coverImageUrl.trim(),
      surface: Number(formData.capacity) || 0,
      tourUrl:
        formData.tour3DUrl.trim() ||
        formData.hotspots.find((item) => item.link.trim())?.link ||
        "",
      latitude: 0,
      longitude: 0,
      location: formData.location.trim(),
    };

    try {
      const response = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unable to save the tour.");
      }

      const createdTour = await response.json();
      console.log("PrimeSpace Add Tour payload", formData);
      console.log("PrimeSpace created tour", createdTour);

      toast({
        title: "Tour saved",
        description: "Your new tour has been added to the Portfolio.",
      });

      setFormData(initialFormData);
      navigate("/portfolio");
    } catch (error) {
      console.error("Failed to save tour", error);
      toast({
        title: "Save failed",
        description: "The tour could not be added right now.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-300">
              PrimeSpace Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Add New Tour
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Create structured 3D tours with category-aware fields for hospitality,
              dining, and wellness experiences.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3">
            <ActiveCategoryIcon className="h-5 w-5 text-indigo-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Active category</p>
              <p className="text-sm font-medium text-white">{categoryMeta.label}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <SectionCard
              title="General Info"
              description="Core details shared by every business tour."
              icon={Building2}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FieldWrapper label="Tour title">
                  <input
                    value={formData.title}
                    onChange={(event) => updateField("title", event.target.value)}
                    placeholder="Canyon Ranch Tucson"
                    className={inputClassName}
                  />
                </FieldWrapper>

                <FieldWrapper label="Location">
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      value={formData.location}
                      onChange={(event) => updateField("location", event.target.value)}
                      placeholder="Tucson, Arizona"
                      className={`${inputClassName} pl-10`}
                    />
                  </div>
                </FieldWrapper>

                <FieldWrapper label="Business category">
                  <select
                    value={formData.category}
                    onChange={(event) => updateField("category", event.target.value as BusinessCategory)}
                    className={inputClassName}
                  >
                    <option value="hotellerie">Hotellerie</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="wellness">Wellness</option>
                  </select>
                </FieldWrapper>

                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Structure hint</p>
                  <p className="mt-1 text-sm text-slate-300">{categoryMeta.hint}</p>
                </div>
              </div>

              <div className="mt-4">
                <FieldWrapper label="Short description">
                  <textarea
                    rows={4}
                    value={formData.shortDescription}
                    onChange={(event) => updateField("shortDescription", event.target.value)}
                    placeholder="Write a polished intro for this immersive experience..."
                    className={inputClassName}
                  />
                </FieldWrapper>
              </div>
            </SectionCard>

            <SectionCard
              title="Category Specifics"
              description="Fields adapt automatically to the selected business type."
              icon={categoryMeta.icon}
            >
              {formData.category === "hotellerie" && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <FieldWrapper label="Room name">
                      <input
                        value={formData.roomName}
                        onChange={(event) => updateField("roomName", event.target.value)}
                        placeholder="Deluxe Ocean Suite"
                        className={inputClassName}
                      />
                    </FieldWrapper>

                    <FieldWrapper label="Bed type">
                      <select
                        value={formData.bedType}
                        onChange={(event) => updateField("bedType", event.target.value as BedType)}
                        className={inputClassName}
                      >
                        <option value="King">King</option>
                        <option value="Queen">Queen</option>
                        <option value="Twin">Twin</option>
                      </select>
                    </FieldWrapper>

                    <FieldWrapper label="Capacity">
                      <input
                        type="number"
                        min="1"
                        value={formData.capacity}
                        onChange={(event) => updateField("capacity", event.target.value)}
                        placeholder="2"
                        className={inputClassName}
                      />
                    </FieldWrapper>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-slate-200">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {HOTEL_AMENITIES.map((amenity) => {
                        const active = formData.amenities.includes(amenity);
                        return (
                          <button
                            key={amenity}
                            type="button"
                            onClick={() => toggleAmenity(amenity)}
                            className={`rounded-full border px-3 py-2 text-sm transition ${
                              active
                                ? "border-indigo-400 bg-indigo-500/15 text-indigo-200"
                                : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-500"
                            }`}
                          >
                            {amenity}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <FieldWrapper label="Book Now URL">
                    <div className="relative">
                      <Link2 className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                      <input
                        value={formData.bookNowUrl}
                        onChange={(event) => updateField("bookNowUrl", event.target.value)}
                        placeholder="https://primespace.com/book/deluxe-ocean-suite"
                        className={`${inputClassName} pl-10`}
                      />
                    </div>
                  </FieldWrapper>
                </div>
              )}

              {formData.category === "restaurant" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldWrapper label="Dining style">
                    <input
                      value={formData.diningStyle}
                      onChange={(event) => updateField("diningStyle", event.target.value)}
                      placeholder="Fine Dining / Casual / Café"
                      className={inputClassName}
                    />
                  </FieldWrapper>

                  <FieldWrapper label="Menu URL">
                    <input
                      value={formData.menuUrl}
                      onChange={(event) => updateField("menuUrl", event.target.value)}
                      placeholder="https://example.com/menu"
                      className={inputClassName}
                    />
                  </FieldWrapper>

                  <FieldWrapper label="Reservation URL">
                    <input
                      value={formData.reservationUrl}
                      onChange={(event) => updateField("reservationUrl", event.target.value)}
                      placeholder="https://example.com/reserve"
                      className={inputClassName}
                    />
                  </FieldWrapper>
                </div>
              )}

              {formData.category === "wellness" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldWrapper label="Wellness focus">
                    <input
                      value={formData.wellnessFocus}
                      onChange={(event) => updateField("wellnessFocus", event.target.value)}
                      placeholder="Mind & Spirit / Spa / Performance"
                      className={inputClassName}
                    />
                  </FieldWrapper>

                  <FieldWrapper label="Consultation URL">
                    <input
                      value={formData.consultationUrl}
                      onChange={(event) => updateField("consultationUrl", event.target.value)}
                      placeholder="https://example.com/consultation"
                      className={inputClassName}
                    />
                  </FieldWrapper>
                </div>
              )}
            </SectionCard>

            <SectionCard
              title="Add Sub-Items / Hotspots"
              description="Add multiple rooms or featured 3D points within the selected tour."
              icon={ConciergeBell}
            >
              <div className="space-y-4">
                {formData.hotspots.map((hotspot, index) => (
                  <div
                    key={`${hotspot.title}-${index}`}
                    className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">Sub-item #{index + 1}</p>
                      <button
                        type="button"
                        onClick={() => removeHotspot(index)}
                        disabled={formData.hotspots.length === 1}
                        className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 px-3 py-1.5 text-xs text-rose-200 transition hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FieldWrapper label="Title">
                        <input
                          value={hotspot.title}
                          onChange={(event) => updateHotspot(index, "title", event.target.value)}
                          placeholder="Luxury Suite"
                          className={inputClassName}
                        />
                      </FieldWrapper>

                      <FieldWrapper label="Matterport / 3D Link">
                        <input
                          value={hotspot.link}
                          onChange={(event) => updateHotspot(index, "link", event.target.value)}
                          placeholder="https://my.matterport.com/show/?m=..."
                          className={inputClassName}
                        />
                      </FieldWrapper>
                    </div>

                    <div className="mt-4">
                      <FieldWrapper label="Short description">
                        <textarea
                          rows={3}
                          value={hotspot.description}
                          onChange={(event) => updateHotspot(index, "description", event.target.value)}
                          placeholder="Briefly describe the experience for this room or hotspot."
                          className={inputClassName}
                        />
                      </FieldWrapper>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addHotspot}
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
                >
                  <Plus className="h-4 w-4" />
                  Add Sub-Item
                </button>
              </div>
            </SectionCard>
          </div>

          <div className="space-y-6">
            <SectionCard
              title="Media Uploads"
              description="Attach visuals and cover assets for the admin preview."
              icon={ImagePlus}
            >
              <div className="space-y-4">
                <FieldWrapper label="Cover image URL">
                  <input
                    value={formData.coverImageUrl}
                    onChange={(event) => updateField("coverImageUrl", event.target.value)}
                    placeholder="https://cdn.primespace.com/cover.jpg"
                    className={inputClassName}
                  />
                </FieldWrapper>

                <FieldWrapper label="Main tour URL">
                  <input
                    value={formData.tour3DUrl}
                    onChange={(event) => updateField("tour3DUrl", event.target.value)}
                    placeholder="https://tours.mattermore360.com/en/tour/canyon-ranch-tucson"
                    className={inputClassName}
                  />
                </FieldWrapper>

                <FieldWrapper label="Gallery folder / asset path">
                  <input
                    value={formData.galleryFolder}
                    onChange={(event) => updateField("galleryFolder", event.target.value)}
                    placeholder="uploads/tours/canyon-ranch/"
                    className={inputClassName}
                  />
                </FieldWrapper>
              </div>
            </SectionCard>

            <SectionCard
              title="Live Preview"
              description="Quick summary of the payload to be saved."
              icon={Sparkles}
            >
              <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Tour</p>
                  <p className="mt-1 font-medium text-white">{formData.title || "Untitled Tour"}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Category</p>
                  <p className="mt-1">{categoryMeta.label}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Sub-items</p>
                  <p className="mt-1">{formData.hotspots.length} configured</p>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(initialFormData)}
                  className="flex-1 rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-2xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Tour"}
                </button>
              </div>
            </SectionCard>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTourForm;
