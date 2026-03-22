const API_BASE = "/api";

export interface Tour {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  surface: number;
  tourUrl: string;
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
