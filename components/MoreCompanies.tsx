"use client";

import { useRef, useEffect, useState } from "react";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { TCompanyListItem } from "@/service/company";

type Props = {
  companies: TCompanyListItem[];
  title: string;
  locale: Locale;
};

export default function MoreCompanies({ companies, title, locale }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (companies.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative bg-gray-light overflow-hidden"
    >
      {/* Decorative geometric accent — top-left corner */}
      <div
        className="absolute top-0 left-0 w-[120px] h-[120px] md:w-[180px] md:h-[180px] pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 w-full h-[3px] bg-primary-red more-companies-accent-h" />
        <div className="absolute top-0 left-0 h-full w-[3px] bg-primary-red more-companies-accent-v" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        {/* Section heading */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="set-text-caption1 text-primary-blue/60">
            MORE COMPANIES
          </h2>
          <div className="mt-3 set-text-headline2 text-primary-blue max-w-xl">
            {title}
          </div>
          <div className="mt-6 h-px w-16 bg-primary-red" />
        </div>

        {/* Company logo grid — 3 columns, aspect 2/1.5 cards */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {companies.map((company, index) => (
            <Link
              key={company.slug}
              href={`/company/${company.slug}`}
              className={`group relative block ${
                isVisible ? "more-companies-card-reveal" : "opacity-0"
              }`}
              style={
                {
                  "--card-delay": `${index * 80 + 200}ms`,
                } as React.CSSProperties
              }
              aria-label={company.name[locale]}
            >
              {/* Card with 2:1.5 (4:3) ratio and gray background */}
              <div className="aspect-[2/1.5] bg-[#e8e8e8] relative overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:bg-[#dedede]">
                {/* Subtle inner border that reveals on hover */}
                <div className="absolute inset-[8px] md:inset-[12px] border border-transparent group-hover:border-primary-blue/10 transition-all duration-500 pointer-events-none" />

                {/* Company logo */}
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={`${company.name[locale]} logo`}
                    className="max-w-[55%] max-h-[45%] object-contain transition-all duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-[55%] h-[45%] bg-[#d4d4d4] animate-pulse" />
                )}

                {/* Bottom-right accent corner on hover */}
                <div className="absolute bottom-0 right-0 w-0 h-0 bg-primary-red transition-all duration-500 ease-out group-hover:w-8 group-hover:h-[3px]" />
                <div className="absolute bottom-0 right-0 h-0 w-0 bg-primary-red transition-all duration-500 ease-out group-hover:h-8 group-hover:w-[3px]" />
              </div>

              {/* Company name — subtle label below the card */}
              <div className="mt-2.5 text-[0.6875rem] tracking-[0.15em] uppercase text-primary-blue/40 group-hover:text-primary-blue/70 transition-colors duration-300 truncate">
                {company.name[locale]}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
