"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { type Locale } from "@/i18n/routing";

const LOCALES: Locale[] = ["id", "en"];

export default function LangSwitcher() {
  const { locale } = useParams<{ locale: Locale }>();
  const pathname = usePathname();
  const router = useRouter();

  function toggle() {
    const next = locale === "en" ? "id" : "en";
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center bg-primary-blue cursor-pointer ring-2 ring-transparent hover:ring-primary-red text-white py-3 px-2.5 text-[11px]"
    >
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 font-bold">/</span>}
          <span className={l === locale ? "font-bold" : "font-normal"}>
            {l.toUpperCase()}
          </span>
        </span>
      ))}
    </button>
  );
}
