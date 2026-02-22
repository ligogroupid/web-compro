import { Locale } from "@/i18n/routing";

function BlueSection() {
  return (
    <div className="bg-primary-blue blue grid grid-cols-2 relative">
      {/*TEXT PART*/}
      <div className="">
        <div className=" text-white py-8 px-11">
          <div className="text-[50px]">40+</div>
          <div className="text-sm leading-[1.5em] tracking-[0.02em] mt-9">
            YEARS OF EXPERIENCE
          </div>
        </div>
        <div className="bg-white h-px" />
        <div className=" text-orange py-8 px-11">
          <div className="text-[50px]">800+</div>
          <div className="text-sm leading-[1.5em] tracking-[0.02em] mt-9">
            EMPLOYMENT OPPORTUNITIES CREATED
          </div>
        </div>
      </div>
      {/*IMAGE PART*/}
      <div className="relative">
        <img
          alt="ligo-group-manufacturing-person"
          src="/manufacturing-person.webp"
          className="size-full object-cover"
        />
      </div>
      <div className="w-1/4 h-4 bg-primary-blue absolute left-0 -bottom-4" />
    </div>
  );
}

function LightSection() {
  return (
    <div>
      <div className="bg-gray-light text-orange py-8 px-11 border-b border-b-[#7689C3]">
        <div className="text-[50px]">114,000+</div>
        <div className="text-sm leading-[1.5em] tracking-[0.02em] mt-9">
          METER² OF FACTORY AREA
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="bg-white text-orange py-8 px-11">
          <div className="text-[50px]">350+</div>
          <div className="text-sm leading-[1.5em] tracking-[0.02em] mt-9">
            TONS OF MATERIALS RECYCLED EACH YEAR
          </div>
        </div>
        <div className="bg-primary-red text-white py-8 px-11 relative">
          <div className="absolute bottom-0 right-0 w-[120px] aspect-square">
            <img
              alt="truck-delivery"
              src="/truck-delivery.webp"
              className="size-full object-contain"
            />
          </div>
          <div className="text-[50px] relative">25+</div>
          <div className="text-sm leading-[1.5em] tracking-[0.02em] mt-9 max-w-1/3 relative">
            CITIES OF DISTRIBUTION NETWORK
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Achivements({ locale }: { locale: Locale }) {
  return (
    <section className="px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="set-text-headline2">Our achievements</h2>
        <div className="mt-14">
          <div className="grid md:grid-cols-2">
            <BlueSection />
            <LightSection />
          </div>
        </div>
      </div>
    </section>
  );
}
