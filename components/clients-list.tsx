import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import type { TClient } from "@/service/client";

import { getClientsByGroup } from "@/service/client";
// PRD: prd-remove-dummy-fallback — Show notice instead of hiding empty sections
import SectionNotice from "@/components/section-notice";

type Props = {
  locale: Locale;
};

function ClientGrid({
  clients,
  locale,
}: {
  clients: TClient[];
  locale: Locale;
}) {
  // PRD: prd-remove-dummy-fallback — Show notice instead of returning null
  if (clients.length === 0) return <SectionNotice sectionName="Clients" />;

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-6 md:gap-8 mt-8">
      {clients.map((client) => {
        const name = locale === "id" ? client.name.id : client.name.en;
        const Wrapper = client.link ? "a" : "div";
        const wrapperProps = client.link
          ? { href: client.link, target: "_blank", rel: "noopener noreferrer" }
          : {};

        return (
          <Wrapper
            key={client.id}
            {...wrapperProps}
            className="relative aspect-square p-2 flex items-center justify-center transition-all duration-300"
          >
            <img
              className="size-full object-contain"
              alt={name}
              src={client.image}
            />
          </Wrapper>
        );
      })}
    </div>
  );
}

export default async function ClientsList({ locale }: Props) {
  const [t, { industrial, horeka }] = await Promise.all([
    getTranslations("ClientsList"),
    getClientsByGroup(),
  ]);

  return (
    <section className="bg-[#e8e8e8] relative">
      <div className="bg-white pt-10 pb-40">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="set-text-caption1">{t("label")}</h2>
          <div className="set-text-headline1 mt-8">{t("headline")}</div>

          {/* CLIENT INDUSTRIAL */}
          <div className="mt-20">
            <h3 className="text-lg font-medium tracking-wider">{t("industrial")}</h3>
            <ClientGrid clients={industrial} locale={locale} />
          </div>

          <div className="h-px bg-black/50 mt-20" />

          {/* CLIENT HOREKA */}
          <div className="mt-20">
            <h3 className="text-lg font-medium tracking-wider">{t("horeka")}</h3>
            <ClientGrid clients={horeka} locale={locale} />
          </div>
        </div>
      </div>
      <div className="h-4 bg-white w-2/5" />
    </section>
  );
}
