import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import ImageCover from "@/components/cover-images";
import MoreCompanies from "@/components/MoreCompanies";
import VisitLocationsSection from "@/components/visit-locations-section";
import type { Locale } from "@/i18n/routing";
import { getCompanyBySlug, getOtherCompanies } from "@/service/company";
import type { TCompany } from "@/service/company";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/* ─── Dynamic metadata (title + open graph with logo) ─── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) return { title: "Company Not Found" };

  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "CompanyDetail" });

  return {
    title: company.name[loc] + t("metaTitleSuffix"),
    description: company.description[loc],
    openGraph: {
      title: company.name[loc] + t("metaTitleSuffix"),
      description: company.description[loc],
      images: company.logo ? [{ url: company.logo }] : [],
    },
  };
}

/* ─── Sub-components ─── */

function Certificates({
  company,
  label,
}: {
  company: TCompany;
  label: string;
}) {
  if (company.certifications.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-bold leading-[1.4em] tracking-[0.02em]">
        {label}
      </h3>
      <div className="h-px bg-primary-blue" />
      <div className="mt-8 flex flex-wrap items-center gap-6">
        {company.certifications.map((cert) => (
          <div key={cert.id} className="flex items-center justify-center">
            {cert.image ? (
              <img
                src={cert.image}
                alt={cert.name}
                className="max-w-[105px] max-h-[90px] object-contain"
              />
            ) : (
              <div className="bg-gray-light w-[79px] h-[90px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page component ─── */

export default async function Page__CompanyDetails({ params }: Props) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "CompanyDetail" });

  const [company, otherCompanies] = await Promise.all([
    getCompanyBySlug(slug),
    getOtherCompanies(slug, 6),
  ]);
  if (!company) notFound();

  return (
    <>
      {/* HERO COVER */}
      <div className="relative">
        <ImageCover
          images={
            company.hero_image.length > 0
              ? company.hero_image.map((src) => ({
                  src,
                  alt: company.name[loc],
                }))
              : [
                  {
                    src: "https://placehold.co/900x400?text=No+Hero+Image",
                  },
                ]
          }
        />
        <div className="h-4 w-[70%] bg-white absolute right-0 bottom-0 z-[1]" />
      </div>

      {/* COMPANY INFO */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-20 md:flex-row md:justify-between">
            {/* LEFT PART */}
            <div className="max-w-xs">
              {/* LOGO */}
              {company.logo ? (
                <div className="aspect-[260/157]">
                  <img
                    src={company.logo}
                    alt={`${company.name[loc]} logo`}
                    className="size-full object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-[260/157] bg-gray-light" />
              )}
              <div className="hidden md:block mt-[200px]">
                <Certificates company={company} label={t("certifications")} />
              </div>
            </div>

            {/* RIGHT PART */}
            <div className="max-w-[600px]">
              {/* NAME */}
              <h2 className="set-text-headline1">{company.name[loc]}</h2>
              {/* FULL DESCRIPTION */}
              <div
                className="mt-16 set-text-bodytext prose [&>p]:my-10"
                dangerouslySetInnerHTML={{
                  __html: company.full_description[loc],
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY STRENGTHS */}
      {company.provens.length > 0 && (
        <section
          className="relative"
          style={{
            backgroundColor: company.strengths_bg_color ?? "#e0e0e0",
            backgroundImage: company.strengths_bg_image
              ? `url(${company.strengths_bg_image})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="px-4 py-20 md:pb-[220px]">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-4 text-white">
                <h2 className="set-text-caption1">
                  {t("whyChoose")} {company.initial_name[loc].toUpperCase()}
                </h2>
                <div className="set-text-headline1">{t("provenStrengths")}</div>
              </div>
              <div className="overflow-x-auto overflow-y-hidden hide-scrollbar mt-16 -mx-4 md:mx-0 px-4 md:px-0">
                <div className="w-fit flex gap-9 md:ml-auto">
                  {company.provens.map((n, i) => (
                    <div key={i} className="w-[270px] relative">
                      <div className="h-[365px] bg-white px-5 py-6 overflow-y-auto hide-scrollbar">
                        <div className="font-heading text-[1.375rem] leading-[1.36em] tracking-[0.02em] h-[60px]">
                          {n.title[loc]}
                        </div>
                        <div className="mt-8 text-[0.9375rem]">
                          {n.description[loc]}
                        </div>
                      </div>
                      <div className="h-3 w-1/2 bg-white" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* IMAGE COMPANY STRENGTH */}
          {company.strengths_image && (
            <div className="relative md:absolute left-0 bottom-0 pointer-events-none max-w-2xl">
              <img
                className="block w-full"
                alt={`${company.name[loc]} strength`}
                src={company.strengths_image}
              />
            </div>
          )}
        </section>
      )}

      {/* BRANDS and PRODUCTS OF COMPANY */}
      <section className="bg-white px-4">
        {/* BRANDS */}
        {company.brands.length > 0 && (
          <>
            <div className="py-16 flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
              <div className="w-1/5">
                <h2 className="set-text-headline2">
                  {t("brandsOf")} {company.initial_name[loc]}
                </h2>
              </div>
              <div className="mt-14 flex-1">
                <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                  {company.brands.map((brand, i) => (
                    <div
                      key={i}
                      className="size-[100px] flex items-center justify-center"
                    >
                      {brand.image ? (
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="size-full object-contain"
                        />
                      ) : (
                        <div className="bg-gray-light size-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-primary-blue/20 h-px w-full" />
          </>
        )}

        {/* PRODUCTS */}
        {company.products.length > 0 && (
          <div className="py-16 flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
            <div className="w-1/5">
              <h2 className="set-text-headline2">
                {t("productsOf")} {company.initial_name[loc]}
              </h2>
            </div>
            <div className="mt-14 flex-1">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
                {company.products.map((product) => (
                  <div key={product.id}>
                    <div className="max-w-[240px] max-h-[240px] flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name[loc]}
                          className="size-full object-contain"
                        />
                      ) : (
                        <div className="bg-gray-light size-full" />
                      )}
                    </div>
                    <div className="mt-6 text-sm">{product.name[loc]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* MOBILE: CERTIFICATES (shown below on mobile) */}
      {company.certifications.length > 0 && (
        <section className="bg-white px-4 pb-14 md:hidden">
          <div className="max-w-7xl mx-auto">
            <Certificates company={company} label={t("certifications")} />
          </div>
        </section>
      )}

      {/* COVER SECTIONS */}
      {company.cover_sections.length > 0 &&
        company.cover_sections.map((section, i) => (
          <div key={i} className="relative">
            <ImageCover
              images={section.images.map((src) => ({
                src,
                alt: `${company.name[loc]} cover ${i + 1}`,
              }))}
            />
          </div>
        ))}

      {/* VISIT LOCATIONS */}
      {company.locations.length > 0 && (
        <VisitLocationsSection
          locations={company.locations.map((location) => ({
            name: location.name[loc],
            location: location.location[loc],
            displayType: location.displayType,
            embedUrl: location.embedUrl,
            latitude: location.latitude,
            longitude: location.longitude,
          }))}
          locationDisplayType={company.location_display_type}
          title={t("visitLocations")}
          subtitle={t("visitLocationsSubtitle")}
        />
      )}

      {/* MORE COMPANIES */}
      {otherCompanies.length > 0 && (
        <MoreCompanies
          companies={otherCompanies}
          title={t("otherCompanies")}
          locale={loc}
        />
      )}
    </>
  );
}
