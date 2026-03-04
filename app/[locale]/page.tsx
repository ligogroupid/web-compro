import type { Locale } from "@/i18n/routing";

import { setRequestLocale } from "next-intl/server";
import ImageCover from "@/components/cover-images";
import Separator from "@/components/separator";
import AboutUsHook from "@/components/about-us-hook";
import Header from "@/components/header";
import CompanyList from "@/components/companies-list";
import FeaturedBrandList from "@/components/featured-brands-list";
import Achivements from "@/components/achivements";
import { getHomepageSectionImages } from "@/service/homepage";
import IndonesiaMap from "@/components/indonesia-map";
import ClientsList from "@/components/clients-list";
import ButtonBrand from "@/components/button-brand";
import ButtonBrandLink from "@/components/ButtonBrandLink";
import HomepageArticles from "@/components/homepage-articles";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const distributionImages = await getHomepageSectionImages("distribution");

  return (
    <>
      <Header variant="home" />
      <main>
        <ImageCover
          images={[
            {
              src: "https://images.unsplash.com/photo-1770037367722-5444567fcb52?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Water London",
            },
            {
              src: "https://images.unsplash.com/photo-1771600093259-f5bfacb3eac6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Skiing Ice",
            },
          ]}
        />
        <Separator />
        <AboutUsHook />
        <CompanyList locale={locale as Locale} />
        <FeaturedBrandList locale={locale as Locale} />
        <Achivements locale={locale as Locale} />
        {/*COVER DISTRIBUTION HOMEPAGE*/}
        <ImageCover
          images={distributionImages.map((src) => ({
            src,
            alt: "Distribution",
          }))}
        />
        <section className="">
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
          <div className="h-4 bg-primary-blue w-2/5" />
        </section>
        <ClientsList locale={locale as Locale} />
        <section className="bg-[#fafafa] pt-12 pb-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="set-text-caption1">EXPLORE</h2>
            <div className="set-text-headline1 mt-8">Latest News for You</div>
            <div className="mt-20">
              <HomepageArticles locale={locale as Locale} />
            </div>
            <div className="mt-24">
              <ButtonBrandLink href="/article">All News</ButtonBrandLink>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
