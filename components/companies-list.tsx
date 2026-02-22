import type { Locale } from "@/i18n/routing";

import { getCompanyList } from "@/service/company";
import CompanyItemList from "./company-item-list";

type Props = {
  locale: Locale;
};

export default async function CompanyList({ locale }: Props) {
  const companies = await getCompanyList();

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="md:max-w-[50%]">
          <h2 className="text-caption1">OUR COMPANIES</h2>
          <div className="pt-10 set-text-headline1">
            Discover our companies that prioritize top performance and
            innovation.
          </div>
        </div>
        <div className="space-y-[100px] mt-[100px]">
          {companies.map((c) => (
            <CompanyItemList key={c.slug} locale={locale} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
