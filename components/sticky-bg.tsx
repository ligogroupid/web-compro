"use client";

import { useEffect, useRef, ReactNode } from "react";

interface StickyBgProps {
  children: ReactNode;
  className?: string;
}

export default function StickyBg({ children, className = "" }: StickyBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    function update() {
      rafRef.current = null;
      const rect = container!.getBoundingClientRect();

      if (rect.top > 0) {
        // State A: before — hasn't reached top yet
        inner!.style.position = "relative";
        inner!.style.top = "";
        inner!.style.bottom = "";
        inner!.style.left = "";
        inner!.style.width = "";
      } else if (rect.bottom > 0) {
        // State B: stuck — fixed to viewport top
        inner!.style.position = "fixed";
        inner!.style.top = "0";
        inner!.style.bottom = "";
        inner!.style.left = "0";
        inner!.style.width = "100%";
      } else {
        // State C: after — anchor to container bottom so it doesn't float above subsequent content
        inner!.style.position = "absolute";
        inner!.style.top = "";
        inner!.style.bottom = "0";
        inner!.style.left = "0";
        inner!.style.width = "100%";
      }
    }

    function onScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(update);
    }

    function onResize() {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }

    update(); // set correct initial state on mount (handles reload-while-scrolled)

    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
