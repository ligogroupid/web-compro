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

  // Filter locations by display type for projection mode
  const projectionLocations = locations.filter(
    (loc) =>
      loc.displayType === "maps_projection" &&
      loc.latitude !== undefined &&
      loc.longitude !== undefined,
  );

  const gmapsLocations = locations.filter(
    (loc) => loc.displayType === "gmaps_embed" && loc.embedUrl,
  );

  // Legacy locations (or fallback)
  const legacyLocations = locations.filter(
    (loc) => loc.displayType === "legacy" || loc.displayType === undefined,
  );

  // Choose which locations to display in the grid
  const displayLocations = isProjection
    ? projectionLocations
    : isGmaps
      ? gmapsLocations
      : legacyLocations.length > 0
        ? legacyLocations
        : locations;

  return (
    <section className="relative bg-primary-blue overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 40px, #fff 40px, #fff 41px)",
          }}
        />
      </div>

      <div className="relative px-4 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-14 md:mb-20">
            <div className="set-text-caption1 text-primary-red tracking-[0.3em] mb-4">
              ●&ensp;{title.toUpperCase()}
            </div>
            <p className="set-text-bodytext text-white/60 max-w-lg mt-3">
              {subtitle}
            </p>
          </div>

          {/* Maps Projection Mode — SVG map + markers */}
          {isProjection && projectionLocations.length > 0 && (
            <div className="mb-16">
              <div className="relative w-full">
                {/* Map Image */}
                <IndonesiaMap className="block w-full opacity-20" />

                {/* Pin markers overlay — absolute positioned on the map */}
                {projectionLocations.map((loc, idx) => {
                  if (loc.latitude === undefined || loc.longitude === undefined)
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
                        {/* Pulse ring when hovered */}
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

                        {/* Pin label — shows on hover or on larger screens */}
                        <div
                          className="mb-1 whitespace-nowrap rounded-sm px-2 py-0.5 text-[10px] font-bold leading-tight shadow-lg transition-all duration-300 pointer-events-none"
                          style={{
                            backgroundColor: isHovered
                              ? "#d71920"
                              : "rgba(215, 25, 32, 0.85)",
                            color: "#fff",
                            transform: isHovered
                              ? "scale(1.15) translateY(-4px)"
                              : "scale(1) translateY(0)",
                            opacity: isHovered ? 1 : 0.7,
                          }}
                        >
                          {loc.name}
                        </div>

                        {/* Pin dot */}
                        <svg
                          width={isHovered ? 20 : 14}
                          height={isHovered ? 28 : 20}
                          viewBox="0 0 24 32"
                          className="drop-shadow-lg transition-all duration-300"
                        >
                          <path
                            d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z"
                            fill={isHovered ? "#d71920" : "rgba(215, 25, 32, 0.7)"}
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

          {/* Google Maps Embed Mode */}
          {isGmaps && gmapsLocations.length > 0 && (
            <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              {gmapsLocations.map((loc, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-lg overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/25"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="aspect-[16/9]">
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
                  <div className="bg-primary-blue/80 backdrop-blur-sm px-5 py-3 border-t border-white/10">
                    <p className="font-heading text-sm font-bold text-white">
                      {loc.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Location Grid — 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {displayLocations.map((location, idx) => (
              <div
                key={idx}
                className="group relative cursor-default"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="flex items-start gap-4 rounded-lg px-4 py-4 -mx-4 transition-all duration-300"
                  style={{
                    backgroundColor:
                      hoveredIndex === idx
                        ? "rgba(255, 255, 255, 0.06)"
                        : "transparent",
                  }}
                >
                  {/* Marker icon */}
                  <div
                    className="mt-0.5 flex-shrink-0 transition-all duration-300"
                    style={{
                      transform:
                        hoveredIndex === idx
                          ? "scale(1.2) translateY(-2px)"
                          : "scale(1)",
                    }}
                  >
                    <svg
                      width="16"
                      height="22"
                      viewBox="0 0 24 32"
                      className="transition-all duration-300"
                    >
                      <path
                        d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z"
                        fill={hoveredIndex === idx ? "#d71920" : "rgba(255, 255, 255, 0.3)"}
                        className="transition-all duration-300"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="5"
                        fill={hoveredIndex === idx ? "white" : "rgba(255, 255, 255, 0.5)"}
                        className="transition-all duration-300"
                      />
                    </svg>
                  </div>

                  {/* Location info */}
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

                  {/* Hover accent line */}
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-primary-red transition-all duration-300"
                    style={{
                      height: hoveredIndex === idx ? "60%" : "0%",
                      opacity: hoveredIndex === idx ? 1 : 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
