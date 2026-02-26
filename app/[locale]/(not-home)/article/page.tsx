import type { Locale } from "@/i18n/routing";

import { DUMMY_ARTICLES } from "@/dummy/articles";
import ArticleCard from "@/components/ArticleCard";
import ArticlePagination from "@/components/article-pagination";

const ITEMS_PER_PAGE = 4;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function Page__Article({ params, searchParams }: Props) {
  const { locale } = await params;
  const { page } = await searchParams;

  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  const articles = DUMMY_ARTICLES.sort((a, b) => a.order - b.order);
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, totalPages);

  // Slice articles for current page
  const startIdx = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const pageArticles = articles.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // First article = hero, rest = compact sidebar
  const heroArticle = pageArticles[0];
  const compactArticles = pageArticles.slice(1);

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
