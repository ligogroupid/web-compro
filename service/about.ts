import { supabase } from "@/lib/supabase";

type AboutPageSection = "banner";

type AboutPageImages = {
  section: AboutPageSection;
  images: string[];
};

/**
 * Fetch banner images for the About Us page.
 * Returns an array of image URLs, or empty array if not found.
 */
export async function getAboutPageBannerImages(): Promise<string[]> {
  const { data, error } = await supabase
    .from("about_page_content")
    .select("images")
    .eq("section", "banner")
    .single();

  if (error) {
    console.error("[about-page] Failed to fetch banner images:", error.message);
    return [];
  }

  return data?.images ?? [];
}

/**
 * Fetch all about page sections at once.
 * Returns an object with banner image array.
 */
export async function getAllAboutPageImages(): Promise<{
  banner: string[];
}> {
  const { data, error } = await supabase
    .from("about_page_content")
    .select("section, images")
    .order("section", { ascending: true });

  if (error) {
    console.error("[about-page] Failed to fetch about page images:", error.message);
    return { banner: [] };
  }

  const sections = (data ?? []) as AboutPageImages[];

  const banner = sections.find((s) => s.section === "banner")?.images ?? [];

  return { banner };
}
