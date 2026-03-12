"use client";

import { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useTranslations } from "next-intl";

import ButtonBrand from "@/components/button-brand";
import RecaptchaProvider from "@/components/recaptcha-provider";

type FormFields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

const INITIAL_FIELDS: FormFields = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

const requiredMark = (
  <span className="text-primary-red ml-0.5" aria-hidden="true">
    *
  </span>
);

const inputClass =
  "w-full bg-white text-black placeholder:text-gray-400 border border-primary-blue px-4 py-3 outline-none focus:ring-2 focus:ring-primary-blue/40 transition-shadow font-body text-sm focus:ring-4 focus:ring-primary-blue/10";

function ContactFormInner() {
  const t = useTranslations("ContactForm");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setSubmitting(true);

      try {
        // 1. Check reCAPTCHA is ready
        if (!executeRecaptcha) {
          setError(t("captchaUnavailable"));
          return;
        }

        // 2. Generate token
        const captchaToken = await executeRecaptcha("contact_form_submit");

        if (!captchaToken) {
          setError(t("captchaFailed"));
          return;
        }

        // 3. POST to API route
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...fields, captchaToken }),
        });

        if (!response.ok) {
          const data = (await response.json()) as { message?: string };
          throw new Error(data.message ?? "Submission failed");
        }

        setSubmitted(true);
        setFields(INITIAL_FIELDS);
      } catch (err) {
        console.error("[ContactForm] submission error:", err);
        setError(t("errorMessage"));
      } finally {
        setSubmitting(false);
      }
    },
    [executeRecaptcha, fields, t],
  );

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 py-12">
        <p className="set-text-caption2 text-primary-blue">{t("successTitle")}</p>
        <p className="set-text-bodytext">{t("successBody")}</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="self-start set-text-bodytext underline underline-offset-4 text-primary-blue hover:text-orange transition-colors cursor-pointer"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-name" className="text-bodytext font-albert">
          {t("nameLabel")} {requiredMark}
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder={t("namePlaceholder")}
          value={fields.name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-email" className="text-bodytext font-albert">
          {t("emailLabel")} {requiredMark}
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={t("emailPlaceholder")}
          value={fields.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-phone" className="text-bodytext font-albert">
          {t("phoneLabel")} {requiredMark}
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder={t("phonePlaceholder")}
          value={fields.phone}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Company */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-company" className="text-bodytext font-albert">
          {t("companyLabel")} {requiredMark}
        </label>
        <input
          id="cf-company"
          name="company"
          type="text"
          autoComplete="organization"
          required
          placeholder={t("companyPlaceholder")}
          value={fields.company}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className="text-bodytext font-albert">
          {t("messageLabel")} {requiredMark}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          placeholder={t("messagePlaceholder")}
          value={fields.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p role="alert" className="text-primary-red text-sm font-body">
          {error}
        </p>
      )}

      <div className="mt-2">
        <ButtonBrand type="submit" disabled={submitting}>
          {submitting ? t("sending") : t("submit")}
        </ButtonBrand>
      </div>
    </form>
  );
}

/**
 * ContactForm — wraps the inner form with GoogleReCaptchaProvider.
 * Default export used by the /contact page.
 */
export default function ContactForm() {
  return (
    <RecaptchaProvider>
      <ContactFormInner />
    </RecaptchaProvider>
  );
}
