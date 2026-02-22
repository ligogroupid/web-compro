"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";

import { Link } from "@/i18n/navigation";
import { BrandLine } from "./footer";
import Icon__LogoLigoOffWhite from "./icon-logo-ligo-off-white";
import { Locale } from "@/i18n/routing";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Companies", href: "/company" },
  { label: "Articles", href: "/article" },
  { label: "Contact", href: "/contact" },
];

const TRANSITION_DURATION = 300;

export default function BurgerMenu({
  closeOverlay = true,
}: {
  closeOverlay?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const params = useParams();
  const locale = params.locale as Locale;

  function openMenu() {
    setIsVisible(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    });
  }

  function closeMenu() {
    setIsOpen(false);
    setTimeout(() => {
      setIsVisible(false);
    }, TRANSITION_DURATION);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Burger button — posisi asli, z di atas portal, icon animate burger↔X */}
      <button
        type="button"
        onClick={isOpen ? closeMenu : openMenu}
        className="bg-primary-red flex flex-col justify-center gap-1.5 group p-2.5 aspect-square cursor-pointer ring-2 ring-transparent hover:ring-primary-blue relative z-[9999]"
        title="Menu Button"
        aria-expanded={isOpen}
        aria-controls="fullscreen-menu"
      >
        <div
          className={`bg-white h-0.5 w-7 transition-all duration-300 origin-center ${
            isOpen ? "rotate-45 translate-y-[8px]" : "w-[45%] group-hover:w-7"
          }`}
        />
        <div
          className={`bg-white h-0.5 w-7 transition-all duration-300 ${
            isOpen ? "opacity-0" : "w-[65%] group-hover:w-7"
          }`}
        />
        <div
          className={`bg-white h-0.5 w-7 transition-all duration-300 origin-center ${
            isOpen ? "-rotate-45 -translate-y-[8px]" : "group-hover:w-7"
          }`}
        />
      </button>

      {/* Fullscreen menu overlay — via portal ke document.body, z di bawah button */}
      {isVisible &&
        createPortal(
          <div
            id="fullscreen-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={`bg-primary-blue fixed inset-0 z-[9998] text-white transition-all duration-300 ease-in-out ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0"
            }`}
          >
            <div className="relative h-full flex flex-col justify-end">
              {/* Menu set container */}
              <div className="p-10 w-full h-full max-w-7xl mx-auto">
                {/* Tombol close X di dalam dialog */}
                {closeOverlay && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeMenu}
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

                {/*CONTENT AREA*/}
                <div className="mt-10 md:mt-[53px] flex flex-col md:flex-row md:justify-between gap-10">
                  {/* Nav links */}
                  <nav className="order-2 md:order-1 flex flex-col justify-center gap-2">
                    {NAV_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        locale={locale as Locale}
                        onClick={closeMenu}
                        className="font-heading set-text-headline1 leading-tight tracking-wide text-white opacity-80 hover:opacity-100 hover:text-orange transition-all duration-200 w-fit"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="order-1 md:order-2">
                    <Icon__LogoLigoOffWhite />
                    <div className="hidden md:block mt-4 md:mt-8 text-right tracking-[0.02em] leading-[1.625em]">
                      We Deliver the Best
                    </div>
                  </div>
                </div>

                {/*BRAND LINE*/}
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
        )}
    </>
  );
}
