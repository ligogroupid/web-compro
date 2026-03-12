"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

type Props = Readonly<{ children: React.ReactNode }>;

/**
 * Wraps children with GoogleReCaptchaProvider.
 * Must only be used inside client components that need reCAPTCHA v3.
 *
 * Uses NEXT_PUBLIC_CAPTCHA_SITE_KEY from the environment.
 */
export default function RecaptchaProvider({ children }: Props) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
