import type { Locale } from "@/i18n/routing";

import { getContacts } from "@/service/contact";
import Icon__LogoLigo from "./icon-logo-ligo";

type Props = {
  locale: Locale;
};

/** CTA text — the only remaining locale-specific static text. */
const ctaText: Record<Locale, string> = {
  en: "Feel free to contact us for more details.",
  id: "Silakan hubungi kami untuk informasi lebih lanjut.",
};

/**
 * Derive a clickable link from a contact value.
 * - Phone numbers → tel: link (strip spaces/dashes)
 * - Email addresses → mailto: link
 */
function deriveLink(type: "phone" | "email", value: string): string {
  if (type === "phone") {
    return `tel:${value.replace(/[\s\-()]/g, "")}`;
  }
  return `mailto:${value}`;
}

export default async function Footer({ locale }: Props) {
  const contacts = await getContacts();

  return (
    <footer className="">
      <div className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/*LEFT SECTION*/}
            <div>
              <div className="w-[364px]">
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
                  className="set-text-bodytext w-[366px] mt-[22px]"
                  dangerouslySetInnerHTML={{
                    __html: contacts.address.value,
                  }}
                />
              </div>
            </div>

            {/*RIGHT SECTION*/}
            <div className="flex flex-col md:items-end">
              <div className="max-w-lg">
                <div className="bg-primary-blue text-white py-6 px-8">
                  <div className="set-text-heading3 font-heading max-w-sm">
                    {ctaText[locale]}
                  </div>
                  <div className="pt-10 flex flex-col md:flex-row gap-4 md:gap-9 md:items-center">
                    <a
                      href={deriveLink("phone", contacts.phone.value)}
                      className="group"
                    >
                      <div>{contacts.phone.label[locale]}</div>
                      <div className="mt-1 flex gap-2.5">
                        <div>T.</div>
                        <div className="font-bold">{contacts.phone.value}</div>
                      </div>
                    </a>
                    <div className="h-px w-9 md:h-9 md:w-px bg-white" />
                    <a
                      href={deriveLink("email", contacts.email.value)}
                      className="group"
                    >
                      <div>{contacts.email.label[locale]}</div>
                      <div className="mt-1 flex gap-2.5">
                        <div>E.</div>
                        <div className="font-bold">{contacts.email.value}</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="w-[46%] bg-primary-blue h-2"></div>
              </div>
              <div className="flex justify-end">
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
    <div className="mt-[50px] font-body font-medium text-[9px] tracking-[0.2em]">
      COPYRIGHT {year} &copy; ALL RIGHTS RESERVED • DESIGNED BY DESIGNATA STUDIO
    </div>
  );
}
