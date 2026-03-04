"use client";

import { useState } from "react";

import IndonesiaMap from "@/components/indonesia-map";
import { latLongToXY } from "@/lib/map-utils";

type LocationData = {
  name: string;
  location: string;
  displayType: string;
  embedUrl?: string;
  latitude?: number;
  longitude?: number;
};

type VisitLocationsSectionProps = {
  locations: LocationData[];
  locationDisplayType?: string;
  title: string;
  subtitle: string;
};

/**
 * Compute responsive grid class for gmaps embeds:
 *  - 1 location  → single column (full width)
 *  - 2 locations → 2 columns on md+
 *  - 3+ locations → 3 columns on lg+
 */
function gmapsGridClass(count: number): string {
  if (count === 1) return "grid grid-cols-1";
  if (count === 2) return "grid grid-cols-1 md:grid-cols-2";
  return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
}

export default function VisitLocationsSection({
  locations,
  locationDisplayType,
  title,
  subtitle,
}: VisitLocationsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Determine which mode to render
  const isProjection = locationDisplayType === "maps_projection";
  const isGmaps = locationDisplayType === "gmaps_embed";

  // Filter locations by display type
  const projectionLocations = locations.filter(
    (loc) =>
      loc.displayType === "maps_projection" &&
      loc.latitude !== undefined &&
      loc.longitude !== undefined,
  );

  const gmapsLocations = locations.filter(
    (loc) => loc.displayType === "gmaps_embed" && loc.embedUrl,
  );

  // Legacy locations (fallback)
  const legacyLocations = locations.filter(
    (loc) => loc.displayType === "legacy" || loc.displayType === undefined,
  );

  // Choose which locations to display in the text grid
  const displayLocations = isProjection
    ? projectionLocations
    : isGmaps
      ? gmapsLocations
      : legacyLocations.length > 0
        ? legacyLocations
        : locations;

  return (
    <section className="relative bg-primary-blue overflow-hidden">
      {/* Diagonal accent line — subtle geometric detail */}
      <div
        className="absolute top-0 right-0 w-px opacity-[0.07]"
        style={{
          height: "120%",
          background:
            "linear-gradient(to bottom, transparent, #fff 30%, #fff 70%, transparent)",
          transform: "rotate(12deg)",
          transformOrigin: "top right",
        }}
      />

      <div className="relative px-4 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          {/* ━━━ Section Header ━━━ */}
          <div className="flex flex-col lg:flex-row lg:gap-20">
            <div className="lg:w-1/4 mb-14 md:mb-20 space-y-3 text-white">
              <div className="set-text-caption1">{title.toUpperCase()}</div>
              <p className="set-text-headline1 max-w-lg">{subtitle}</p>
            </div>

            <div className="lg:w-3/4">
              {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  MODE 1: Maps Projection — SVG map + pin markers
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
              {isProjection && projectionLocations.length > 0 && (
                <div className="mb-16">
                  <div className="relative w-full">
                    <IndonesiaMap className="block w-full opacity-20" />

                    {projectionLocations.map((loc, idx) => {
                      if (
                        loc.latitude === undefined ||
                        loc.longitude === undefined
                      )
                        return null;
                      const pos = latLongToXY(loc.latitude, loc.longitude);
                      const isHovered = hoveredIndex === idx;

                      return (
                        <div
                          key={idx}
                          className="absolute -translate-x-1/2 -translate-y-full transition-all duration-500 ease-out"
                          style={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`,
                            zIndex: isHovered ? 20 : 10,
                          }}
                          onMouseEnter={() => setHoveredIndex(idx)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <div className="relative flex flex-col items-center">
                            {/* Pulse ring on hover */}
                            <div
                              className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full transition-all duration-500"
                              style={{
                                width: isHovered ? "32px" : "0px",
                                height: isHovered ? "32px" : "0px",
                                backgroundColor: "rgba(215, 25, 32, 0.2)",
                                animation: isHovered
                                  ? "marker-pulse 1.5s ease-in-out infinite"
                                  : "none",
                              }}
                            />

                            {/* Pin icon */}
                            <svg
                              width={isHovered ? 22 : 14}
                              height={isHovered ? 30 : 20}
                              viewBox="0 0 24 32"
                              className="drop-shadow-lg transition-all duration-300"
                            >
                              <path
                                d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z"
                                fill={
                                  isHovered ? "#d71920" : "rgba(215, 25, 32, 1)"
                                }
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="12"
                                cy="12"
                                r="5"
                                fill="white"
                                className="transition-all duration-300"
                              />
                            </svg>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  MODE 2: Google Maps Embed — responsive iframe grid
                  1 loc → 1 col, 2 locs → 2 col, 3+ → 3 col (max)
                  Each card: map on top, name below
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
              {isGmaps && gmapsLocations.length > 0 && (
                <div
                  className={[
                    gmapsGridClass(gmapsLocations.length),
                    "gap-5 md:gap-6",
                  ].join(" ")}
                >
                  {gmapsLocations.map((loc, idx) => {
                    const isHovered_ = hoveredIndex === idx;

                    return (
                      <div
                        key={idx}
                        className="location-card-reveal group relative overflow-hidden"
                        style={
                          {
                            "--card-delay": `${idx * 80}ms`,
                          } as React.CSSProperties
                        }
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {/* Map iframe */}
                        <div
                          className="relative overflow-hidden transition-shadow duration-500"
                          style={{
                            boxShadow: isHovered_
                              ? "0 8px 32px rgba(0,0,0,0.25)"
                              : "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          {/* Top accent line */}
                          <div
                            className="absolute top-0 left-0 right-0 h-[3px] z-10 transition-transform duration-500 origin-left"
                            style={{
                              background:
                                "linear-gradient(90deg, #d71920, #ec6626)",
                              transform: isHovered_ ? "scaleX(1)" : "scaleX(0)",
                            }}
                          />

                          <div
                            className={[
                              "w-full",
                              gmapsLocations.length === 1
                                ? "aspect-[21/9]"
                                : "aspect-[4/3]",
                            ].join(" ")}
                          >
                            <iframe
                              src={loc.embedUrl}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              title={loc.name}
                              className="block"
                            />
                          </div>
                        </div>

                        {/* Location name — below the map */}
                        <div className="px-5 py-4 mx-6 lg:mx-10 transition-all duration-300 border border-white/50 border-l-0 border-r-0 mt-8">
                          <div className="flex items-center gap-3">
                            <p
                              className="font-heading text-sm font-bold tracking-wide transition-colors duration-300"
                              style={{
                                color: isHovered_
                                  ? "#ffffff"
                                  : "rgba(255,255,255,0.8)",
                              }}
                            >
                              {loc.name}
                            </p>
                          </div>

                          {/* Address text if available */}
                          {loc.location && (
                            <p className="mt-1 ml-[26px] text-xs text-white/30 leading-relaxed transition-colors duration-300 group-hover:text-white/50">
                              {loc.location}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  Text-only Location Grid (both modes + legacy)
                  Shown below map/embeds as a supplementary list
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
              {!isGmaps && (
                <div
                  className={[
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                    "gap-6 md:gap-10 lg:gap-14",
                    isProjection || isGmaps ? "mt-10" : "",
                  ].join(" ")}
                >
                  {displayLocations.map((location, idx) => (
                    <div
                      key={idx}
                      className="group relative cursor-default border-t border-b border-t-white/50 border-b-white/50 hover:border-transparent duration-300 transition-all"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div
                        className="flex items-start gap-4 px-4 py-4 -mx-4 transition-all duration-300"
                        style={{
                          backgroundColor:
                            hoveredIndex === idx
                              ? "rgba(255, 255, 255, 0.06)"
                              : "transparent",
                        }}
                      >
                        <div className="min-w-0 flex-1">
                          <h3
                            className="font-heading text-base font-bold tracking-wide transition-colors duration-300"
                            style={{
                              color:
                                hoveredIndex === idx
                                  ? "#ffffff"
                                  : "rgba(255, 255, 255, 0.85)",
                            }}
                          >
                            {location.name}
                          </h3>
                          {location.location && (
                            <p className="mt-1 text-sm text-white/40 leading-relaxed transition-colors duration-300 group-hover:text-white/55">
                              {location.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
