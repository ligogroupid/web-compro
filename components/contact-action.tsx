"use client";

import { useEffect, useRef, useState } from "react";

import { trackExternalLink } from "@/lib/analytics";

type Props = {
  type: "phone" | "email";
  label: string;
  prefix: string;
  value: string;
};

function deriveLink(type: "phone" | "email", value: string): string {
  if (type === "phone") {
    return `tel:${value.replace(/[\s\-()]/g, "")}`;
  }
  return `mailto:${value}`;
}

export default function ContactAction({ type, label, prefix, value }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function closePopup() {
    setExiting(true);
    setTimeout(() => {
      setOpen(false);
      setExiting(false);
      setCopied(false);
    }, 180);
  }

  /* Close popup on outside click */
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closePopup();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  /* Close popup on Escape */
  useEffect(() => {
    if (!open) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") closePopup();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => {
        closePopup();
      }, 1200);
    } catch {
      /* clipboard API not available */
    }
  }

  function handleContact() {
    trackExternalLink(deriveLink(type, value), type, "footer");
    window.location.href = deriveLink(type, value);
    closePopup();
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger area */}
      <button
        type="button"
        onClick={() => {
          if (open) {
            closePopup();
          } else {
            setOpen(true);
            setCopied(false);
          }
        }}
        className="cursor-pointer text-left group"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div>{label}</div>
        <div className="mt-1 flex gap-2.5 text-xl">
          <div>{prefix}</div>
          <div className="font-bold relative">
            {value}
            {/* Underline accent — reveals on hover */}
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary-red group-hover:w-full transition-all duration-500 ease-out" />
          </div>
        </div>
      </button>

      {/* Popup action bar — positioned above */}
      {open && (
        <div
          className={`absolute bottom-full left-0 mb-3 z-50 ${exiting ? "contact-popup-exit" : "contact-popup-enter"}`}
          role="menu"
          aria-label={`${type} actions`}
        >
          {/* Tooltip arrow */}
          <div className="absolute -bottom-[6px] left-6 w-3 h-3 bg-white rotate-45" />

          <div className="relative flex overflow-hidden shadow-[0_8px_32px_rgba(28,54,135,0.18)]">
            {/* Contact button */}
            <button
              type="button"
              role="menuitem"
              onClick={handleContact}
              className="relative flex items-center gap-2.5 bg-white text-primary-blue pl-5 pr-4 py-3 text-sm font-bold tracking-wide cursor-pointer whitespace-nowrap group/btn transition-colors duration-200 hover:bg-gray-light"
            >
              {type === "phone" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover/btn:scale-110"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover/btn:scale-110"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              )}
              {type === "phone" ? "Call" : "Email"}
            </button>

            {/* Divider */}
            <div className="w-px bg-primary-blue/10 my-2" />

            {/* Copy button */}
            <button
              type="button"
              role="menuitem"
              onClick={handleCopy}
              className={`relative flex items-center gap-2.5 bg-white pl-4 pr-5 py-3 text-sm font-bold tracking-wide cursor-pointer whitespace-nowrap transition-all duration-200 ${copied ? "text-primary-red" : "text-primary-blue hover:bg-gray-light"}`}
            >
              <span className="relative w-[15px] h-[15px]">
                {/* Copy icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`absolute inset-0 transition-all duration-300 ${copied ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                {/* Check icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`absolute inset-0 transition-all duration-300 ${copied ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
