import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ligogroup.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "*.pdf",
          "*.doc",
          "*.docx"
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}