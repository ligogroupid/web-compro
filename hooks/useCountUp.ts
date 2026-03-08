import { useEffect, useRef, useState } from "react";

type Options = {
  /** Target number to count up to */
  end: number;
  /** Animation duration in milliseconds. Default: `2000` */
  duration?: number;
  /** Start counting when this is `true` */
  isActive: boolean;
};

/**
 * Animates a number from 0 to `end` over `duration` ms using requestAnimationFrame.
 * Starts when `isActive` becomes `true` — designed to be driven by `useInView`.
 */
export function useCountUp({ end, duration = 2000, isActive }: Options): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isActive || hasStarted.current) return;

    hasStarted.current = true;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: feels natural and slows down near the target
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isActive, end, duration]);

  return count;
}
