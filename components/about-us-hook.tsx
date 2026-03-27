"use client";

import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import ButtonBrand from "./button-brand";
import { Link } from "@/i18n/navigation";

const BASE = "transition-all duration-700 ease-out";
const HIDDEN = "opacity-0 translate-y-10";
const VISIBLE = "opacity-100 translate-y-0";

export default function AboutUsHook() {
  const t = useTranslations("AboutUsHook");

  const { ref: headlineRef, isInView: headlineInView } =
    useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: labelRef, isInView: labelInView } =
    useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: descRef, isInView: descInView } =
    useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: btnRef, isInView: btnInView } =
    useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="bg-gray-light px-4 py-[96px] relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        <div
          ref={headlineRef}
          className={`set-text-headline1 max-w-lg ${BASE} ${headlineInView ? VISIBLE : HIDDEN}`}
        >
          {t("headline")}
          <br />
          <span className="text-primary-red">{t("headlineAccent")}</span>
        </div>
        <div>
          <div
            ref={labelRef}
            className={`set-text-caption1 ${BASE} ${labelInView ? VISIBLE : HIDDEN}`}
          >
            {t("label")}
          </div>
          <div
            ref={descRef}
            className={`mt-6 set-text-bodytext ${BASE} ${descInView ? VISIBLE : HIDDEN}`}
            style={{ transitionDelay: descInView ? "300ms" : "0ms" }}
          >
            {t("description")}
          </div>
          <div
            ref={btnRef}
            className={`mt-14 ${BASE} ${btnInView ? VISIBLE : HIDDEN}`}
            style={{ transitionDelay: btnInView ? "600ms" : "0ms" }}
          >
            <Link href="about-us">
              <ButtonBrand>{t("readMore")}</ButtonBrand>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
