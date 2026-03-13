import type { Locale } from "@/i18n/routing";

import { getTranslations } from "next-intl/server";
import { getContacts } from "@/service/contact";
import ContactAction from "./contact-action";
import Icon__LogoLigo from "./icon-logo-ligo";
import Link from "next/link";

type Props = {
  locale: Locale;
};

export default async function Footer({ locale }: Props) {
  const [t, contacts] = await Promise.all([
    getTranslations("Footer"),
    getContacts(),
  ]);

  return (
    <footer className="">
      <div className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/*LEFT SECTION*/}
            <div className="flex flex-col justify-between">
              <div className="md:w-[364px]">
                <Icon__LogoLigo />
              </div>
              <div className="mt-6 md:mt-[94px]">
                <div className="text-caption2 uppercase font-bold hidden md:block">
                  LIGO GROUP
                </div>
                <div className="font-bold mt-[34px]">
                  {contacts.address.label[locale]}
                </div>
                <div
                  className="set-text-bodytext md:w-[366px] mt-[22px]"
                  dangerouslySetInnerHTML={{
                    __html: contacts.address.value,
                  }}
                />
              </div>
            </div>

            {/*RIGHT SECTION*/}
            <div className="flex flex-col justify-between">
              <div className="max-w-2xl">
                <div className="bg-primary-blue text-white py-10 lg:py-6 px-10">
                  <div className="set-text-headline2 font-heading max-w-sm">
                    {t("ctaText")}
                  </div>
                  <div className="pt-10 lg:pt-20 flex flex-col xl:flex-row gap-4 xl:gap-9 xl:items-center">
                    <div className="w-full">
                      <ContactAction
                        type="phone"
                        label={contacts.phone.label[locale]}
                        prefix="T."
                        value={contacts.phone.value}
                      />
                    </div>
                    <div className="h-px w-full xl:h-9 xl:w-px bg-white" />
                    <div className="w-full">
                      <ContactAction
                        type="email"
                        label={contacts.email.label[locale]}
                        prefix="E."
                        value={contacts.email.value}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[46%] bg-primary-blue h-2"></div>
              </div>

              <div className="flex justify-end mt-20 md:mb-4">
                <BrandLine />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function BrandLine() {
  const year = new Date().getFullYear();
  return (
    <div className="font-body font-medium text-[9px] tracking-[0.2em]">
      COPYRIGHT {year} &copy; ALL RIGHTS RESERVED • DESIGNED BY&nbsp;
      <Link
        href="https://designatastudio.com"
        className="hover:underline"
        target="_blank"
      >
        DESIGNATA STUDIO
      </Link>
    </div>
  );
}
