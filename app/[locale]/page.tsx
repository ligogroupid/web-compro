import type { Metadata } from "next";

import type { Locale } from "@/i18n/routing";

export const revalidate = 600; // 10 minutes

import { setRequestLocale } from "next-intl/server";
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

  const { hero: heroImages, distribution: distributionImages } =
    await getAllHomepageImages();

  return (
    <>
      <Header variant="home" />
      <main>
        <ImageCover
          images={heroImages.map((src) => ({
            src,
            alt: "Hero",
          }))}
        />
        <Separator />
        <AboutUsHook />
        <CompanyList locale={locale as Locale} />
        <FeaturedBrandList locale={locale as Locale} />
        <Achivements locale={locale as Locale} />
        <div className="sticky top-header">
          {/*COVER DISTRIBUTION HOMEPAGE*/}
          <ImageCover
            images={distributionImages.map((src) => ({
              src,
              alt: "Distribution",
            }))}
          />
        </div>
        <section className="relative">
          <div className="bg-primary-blue text-white pt-20 pb-[180px] px-6">
            <div className="max-w-7xl mx-auto  grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="set-text-caption1">DISTRIBUTION</h2>
                <div className="mt-8 set-text-headline1">
                  Integrated plastic solutions with nationwide distribution
                  coverage.
                </div>
                <div className="mt-16 set-text-bodytext">
                  With nationwide distribution capabilities, Ligo Group supplies
                  trusted products and innovative solutions to customers
                  throughout Indonesia to meet rising market demands.
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
        <section className="relative bg-[#E8E8E8] pt-12 pb-32 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="set-text-caption1">EXPLORE</h2>
            <div className="set-text-headline1 mt-8">Latest News for You</div>
            <div className="mt-20">
              <HomepageArticles locale={locale as Locale} />
            </div>
            <div className="mt-24 flex">
              <ButtonBrandLink href="/article">All News</ButtonBrandLink>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
