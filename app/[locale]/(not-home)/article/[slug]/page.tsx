import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { DUMMY_ARTICLES } from "@/dummy/articles";
import type { Locale } from "@/i18n/routing";
import { formatArticleDate } from "@/lib/format-date";
import ArticleCard from "@/components/ArticleCard";
import ButtonBrandLink from "@/components/ButtonBrandLink";
import Separator from "@/components/separator";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/* ─── Dynamic metadata (title + open graph image) ─── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = DUMMY_ARTICLES.find((a) => a.slug === slug);

  if (!article) return { title: "Article Not Found" };

  const loc = locale as Locale;

  return {
    title: article.title[loc],
    openGraph: {
      title: article.title[loc],
      images: article.thumbnail ? [{ url: article.thumbnail }] : [],
    },
  };
}

/* ─── Page component ─── */

export default async function Page__ArticleDetail({ params }: Props) {
  const { locale, slug } = await params;
  const loc = locale as Locale;

  const article = DUMMY_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  /* Other news — exclude current article, take 3 */
  const otherArticles = DUMMY_ARTICLES.filter((a) => a.slug !== slug)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  const formattedDate = formatArticleDate(article.created_date, loc);

  return (
    <>
      {/* ────────────────────────────────────────────────
          SECTION 1 — Article Content
          ──────────────────────────────────────────────── */}
      <article className="bg-white px-4 md:px-8">
        <div className="mx-auto max-w-5xl py-10 md:py-16 lg:py-20">
          {/* ── Mobile: stacked (date → image → title → content) ── */}
          {/* ── Desktop: two-column (date sticky | image + title + content) ── */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-12 lg:gap-16">
            {/* Left column — Date (sticky on desktop) */}
            <aside className="hidden md:block">
              <div className="article-date-sidebar">
                <span className="text-xs tracking-[0.02em] uppercase">
                  {formattedDate}
                </span>
              </div>
            </aside>

            {/* Right column — Article body */}
            <div className="min-w-0">
              {/* Mobile date */}
              <span className="text-xs tracking-[0.02em] uppercase block mb-4 md:hidden">
                {formattedDate}
              </span>

              {/* Thumbnail / Hero image */}
              {article.thumbnail && (
                <div className="aspect-[16/9] w-full overflow-hidden bg-gray-light">
                  <img
                    src={article.thumbnail}
                    alt={article.title[loc]}
                    className="size-full object-cover"
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="set-text-headline1 font-extrabold mt-8 md:mt-10">
                {article.title[loc]}
              </h1>

              {/* Rich text content */}
              <div
                className="article-prose prose prose-lg max-w-none mt-8 md:mt-12"
                dangerouslySetInnerHTML={{ __html: article.content[loc] }}
              />

              {/* Back button */}
              <div className="md:hidden mt-12 md:mt-16">
                <ButtonBrandLink href="/article" scroll={true}>
                  {loc === "id" ? "Kembali ke Artikel" : "Back to Articles"}
                </ButtonBrandLink>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-12 lg:gap-16">
            {/* Back button */}
            <div className="mt-12 md:mt-16">
              <ButtonBrandLink href="/article" scroll={true}>
                {loc === "id" ? "Kembali ke Artikel" : "Back to Articles"}
              </ButtonBrandLink>
            </div>
          </div>
        </div>
      </article>

      {/* ────────────────────────────────────────────────
          SECTION 2 — Other News & Articles
          ──────────────────────────────────────────────── */}
      <Separator />

      <section className="bg-[#e8e8e8] px-4 md:px-8">
        <div className="mx-auto max-w-7xl py-16 md:py-[105px]">
          {/* Section label */}
          <span className="set-text-caption1 uppercase text-primary-blue/70 block">
            {loc === "id" ? "Berita" : "News"}
          </span>

          {/* Section heading */}
          <h2 className="set-text-headline2 font-bold mt-3 max-w-md">
            {loc === "id"
              ? "Lihat Berita & Artikel Lainnya"
              : "Checkout Other News & Articles"}
          </h2>

          {/* Cards grid — 3 columns */}
          {otherArticles.length > 0 && (
            <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {otherArticles.map((otherArticle, idx) => (
                <ArticleCard
                  key={otherArticle.slug}
                  article={otherArticle}
                  locale={loc}
                  index={idx}
                  variant="other-news"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
