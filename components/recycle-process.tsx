"use client";

import { useRef, useState } from "react";

import { EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import type { Locale } from "@/i18n/routing";

// ─── Step Data ─────────────────────────────────────────────────────────────────

type StepData = {
  number: number;
  title: string;
  items?: string[];
  image: string;
};

const STEPS: StepData[] = [
  {
    number: 1,
    title: "Raw Materials",
    items: ["Pure Resin", "Recycled Resin"],
    image:
      "https://placehold.co/800x600/1C3687/FFFFFF?text=Raw+Materials%0APure+%26+Recycled+Resin",
  },
  {
    number: 2,
    title: "Manufacturing Process",
    items: ["Blowing Process", "Weaving Process", "Thermoforming Process"],
    image:
      "https://placehold.co/800x600/2A4494/FFFFFF?text=Manufacturing%0ABlowing+%7C+Weaving+%7C+Thermoforming",
  },
  {
    number: 3,
    title: "Final Products",
    items: ["Plastic Bags", "Tarpaulin", "Cups", "Plastic Sacks"],
    image:
      "https://placehold.co/800x600/1C3687/FFFFFF?text=Final+Products%0ABags+%7C+Tarpaulin+%7C+Cups",
  },
  {
    number: 4,
    title: "Consumption",
    items: undefined,
    image:
      "https://placehold.co/800x600/EC6626/FFFFFF?text=Consumption%0AEnd+Users",
  },
  {
    number: 5,
    title: "Plastic Waste",
    items: undefined,
    image:
      "https://placehold.co/800x600/D71920/FFFFFF?text=Plastic+Waste%0ACollection+%26+Sorting",
  },
  {
    number: 6,
    title: "Recycling Process",
    items: ["Recycled Resin"],
    image:
      "https://placehold.co/800x600/1C3687/FFFFFF?text=Recycling+Process%0ARecycled+Resin",
  },
];

// ─── Desktop Step Components (preserved original layout) ───────────────────────

function Step1() {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[11px] text-primary-red font-bold">1</div>
      <div className="min-w-[120px]">
        <div className="text-lg font-body leading-[1em] font-bold max-w-[86px]">
          Raw Materials
        </div>
        <ul className="text-sm mt-[22px]">
          <li>
            <span className="text-primary-red">-</span> Pure Resin
          </li>
          <li>
            <span className="text-primary-red">-</span> Recycled Resin
          </li>
        </ul>
      </div>
    </div>
  );
}

function Step6() {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[11px] text-primary-red font-bold">6</div>
      <div className="max-w-[120px]">
        <div className="text-lg font-body leading-[1em] font-bold">
          Recycling Process
        </div>
        <ul className="text-sm mt-[22px]">
          <li>
            <span className="text-primary-red">-</span> Recycled Resin
          </li>
        </ul>
      </div>
    </div>
  );
}

function Step5() {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[11px] text-primary-red font-bold">5</div>
      <div className="max-w-[120px]">
        <div className="text-lg font-body leading-[1em] font-bold">
          Plastic Waste
        </div>
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[11px] text-primary-red font-bold">2</div>
      <div className="max-w-[180px]">
        <div className="text-lg font-body leading-[1em] font-bold">
          Manufacturing Process
        </div>
        <ul className="text-sm mt-[22px]">
          <li>
            <span className="text-primary-red">-</span> Blowing Process
          </li>
          <li>
            <span className="text-primary-red">-</span> Weaving Process
          </li>
          <li>
            <span className="text-primary-red">-</span> Thermoforming Process
          </li>
        </ul>
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[11px] text-primary-red font-bold">3</div>
      <div className="min-w-[120px]">
        <div className="text-lg font-body leading-[1em] font-bold">
          Final Products
        </div>
        <ul className="text-sm mt-[22px]">
          <li>
            <span className="text-primary-red">-</span> Plastic Bags
          </li>
          <li>
            <span className="text-primary-red">-</span> Tarpaulin
          </li>
          <li>
            <span className="text-primary-red">-</span> Cups
          </li>
          <li>
            <span className="text-primary-red">-</span> Plastic Sacks
          </li>
        </ul>
      </div>
    </div>
  );
}

function Step4() {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[11px] text-primary-red font-bold">4</div>
      <div className="max-w-[120px]">
        <div className="text-lg font-body leading-[1em] font-bold">
          Consumption
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Layout (original circular diagram) ────────────────────────────────

function DesktopLayout() {
  return (
    <div className="flex justify-center">
      <div className="pr-[100px]">
        <div className="relative">
          <Step1 />
          <div className="w-full h-px bg-primary-blue absolute left-[calc(100%+10px)] top-2" />
        </div>
        <div className="relative mt-20">
          <Step6 />
          <div className="w-1/2 h-px bg-primary-blue absolute left-[calc(100%+10px)] top-2" />
        </div>
        <div className="relative mt-24">
          <Step5 />
          <div className="w-full h-px bg-primary-blue absolute left-[calc(100%+10px)] top-2" />
        </div>
      </div>
      <div className="relative">
        <img
          className="size-full object-contain"
          alt="LIGO Group Recycle Process"
          src="/recycle-process.webp"
        />
      </div>
      <div className="pl-[100px]">
        <div className="relative">
          <div className="w-3/4 h-px bg-primary-blue absolute right-[calc(100%+20px)] top-2" />
          <Step2 />
        </div>
        <div className="relative mt-10">
          <div className="w-1/3 h-px bg-primary-blue absolute right-[calc(100%+20px)] top-2" />
          <Step3 />
        </div>
        <div className="relative mt-14">
          <div className="w-2/3 h-px bg-primary-blue absolute right-[calc(100%+20px)] top-2" />
          <Step4 />
        </div>
      </div>
    </div>
  );
}

// ─── Mobile/Tablet Slide Card ──────────────────────────────────────────────────

function SlideCard({ step, isActive }: { step: StepData; isActive: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white h-full">
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={step.image}
          alt={step.title}
          className={`
            size-full object-cover transition-transform duration-700 ease-out
            ${isActive ? "scale-100" : "scale-110"}
          `}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/90 via-primary-blue/30 to-transparent" />

        {/* Step number badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-red flex items-center justify-center">
            <span className="text-white font-heading text-sm font-bold">
              {step.number}
            </span>
          </div>
          <div className="h-px w-6 bg-white/40" />
          <span className="text-white/60 text-[10px] font-body tracking-[0.2em] uppercase">
            Step
          </span>
        </div>

        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-heading text-xl font-bold text-white leading-tight">
            {step.title}
          </h3>
        </div>
      </div>

      {/* Content area */}
      {step.items && step.items.length > 0 && (
        <div className="p-5 pt-4">
          <ul className="space-y-2">
            {step.items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 group">
                <div className="w-1 h-1 rounded-full bg-primary-red shrink-0" />
                <span className="text-sm font-body text-primary-blue/80">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Mobile/Tablet Slider ──────────────────────────────────────────────────────

function MobileSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      {/* Loop indicator — shows circular nature */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex items-center gap-1.5">
          {STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`
                h-1 rounded-full transition-all duration-500 ease-out
                ${
                  idx === activeIndex
                    ? "w-7 bg-primary-red"
                    : idx < activeIndex
                      ? "w-2 bg-primary-blue/30"
                      : "w-2 bg-primary-blue/10"
                }
              `}
            />
          ))}
        </div>
        <span className="text-[11px] font-body text-primary-blue/40 tracking-wider">
          {String(activeIndex + 1).padStart(2, "0")}/
          {String(STEPS.length).padStart(2, "0")}
        </span>
      </div>

      {/* Swiper */}
      <div className="-mx-4">
        <Swiper
          modules={[Pagination, EffectFade]}
          spaceBetween={16}
          slidesPerView={1.15}
          centeredSlides={false}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
          breakpoints={{
            480: { slidesPerView: 1.4, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.3, spaceBetween: 24 },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="recycle-swiper !overflow-visible"
        >
          {STEPS.map((step, idx) => (
            <SwiperSlide key={step.number} className="!h-auto">
              <SlideCard step={step} isActive={idx === activeIndex} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Progress bar */}
      <div className="mt-6 h-[2px] bg-primary-blue/5 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-primary-red rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((activeIndex + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Recycle loop hint on last slide */}
      {activeIndex === STEPS.length - 1 && (
        <div className="mt-4 flex items-center gap-2 animate-pulse">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-primary-red"
          >
            <path
              d="M8 1C4.13 1 1 4.13 1 8s3.13 7 7 7 7-3.13 7-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12 1L15 4L12 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[11px] text-primary-red/70 font-body tracking-wider uppercase">
            Cycle repeats
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function RecycledProcess({ locale }: { locale: Locale }) {
  return (
    <>
      {/* Desktop: original circular diagram */}
      <div className="hidden lg:block">
        <DesktopLayout />
      </div>

      {/* Mobile/Tablet: swiper slider */}
      <div className="lg:hidden overflow-x-hidden">
        <MobileSlider />
      </div>
    </>
  );
}
