"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Locale } from "@/i18n/routing";
import Icon__ArrowRight from "./icon-arrow-right";

// ─── Journey Milestone Data ───────────────────────────────────────────────────

type JourneyMilestone = {
  year: string;
  companyName: { id: string; en: string };
  description: { id: string; en: string };
  logo: React.ReactNode;
};

const REAL_MILESTONE: JourneyMilestone[] = [
  {
    year: "1986",
    companyName: {
      id: "LIGOKRIYASA MANDIRI",
      en: "LIGOKRIYASA MANDIRI",
    },
    description: {
      id: "Ligo Group journey began with the establishment of PT. Ligokriyasa Mandiri (LKM) in 1986, focusing on the production of plastic bags for household and industrial needs in various sizes and material types. From the outset, the company specialized in meeting the demand for plastic bags across a wide range of businesses, building a strong reputation as a trusted partner in the plastic packaging industry.",
      en: "Ligo Group journey began with the establishment of PT. Ligokriyasa Mandiri (LKM) in 1986, focusing on the production of plastic bags for household and industrial needs in various sizes and material types. From the outset, the company specialized in meeting the demand for plastic bags across a wide range of businesses, building a strong reputation as a trusted partner in the plastic packaging industry.",
    },
    logo: (
      <img
        alt="Logo Ligokriyasa Mandiri"
        src="/journey/logo-ligokriyasa-mandiri.webp"
      />
    ),
  },
  {
    year: "1998",
    companyName: {
      id: "DOLPIN",
      en: "DOLPIN",
    },
    description: {
      id: "Ligo Group memulai perjalanannya dengan berdirinya PT. Ligokriyasa Mandiri (LKM) pada tahun 1986. Di awal operasinya, Ligo Group berfokus pada jasa cetak dan potong kantong plastik. Seiring berjalannya waktu, Grup memperluas kapasitas produksinya dengan menambah berbagai mesin untuk memproduksi kantong plastik PP.",
      en: "LIGO's journey began with the establishment of Ligokriyasa Mandiri (LKM), laying the foundation for what would grow into a multi-business plastic group.",
    },
    logo: <img alt="Logo Dolpin" src="/journey/logo-dolpin.webp" />,
  },
  {
    year: "2000",
    companyName: {
      id: "UKS",
      en: "UKS",
    },
    description: {
      id: "Ligo Group memulai perjalanannya dengan berdirinya PT. Ligokriyasa Mandiri (LKM) pada tahun 1986. Di awal operasinya, Ligo Group berfokus pada jasa cetak dan potong kantong plastik. Seiring berjalannya waktu, Grup memperluas kapasitas produksinya dengan menambah berbagai mesin untuk memproduksi kantong plastik PP.",
      en: "LIGO's journey began with the establishment of Ligokriyasa Mandiri (LKM), laying the foundation for what would grow into a multi-business plastic group.",
    },
    logo: <img alt="Logo UKS" src="/journey/logo-uks.webp" />,
  },
  {
    year: "2001",
    companyName: {
      id: "UKS",
      en: "UKS",
    },
    description: {
      id: "Ligo Group memulai perjalanannya dengan berdirinya PT. Ligokriyasa Mandiri (LKM) pada tahun 1986. Di awal operasinya, Ligo Group berfokus pada jasa cetak dan potong kantong plastik. Seiring berjalannya waktu, Grup memperluas kapasitas produksinya dengan menambah berbagai mesin untuk memproduksi kantong plastik PP.",
      en: "LIGO's journey began with the establishment of Ligokriyasa Mandiri (LKM), laying the foundation for what would grow into a multi-business plastic group.",
    },
    logo: <img alt="Imaging 2001" src="/journey/imaging-2001.jpg" />,
  },
  {
    year: "2001",
    companyName: {
      id: "UKS",
      en: "UKS",
    },
    description: {
      id: "Ligo Group memulai perjalanannya dengan berdirinya PT. Ligokriyasa Mandiri (LKM) pada tahun 1986. Di awal operasinya, Ligo Group berfokus pada jasa cetak dan potong kantong plastik. Seiring berjalannya waktu, Grup memperluas kapasitas produksinya dengan menambah berbagai mesin untuk memproduksi kantong plastik PP.",
      en: "LIGO's journey began with the establishment of Ligokriyasa Mandiri (LKM), laying the foundation for what would grow into a multi-business plastic group.",
    },
    logo: <img alt="Imaging 2001" src="/journey/imaging-2001.jpg" />,
  },
  {
    year: "2001",
    companyName: {
      id: "UKS",
      en: "UKS",
    },
    description: {
      id: "Ligo Group memulai perjalanannya dengan berdirinya PT. Ligokriyasa Mandiri (LKM) pada tahun 1986. Di awal operasinya, Ligo Group berfokus pada jasa cetak dan potong kantong plastik. Seiring berjalannya waktu, Grup memperluas kapasitas produksinya dengan menambah berbagai mesin untuk memproduksi kantong plastik PP.",
      en: "LIGO's journey began with the establishment of Ligokriyasa Mandiri (LKM), laying the foundation for what would grow into a multi-business plastic group.",
    },
    logo: <img alt="Imaging 2001" src="/journey/imaging-2001.jpg" />,
  },
  {
    year: "2001",
    companyName: {
      id: "UKS",
      en: "UKS",
    },
    description: {
      id: "Ligo Group memulai perjalanannya dengan berdirinya PT. Ligokriyasa Mandiri (LKM) pada tahun 1986. Di awal operasinya, Ligo Group berfokus pada jasa cetak dan potong kantong plastik. Seiring berjalannya waktu, Grup memperluas kapasitas produksinya dengan menambah berbagai mesin untuk memproduksi kantong plastik PP.",
      en: "LIGO's journey began with the establishment of Ligokriyasa Mandiri (LKM), laying the foundation for what would grow into a multi-business plastic group.",
    },
    logo: <img alt="Imaging 2001" src="/journey/imaging-2001.jpg" />,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
  locale: Locale;
};

export default function OurJourney({ locale }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // const [scrollProgress, setScrollProgress] = useState(0);
  // const [isInSection, setIsInSection] = useState(false);
  const [contentTransition, setContentTransition] = useState(false);
  const prevIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;

    const scrolled = -rect.top;
    const scrollableDistance = sectionHeight - viewportHeight;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

    // setScrollProgress(progress);

    // const inSection = rect.top <= 0 && rect.bottom >= viewportHeight;
    // setIsInSection(inSection);

    const segmentSize = 1 / REAL_MILESTONE.length;
    const newIndex = Math.min(
      REAL_MILESTONE.length - 1,
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
  }, []);

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

    const segmentSize = 1 / REAL_MILESTONE.length;
    const targetProgress = index * segmentSize + segmentSize * 0.3;
    const targetScroll = sectionTop + scrollableDistance * targetProgress;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const navigateUp = () => {
    if (activeIndex > 0) navigateToMilestone(activeIndex - 1);
  };

  const navigateDown = () => {
    if (activeIndex < REAL_MILESTONE.length - 1)
      navigateToMilestone(activeIndex + 1);
  };

  const activeMilestone = REAL_MILESTONE[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${REAL_MILESTONE.length * 100}vh` }}
    >
      {/* Sticky container — stays pinned while section scrolls */}
      <div className="sticky top-0 h-dvh overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center relative">
          {/* Section label */}
          <h2 className="set-text-caption1">OUR JOURNEY</h2>

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

                {REAL_MILESTONE.map((milestone, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={`notch-${index}`}
                      onClick={() => navigateToMilestone(index)}
                      className=" left-px z-10 group/notch"
                      // style={{ top: `${position}%` }}
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
                  className={`absolute left-4 bottom-2 journey-nav-arrow group ${activeIndex === REAL_MILESTONE.length - 1 ? "opacity-30 cursor-default" : "cursor-pointer"}`}
                  disabled={activeIndex === REAL_MILESTONE.length - 1}
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
                <div className="w-[280px] lg:w-[304px] relative [&>img]:h-full">
                  {activeMilestone.logo}
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
