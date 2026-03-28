import type { Metadata } from "next";

import type { Locale } from "@/i18n/routing";

// LOW THROTTLING UPDATE
export const revalidate = 1800; // 30 minutes

import { getTranslations, setRequestLocale } from "next-intl/server";
import ImageCover from "@/components/cover-images";
import Separator from "@/components/separator";
import AboutUsHook from "@/components/about-us-hook";
import Header from "@/components/header";
import CompanyList from "@/components/companies-list";
import FeaturedBrandList from "@/components/featured-brands-list";
import Achivements from "@/components/achivements";
import { getAllHomepageImages } from "@/service/homepage";
import IndonesiaMap from "@/components/indonesia-map";
import ClientsList from "@/components/clients-list";
import ButtonBrandLink from "@/components/ButtonBrandLink";
import HomepageArticles from "@/components/homepage-articles";
import { getPageMetadata } from "@/service/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

/* ─── Dynamic SEO metadata for Homepage ─── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;

  const seo = await getPageMetadata("home");
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

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, { hero: heroImages, distribution: distributionImages }] =
    await Promise.all([getTranslations("Homepage"), getAllHomepageImages()]);

  return (
    <>
      <Header variant="home" />
      <main>
        <div className="sticky top-0 z-0"> {/*Fixing glitch issue*/}
          <ImageCover
            images={heroImages.map((src) => ({
              src,
              alt: "Hero",
            }))}
          />
        </div>
        <div className="relative z-[1]"> {/*Fixing glitch issue*/}
          <Separator />
          <AboutUsHook />
          <CompanyList locale={locale as Locale} />
          <FeaturedBrandList />
          <Achivements />
        </div>
        <div className="sticky top-0 z-0"> {/*Fixing glitch issue*/}
          {/*COVER DISTRIBUTION HOMEPAGE*/}
          <ImageCover
            images={distributionImages.map((src) => ({
              src,
              alt: "Distribution",
            }))}
          />
        </div>
        {/* FIX: Single stacking context wrapper for all content after sticky-2.
            Without this, Safari iOS lets the sticky-2 layer (distribution cover)
            bleed over subsequent sections — ClientsList had no z-index at all,
            and even z-[1] siblings lost their stacking on iOS Safari. */}
        <div className="relative z-[1]">
          <section>
            <div className="bg-primary-blue text-white pt-20 pb-[100px] md:pb-[180px] px-6">
              <div className="max-w-7xl mx-auto  grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="set-text-caption1">{t("distributionLabel")}</h2>
                  <div className="mt-8 set-text-headline1">
                    {t("distributionHeadline")}
                  </div>
                  <div className="mt-16 set-text-bodytext">
                    {t("distributionBody")}
                  </div>
                </div>
                <div className="flex items-end">
                  <IndonesiaMap />
                </div>
              </div>
            </div>
            <div className="bg-white">
              <div className="h-4 bg-primary-blue w-2/5" />
            </div>
          </section>
          <ClientsList locale={locale as Locale} />
          <section className="bg-[#E8E8E8] pt-12 pb-32 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="set-text-caption1">{t("exploreLabel")}</h2>
              <div className="set-text-headline1 mt-8">
                {t("exploreHeadline")}
              </div>
              <div className="mt-20">
                <HomepageArticles locale={locale as Locale} />
              </div>
              <div className="mt-24 flex">
                <ButtonBrandLink href="/article">{t("allNews")}</ButtonBrandLink>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
