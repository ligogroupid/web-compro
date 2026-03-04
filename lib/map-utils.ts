/**
 * Convert geographic coordinates (lat/long) to x/y percentage position
 * on the Indonesia SVG map.
 *
 * Uses Mercator-like projection bounded to Indonesia's geographic extent:
 * - Longitude range: ~94°E to ~141°E
 * - Latitude range:  ~-11°S to ~6°N
 *
 * Returns percentage values (0-100) for CSS positioning within the map container.
 */
export function latLongToXY(
  latitude: number,
  longitude: number,
  mapBounds = {
    minLng: 94.5,
    maxLng: 141.5,
    minLat: -11.0,
    maxLat: 6.5,
  },
): { x: number; y: number } {
  const x =
    ((longitude - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) *
    100;
  // Invert Y because SVG y-axis goes top-down, but latitude goes bottom-up
  const y =
    ((mapBounds.maxLat - latitude) / (mapBounds.maxLat - mapBounds.minLat)) *
    100;

  return {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  };
}
