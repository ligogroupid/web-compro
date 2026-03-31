import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import ImageCover from "@/components/cover-images";
// PRD: prd-remove-dummy-fallback — Show notice instead of hiding empty sections
import SectionNotice from "@/components/section-notice";

// EDGE REQUEST OPTIMIZATION: 1 hour for detail pages (content rarely edited after publish)
export const revalidate = 3600;

import { getCompanyList } from "@/service/company";

/* ─── Pre-render all company slugs at build time ─── */
export async function generateStaticParams() {
  const companies = await getCompanyList();
  return companies.map((c) => ({ slug: c.slug }));
}

import CompanyInfo from "./CompanyInfo";
import MoreCompanies from "@/components/MoreCompanies";
import ProductItem from "./ProductItem";
import VisitLocationsSection from "@/components/visit-locations-section";
import type { Locale } from "@/i18n/routing";
import { getCompanyBySlug, getOtherCompanies } from "@/service/company";
import type { TCompany } from "@/service/company";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/* ─── Dynamic metadata — SEO fields → entity fallback → root layout ─── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) return { title: "Company Not Found" };

  const loc = locale as Locale;

  // Tier 1: SEO fields from DB, Tier 2: entity fields
  const title = company.meta_title[loc] || company.name[loc] || undefined;
  const description =
    company.meta_description[loc] || company.description[loc] || undefined;
  const image = company.meta_image || company.logo || undefined;

  return {
    title,
    description,
    openGraph: {
      title: title ? `${title} | Ligo Group` : undefined,
      description,
      images: image ? [{ url: image }] : undefined,
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
                    // PRD: prd-remove-dummy-fallback — Same bg & text color for solid placeholder
                    src: "https://placehold.co/900x400/e0e0e0/e0e0e0",
                  },
                ]
          }
        />
        <div className="h-4 w-[70%] bg-white absolute right-0 bottom-0 z-[1]" />
      </div>

      {/* COMPANY INFO */}
      <CompanyInfo
        logo={company.logo}
        name={company.name[loc]}
        fullDescription={company.full_description[loc]}
        certifications={company.certifications}
        certificationsLabel={t("certifications")}
        ctaLabel={company.cta_label[loc]}
        ctaUrl={company.cta_url}
      />

      {/* COMPANY STRENGTHS — PRD: prd-remove-dummy-fallback */}
      {company.provens.length > 0 ? (
        <section
          className="sticky top-0 z-0"
          style={{
            backgroundColor: company.strengths_bg_color ?? "#e0e0e0",
            backgroundImage: company.strengths_bg_image
              ? `url(${company.strengths_bg_image})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="px-4 py-20 pb-[220px]">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-4 text-white">
                <h2 className="set-text-caption1">
                  {t("whyChoose")} {company.initial_name[loc].toUpperCase()}
                </h2>
                <div className="set-text-headline1">{t("provenStrengths")}</div>
              </div>
              <div className="overflow-x-auto overflow-y-hidden hide-scrollbar mt-10 md:mt-16 -mx-4 md:mx-0 px-4 md:px-0">
                <div className="w-fit flex gap-9 md:ml-auto">
                  {company.provens.map((n, i) => (
                    <div key={i} className="w-[270px] relative">
                      <div className="bg-white px-5 py-6 h-[calc(100%-0.75rem)]">
                        <div className="font-heading text-[1.375rem] leading-[1.36em] tracking-[0.02em] h-[60px]">
                          {n.title[loc]}
                        </div>
                        <div className="mt-4 md:mt-8 text-[0.9375rem]">
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
        </section>
      ) : (
        <SectionNotice sectionName="Company Strengths" />
      )}

      {/* BRANDS and PRODUCTS OF COMPANY */}
      <div className="relative z-[1] [transform:translate3d(0,0,0)]">
        {" "}
        {/* [iOS-safari-glitch] translate3d forces GPU compositing layer so Safari respects z-index on older iOS*/}
        {/* IMAGE COMPANY STRENGTH — inside wrapper so it stays on colored bg, scrolls naturally */}
        {company.strengths_image && (
          <div className="absolute left-0 top-0  border border-dashed border-green-300 -translate-y-full pointer-events-none">
            <div className="pointer-events-none relative z-1 max-w-lg">
              <img
                className="w-full object-contain border-dotted border-4 border-fuchsia-600 pointer-events-none"
                alt={`${company.name[loc]} strength`}
                src={company.strengths_image}
              />
            </div>
          </div>
        )}
        <section className="bg-white px-4 relative">
          {/* BRANDS — PRD: prd-remove-dummy-fallback */}
          {company.brands.length > 0 ? (
            <>
              <div className="py-16 flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
                <div className="lg:w-1/5">
                  <h2 className="set-text-headline2">
                    {t("brandsOf")} {company.initial_name[loc]}
                  </h2>
                </div>
                <div className="mt-14 flex-1">
                  <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-10">
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
          ) : (
            <SectionNotice sectionName="Brands" />
          )}

          {/* PRODUCTS — PRD: prd-remove-dummy-fallback */}
          {company.products.length > 0 ? (
            <div className="py-16 flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
              <div className="lg:w-1/5">
                <h2 className="set-text-headline2">
                  {t("productsOf")} {company.initial_name[loc]}
                </h2>
              </div>
              <div className="mt-14 flex-1">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
                  {company.products.map((product) => (
                    <ProductItem
                      key={product.id}
                      image={product.image}
                      name={product.name[loc]}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <SectionNotice sectionName="Products" />
          )}
        </section>
      </div>

      {/* MOBILE: CERTIFICATES (shown below on mobile) */}
      {company.certifications.length > 0 && (
        <section className="bg-white px-4 pb-14 md:hidden relative z-[1] [transform:translate3d(0,0,0)]">
          <div className="max-w-7xl mx-auto">
            <Certificates company={company} label={t("certifications")} />
          </div>
        </section>
      )}

      {/* COVER SECTIONS — PRD: prd-remove-dummy-fallback */}
      {company.cover_image.length > 0 ? (
        <div className="sticky top-0 relative z-0 [transform:translate3d(0,0,0)]">
          <ImageCover
            images={company.cover_image.map((c, i) => {
              return {
                src: c,
                alt: `${company.name[loc]} cover ${i + 1}`,
              };
            })}
          />
        </div>
      ) : (
        <SectionNotice sectionName="Cover Images" />
      )}

      <div className="relative z-[1] [transform:translate3d(0,0,0)]">
        {/* VISIT LOCATIONS — PRD: prd-remove-dummy-fallback */}
        {company.locations.length > 0 ? (
          <VisitLocationsSection
            locations={company.locations.map((location) => ({
              name: location.name[loc],
              location: location.location[loc],
              displayType: location.displayType,
              embedUrl: location.embedUrl,
              latitude: location.latitude,
              longitude: location.longitude,
              imageUrl: location.imageUrl,
              linkUrl: location.linkUrl,
            }))}
            locationDisplayType={company.location_display_type}
            title={t("visitLocations")}
            subtitle={t("visitLocationsSubtitle")}
          />
        ) : (
          <SectionNotice sectionName="Visit Locations" />
        )}

        {/* MORE COMPANIES — PRD: prd-remove-dummy-fallback */}
        {otherCompanies.length > 0 ? (
          <MoreCompanies
            companies={otherCompanies}
            title={t("otherCompanies")}
            locale={loc}
          />
        ) : (
          <SectionNotice sectionName="Other Companies" />
        )}
      </div>
    </>
  );
}
