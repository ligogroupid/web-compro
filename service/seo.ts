import { supabase } from "@/lib/supabase";

type PageType = "home" | "about" | "contact" | "articles";

export type PageMetadata = {
  metaTitle: { id: string; en: string };
  metaDescription: { id: string; en: string };
  metaImage: string | null;
};

/**
 * Fetch SEO metadata for a static page from the `page_metadata` table.
 *
 * Returns `null` when the row is missing or a network error occurs —
 * callers should fall back to the root-layout defaults in that case.
 */
export async function getPageMetadata(
  page: PageType,
): Promise<PageMetadata | null> {
  try {
    const { data, error } = await supabase
      .from("page_metadata")
      .select(
        "meta_title_id, meta_title_en, meta_description_id, meta_description_en, meta_image",
      )
      .eq("page", page)
      .single();

    if (error || !data) {
      console.warn(
        `[seo] page_metadata not found for "${page}":`,
        error?.message,
      );
      return null;
    }

    return {
      metaTitle: {
        id: data.meta_title_id ?? "",
        en: data.meta_title_en ?? "",
      },
      metaDescription: {
        id: data.meta_description_id ?? "",
        en: data.meta_description_en ?? "",
      },
      metaImage: data.meta_image ?? null,
    };
  } catch {
    console.warn(`[seo] Failed to fetch page_metadata for "${page}"`);
    return null;
  }
}
