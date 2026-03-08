"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

type Props = {
  /** The final number to animate to */
  end: number;
  /** Text to append after the number, e.g. "+" or "," */
  suffix?: string;
  /** Animation duration in ms. Default: 2000 */
  duration?: number;
  /** Extra class names for the wrapper span */
  className?: string;
  /** If true, renders the number without thousands separators */
  noDelimiter?: boolean;
};

/**
 * Renders an animated count-up number that starts when the element
 * enters the viewport. Uses `useInView` + `useCountUp` under the hood.
 */
export default function CountUpNumber({
  end,
  suffix = "",
  duration = 2000,
  className,
  noDelimiter = false,
}: Props) {
  const { ref, isInView } = useInView<HTMLSpanElement>({ threshold: 0.3 });
  const count = useCountUp({ end, duration, isActive: isInView });

  return (
    <span ref={ref} className={className}>
      {noDelimiter ? count.toString() : count.toLocaleString()}
      {suffix}
    </span>
  );
}
