import { supabase } from "@/lib/supabase";

type AboutPageSection = "banner_middle" | "banner_bottom";

type AboutPageImages = {
  section: AboutPageSection;
  images: string[];
};

/**
 * Fetch banner middle images for the About Us page.
 * Displayed as a sticky banner between Values and Business Model sections.
 * Returns an array of image URLs, or empty array if not found.
 */
export async function getAboutPageBannerMiddleImages(): Promise<string[]> {
  const { data, error } = await supabase
    .from("about_page_content")
    .select("images")
    .eq("section", "banner_middle")
    .single();

  if (error) {
    console.error("[about-page] Failed to fetch banner middle images:", error.message);
    return [];
  }

  return data?.images ?? [];
}

/**
 * Fetch banner bottom images for the About Us page.
 * Displayed after the Our Journey section.
 * Returns an array of image URLs, or empty array if not found.
 */
export async function getAboutPageBannerBottomImages(): Promise<string[]> {
  const { data, error } = await supabase
    .from("about_page_content")
    .select("images")
    .eq("section", "banner_bottom")
    .single();

  if (error) {
    console.error("[about-page] Failed to fetch banner bottom images:", error.message);
    return [];
  }

  return data?.images ?? [];
}

/**
 * Fetch all about page sections at once.
 * Returns an object with both banner image arrays.
 */
export async function getAllAboutPageImages(): Promise<{
  bannerMiddle: string[];
  bannerBottom: string[];
}> {
  const { data, error } = await supabase
    .from("about_page_content")
    .select("section, images")
    .order("section", { ascending: true });

  if (error) {
    console.error("[about-page] Failed to fetch about page images:", error.message);
    return { bannerMiddle: [], bannerBottom: [] };
  }

  const sections = (data ?? []) as AboutPageImages[];

  const bannerMiddle = sections.find((s) => s.section === "banner_middle")?.images ?? [];
  const bannerBottom = sections.find((s) => s.section === "banner_bottom")?.images ?? [];

  return { bannerMiddle, bannerBottom };
}
