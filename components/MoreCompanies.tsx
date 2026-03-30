"use client";

import { Link } from "@/i18n/navigation";
import { useInView } from "@/hooks/useInView";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { TCompanyListItem } from "@/service/company";
// PRD: prd-remove-dummy-fallback — Show notice instead of hiding empty sections
import SectionNotice from "@/components/section-notice";

type Props = {
  companies: TCompanyListItem[];
  title: string;
  locale: Locale;
};

export default function MoreCompanies({ companies, title, locale }: Props) {
  const t = useTranslations("MoreCompanies");
  const { ref: sectionRef, isInView: isVisible } = useInView({
    threshold: 0.15,
  });

  // PRD: prd-remove-dummy-fallback — Show notice instead of returning null
  if (companies.length === 0) return <SectionNotice sectionName="More Companies" />;

  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20 md:pt-16 md:pb-40  flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Section heading */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="mt-3 set-text-headline2 max-w-md">{title}</h2>
          <p className="set-text-bodytext mt-8">{t("clickHint")}</p>
        </div>

        {/* Company logo grid — 3 columns, aspect 2/1.5 cards */}
        <div
          ref={sectionRef}
          className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {companies.map((company, index) => (
            <Link
              prefetch={false}
              key={company.slug}
              href={`/company/${company.slug}`}
              className={`group relative block ${
                isVisible ? "more-companies-card-reveal" : "opacity-0"
              }`}
              style={
                {
                  "--card-delay": `${index * 80 + 200}ms`,
                } as React.CSSProperties
              }
              aria-label={company.name[locale]}
            >
              <div className="relative transition-all duration-500">
                <div className="bg-gray-light aspect-[285/170] flex items-center justify-center">
                  {/* Company logo */}
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={`${company.name[locale]} logo`}
                      className="max-w-[55%] max-h-[45%] object-contain transition-all duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-[55%] h-[45%] bg-[#d4d4d4] animate-pulse" />
                  )}
                </div>
                <div className="h-0.5 w-0 bg-primary-red group-hover:w-full transition-all duration-500 absolute top-0 left-0" />
                <div className="w-[50%] h-2 bg-gray-light" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
