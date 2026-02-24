import { useEffect, useRef, useState } from "react";

type Options = {
  /** Fire only once — stays `true` after first intersection. Default: `true` */
  once?: boolean;
  /** IntersectionObserver `threshold` (0–1). Default: `0.1` */
  threshold?: number;
  /** IntersectionObserver `rootMargin`. Default: `"0px"` */
  rootMargin?: string;
};

type UseInViewReturn<T extends HTMLElement> = {
  ref: React.RefObject<T | null>;
  isInView: boolean;
};

export function useInView<T extends HTMLElement = HTMLDivElement>({
  once = true,
  threshold = 0.1,
  rootMargin = "0px",
}: Options = {}): UseInViewReturn<T> {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (once && isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [once, threshold, rootMargin, isInView]);

  return { ref, isInView };
}
