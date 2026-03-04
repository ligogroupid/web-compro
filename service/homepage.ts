import { supabase } from "@/lib/supabase";

type HomepageSection = "hero" | "distribution";

type HomepageImages = {
  section: HomepageSection;
  images: string[];
};

/**
 * Fetch images for a specific homepage section (hero or distribution).
 * Returns an array of image URLs, or empty array if not found.
 */
export async function getHomepageSectionImages(
  section: HomepageSection
): Promise<string[]> {
  const { data, error } = await supabase
    .from("homepage_content")
    .select("images")
    .eq("section", section)
    .single();

  if (error) {
    console.error(`[homepage] Failed to fetch ${section} images:`, error.message);
    return [];
  }

  return data?.images ?? [];
}

/**
 * Fetch all homepage sections at once.
 * Returns an object with hero and distribution image arrays.
 */
export async function getAllHomepageImages(): Promise<{
  hero: string[];
  distribution: string[];
}> {
  const { data, error } = await supabase
    .from("homepage_content")
    .select("section, images")
    .order("section", { ascending: true });

  if (error) {
    console.error("[homepage] Failed to fetch homepage images:", error.message);
    return { hero: [], distribution: [] };
  }

  const sections = (data ?? []) as HomepageImages[];

  const hero = sections.find((s) => s.section === "hero")?.images ?? [];
  const distribution =
    sections.find((s) => s.section === "distribution")?.images ?? [];

  return { hero, distribution };
}
