import type { Locale } from "@/i18n/routing";

import { setRequestLocale } from "next-intl/server";
import ImageCover from "@/components/cover-images";
import Separator from "@/components/separator";
import AboutUsHook from "@/components/about-us-hook";
import Header from "@/components/header";
import CompanyList from "@/components/companies-list";
import FeaturedBrandList from "@/components/featured-brands-list";
import Achivements from "@/components/achivements";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
        <div className="h-64 bg-gray-light"></div>
      </main>
    </>
  );
}
