/**
 * URL slug helpers — keeps tour URLs human-readable.
 * "The Samuel Hotel" → "the-samuel-hotel"
 */
export const slugify = (s: string | null | undefined): string =>
  (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Build the canonical /view/<slug> path for a tour, with numeric-id fallback. */
export const tourPath = (tour: { id: number | string; name?: string | null }): string => {
  const slug = slugify(tour.name || "");
  return `/view/${slug || tour.id}`;
};
