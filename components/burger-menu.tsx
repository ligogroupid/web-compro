"use client";

import { useEffect, useState } from "react";

import type { TCompanyListItem } from "@/service/company";

import FullscreenMenu from "./FullscreenMenu";

const TRANSITION_DURATION = 300;

type Props = {
  closeOverlay?: boolean;
  companies?: TCompanyListItem[];
};

export default function BurgerMenu({
  closeOverlay = true,
  companies = [],
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
      {/* Burger button */}
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

      {/* Fullscreen menu overlay */}
      <FullscreenMenu
        isOpen={isOpen}
        isVisible={isVisible}
        closeOverlay={closeOverlay}
        companies={companies}
        onClose={closeMenu}
      />
    </>
  );
}
