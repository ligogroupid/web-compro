import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";

import { getCompanyList } from "@/service/company";
import CompanyItemList from "./company-item-list";

type Props = {
  locale: Locale;
};

export default async function CompanyList({ locale }: Props) {
  const [t, companies] = await Promise.all([
    getTranslations("CompaniesList"),
    getCompanyList(),
  ]);

  return (
    <section className="px-4 py-12 pb-[60px] md:pb-[120px] relative bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="md:max-w-[65%] xl:max-w-[50%]">
          <h2 className="text-caption1">{t("label")}</h2>
          <div className="pt-10 set-text-headline1">{t("headline")}</div>
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
