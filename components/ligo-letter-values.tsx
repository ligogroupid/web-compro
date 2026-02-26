"use client";

import { useInView } from "@/hooks/useInView";
import { Locale } from "@/i18n/routing";

export default function LigoLetterValues({ locale }: { locale: Locale }) {
  const { isInView, ref } = useInView({ once: true, rootMargin: "100px" });
  const letters_en = [
    {
      letter: "L",
      values: "LEADING IN PRODUCT INNOVATION",
    },
    {
      letter: "I",
      values: "INSPIRE FOR CONTINUOUS MOVEMENT",
    },
    {
      letter: "G",
      values: "Goal and Growth Orientation",
    },
    {
      letter: "O",
      values: "OPTIMIZING RESOURCES",
    },
  ];
  const lettersLoop = {
    id: letters_en,
    en: letters_en,
  };

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-8 lg:gap-16 " ref={ref}>
      {lettersLoop[locale].map((item, index) => (
        <div
          key={`${item.letter}${index}`}
          className={`
            bg-white text-primary-blue flex flex-col items-center gap-5 px-4 py-5 md:px-8 md:py-9 w-full transition-all duration-1000
            ${isInView ? "" : "opacity-0 pointer-events-none translate-x-full"}
            `}
          style={{ transitionDelay: `${(index + 1) * 500}ms` }}
        >
          <div className="set-text-headline1">{item.letter}</div>
          <div className="w-full h-px bg-primary-blue" />
          <div className="uppercase text-[0.8125rem] leading-[1.53em] tracking-[0.15em]">
            {item.values}
          </div>
        </div>
      ))}
    </div>
  );
}
