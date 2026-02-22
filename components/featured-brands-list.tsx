import { Locale } from "@/i18n/routing";
import { getFeaturedBrands } from "@/service/company";

export default async function FeaturedBrandList({
  locale,
}: {
  locale: Locale;
}) {
  const brands = await getFeaturedBrands();
  return (
    <section className="bg-gray-light px-4 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="md:max-w-[50%]">
          <h2 className="set-text-caption1">OUR BRANDS</h2>
          <div className="set-text-headline1 mt-8">
            Take a glimpse at our popular brands offering their best products.
          </div>
        </div>
        <div className="mt-20 max-w-[893px] ml-auto  grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-7">
          {brands.map((brand, n) => (
            <div key={`${brand.name}-${n}`} className="relative aspect-square">
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
