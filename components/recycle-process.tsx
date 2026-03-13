"use client";

import { useTranslations } from "next-intl";

import { useInView } from "@/hooks/useInView";

// ─── Step Data ─────────────────────────────────────────────────────────────────

type StepData = {
  number: number;
  title: string;
  items?: string[];
};

// ─── Desktop Step Components (preserved original layout) ───────────────────────

function Step1({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[11px] text-primary-red font-bold">1</div>
      <div className="min-w-[120px]">
        <div className="text-lg font-body leading-[1em] font-bold max-w-[86px]">
          {title}
        </div>
        <ul className="text-sm mt-[22px]">
          {items.map((item) => (
            <li key={item}>
              <span className="text-primary-red">-</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Step6({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[11px] text-primary-red font-bold">6</div>
      <div className="max-w-[120px]">
        <div className="text-lg font-body leading-[1em] font-bold">{title}</div>
        <ul className="text-sm mt-[22px]">
          {items.map((item) => (
            <li key={item}>
              <span className="text-primary-red">-</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Step5({ title }: { title: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[11px] text-primary-red font-bold">5</div>
      <div className="max-w-[120px]">
        <div className="text-lg font-body leading-[1em] font-bold">{title}</div>
      </div>
    </div>
  );
}

function Step2({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[11px] text-primary-red font-bold">2</div>
      <div className="max-w-[180px]">
        <div className="text-lg font-body leading-[1em] font-bold">{title}</div>
        <ul className="text-sm mt-[22px]">
          {items.map((item) => (
            <li key={item}>
              <span className="text-primary-red">-</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Step3({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[11px] text-primary-red font-bold">3</div>
      <div className="min-w-[120px]">
        <div className="text-lg font-body leading-[1em] font-bold">{title}</div>
        <ul className="text-sm mt-[22px]">
          {items.map((item) => (
            <li key={item}>
              <span className="text-primary-red">-</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Step4({ title }: { title: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[11px] text-primary-red font-bold">4</div>
      <div className="max-w-[120px]">
        <div className="text-lg font-body leading-[1em] font-bold">{title}</div>
      </div>
    </div>
  );
}

// ─── Desktop Layout (original circular diagram) ────────────────────────────────

type DesktopLayoutProps = {
  steps: {
    step1: { title: string; items: string[] };
    step2: { title: string; items: string[] };
    step3: { title: string; items: string[] };
    step4: { title: string };
    step5: { title: string };
    step6: { title: string; items: string[] };
  };
};

function DesktopLayout({ steps }: DesktopLayoutProps) {
  return (
    <div className="flex justify-center">
      <div className="pr-[100px]">
        <div className="relative">
          <Step1 {...steps.step1} />
          <div className="w-full h-px bg-primary-blue absolute left-[calc(100%+10px)] top-2" />
        </div>
        <div className="relative mt-20">
          <Step6 {...steps.step6} />
          <div className="w-1/2 h-px bg-primary-blue absolute left-[calc(100%+10px)] top-2" />
        </div>
        <div className="relative mt-24">
          <Step5 {...steps.step5} />
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
          <Step2 {...steps.step2} />
        </div>
        <div className="relative mt-10">
          <div className="w-1/3 h-px bg-primary-blue absolute right-[calc(100%+20px)] top-2" />
          <Step3 {...steps.step3} />
        </div>
        <div className="relative mt-14">
          <div className="w-2/3 h-px bg-primary-blue absolute right-[calc(100%+20px)] top-2" />
          <Step4 {...steps.step4} />
        </div>
      </div>
    </div>
  );
}

// ─── Hexagon Number Badge Positions (clockwise from top-left) ────────────────

const HEXAGON_POSITIONS: { top: string; left: string }[] = [
  { top: "5%", left: "25%" }, // 1 — top-left
  { top: "5%", left: "68%" }, // 2 — top-right
  { top: "46%", left: "95%" }, // 3 — mid-right
  { top: "87%", left: "68%" }, // 4 — bottom-right
  { top: "87%", left: "25%" }, // 5 — bottom-left
  { top: "46%", left: "-4%" }, // 6 — mid-left
];

// ─── Mobile/Tablet Layout ──────────────────────────────────────────────────────

function MobileLayout({ steps }: { steps: StepData[] }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <div className="flex flex-col gap-6">
      {/* Recycle process image with number badges */}
      <div ref={ref} className="relative mx-auto max-w-[260px]">
        <img
          src="/recycle-process.webp"
          alt="LIGO Group Recycle Process"
          className="w-full object-contain"
        />
        {HEXAGON_POSITIONS.map((pos, i) => (
          <span
            key={i}
            className="absolute flex items-center justify-center size-6 rounded-full bg-white text-primary-red text-xs font-bold shadow-sm transition-all duration-300"
            style={{
              top: pos.top,
              left: pos.left,
              opacity: isInView ? 1 : 0,
              transform: isInView ? "scale(1)" : "scale(0.5)",
              transitionDelay: isInView ? `${i * 300}ms` : "0ms",
            }}
          >
            {i + 1}
          </span>
        ))}
      </div>
      {/* Steps */}
      <div className="flex flex-col">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex items-start gap-3 border-t border-primary-blue py-5 last:border-b last:border-b-primary-blue"
          >
            <div className="text-[11px] text-primary-red font-bold">
              {step.number}
            </div>
            <div>
              <div className="text-lg font-body leading-[1em] font-bold">
                {step.title}
              </div>
              {step.items && step.items.length > 0 && (
                <ul className="text-sm mt-[22px]">
                  {step.items.map((item) => (
                    <li key={item}>
                      <span className="text-primary-red">-</span> {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function RecycledProcess() {
  const t = useTranslations("RecycleProcess");

  const stepData = {
    step1: {
      title: t("step1Title"),
      items: [t("step1Item1"), t("step1Item2")],
    },
    step2: {
      title: t("step2Title"),
      items: [t("step2Item1"), t("step2Item2"), t("step2Item3")],
    },
    step3: {
      title: t("step3Title"),
      items: [
        t("step3Item1"),
        t("step3Item2"),
        t("step3Item3"),
        t("step3Item4"),
      ],
    },
    step4: { title: t("step4Title") },
    step5: { title: t("step5Title") },
    step6: {
      title: t("step6Title"),
      items: [t("step6Item1")],
    },
  };

  const STEPS: StepData[] = [
    { number: 1, title: stepData.step1.title, items: stepData.step1.items },
    { number: 2, title: stepData.step2.title, items: stepData.step2.items },
    { number: 3, title: stepData.step3.title, items: stepData.step3.items },
    { number: 4, title: stepData.step4.title },
    { number: 5, title: stepData.step5.title },
    { number: 6, title: stepData.step6.title, items: stepData.step6.items },
  ];

  return (
    <>
      {/* Desktop: original circular diagram */}
      <div className="hidden lg:block">
        <DesktopLayout steps={stepData} />
      </div>

      {/* Mobile/Tablet: vertical cards */}
      <div className="lg:hidden">
        <MobileLayout steps={STEPS} />
      </div>
    </>
  );
}
