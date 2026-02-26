export default function Loading__Article() {
  return (
    <section className="bg-white px-4 md:px-8">
      <div className="mx-auto max-w-7xl py-16 md:py-[105px]">
        {/* Section header skeleton */}
        <div className="mb-12 max-w-[494px] md:mb-16">
          <div className="article-skeleton h-9 w-[90%] rounded md:h-[56px]" />
          <div className="article-skeleton mt-3 h-9 w-[60%] rounded md:h-[56px]" />
          <div className="mt-5 h-[3px] w-16 bg-primary-red" />
        </div>

        {/* Article grid skeleton — matches page layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left — hero card skeleton */}
          <div>
            <div className="article-skeleton aspect-[16/9] w-full rounded" />
            <div className="pt-5">
              <div className="article-skeleton mb-3 h-3 w-24 rounded" />
              <div className="article-skeleton mb-2 h-5 w-[95%] rounded" />
              <div className="article-skeleton mb-2 h-5 w-[75%] rounded" />
              <div className="article-skeleton mt-4 size-8 rounded" />
            </div>
          </div>

          {/* Right — 3 compact card skeletons */}
          <div className="flex flex-col gap-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="grid grid-cols-[120px_1fr] gap-4 border-b border-primary-blue/8 pb-5 last:border-b-0 last:pb-0 sm:grid-cols-[140px_1fr] lg:grid-cols-[160px_1fr]"
              >
                <div className="article-skeleton aspect-square w-full rounded" />
                <div className="flex flex-col justify-between py-0.5">
                  <div className="article-skeleton h-3 w-20 rounded" />
                  <div>
                    <div className="article-skeleton mt-1.5 mb-1.5 h-4 w-[90%] rounded" />
                    <div className="article-skeleton h-4 w-[60%] rounded" />
                  </div>
                  <div className="article-skeleton mt-2 size-6 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination skeleton */}
        <div className="mt-14 md:mt-20">
          <div className="mb-8 h-px w-full bg-primary-blue/10" />
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="article-skeleton size-10 rounded" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
