import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

import { getArticlesPaginated } from "@/service/article";
import ArticleCard from "@/components/ArticleCard";
import ArticlePagination from "@/components/article-pagination";
import { getPageMetadata } from "@/service/seo";

const ITEMS_PER_PAGE = 4;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

/* ─── Dynamic SEO metadata for Articles List ─── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;

  const seo = await getPageMetadata("articles");
  if (!seo) return {};

  const title = seo.metaTitle[loc] || undefined;
  const description = seo.metaDescription[loc] || undefined;

  return {
    title,
    description,
    openGraph: {
      title: title ? `${title} | Ligo Group` : undefined,
      description,
      images: seo.metaImage ? [{ url: seo.metaImage }] : undefined,
    },
  };
}

export default async function Page__Article({ params, searchParams }: Props) {
  const { locale } = await params;
  const { page } = await searchParams;

  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  const { articles, total } = await getArticlesPaginated(currentPage, ITEMS_PER_PAGE);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, Math.max(1, totalPages));

  // Articles already paginated from Supabase — no additional slicing needed
  // First article = hero, rest = compact sidebar
  const heroArticle = articles[0];
  const compactArticles = articles.slice(1);

  return (
    <section className="bg-white px-4 md:px-8">
      <div className="mx-auto max-w-7xl py-16 md:py-[105px]">
        {/* Section header */}
        <div className="mb-12 max-w-[494px] md:mb-16">
          <h2 className="set-text-headline1">
            Never Miss an Update on Our News and Article
          </h2>
        </div>

        {/* Article grid — hero left, compact stack right */}
        {heroArticle && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Left column — featured / hero card */}
            <ArticleCard
              article={heroArticle}
              locale={locale as Locale}
              index={0}
              variant="hero"
            />

            {/* Right column — stacked compact cards */}
            <div className="flex flex-col gap-5 justify-between h-full">
              {compactArticles.map((article, idx) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  locale={locale as Locale}
                  index={idx}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        )}

        {/* Divider + Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 md:mt-20">
            <ArticlePagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </section>
  );
}
