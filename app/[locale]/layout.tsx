import type { Metadata } from "next";
import { Merriweather_Sans, Inter, Albert_Sans } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing, type Locale } from "@/i18n/routing";
import Footer from "@/components/footer";
import Separator from "@/components/separator";

import "../globals.css";

const merriweatherSans = Merriweather_Sans({
  variable: "--font-merriweather-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/* ─── Root metadata — hardcoded fallback for all pages ─── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      template: "%s | Ligo Group",
      default: "Ligo Group",
    },
    description:
      locale === "id"
        ? "Ligo Group adalah grup perusahaan plastik terkemuka di Indonesia dengan lebih dari 40 tahun pengalaman."
        : "Ligo Group is a leading plastic corporation in Indonesia with over 40 years of experience.",
    openGraph: {
      siteName: "Ligo Group",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${merriweatherSans.variable} ${inter.variable} ${albertSans.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <Separator />
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
