import ContactForm from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div>
      <section className="px-4 pt-14 pb-16">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:gap-20">
          {/*LEFT SECTION*/}
          <div className="max-w-lg">
            <h2 className="set-text-caption1">CONTACT US</h2>
            <div className="set-text-headline1 mt-8">Let’s Work Together</div>
            <div className="mt-12 set-text-bodytext">
              Supported by a wide distribution network, Ligo Group serves
              customers throughout Indonesia with trusted products and
              innovative solutions to meet national market demands.
            </div>
            <div className="h-px mt-14 bg-primary-blue" />
            <div className="hidden mt-24 md:flex flex-col gap-9">
              <div>
                <div className="set-text-caption2">Head Office</div>
                <div
                  className="set-text-bodytext !text-sm"
                  dangerouslySetInnerHTML={{
                    __html: `Komp. Jakarta Distribution Center (JDC)<br />
                Jl. Kapuk Kamal Raya No. 40, Blok B No. 03<br />
                Kel. Kamal Muara, Kec. Penjaringan<br />
                Jakarta Utara 14470 - Indonesia`,
                  }}
                ></div>
              </div>
              <div>
                <div className="set-text-caption2">Telephone</div>
                <div className="set-text-bodytext !text-sm">
                  +62 21 2255 9897
                </div>
              </div>
              <div>
                <div className="set-text-caption2">Email</div>
                <div className="set-text-bodytext !text-sm">
                  info@ligogroup.com
                </div>
              </div>
              <div className="w-[286px] h-[320px] relative -mt-20  translate-y-[50%]">
                <img alt="Plastic Cup" src="/plastic-cup.webp" />
              </div>
            </div>
          </div>
          {/*RIGHT SECTION*/}
          <div className="flex-1 min-w-0 pt-10 md:pt-0">
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="bg-gray-light px-4 pb-14 pt-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="set-text-headline1">Visit Us</h2>
          <div className="aspect-[3/2] md:aspect-[1200/467] w-full mt-12">
            <iframe
              src={
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0606139478696!2d106.73281837592812!3d-6.1225446938641825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d4602dadd89%3A0xfc2bead0423ad02!2sLIGO%20Group!5e0!3m2!1sen!2sid!4v1771738167598!5m2!1sen!2sid"
              }
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title="LIGO Group Office Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
