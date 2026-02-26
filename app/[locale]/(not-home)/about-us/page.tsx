import ImageCover from "@/components/cover-images";
import LigoLetterValues from "@/components/ligo-letter-values";
import OurJourney from "@/components/our-journey";
import RecycledProcess from "@/components/recycle-process";
import { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page__AboutUs({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <section className="min-h-[120dvh] bg-sky-image text-white px-4 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 size-full flex items-end justify-start">
          <img
            className="w-full object-contain"
            alt="Ligo Building"
            src="/ligo-building.webp"
          />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-[102px]">
            <div>
              <h2 className="set-text-caption1">ABOUT US</h2>
              <div className="set-text-headline1 mt-14">
                A growing group driving innovation in the plastic industry
              </div>
            </div>
            <div className="space-y-14">
              <p className="max-w-[615px]">
                Ligo Group began its journey with the establishment of PT.
                Ligokriyasa Mandiri (LKM)in 1986. In its early operations, Ligo
                Group focused on plastic bag printing and cutting services. Over
                time, the Group expanded its production capacity by adding
                various machines to manufacture PP plastic bags.
              </p>
              <p className="max-w-[615px]">
                Over more than two decades, Ligo Group has grown into a rapidly
                expanding company and has become a benchmark of success within
                the plastic packaging industry. Driven by a commitment to
                sustainable growth, Ligo Group remains dedicated to delivering
                the best value to its customers and all stakeholders, both now
                and in the future.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 h-4 w-[65%] bg-gray-light" />
      </section>

      <section className="bg-gray-light px-4 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-7">
            <div>
              <h2 className="set-text-caption1">VISION</h2>
              <div className="set-text-headline1">
                To be the best company in its industry with excellent human
                capital.
              </div>
            </div>
            <div>
              <h2 className="set-text-caption1">MISSION</h2>
              <div className="mt-12 space-y-7">
                {[
                  "The company where people work and grow, offering job opportunities to the talented and competent ones, and deliver more career opportunities and a better life in the future.",
                  "The company where people work and deliver the best quality products to give the satisfaction to all customers.",
                  "The company where stakeholders become an integrated part, together reaching the best benefit and financial profit.",
                ].map((text, index) => (
                  <div key={index} className="flex items-start gap-7">
                    <div className="h-0.5 w-5 bg-primary-red" />
                    <div className="set-text-bodytext flex-1">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-blue text-white px-4 pt-[68px] pb-[182px]">
        <div className="max-w-7xl mx-auto">
          <div>
            <h2 className="set-text-caption1">VALUES</h2>
            <div className="set-text-headline1 mt-9">What we stand for</div>
            <div className="mt-[105px] overflow-x-hidden">
              <LigoLetterValues locale={locale as Locale} />
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-header">
        <div className="relative">
          <ImageCover
            images={[
              {
                src: "https://placehold.co/1920x600?text=BANNER%0AAbout%20Us",
                alt: "Banner ABOUT US",
              },
            ]}
          />

          <div className="absolute right-0 bottom-0 w-[50%] h-4 bg-gray-light" />
        </div>
      </div>

      <section className="bg-gray-light px-4 py-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-9 md:max-w-1/2">
            <h2 className="set-text-caption1">BUSINESS MODEL</h2>
            <div className="set-text-headline1 mt-9">
              A cycle that drives our group from raw materials to recycling.
            </div>
            <p className="mt-16 max-w-lg">
              Our business model operates as an integrated cycle, transforming
              raw materials through advanced manufacturing into products that
              support everyday needs. After use, these materials are
              systematically recovered and recycled, creating a continuous flow
              that enhances production efficiency and reinforces our long-term
              commitment to sustainability.
            </p>
          </div>
          <div className="mt-16 md:mt-20">
            <RecycledProcess locale={locale as Locale} />
          </div>
        </div>
      </section>

      {/*OUR JOURNEY SECTION*/}
      <OurJourney locale={locale as Locale} />

      <div>
        <ImageCover
          images={[
            {
              src: "https://placehold.co/1920x600?text=BANNER%0AAbout%20Us",
              alt: "Banner ABOUT US",
            },
          ]}
        />
      </div>
    </>
  );
}
