import type { Locale } from "@/i18n/routing";

import Icon__LogoLigo from "./icon-logo-ligo";

type Props = {
  locale: Locale;
};

const data: Record<
  Locale,
  {
    contact: {
      phone_office: {
        title: string;
        initial: string;
        value: string;
        link: string;
      };
      email_office: {
        title: string;
        initial: string;
        value: string;
        link: string;
      };
    };
    address: { title: string; address: string };
    cta: string;
  }
> = {
  en: {
    contact: {
      phone_office: {
        title: "Jakarta Office",
        initial: "T",
        value: "+62 21 2255 9897",
        link: "tel:622122559897",
      },
      email_office: {
        title: "Leave us a message!",
        initial: "E",
        value: "info@ligogroup.com",
        link: "mailto:info@ligogroup.com",
      },
    },
    address: {
      title: "Head Office",
      address: `Komp. Jakarta Distribution Center (JDC)<br />
      Jl. Kapuk Kamal Raya No. 40, Blok B No. 03<br />
      Kel. Kamal Muara, Kec. Penjaringan<br />
      Jakarta Utara 14470 - Indonesia`,
    },
    cta: "Feel free to contact us for more details.",
  },
  id: {
    contact: {
      phone_office: {
        title: "Kantor Jakarta",
        initial: "T",
        value: "+62 21 2255 9897",
        link: "tel:622122559897",
      },
      email_office: {
        title: "Kirim pesan kepada kami!",
        initial: "E",
        value: "info@ligogroup.com",
        link: "mailto:info@ligogroup.com",
      },
    },
    address: {
      title: "Kantor Pusat",
      address: `Komp. Jakarta Distribution Center (JDC)<br />
      Jl. Kapuk Kamal Raya No. 40, Blok B No. 03<br />
      Kel. Kamal Muara, Kec. Penjaringan<br />
      Jakarta Utara 14470 - Indonesia`,
    },
    cta: "Silakan hubungi kami untuk informasi lebih lanjut.",
  },
};

export default function Footer({ locale }: Props) {
  const { contact, address, cta } = data[locale];

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
                <div className="font-bold mt-[34px]">{address.title}</div>
                <div
                  className="set-text-bodytext w-[366px] mt-[22px]"
                  dangerouslySetInnerHTML={{
                    __html: address.address,
                  }}
                />
              </div>
            </div>

            {/*RIGHT SECTION*/}
            <div className="flex flex-col items-end">
              <div className="max-w-lg">
                <div className="bg-primary-blue text-white py-6 px-8">
                  <div className="set-text-heading3 font-heading max-w-sm">
                    {cta}
                  </div>
                  <div className="pt-10 flex flex-col md:flex-row gap-4 md:gap-9 md:items-center">
                    <div className="">
                      <div>{contact.phone_office.title}</div>
                      <div className="mt-1 flex gap-2.5">
                        <div>{contact.phone_office.initial}.</div>
                        <div className="font-bold">
                          {contact.phone_office.value}
                        </div>
                      </div>
                    </div>
                    <div className="h-px w-9 md:h-9 md:w-px bg-white" />
                    <div className="">
                      <div>{contact.email_office.title}</div>
                      <div className="mt-1 flex gap-2.5">
                        <div>{contact.email_office.initial}.</div>
                        <div className="font-bold">
                          {contact.email_office.value}
                        </div>
                      </div>
                    </div>
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
