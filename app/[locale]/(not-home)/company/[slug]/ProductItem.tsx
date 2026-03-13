"use client";

import { useInView } from "@/hooks/useInView";

type Props = {
  image: string | null;
  name: string;
  placeholderClass?: string;
};

export default function ProductItem({ image, name }: Props) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      ].join(" ")}
    >
      <div className="max-w-[240px] max-h-[240px] flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="size-full object-contain" />
        ) : (
          <div className="bg-gray-light size-full" />
        )}
      </div>
      <div className="mt-6 text-sm">{name}</div>
    </div>
  );
}
