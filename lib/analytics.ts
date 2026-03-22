// ============================================================
// Analytics Utility — Type-safe event tracking for GA4
// ============================================================
// Copy file ini ke project Next.js manapun.
// Pastikan NEXT_PUBLIC_GA_MEASUREMENT_ID ada di environment.
// ============================================================

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Core function — fire any GA4 event.
 * Di development: log ke console.
 * Di production tanpa GA: silently no-op.
 */
export function trackEvent(eventName: string, params?: EventParams): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, params ?? "");
    return;
  }

  window.gtag?.("event", eventName, params);
}

// ============================================================
// Convenience functions — semantic wrappers
// ============================================================

/** Track CTA button clicks */
export function trackCTA(label: string, location: string): void {
  trackEvent("cta_click", {
    cta_label: label,
    cta_location: location,
  });
}

/** Track navigation menu clicks */
export function trackNavClick(menuItem: string, from: string): void {
  trackEvent("nav_click", {
    menu_item: menuItem,
    from_page: from,
  });
}

/** Track external link clicks (WhatsApp, email, maps, etc.) */
export function trackExternalLink(
  url: string,
  linkType: string,
  location: string
): void {
  trackEvent("external_link_click", {
    link_url: url,
    link_type: linkType, // "whatsapp" | "email" | "phone" | "maps" | "social"
    click_location: location,
  });
}

/** Track form submissions */
export function trackFormSubmit(formName: string, success: boolean): void {
  trackEvent("form_submit", {
    form_name: formName,
    success: success,
  });
}

/** Track content engagement (article read, product view, etc.) */
export function trackContentView(
  contentType: string,
  contentId: string,
  contentTitle: string
): void {
  trackEvent("content_view", {
    content_type: contentType, // "article" | "product" | "faq"
    content_id: contentId,
    content_title: contentTitle,
  });
}

/** Track scroll depth milestones */
export function trackScrollDepth(depth: number, page: string): void {
  trackEvent("scroll_depth", {
    depth_percentage: depth, // 25, 50, 75, 100
    page_path: page,
  });
}

/** Track file downloads (PDF, catalog, etc.) */
export function trackDownload(fileName: string, fileType: string): void {
  trackEvent("file_download", {
    file_name: fileName,
    file_type: fileType,
  });
}

/** Track search interactions */
export function trackSearch(query: string, resultCount: number): void {
  trackEvent("search", {
    search_term: query,
    results_count: resultCount,
  });
}
