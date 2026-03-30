import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";
import ImageCover from "@/components/cover-images";

// EDGE REQUEST OPTIMIZATION: 1 day for static pages (rarely changes)
export const revalidate = 86400;
import LigoLetterValues from "@/components/ligo-letter-values";
import OurJourney from "@/components/our-journey";
import RecycledProcess from "@/components/recycle-process";
import VisionMission from "@/components/vision-mission";
import { Locale } from "@/i18n/routing";
import { getAllAboutPageImages, getJourneyMilestones } from "@/service/about";
import { getPageMetadata } from "@/service/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

/* ─── Dynamic SEO metadata for About Us ─── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;

  const seo = await getPageMetadata("about");
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

export default async function Page__AboutUs({ params }: Props) {
  const { locale } = await params;

  const [t, { bannerMiddle, bannerBottom }, journeyMilestones] =
    await Promise.all([
      getTranslations("AboutUs"),
      getAllAboutPageImages(),
      getJourneyMilestones(),
    ]);

  return (
    <>
      <section className=" bg-sky-image text-white">
        <div className="px-4 xl:sticky lg:top-0">
          <div className="max-w-7xl mx-auto relative pt-[102px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="set-text-caption1">{t("heroLabel")}</h2>
                <div className="set-text-headline1 md:set-text-headline1 mt-8 md:mt-14 md:max-w-full">
                  {t("heroHeadline")}
                </div>
              </div>
              <div className="space-y-14">
                <p className="max-w-[615px] text-bodytext">
                  {t("heroParagraph1")}
                </p>
                <p className="max-w-[615px] text-bodytext">
                  {t("heroParagraph2")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="size-full flex items-end justify-start relative">
          <img
            className="w-full object-contain"
            alt="Ligo Building"
            src="/ligo-building.webp"
          />

          <div className="absolute right-0 -bottom-0.5 h-4 w-[65%] bg-gray-light" />
        </div>
      </section>

      {/*VISION AND MISSION*/}
      <VisionMission
        visionLabel={t("visionLabel")}
        visionText={t("visionText")}
        missionLabel={t("missionLabel")}
        missions={[t("mission1"), t("mission2"), t("mission3")]}
      />

      <section className="sticky top-0 z-0 bg-primary-blue text-white px-4 pt-[68px] pb-[182px]"> {/*Fixing glitch issue*/}
        <div className="max-w-7xl mx-auto">
          <div>
            <h2 className="set-text-caption1">{t("valuesLabel")}</h2>
            <div className="set-text-headline1 mt-9">{t("valuesHeadline")}</div>
            <div className="mt-14 md:mt-[105px] overflow-x-hidden">
              <LigoLetterValues />
            </div>
          </div>
        </div>
      </section>

      {/* BANNER MIDDLE - Managed by CMS */}
      {/*<div className="sticky top-0">*/}
      <div className="relative z-[1]"> {/*Fixing glitch issue*/}
        <ImageCover
          images={
            bannerMiddle.length > 0
              ? bannerMiddle.map((src) => ({ src, alt: "Banner About Us" }))
              : [
                  {
                    // PRD: prd-remove-dummy-fallback — Same bg & text color for solid placeholder
                    src: "https://placehold.co/1920x600/e0e0e0/e0e0e0",
                    alt: "Banner About Us",
                  },
                ]
          }
        />

        <div className="absolute right-0 bottom-0 w-[50%] h-4 bg-gray-light" />
      </div>
      {/*</div>*/}

      <section className="bg-gray-light px-4 py-16 relative z-[1]"> {/*Fixing glitch issue*/}
        <div className="max-w-7xl mx-auto">
          <div className="space-y-9 md:max-w-1/2">
            <h2 className="set-text-caption1">{t("businessModelLabel")}</h2>
            <div className="set-text-headline1 mt-9">
              {t("businessModelHeadline")}
            </div>
            <p className="mt-16 max-w-lg">{t("businessModelBody")}</p>
          </div>
          <div className="mt-16 md:mt-20">
            <RecycledProcess />
          </div>
        </div>
      </section>

      {/*OUR JOURNEY SECTION*/}
      <OurJourney locale={locale as Locale} milestones={journeyMilestones} />

      {/* BANNER BOTTOM - Managed by CMS */}
      <div>
        <ImageCover
          images={
            bannerBottom.length > 0
              ? bannerBottom.map((src) => ({ src, alt: "Banner About Us" }))
              : [
                  {
                    // PRD: prd-remove-dummy-fallback — Same bg & text color for solid placeholder
                    src: "https://placehold.co/1920x600/e0e0e0/e0e0e0",
                    alt: "Banner About Us",
                  },
                ]
          }
        />
      </div>
    </>
  );
}
