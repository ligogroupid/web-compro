import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatArticleDate } from "@/lib/format-date";

import type { Article as ArticleFromService } from "@/service/article";
import type { Article as ArticleFromDummy } from "@/dummy/articles";
import Icon__ArrowRight from "./icon-arrow-right";

/**
 * Union type supporting both:
 * - Database format (createdAt)
 * - Dummy data format (created_date)
 */
type Article = ArticleFromService | ArticleFromDummy;

type Props = {
  article: Article;
  locale: Locale;
  index: number;
  variant?: "hero" | "compact" | "other-news";
};

/**
 * Get the created date from either format.
 */
function getCreatedDate(article: Article): string {
  // Check for database format (createdAt)
  if ("createdAt" in article) {
    return article.createdAt;
  }
  // Dummy format uses created_date
  return (article as ArticleFromDummy).created_date;
}

/**
 * Get title from either format.
 */
function getTitle(article: Article, locale: Locale): string {
  if ("createdAt" in article) {
    return article.title[locale];
  }
  return (article as ArticleFromDummy).title[locale];
}

const VARIANT_STYLES = {
  hero: {
    link: "article-card-reveal group flex flex-col overflow-hidden bg-gray-light",
    thumbnail: "relative aspect-[281/144] w-full overflow-hidden bg-gray-light",
    imgHover:
      "size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
    textWrapper: "py-10 px-6 pb-4 bg-white",
    title: "mt-4 md:mt-8 text-headline2 leading-[1.3em] font-semibold",
    titleTag: "h3",
    revealDelay: (index: number) => index * 120,
  },
  compact: {
    link: "bg-gray-light article-card-reveal group flex",
    thumbnail:
      "relative aspect-[281/144] h-[144px] overflow-hidden bg-gray-light",
    imgHover:
      "size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110",
    textWrapper: "flex-1 px-4 py-6 bg-white",
    title:
      "mt-6 line-clamp-3 text-sm leading-[1.4] font-bold text-primary-blue sm:text-[0.9375rem] sm:leading-[1.35] pr-7",
    titleTag: "h4",
    revealDelay: (index: number) => (index + 1) * 120,
  },
  "other-news": {
    link: "article-card-reveal group flex flex-col overflow-hidden bg-gray-light",
    thumbnail: "relative aspect-[16/10] w-full overflow-hidden bg-gray-light",
    imgHover:
      "size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
    textWrapper: "py-5 px-5 pb-4 flex-1 flex flex-col",
    title:
      "mt-2 line-clamp-3 text-sm leading-[1.45] font-bold text-primary-blue sm:text-[0.9375rem] sm:leading-[1.4]",
    titleTag: "h4",
    revealDelay: (index: number) => (index + 1) * 150,
  },
} as const;

export default function ArticleCard({
  article,
  locale,
  index,
  variant = "hero",
}: Props) {
  const styles = VARIANT_STYLES[variant];
  const TitleTag = styles.titleTag;

  const createdDate = getCreatedDate(article);
  const titleText = getTitle(article, locale);
  const thumbnail = article.thumbnail;

  return (
    <Link
      href={`/article/${article.slug}`}
      scroll={true}
      className={styles.link}
      style={
        {
          "--reveal-delay": `${styles.revealDelay(index)}ms`,
        } as React.CSSProperties
      }
    >
      {/* Thumbnail */}
      <div className={styles.thumbnail}>
        {thumbnail && (
          <img
            className={`${styles.imgHover} pointer-events-none`}
            alt={titleText}
            src={thumbnail}
          />
        )}
      </div>

      {/* Text content */}
      <div className={styles.textWrapper}>
        {/* Date — editorial dateline */}
        <span className="text-xs tracking-[0.02em] block uppercase text-primary-blue">
          {formatArticleDate(createdDate, locale)}
        </span>

        {/* Title */}
        <TitleTag className={styles.title}>{titleText}</TitleTag>

        {/* Arrow indicator */}
        <div className="ml-auto flex items-center gap-2 absolute right-0 bottom-0">
          <div className="flex size-8 items-center justify-center bg-transparent transition-all duration-300 group-hover:bg-primary-blue group-hover:text-white">
            <Icon__ArrowRight width={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
