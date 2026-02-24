"use client";

import { useMemo } from "react";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";

import type { TCompanyListItem } from "@/service/company";
import type { Locale } from "@/i18n/routing";

import { Link } from "@/i18n/navigation";
import { BrandLine } from "./footer";
import Icon__LogoLigoOffWhite from "./icon-logo-ligo-off-white";
import Icon__ArrowRight from "./icon-arrow-right";

type NavItem = {
  label: string;
  href: string;
  hasSubmenu?: boolean;
};

type Props = {
  isOpen: boolean;
  isVisible: boolean;
  closeOverlay?: boolean;
  companies?: TCompanyListItem[];
  onClose: () => void;
};

export default function FullscreenMenu({
  isOpen,
  isVisible,
  closeOverlay = true,
  companies = [],
  onClose,
}: Props) {
  const params = useParams();
  const locale = params.locale as Locale;
  const sortedCompanies = useMemo(
    () => [...companies].sort((a, b) => a.order - b.order),
    [companies],
  );

  const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Companies", href: "/company", hasSubmenu: true },
    { label: "Articles", href: "/article" },
    { label: "Contact", href: "/contact" },
  ];

  if (!isVisible) return null;

  return createPortal(
    <div
      id="fullscreen-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={`bg-primary-blue fixed inset-0 z-[9998] text-white transition-all duration-300 ease-in-out ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="relative h-full flex flex-col justify-end">
        {/* Menu set container */}
        <div className="p-10 w-full h-full max-w-7xl mx-auto">
          {/* Close button */}
          {closeOverlay && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="text-white cursor-pointer p-2 hover:opacity-70 transition-opacity duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}

          {/* CONTENT AREA */}
          <div className="mt-10 md:mt-[53px] flex flex-col md:flex-row md:justify-between gap-10">
            <div className="flex order-2 gap-10 md:gap-16">
              {/* Nav links */}
              <nav className="flex flex-col justify-center gap-2">
                {NAV_ITEMS.map((item) => (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      locale={locale as Locale}
                      onClick={onClose}
                      className="group/navitem font-heading set-text-headline1 leading-tight tracking-wide text-white opacity-80 hover:opacity-100 hover:text-orange transition-all duration-200 w-fit flex items-center gap-4 relative"
                    >
                      <span>{item.label}</span>

                      {/* Arrow icon — always rendered for Companies, visible on hover via CSS */}
                      {item.hasSubmenu && (
                        <span className="inline-flex items-center text-orange opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover/navitem:opacity-100 group-hover/navitem:translate-x-0">
                          <Icon__ArrowRight width={24} />
                        </span>
                      )}

                      <div
                        className={`absolute left-0 bottom-0 ${item.hasSubmenu ? "w-0 group-hover/navitem:w-full" : "w-0"} h-1 transition-all duration-300 bg-orange`}
                      />
                    </Link>

                    {item.hasSubmenu && (
                      <div className="pointer-events-none group-hover:pointer-events-auto flex flex-wrap gap-3 w-[200%] absolute left-full pl-10 top-[50%] translate-y-[-50%]">
                        {sortedCompanies.map((company, index) => (
                          <Link
                            key={company.slug}
                            href={`/company/${company.slug}`}
                            locale={locale as Locale}
                            onClick={onClose}
                            className="block opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
                            style={{ transitionDelay: `${index * 60}ms` }}
                          >
                            <div className="aspect-[118/83] w-[118px] overflow-hidden border border-white/30">
                              <img
                                src={company.thumbnail}
                                alt={company.name[locale]}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="order-1 md:order-2">
              <Icon__LogoLigoOffWhite />
              <div className="hidden md:block mt-4 md:mt-8 text-right tracking-[0.02em] leading-[1.625em]">
                We Deliver the Best
              </div>
            </div>
          </div>

          {/* BRAND LINE */}
          <BrandLine />
        </div>

        {/* BG BAR */}
        <div className="bg-primary-red h-[25%]">
          <div
            className={`h-4 bg-primary-blue ${isOpen ? "w-[50%]" : "w-0"} transition-all duration-1000 delay-200 ml-auto`}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
