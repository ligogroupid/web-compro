"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ImageMode {
  src: string;
  alt?: string;
}

interface Props {
  images: Array<ImageMode>;
}

export default function ImageCover({ images }: Props) {
  function toImg(n: ImageMode, i: number) {
    return (
      <img
        key={`${i}${n.src}`}
        className="size-full object-cover"
        alt={n.alt ?? ""}
        src={n.src}
      />
    );
  }

  return (
    <div className="relative w-full aspect-[3/1.75] md:aspect-[4/1.15]">
      {images.length > 1 ? (
        <Swiper modules={[Autoplay]} autoplay={{ delay: 5000 }} loop>
          {images.map((n, i) => (
            <SwiperSlide
              key={`${i}${n.src}`}
              className="relative border aspect-[3/1.75] md:aspect-[4/1.15] overflow-hidden"
            >
              {toImg(n, i)}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="relative block aspect-[3/1.75] md:aspect-[4/1.15] overflow-hidden">
          {images.map((n, i) => toImg(n, i))}
        </div>
      )}
    </div>
  );
}
