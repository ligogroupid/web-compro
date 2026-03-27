"use client";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { TCompanyListItem } from "@/service/company";
import { useInView } from "@/hooks/useInView";
import Icon__ArrowRight from "./icon-arrow-right";

type Props = TCompanyListItem & {
  locale: Locale;
};

export default function CompanyItemList({ locale, ...company }: Props) {
  const { ref, isInView } = useInView<HTMLAnchorElement>({ threshold: 0.35 });

  return (
    <Link
      prefetch={false}
      ref={ref}
      href={`/company/${company.slug}`}
      className={[
        "flex flex-col xl:flex-row gap-6 lg:gap-10 xl:gap-20 xl:items-end group",
        "transition-all duration-700 ease-out",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
      ].join(" ")}
    >
      {/*LEFT SECTION*/}
      <div className="flex-1 flex flex-col items-start md:items-end xl:items-start md:flex-row xl:flex-col gap-4 md:gap-10 xl:gap-20">
        <div
          className={`max-w-[180px] lg:w-[204px] relative ${company.logo ? "" : "bg-gray-light"}`}
        >
          {company.logo && (
            <img
              className="w-full block"
              alt={`Logo ${company.name[locale]}`}
              src={company.logo}
            />
          )}
        </div>
        <div className="font-albert leading-[1.3em] md:max-w-[360px] xl:max-w-[285px]">
          {company.description[locale]}
        </div>
      </div>

      {/*RIGHT SECTION*/}
      <div className="w-full max-w-[893px] aspect-[893/343] relative bg-gray-light overflow-hidden">
        {company.thumbnail && (
          <img
            className="size-full object-cover group-hover:scale-110 transition-all duration-300"
            alt={`Thumbnail ${company.name[locale]}`}
            src={company.thumbnail}
          />
        )}
        <div className="text-white p-2.5 bg-primary-blue absolute bottom-0 right-0 w-10 h-10 flex items-center justify-start transition-all duration-500 group-hover:bg-primary-red">
          <Icon__ArrowRight />
        </div>
      </div>
    </Link>
  );
}
