import { useTranslations } from "next-intl";

export default function AboutUsHook() {
  const t = useTranslations("AboutUsHook");

  return (
    <section className="bg-gray-light px-4 py-[96px]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-10">
        <div className="set-text-headline1 max-w-lg">
          {t("headline")}
          <br />
          <span className="text-primary-red">{t("headlineAccent")}</span>
        </div>
        <div>
          <div className="set-text-caption1">{t("label")}</div>
          <div className="mt-6 set-text-bodytext">{t("description")}</div>
        </div>
      </div>
    </section>
  );
}
