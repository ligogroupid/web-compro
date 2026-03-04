import type { Locale } from "@/i18n/routing";

import { DUMMY_ARTICLES } from "@/dummy/articles";
import ArticleCard from "@/components/ArticleCard";

type Props = {
  locale: Locale;
};

export default function HomepageArticles({ locale }: Props) {
  const articles = DUMMY_ARTICLES.sort((a, b) => a.order - b.order).slice(0, 4);

  if (articles.length === 0) return null;

  const heroArticle = articles[0];
  const compactArticles = articles.slice(1);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
      <ArticleCard
        article={heroArticle}
        locale={locale}
        index={0}
        variant="hero"
      />

      <div className="flex flex-col justify-between gap-5">
        {compactArticles.map((article, idx) => (
          <ArticleCard
            key={article.slug}
            article={article}
            locale={locale}
            index={idx}
            variant="compact"
          />
        ))}
      </div>
    </div>
  );
}
