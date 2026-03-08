"use client";

import { useTranslations } from "next-intl";

import { useInView } from "@/hooks/useInView";

type LetterValue = {
  letter: string;
  values: string;
};

export default function LigoLetterValues() {
  const t = useTranslations("LigoValues");
  const { isInView, ref } = useInView({ once: true, rootMargin: "0px" });

  const letters: LetterValue[] = [
    { letter: "L", values: t("L") },
    { letter: "I", values: t("I") },
    { letter: "G", values: t("G") },
    { letter: "O", values: t("O") },
  ];

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-8 xl:gap-16 overflow-hidden"
      ref={ref}
    >
      {letters.map((item, index) => (
        <div
          key={`${item.letter}${index}`}
          className={`
            group relative bg-white text-primary-blue
            flex flex-row items-center gap-5 px-5 py-5
            sm:flex-col sm:items-center sm:px-6 sm:py-7
            md:px-8 md:py-9
            w-full transition-all duration-700 ease-out
            ${isInView ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 pointer-events-none translate-y-8 sm:translate-y-0 sm:translate-x-full"}
          `}
          style={{ transitionDelay: `${(index + 1) * 300}ms` }}
        >
          {/* Letter */}
          <div className="set-text-headline1 shrink-0 sm:shrink">
            {item.letter}
          </div>

          {/* Divider — vertical on mobile, horizontal on sm+ */}
          <div className="h-10 w-px bg-primary-blue/30 sm:h-px sm:w-full" />

          {/* Value description */}
          <div className="uppercase text-[0.75rem] leading-[1.6em] tracking-[0.15em] sm:text-[0.8125rem] sm:text-center">
            {item.values}
          </div>
        </div>
      ))}
    </div>
  );
}
