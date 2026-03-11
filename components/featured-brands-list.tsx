import { getTranslations } from "next-intl/server";

import { getFeaturedBrands } from "@/service/company";

export default async function FeaturedBrandList() {
  const [t, brands] = await Promise.all([
    getTranslations("FeaturedBrands"),
    getFeaturedBrands(),
  ]);

  return (
    <section className="bg-gray-light px-4 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="md:max-w-[50%]">
          <h2 className="set-text-caption1">{t("label")}</h2>
          <div className="set-text-headline1 mt-8">{t("headline")}</div>
        </div>
        <div className="mt-20 max-w-[893px] ml-auto  grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-7 md:gap-12 lg:gap-20">
          {brands.map((brand, n) => (
            <div
              key={`${brand.name}-${n}`}
              className="relative aspect-square p-2 flex items-center justify-center"
            >
              <img
                className="size-full object-contain"
                alt={`Brand ${brand.name} logo`}
                src={brand.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
