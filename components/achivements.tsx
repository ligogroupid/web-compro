import { getTranslations } from "next-intl/server";

import CountUpNumber from "@/components/count-up-number";

type AchievementLabels = {
  yearsExperience: string;
  employmentOpportunities: string;
  factoryArea: string;
  materialsRecycled: string;
  citiesDistribution: string;
};

function BlueSection({ labels }: { labels: AchievementLabels }) {
  return (
    <div className="bg-primary-blue blue grid grid-cols-2 relative">
      {/*TEXT PART*/}
      <div className="">
        <div className=" text-white py-4 px-4 md:py-8 md:px-11">
          <div className="text-[2.35rem] md:text-[3.125rem]">
            <CountUpNumber end={40} suffix="+" />
          </div>
          <div className="text-[0.6785rem] md:text-sm leading-[1.5em] tracking-[0.02em] mt-5 md:mt-9">
            {labels.yearsExperience}
          </div>
        </div>
        <div className="bg-white h-px" />
        <div className=" text-white py-4 px-4 md:py-8 md:px-11">
          <div className="text-[2.35rem] md:text-[3.125rem]">
            <CountUpNumber end={3000} suffix="+" noDelimiter />
          </div>
          <div className="text-[0.6785rem] md:text-sm leading-[1.5em] tracking-[0.02em] mt-5 md:mt-9">
            {labels.employmentOpportunities}
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

function LightSection({ labels }: { labels: AchievementLabels }) {
  return (
    <div className="overflow-x-hidden">
      <div className="bg-gray-light py-4 px-4 md:py-8 md:px-11 border-b border-b-[#7689C3] relative">
        <div className="w-[130px] h-[150px] md:w-[190px] md:h-[213px] absolute top-4 right-0 -rotate-[25deg] scale-[130%] z-[1]">
          <img alt="Plastic Cup" src="/plastic-cup.webp" />
        </div>
        <div className="text-[2.35rem] md:text-[3.125rem]">
          <CountUpNumber end={113500} suffix="+" />
        </div>
        <div className="text-[0.6785rem] md:text-sm leading-[1.5em] tracking-[0.02em] mt-5 md:mt-9">
          {labels.factoryArea}
        </div>
      </div>
      <div className="grid grid-cols-2">
        {/*4th Section*/}
        <div className="bg-white py-4 px-4 md:py-8 md:px-11">
          <div className="text-[2.35rem] md:text-[3.125rem]">
            <CountUpNumber end={350} suffix="+" />
          </div>
          <div className="text-[0.6785rem] md:text-sm leading-[1.5em] tracking-[0.02em] mt-5 md:mt-9">
            {labels.materialsRecycled}
          </div>
        </div>
        {/*5th Section*/}
        <div className="bg-primary-red text-white py-4 px-4 md:py-8 md:px-11 relative">
          <div className="absolute bottom-10 md:bottom-0 right-0 w-[100px] md:w-[120px] aspect-square">
            <img
              alt="truck-delivery"
              src="/truck-delivery.webp"
              className="size-full object-contain"
            />
          </div>
          <div className="text-[2.35rem] md:text-[3.125rem] relative">
            <CountUpNumber end={25} suffix="+" />
          </div>
          <div className="text-[0.6785rem] md:text-sm leading-[1.5em] tracking-[0.02em] mt-5 md:mt-9 md:max-w-1/3 relative">
            {labels.citiesDistribution}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Achivements() {
  const t = await getTranslations("Achievements");

  const labels: AchievementLabels = {
    yearsExperience: t("yearsExperience"),
    employmentOpportunities: t("employmentOpportunities"),
    factoryArea: t("factoryArea"),
    materialsRecycled: t("materialsRecycled"),
    citiesDistribution: t("citiesDistribution"),
  };

  return (
    <section className="px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="set-text-headline2">{t("headline")}</h2>
        <div className="mt-14">
          <div className="grid md:grid-cols-2">
            <BlueSection labels={labels} />
            <LightSection labels={labels} />
          </div>
        </div>
      </div>
    </section>
  );
}
