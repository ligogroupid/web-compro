"use client";

import { useInView } from "@/hooks/useInView";

const BASE = "transition-all duration-700 ease-out";
const HIDDEN = "opacity-0 translate-y-10";
const VISIBLE = "opacity-100 translate-y-0";

type Props = {
  visionLabel: string;
  visionText: string;
  missionLabel: string;
  missions: string[];
};

export default function VisionMission({
  visionLabel,
  visionText,
  missionLabel,
  missions,
}: Props) {
  const { ref: visionLabelRef, isInView: visionLabelInView } =
    useInView<HTMLHeadingElement>({ threshold: 0.1 });
  const { ref: visionTextRef, isInView: visionTextInView } =
    useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: missionLabelRef, isInView: missionLabelInView } =
    useInView<HTMLHeadingElement>({ threshold: 0.1 });
  const { ref: missionListRef, isInView: missionListInView } =
    useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="bg-gray-light px-4 py-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-7">
          <div>
            <h2
              ref={visionLabelRef}
              className={`set-text-caption1 ${BASE} ${visionLabelInView ? VISIBLE : HIDDEN}`}
            >
              {visionLabel}
            </h2>
            <div
              ref={visionTextRef}
              className={`set-text-headline2 md:set-text-headline1 ${BASE} ${visionTextInView ? VISIBLE : HIDDEN}`}
              style={{ transitionDelay: visionTextInView ? "300ms" : "0ms" }}
            >
              {visionText}
            </div>
          </div>
          <div>
            <h2
              ref={missionLabelRef}
              className={`set-text-caption1 ${BASE} ${missionLabelInView ? VISIBLE : HIDDEN}`}
            >
              {missionLabel}
            </h2>
            <div ref={missionListRef} className="mt-12 space-y-7">
              {missions.map((text, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-7 ${BASE} ${missionListInView ? VISIBLE : HIDDEN}`}
                  style={{
                    transitionDelay: missionListInView
                      ? `${(index + 1) * 300}ms`
                      : "0ms",
                  }}
                >
                  <div className="h-0.5 w-5 bg-primary-red" />
                  <div className="set-text-bodytext flex-1">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
