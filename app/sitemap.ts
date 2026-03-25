import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ligogroup.com";
  
  const sitemap: MetadataRoute.Sitemap = [];
  
  // Add static pages for each locale
  const staticPages = [
    "", // homepage
    "/about-us",
    "/contact",
    "/article",
    "/company",
  ];

  for (const locale of routing.locales) {
    for (const page of staticPages) {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  try {
    // Add dynamic company pages
    const { data: companies } = await supabase
      .from("companies")
      .select("slug, updated_at")
      .order("updated_at", { ascending: false });

    if (companies) {
      for (const locale of routing.locales) {
        companies.forEach((company) => {
          sitemap.push({
            url: `${baseUrl}/${locale}/company/${company.slug}`,
            lastModified: new Date(company.updated_at),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        });
      }
    }

    // Add dynamic article pages
    const { data: articles } = await supabase
      .from("articles")
      .select("slug, updated_at")
      .order("updated_at", { ascending: false });

    if (articles) {
      for (const locale of routing.locales) {
        articles.forEach((article) => {
          sitemap.push({
            url: `${baseUrl}/${locale}/article/${article.slug}`,
            lastModified: new Date(article.updated_at),
            changeFrequency: "monthly",
            priority: 0.6,
          });
        });
      }
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return sitemap;
}