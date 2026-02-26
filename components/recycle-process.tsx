import { Locale } from "@/i18n/routing";

export default function RecycledProcess({ locale }: { locale: Locale }) {
  return (
    <div className="flex justify-center gap-3">
      {/*GRID 1*/}
      <div>
        {/*STEP 1*/}
        <div className="flex items-start gap-3">
          <div className="text-[11px] text-primary-red font-bold">1</div>
          <div className="max-w-[120px]">
            <div className="text-lg font-body leading-[1em] font-bold">
              Raw Materials
            </div>
            <ul className="text-sm mt-[22px]">
              <li>
                <span className="text-primary-red">-</span> Pure Resin
              </li>
              <li>
                <span className="text-primary-red">-</span> Recycled Resin
              </li>
            </ul>
          </div>
        </div>
        {/*STEP 6*/}
        <div className="flex items-start gap-3">
          <div className="text-[11px] text-primary-red font-bold">6</div>
          <div className="max-w-[120px]">
            <div className="text-lg font-body leading-[1em] font-bold">
              Recycling Process
            </div>
            <ul className="text-sm mt-[22px]">
              <li>
                <span className="text-primary-red">-</span> Recycled Resin
              </li>
            </ul>
          </div>
        </div>
        {/*STEP 5*/}
        <div className="flex items-start gap-3">
          <div className="text-[11px] text-primary-red font-bold">5</div>
          <div className="max-w-[120px]">
            <div className="text-lg font-body leading-[1em] font-bold">
              Plastic Waste
            </div>
          </div>
        </div>
      </div>
      {/*GRID 2*/}
      <div>
        <div className="size-full relative">
          <img
            className="size-full object-contain"
            alt="LIGO Group Recycle Process"
            src="/recycle-process.webp"
          />
        </div>
      </div>
      {/*GRID 3*/}
      <div>
        {/*STEP 2*/}
        <div className="flex items-start gap-3">
          <div className="text-[11px] text-primary-red font-bold">2</div>
          <div className="max-w-[180px]">
            <div className="text-lg font-body leading-[1em] font-bold">
              Manufacturing Process
            </div>
            <ul className="text-sm mt-[22px]">
              <li>
                <span className="text-primary-red">-</span> Blowing Process
              </li>
              <li>
                <span className="text-primary-red">-</span> Weaving Process
              </li>
              <li>
                <span className="text-primary-red">-</span> Thermoforming
                Process
              </li>
            </ul>
          </div>
        </div>
        {/*STEP 3*/}
        <div className="flex items-start gap-3">
          <div className="text-[11px] text-primary-red font-bold">3</div>
          <div className="max-w-[120px]">
            <div className="text-lg font-body leading-[1em] font-bold">
              Final Products
            </div>
            <ul className="text-sm mt-[22px]">
              <li>
                <span className="text-primary-red">-</span> Plastic Bags
              </li>
              <li>
                <span className="text-primary-red">-</span> Tarpaulin
              </li>
              <li>
                <span className="text-primary-red">-</span> Cups
              </li>
              <li>
                <span className="text-primary-red">-</span> Plastic Sacks
              </li>
            </ul>
          </div>
        </div>
        {/*STEP 4*/}
        <div className="flex items-start gap-3">
          <div className="text-[11px] text-primary-red font-bold">4</div>
          <div className="max-w-[120px]">
            <div className="text-lg font-body leading-[1em] font-bold">
              Consumption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
