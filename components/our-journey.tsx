"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import type { Locale } from "@/i18n/routing";
import type { JourneyMilestoneData } from "@/service/about";
import Icon__ArrowRight from "./icon-arrow-right";

// ─── Fallback hardcoded data (used when CMS returns empty) ────────────────────

const FALLBACK_MILESTONES: JourneyMilestoneData[] = [
  {
    id: "fallback-1",
    year: "1986",
    companyName: {
      id: "LIGOKRIYASA MANDIRI",
      en: "LIGOKRIYASA MANDIRI",
    },
    description: {
      id: "Ligo Group journey began with the establishment of PT. Ligokriyasa Mandiri (LKM) in 1986, focusing on the production of plastic bags for household and industrial needs in various sizes and material types. From the outset, the company specialized in meeting the demand for plastic bags across a wide range of businesses, building a strong reputation as a trusted partner in the plastic packaging industry.",
      en: "Ligo Group journey began with the establishment of PT. Ligokriyasa Mandiri (LKM) in 1986, focusing on the production of plastic bags for household and industrial needs in various sizes and material types. From the outset, the company specialized in meeting the demand for plastic bags across a wide range of businesses, building a strong reputation as a trusted partner in the plastic packaging industry.",
    },
    logo: "/journey/logo-ligokriyasa-mandiri.webp",
    order: 0,
  },
  {
    id: "fallback-2",
    year: "1998",
    companyName: {
      id: "DOLPIN",
      en: "DOLPIN",
    },
    description: {
      id: "Ligo Group memulai perjalanannya dengan berdirinya PT. Ligokriyasa Mandiri (LKM) pada tahun 1986. Di awal operasinya, Ligo Group berfokus pada jasa cetak dan potong kantong plastik. Seiring berjalannya waktu, Grup memperluas kapasitas produksinya dengan menambah berbagai mesin untuk memproduksi kantong plastik PP.",
      en: "LIGO's journey began with the establishment of Ligokriyasa Mandiri (LKM), laying the foundation for what would grow into a multi-business plastic group.",
    },
    logo: "/journey/logo-dolpin.webp",
    order: 1,
  },
  {
    id: "fallback-3",
    year: "2000",
    companyName: {
      id: "UKS",
      en: "UKS",
    },
    description: {
      id: "Ligo Group memulai perjalanannya dengan berdirinya PT. Ligokriyasa Mandiri (LKM) pada tahun 1986. Di awal operasinya, Ligo Group berfokus pada jasa cetak dan potong kantong plastik. Seiring berjalannya waktu, Grup memperluas kapasitas produksinya dengan menambah berbagai mesin untuk memproduksi kantong plastik PP.",
      en: "LIGO's journey began with the establishment of Ligokriyasa Mandiri (LKM), laying the foundation for what would grow into a multi-business plastic group.",
    },
    logo: "/journey/logo-uks.webp",
    order: 2,
  },
  {
    id: "fallback-4",
    year: "2001",
    companyName: {
      id: "UKS",
      en: "UKS",
    },
    description: {
      id: "Ligo Group memulai perjalanannya dengan berdirinya PT. Ligokriyasa Mandiri (LKM) pada tahun 1986. Di awal operasinya, Ligo Group berfokus pada jasa cetak dan potong kantong plastik. Seiring berjalannya waktu, Grup memperluas kapasitas produksinya dengan menambah berbagai mesin untuk memproduksi kantong plastik PP.",
      en: "LIGO's journey began with the establishment of Ligokriyasa Mandiri (LKM), laying the foundation for what would grow into a multi-business plastic group.",
    },
    logo: "/journey/imaging-2001.jpg",
    order: 3,
  },
  {
    id: "fallback-5",
    year: "2001",
    companyName: {
      id: "UKS",
      en: "UKS",
    },
    description: {
      id: "Ligo Group memulai perjalanannya dengan berdirinya PT. Ligokriyasa Mandiri (LKM) pada tahun 1986. Di awal operasinya, Ligo Group berfokus pada jasa cetak dan potong kantong plastik. Seiring berjalannya waktu, Grup memperluas kapasitas produksinya dengan menambah berbagai mesin untuk memproduksi kantong plastik PP.",
      en: "LIGO's journey began with the establishment of Ligokriyasa Mandiri (LKM), laying the foundation for what would grow into a multi-business plastic group.",
    },
    logo: "/journey/imaging-2001.jpg",
    order: 4,
  },
  {
    id: "fallback-6",
    year: "2001",
    companyName: {
      id: "UKS",
      en: "UKS",
    },
    description: {
      id: "Ligo Group memulai perjalanannya dengan berdirinya PT. Ligokriyasa Mandiri (LKM) pada tahun 1986. Di awal operasinya, Ligo Group berfokus pada jasa cetak dan potong kantong plastik. Seiring berjalannya waktu, Grup memperluas kapasitas produksinya dengan menambah berbagai mesin untuk memproduksi kantong plastik PP.",
      en: "LIGO's journey began with the establishment of Ligokriyasa Mandiri (LKM), laying the foundation for what would grow into a multi-business plastic group.",
    },
    logo: "/journey/imaging-2001.jpg",
    order: 5,
  },
  {
    id: "fallback-7",
    year: "2001",
    companyName: {
      id: "UKS",
      en: "UKS",
    },
    description: {
      id: "Ligo Group memulai perjalanannya dengan berdirinya PT. Ligokriyasa Mandiri (LKM) pada tahun 1986. Di awal operasinya, Ligo Group berfokus pada jasa cetak dan potong kantong plastik. Seiring berjalannya waktu, Grup memperluas kapasitas produksinya dengan menambah berbagai mesin untuk memproduksi kantong plastik PP.",
      en: "LIGO's journey began with the establishment of Ligokriyasa Mandiri (LKM), laying the foundation for what would grow into a multi-business plastic group.",
    },
    logo: "/journey/imaging-2001.jpg",
    order: 6,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
  locale: Locale;
  milestones?: JourneyMilestoneData[];
};

export default function OurJourney({ locale, milestones }: Props) {
  const t = useTranslations("OurJourney");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [contentTransition, setContentTransition] = useState(false);
  const prevIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);

  // Use CMS data if available, otherwise fallback
  const data = milestones && milestones.length > 0 ? milestones : FALLBACK_MILESTONES;

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;

    const scrolled = -rect.top;
    const scrollableDistance = sectionHeight - viewportHeight;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

    const segmentSize = 1 / data.length;
    const newIndex = Math.min(
      data.length - 1,
      Math.floor(progress / segmentSize),
    );

    if (newIndex !== prevIndexRef.current && !isTransitioningRef.current) {
      isTransitioningRef.current = true;
      setContentTransition(true);

      setTimeout(() => {
        setActiveIndex(newIndex);
        prevIndexRef.current = newIndex;
        setContentTransition(false);
        isTransitioningRef.current = false;
      }, 300);
    }
  }, [data.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    requestAnimationFrame(() => handleScroll());
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navigateToMilestone = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = sectionHeight - viewportHeight;

    const segmentSize = 1 / data.length;
    const targetProgress = index * segmentSize + segmentSize * 0.3;
    const targetScroll = sectionTop + scrollableDistance * targetProgress;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const navigateUp = () => {
    if (activeIndex > 0) navigateToMilestone(activeIndex - 1);
  };

  const navigateDown = () => {
    if (activeIndex < data.length - 1)
      navigateToMilestone(activeIndex + 1);
  };

  const activeMilestone = data[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${data.length * 100}vh` }}
    >
      {/* Sticky container — stays pinned while section scrolls */}
      <div className="sticky top-0 h-dvh overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center relative">
          {/* Section label */}
          <h2 className="set-text-caption1">{t("label")}</h2>

          {/* ── Main layout: vertical timeline bar + content ── */}
          <div className="flex items-center gap-8 md:gap-16 lg:gap-24 mt-11 min-h-[467px]">
            {/* ── Left Column: Vertical Timeline Bar ── */}
            <div className="flex flex-col items-center h-full py-4 relative shrink-0">
              {/* Vertical line with notches */}
              <div className="absolute left-0 top-0  h-full pl-1 py-14  flex flex-col justify-center gap-11 border-l border-l-primary-blue">
                {/* Arrow Up */}
                <button
                  onClick={navigateUp}
                  className={`absolute left-4 top-2 journey-nav-arrow group ${activeIndex === 0 ? "opacity-30 cursor-default" : "cursor-pointer"}`}
                  disabled={activeIndex === 0}
                  aria-label="Previous milestone"
                >
                  <div className="-rotate-90">
                    <Icon__ArrowRight />
                  </div>
                </button>

                {data.map((milestone, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={`notch-${milestone.id}`}
                      onClick={() => navigateToMilestone(index)}
                      className=" left-px z-10 group/notch"
                      aria-label={`Go to year ${milestone.year}`}
                    >
                      {/* Notch dot */}
                      <div
                        className={`
                          transition-all duration-500
                          ${isActive ? "bg-primary-red h-[5px] w-8" : "h-[2.5px] w-4 bg-[#c0c0c0] group-hover/notch:bg-primary-blue"}
                        `}
                      />
                    </button>
                  );
                })}

                {/* Arrow Down */}
                <button
                  onClick={navigateDown}
                  className={`absolute left-4 bottom-2 journey-nav-arrow group ${activeIndex === data.length - 1 ? "opacity-30 cursor-default" : "cursor-pointer"}`}
                  disabled={activeIndex === data.length - 1}
                  aria-label="Next milestone"
                >
                  <div className="rotate-90">
                    <Icon__ArrowRight />
                  </div>
                </button>
              </div>
            </div>

            {/* ── Right Column: Content ── */}
            <div className="flex-1 flex flex-col md:flex-row pl-10 md:pl-0 md:items-center gap-10 md:gap-16 lg:gap-24">
              {/* Sub-column Left: Logo */}
              <div
                className={`
                  transition-all duration-500 ease-out
                  ${contentTransition ? "opacity-0 translate-y-6 scale-95" : "opacity-100 translate-y-0 scale-100"}
                `}
              >
                <div className="w-[280px] lg:w-[304px] relative">
                  {activeMilestone.logo && (
                    <img
                      alt={`Logo ${activeMilestone.companyName[locale]}`}
                      src={activeMilestone.logo}
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>
              </div>

              {/* Sub-column Right: Year & Description */}
              <div
                className={`
                  flex-1 transition-all duration-500 ease-out delay-100
                  ${contentTransition ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}
                `}
              >
                {/* Year display */}
                <div className="relative text-[3.25rem] leading-[1em]">
                  {activeMilestone.year}
                </div>

                {/* Description */}
                <p
                  className="set-text-bodytext mt-8 md:mt-12 max-w-md"
                  dangerouslySetInnerHTML={{
                    __html: activeMilestone.description[locale],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
