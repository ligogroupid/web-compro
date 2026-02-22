import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { TCompanyListItem } from "@/service/company";
import Icon__ArrowRight from "./icon-arrow-right";

type Props = TCompanyListItem & {
  locale: Locale;
};

export default function CompanyItemList({ locale, ...company }: Props) {
  return (
    <Link
      href={`/company/${company.slug}`}
      className="flex flex-col md:flex-row md:gap-20 items-end hover:bg-gray-light  group"
    >
      {/*LEFT SECTION*/}
      <div className="flex-1 flex flex-row md:flex-col gap-20">
        <div
          className={`min-h-24 relative ${company.logo ? "" : "bg-gray-light"}`}
        >
          {company.logo && (
            <img
              className="w-auto h-full block"
              alt={`Logo ${company.name[locale]}`}
              src={company.logo}
            />
          )}
        </div>
        <div className="font-albert leading-[1.3em]">
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
        <div className="text-white p-2.5 bg-primary-blue absolute bottom-0 right-0 w-10 h-10 flex items-center justify-start transition-all duration-500 group-hover:w-20">
          <Icon__ArrowRight />
        </div>
      </div>
    </Link>
  );
}
