"use client";

import { useInView } from "@/hooks/useInView";
import type { TCompany } from "@/service/company";

type Props = {
  logo: string | null;
  name: string;
  fullDescription: string;
  certifications: TCompany["certifications"];
  certificationsLabel: string;
};

const BASE = "transition-all duration-700 ease-out";
const HIDDEN = "opacity-0 translate-y-10";
const VISIBLE = "opacity-100 translate-y-0";

export default function CompanyInfo({
  logo,
  name,
  fullDescription,
  certifications,
  certificationsLabel,
}: Props) {
  const { ref: logoRef, isInView: logoInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
  });
  const { ref: nameRef, isInView: nameInView } = useInView<HTMLHeadingElement>({
    threshold: 0.1,
  });
  const { ref: descRef, isInView: descInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
  });
  const { ref: certRef, isInView: certInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-10 md:gap-20 md:flex-row md:justify-between">
          {/* LEFT PART */}
          <div className="max-w-xs">
            {/* LOGO */}
            <div
              ref={logoRef}
              className={`${BASE} ${logoInView ? VISIBLE : HIDDEN}`}
            >
              {logo ? (
                <div className="aspect-[260/157]">
                  <img
                    src={logo}
                    alt={`${name} logo`}
                    className="size-full object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-[260/157] bg-gray-light" />
              )}
            </div>

            {/* CERTIFICATES — desktop only */}
            {certifications.length > 0 && (
              <div
                ref={certRef}
                className={`hidden md:block mt-[200px] ${BASE} ${certInView ? VISIBLE : HIDDEN}`}
                style={{ transitionDelay: certInView ? "900ms" : "0ms" }}
              >
                <h3 className="text-lg font-bold leading-[1.4em] tracking-[0.02em]">
                  {certificationsLabel}
                </h3>
                <div className="h-px bg-primary-blue" />
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-center"
                    >
                      {cert.image ? (
                        <img
                          src={cert.image}
                          alt={cert.name}
                          className="max-w-[105px] max-h-[90px] object-contain"
                        />
                      ) : (
                        <div className="bg-gray-light w-[79px] h-[90px]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PART */}
          <div className="w-full max-w-[600px]">
            {/* NAME */}
            <h2
              ref={nameRef}
              className={`set-text-headline1 ${BASE} ${nameInView ? VISIBLE : HIDDEN}`}
              style={{ transitionDelay: nameInView ? "300ms" : "0ms" }}
            >
              {name}
            </h2>

            {/* FULL DESCRIPTION */}
            <div
              ref={descRef}
              className={`mt-16 set-text-bodytext prose [&>p]:my-10 ${BASE} ${descInView ? VISIBLE : HIDDEN}`}
              style={{ transitionDelay: descInView ? "600ms" : "0ms" }}
              dangerouslySetInnerHTML={{ __html: fullDescription }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
