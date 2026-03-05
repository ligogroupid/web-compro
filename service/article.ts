import { supabase } from "@/lib/supabase";

/**
 * Article row from Supabase queries (selected columns only).
 * This is a subset of the full table columns.
 */
type ArticleSelectRow = {
  id: string;
  slug: string;
  title_id: string;
  title_en: string;
  name_id: string;
  name_en: string;
  thumbnail: string | null;
  content_id: string | null;
  content_en: string | null;
  created_at: string | null;
};

/**
 * LocaleText structure for bilingual fields.
 */
export type LocaleText = {
  id: string;
  en: string;
};

/**
 * Article format expected by UI components.
 * Uses LocaleText objects and camelCase for consistency with other services.
 */
export type Article = {
  slug: string;
  title: LocaleText;
  name: LocaleText;
  thumbnail: string | null;
  content: LocaleText;
  createdAt: string; // ISO 8601 datetime
};

/**
 * Transform a Supabase article row to the UI format.
 */
function transformArticle(row: ArticleSelectRow): Article {
  return {
    slug: row.slug,
    title: {
      id: row.title_id,
      en: row.title_en,
    },
    name: {
      id: row.name_id,
      en: row.name_en,
    },
    thumbnail: row.thumbnail,
    content: {
      id: row.content_id ?? "",
      en: row.content_en ?? "",
    },
    createdAt: row.created_at ?? new Date().toISOString(),
  };
}

/**
 * Fetch all published articles, sorted by created_at DESC (newest first).
 * Returns transformed articles ready for UI consumption.
 */
export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title_id, title_en, name_id, name_en, thumbnail, content_id, content_en, created_at")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[articles] Failed to fetch articles:", error.message);
    return [];
  }

  return (data ?? []).map(transformArticle);
}

/**
 * Fetch a paginated list of published articles.
 * @param page - Page number (1-indexed)
 * @param limit - Number of items per page
 */
export async function getArticlesPaginated(
  page: number = 1,
  limit: number = 4
): Promise<{ articles: Article[]; total: number }> {
  const offset = (page - 1) * limit;

  // Fetch total count
  const { count, error: countError } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("is_published", true);

  if (countError) {
    console.error("[articles] Failed to count articles:", countError.message);
    return { articles: [], total: 0 };
  }

  // Fetch paginated data
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title_id, title_en, name_id, name_en, thumbnail, content_id, content_en, created_at")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[articles] Failed to fetch paginated articles:", error.message);
    return { articles: [], total: count ?? 0 };
  }

  return {
    articles: (data ?? []).map(transformArticle),
    total: count ?? 0,
  };
}

/**
 * Fetch a single article by its slug.
 * Returns undefined if not found or not published.
 */
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title_id, title_en, name_id, name_en, thumbnail, content_id, content_en, created_at")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // PGRST116 = "could not find the row"
      return undefined;
    }
    console.error("[articles] Failed to fetch article by slug:", error.message);
    return undefined;
  }

  return transformArticle(data);
}

/**
 * Fetch recent articles for homepage display.
 * Returns the most recent N articles, sorted by created_at DESC.
 * @param limit - Number of articles to fetch (default: 4)
 */
export async function getRecentArticles(limit: number = 4): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title_id, title_en, name_id, name_en, thumbnail, content_id, content_en, created_at")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[articles] Failed to fetch recent articles:", error.message);
    return [];
  }

  return (data ?? []).map(transformArticle);
}

/**
 * Fetch articles excluding a specific slug.
 * Useful for "other news" sections on article detail pages.
 * @param excludeSlug - Slug to exclude
 * @param limit - Number of articles to fetch
 */
export async function getOtherArticles(
  excludeSlug: string,
  limit: number = 3
): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title_id, title_en, name_id, name_en, thumbnail, content_id, content_en, created_at")
    .eq("is_published", true)
    .neq("slug", excludeSlug)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[articles] Failed to fetch other articles:", error.message);
    return [];
  }

  return (data ?? []).map(transformArticle);
}
