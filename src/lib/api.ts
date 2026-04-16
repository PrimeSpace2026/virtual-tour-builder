const API_BASE = "/api";

export interface Tour {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  surface: number;
  tourUrl: string;
  metadataJson?: string;
}

export interface TourItem {
  id: number;
  tourId: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number | null;
  currency: string;
  externalUrl: string;
  brand: string;
  showAddToCart: boolean;
}

export interface TourServiceEntry {
  id: number;
  tourId: number;
  name: string;
  description: string;
  imageUrl: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
}

export interface Chamber {
  id: number;
  tourId: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number | null;
  currency: string;
}

export async function getTours(): Promise<Tour[]> {
  const res = await fetch(`${API_BASE}/tours`);
  if (!res.ok) throw new Error("Failed to fetch tours");
  return res.json();
}

export async function getTourById(id: number): Promise<Tour> {
  const res = await fetch(`${API_BASE}/tours/${id}`);
  if (!res.ok) throw new Error("Tour not found");
  return res.json();
}

export async function createTour(tour: Omit<Tour, "id">): Promise<Tour> {
  const res = await fetch(`${API_BASE}/tours`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tour),
  });
  if (!res.ok) throw new Error("Failed to create tour");
  return res.json();
}

export async function updateTour(id: number, tour: Omit<Tour, "id">): Promise<Tour> {
  const res = await fetch(`${API_BASE}/tours/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tour),
  });
  if (!res.ok) throw new Error("Failed to update tour");
  return res.json();
}

export async function deleteTour(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/tours/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete tour");
}

export async function getTourItems(tourId: number): Promise<TourItem[]> {
  const res = await fetch(`${API_BASE}/tours/${tourId}/items`);
  if (!res.ok) return [];
  return res.json();
}

export async function getTourServices(tourId: number): Promise<TourServiceEntry[]> {
  const res = await fetch(`${API_BASE}/tours/${tourId}/services`);
  if (!res.ok) return [];
  return res.json();
}

export async function getTourChambers(tourId: number): Promise<Chamber[]> {
  const res = await fetch(`${API_BASE}/tours/${tourId}/chambers`);
  if (!res.ok) return [];
  return res.json();
}
