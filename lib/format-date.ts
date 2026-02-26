import { format } from "date-fns";
import { id as idLocale, enUS } from "date-fns/locale";

import type { Locale } from "@/i18n/routing";

const DATE_FNS_LOCALES: Record<Locale, typeof idLocale> = {
  id: idLocale,
  en: enUS,
};

/**
 * Format an ISO 8601 datetime string for article display.
 * Output example: "20 FEB 2026"
 */
export function formatArticleDate(isoString: string, locale: Locale): string {
  return format(new Date(isoString), "d MMM yyyy", {
    locale: DATE_FNS_LOCALES[locale],
  }).toUpperCase();
}
