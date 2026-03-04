/**
 * Indonesia SVG map component.
 *
 * Rendered as an <img> to keep the ~978KB SVG out of the JS bundle.
 * Pin markers are positioned using absolute CSS overlays on the parent container.
 *
 * The SVG viewBox (807×294) maps proportionally to Indonesia's geographic bounds:
 *   Longitude: 94.5°E – 141.5°E
 *   Latitude:  6.5°N – 11°S
 *
 * Use `latLongToXY()` from `@/lib/map-utils` to convert coordinates
 * to percentage positions matching this image.
 */
export default function IndonesiaMap({ className }: { className?: string }) {
  return (
    <img
      src="/indonesia-map.svg"
      alt="Peta Indonesia"
      className={className}
      draggable={false}
    />
  );
}
