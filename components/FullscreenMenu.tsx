"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import type { TCompanyListItem } from "@/service/company";
import type { Locale } from "@/i18n/routing";

import { Link } from "@/i18n/navigation";
import { BrandLine } from "./footer";
import { trackNavClick } from "@/lib/analytics";
import Icon__LogoLigoOffWhite from "./icon-logo-ligo-off-white";
import Icon__ArrowRight from "./icon-arrow-right";

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
  const pathname = usePathname();
  const t = useTranslations("Nav");

  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);

  // Derive effective submenu state: auto-collapse when main menu is closed.
  // This avoids setState-in-effect or ref-during-render anti-patterns.
  const isCompanyMenuOpen = isOpen && companyMenuOpen;

  const sortedCompanies = useMemo(
    () => [...companies].sort((a, b) => a.order - b.order),
    [companies],
  );

  type NavItem = {
    label: string;
    href?: string;
    hasSubmenu?: boolean;
  };

  const NAV_ITEMS: NavItem[] = [
    { label: t("home"), href: "/" },
    { label: t("aboutUs"), href: "/about-us" },
    { label: t("companies"), hasSubmenu: true },
    { label: t("articles"), href: "/article" },
    { label: t("contact"), href: "/contact" },
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
      <div className="relative h-full flex flex-col justify-start md:justify-end">
        {/* BG BAR */}
        <div className="bg-primary-red h-[17%] sm:h-[25%] absolute left-0 bottom-0 w-full">
          <div
            className={`h-4 bg-primary-blue ${isOpen ? "w-[65%]" : "w-0"} transition-all duration-1000 delay-200 ml-auto`}
          />
          {/* BrandLine — mobile only, sits inside the red zone */}
          <div className="md:hidden absolute bottom-0 left-0 right-0 px-10 pb-8 flex items-end">
            <BrandLine />
          </div>
        </div>

        {/* Menu set container */}
        <div className="relative pb-0 md:pb-10 p-10 w-full h-[83%] sm:h-[75%] md:h-full max-w-7xl mx-auto overflow-hidden md:overflow-y-auto md:max-h-none hide-scrollbar flex flex-col md:block">
          {/* Close button */}
          {closeOverlay && (
            <div className="absolute top-2 right-2 md:relative flex justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="text-white cursor-pointer p-2 hover:opacity-70 transition-opacity duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-9"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}

          {/* CONTENT AREA */}
          <div className="mt-3 md:mt-[53px] flex flex-col md:flex-row md:justify-between gap-10 overflow-y-auto md:overflow-visible hide-scrollbar flex-1 md:flex-none">
            <div className="flex order-2 gap-10 md:gap-16">
              {/* Nav links */}
              <nav className="flex flex-col justify-center gap-6">
                {NAV_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="relative group last:pb-4 md:last:pb-0"
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        locale={locale as Locale}
                        onClick={() => {
                          trackNavClick(item.label, pathname);
                          onClose();
                        }}
                        className="group/navitem font-heading set-text-headline1 leading-tight tracking-wide text-white transition-all duration-200 w-fit flex items-center gap-4 relative"
                      >
                        <span>{item.label}</span>

                        <div
                          className={`absolute left-0 bottom-0 w-0 group-hover/navitem:w-full h-1 transition-all duration-300 bg-primary-red`}
                        />
                      </Link>
                    ) : (
                      /* Companies item: button on mobile (tap-to-toggle), div on desktop (hover) */
                      <>
                        {/* Mobile trigger — only visible below md */}
                        <button
                          type="button"
                          onClick={() => setCompanyMenuOpen((prev) => !prev)}
                          aria-expanded={isCompanyMenuOpen}
                          aria-controls="mobile-company-submenu"
                          className="md:hidden group/navitem font-heading set-text-headline1 leading-tight tracking-wide text-white transition-all duration-200 w-fit flex items-center gap-4 relative"
                        >
                          <span>{item.label}</span>

                          {item.hasSubmenu && (
                            <span
                              className={`inline-flex items-center text-white transition-transform duration-300 ${
                                isCompanyMenuOpen ? "rotate-90" : "rotate-0"
                              }`}
                            >
                              <Icon__ArrowRight width={22} />
                            </span>
                          )}

                          <div className="absolute left-0 bottom-0 w-0 group-hover/navitem:w-full h-1 transition-all duration-300 bg-primary-red" />
                        </button>

                        {/* Desktop trigger — only visible from md up, hover-based */}
                        <div className="hidden md:flex group/navitem font-heading set-text-headline1 leading-tight tracking-wide text-white transition-all duration-200 w-fit items-center gap-4 relative cursor-default">
                          <span>{item.label}</span>

                          {item.hasSubmenu && (
                            <span className="inline-flex items-center text-white">
                              <Icon__ArrowRight width={22} />
                            </span>
                          )}

                          <div className="absolute left-0 bottom-0 w-0 group-hover/navitem:w-full h-1 transition-all duration-300 bg-primary-red" />
                        </div>
                      </>
                    )}

                    {/* Mobile submenu — slide down below "Companies" on tap */}
                    {item.hasSubmenu && (
                      <div
                        id="mobile-company-submenu"
                        className="md:hidden overflow-hidden transition-all duration-400 ease-in-out"
                        style={{
                          maxHeight: isCompanyMenuOpen
                            ? `${sortedCompanies.length * 120}px`
                            : "0px",
                          opacity: isCompanyMenuOpen ? 1 : 0,
                          WebkitTransition:
                            "max-height 0.4s ease-in-out, opacity 0.3s ease-in-out",
                          transition:
                            "max-height 0.4s ease-in-out, opacity 0.3s ease-in-out",
                        }}
                      >
                        <div className="flex flex-wrap gap-3 pt-5">
                          {sortedCompanies.map((company, index) => (
                            <Link
                              key={company.slug}
                              href={`/company/${company.slug}`}
                              locale={locale as Locale}
                              onClick={() => {
                                trackNavClick(
                                  `${t("companies")} > ${company.name[locale]}`,
                                  pathname,
                                );
                                onClose();
                              }}
                              className="block relative group/logo"
                              style={{
                                opacity: isCompanyMenuOpen ? 1 : 0,
                                transform: isCompanyMenuOpen
                                  ? "translateY(0)"
                                  : "translateY(8px)",
                                WebkitTransition: `opacity 0.3s ease-out ${index * 60}ms, -webkit-transform 0.3s ease-out ${index * 60}ms`,
                                transition: `opacity 0.3s ease-out ${index * 60}ms, transform 0.3s ease-out ${index * 60}ms`,
                              }}
                            >
                              <div className="aspect-[118/83] w-[90px] bg-white p-3">
                                {company.logo && (
                                  <img
                                    src={company.logo}
                                    alt={company.name[locale]}
                                    className="w-full h-full object-contain group-hover/logo:scale-110 transition-all duration-200"
                                  />
                                )}
                              </div>
                              <div className="h-1.5 w-3/5 bg-white -mt-px" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Desktop submenu — absolute positioned to the right on hover */}
                    {item.hasSubmenu && (
                      <div className="hidden md:flex pointer-events-none group-hover:pointer-events-auto flex-wrap gap-3 w-[210%] lg:w-[230%] absolute left-full pl-6 xl:pl-10 top-[50%] translate-y-[-50%]">
                        {sortedCompanies.map((company, index) => (
                          <Link
                            key={company.slug}
                            href={`/company/${company.slug}`}
                            locale={locale as Locale}
                            onClick={() => {
                              trackNavClick(
                                `${t("companies")} > ${company.name[locale]}`,
                                pathname,
                              );
                              onClose();
                            }}
                            className="block opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out relative group/logo"
                            style={{ transitionDelay: `${index * 60}ms` }}
                          >
                            <div className="aspect-[118/83] w-[118px] lg:w-[129px] xl:w-[139px] bg-white p-4 lg:p-6">
                              {company.logo && (
                                <img
                                  src={company.logo}
                                  alt={company.name[locale]}
                                  className="w-full h-full object-contain group-hover/logo:scale-110 transition-all duration-200"
                                />
                              )}
                            </div>
                            <div className="h-1.5 w-3/5 bg-white -mt-px" />
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
                {t("tagline")}
              </div>
            </div>
          </div>

          {/* BRAND LINE — desktop only; mobile version lives inside the red BG BAR */}
          <div className="hidden md:block mt-[62px] md:mt-[86px]">
            <BrandLine />
          </div>
        </div>

        {/* OLD BG BAR */}
      </div>
    </div>,
    document.body,
  );
}
