import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";
import ImageCover from "@/components/cover-images";

export const revalidate = 600; // 10 minutes
import LigoLetterValues from "@/components/ligo-letter-values";
import OurJourney from "@/components/our-journey";
import RecycledProcess from "@/components/recycle-process";
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
        <div className="px-4 sticky top-0">
          <div className="max-w-7xl mx-auto relative pt-[102px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="set-text-caption1">{t("heroLabel")}</h2>
                <div className="set-text-headline1 mt-14">
                  {t("heroHeadline")}
                </div>
              </div>
              <div className="space-y-14">
                <p className="max-w-[615px]">{t("heroParagraph1")}</p>
                <p className="max-w-[615px]">{t("heroParagraph2")}</p>
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

      <section className="bg-gray-light px-4 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-7">
            <div>
              <h2 className="set-text-caption1">{t("visionLabel")}</h2>
              <div className="set-text-headline1">{t("visionText")}</div>
            </div>
            <div>
              <h2 className="set-text-caption1">{t("missionLabel")}</h2>
              <div className="mt-12 space-y-7">
                {(
                  [t("mission1"), t("mission2"), t("mission3")] as string[]
                ).map((text, index) => (
                  <div key={index} className="flex items-start gap-7">
                    <div className="h-0.5 w-5 bg-primary-red" />
                    <div className="set-text-bodytext flex-1">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-blue text-white px-4 pt-[68px] pb-[182px]">
        <div className="max-w-7xl mx-auto">
          <div>
            <h2 className="set-text-caption1">{t("valuesLabel")}</h2>
            <div className="set-text-headline1 mt-9">{t("valuesHeadline")}</div>
            <div className="mt-[105px] overflow-x-hidden">
              <LigoLetterValues />
            </div>
          </div>
        </div>
      </section>

      {/* BANNER MIDDLE - Managed by CMS */}
      <div className="sticky top-header">
        <div className="relative">
          <ImageCover
            images={
              bannerMiddle.length > 0
                ? bannerMiddle.map((src) => ({ src, alt: "Banner About Us" }))
                : [
                    {
                      src: "https://placehold.co/1920x600?text=BANNER+MIDDLE%0AAbout%20Us",
                      alt: "Banner About Us",
                    },
                  ]
            }
          />

          <div className="absolute right-0 bottom-0 w-[50%] h-4 bg-gray-light" />
        </div>
      </div>

      <section className="bg-gray-light px-4 py-16 relative">
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
                    src: "https://placehold.co/1920x600?text=BANNER+BOTTOM%0AAbout%20Us",
                    alt: "Banner About Us",
                  },
                ]
          }
        />
      </div>
    </>
  );
}
