"use client";

import { Link, usePathname } from "@/i18n/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function ArticlePagination({ currentPage, totalPages }: Props) {
  const pathname = usePathname();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show limited page numbers with ellipsis for large sets
  const getVisiblePages = (): (number | "ellipsis")[] => {
    if (totalPages <= 5) return pages;

    const visible: (number | "ellipsis")[] = [];

    if (currentPage <= 3) {
      visible.push(1, 2, 3, 4, "ellipsis", totalPages);
    } else if (currentPage >= totalPages - 2) {
      visible.push(
        1,
        "ellipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      visible.push(
        1,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        totalPages,
      );
    }

    return visible;
  };

  const buildHref = (page: number) => {
    if (page === 1) return pathname;
    return `${pathname}?page=${page}`;
  };

  const visiblePages = getVisiblePages();
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      className="article-card-reveal flex items-center gap-1"
      style={{ "--reveal-delay": "600ms" } as React.CSSProperties}
      aria-label="Article pagination"
    >
      {/* Previous arrow */}
      {hasPrev ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="flex size-10 items-center justify-center text-primary-blue transition-colors duration-200 hover:bg-gray-light"
          aria-label="Previous page"
          scroll={true}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="rotate-180"
          >
            <path
              d="M1 5h8M5.5 1L9 5l-3.5 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      ) : (
        <div className="flex size-10 items-center justify-center text-primary-blue/20">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="rotate-180"
          >
            <path
              d="M1 5h8M5.5 1L9 5l-3.5 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Page numbers */}
      {visiblePages.map((page, idx) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="flex size-10 items-center justify-center font-body text-sm tracking-wide text-primary-blue/30"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <Link
            key={page}
            href={buildHref(page)}
            scroll={true}
            className={`flex size-10 items-center justify-center font-body text-sm font-medium tracking-wide transition-all duration-200 ${
              isActive
                ? "bg-primary-blue text-white"
                : "text-primary-blue hover:bg-gray-light"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </Link>
        );
      })}

      {/* Next arrow */}
      {hasNext ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="flex size-10 items-center justify-center text-primary-blue transition-colors duration-200 hover:bg-gray-light"
          aria-label="Next page"
          scroll={true}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M1 5h8M5.5 1L9 5l-3.5 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      ) : (
        <div className="flex size-10 items-center justify-center text-primary-blue/20">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M1 5h8M5.5 1L9 5l-3.5 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </nav>
  );
}
