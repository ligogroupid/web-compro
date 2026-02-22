"use client";

import { useState } from "react";

import ButtonBrand from "@/components/button-brand";

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

export default function ContactForm() {
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      // TODO: integrate reCAPTCHA token verification before sending
      // const captchaToken = await executeRecaptcha("contact_form");

      // TODO: replace with actual API call (e.g. Supabase or server action)
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmitted(true);
      setFields(INITIAL_FIELDS);
    } catch (err) {
      console.error("[ContactForm] submission error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 py-12">
        <p className="set-text-caption2 text-primary-blue">
          Thank you for reaching out!
        </p>
        <p className="set-text-bodytext">
          We&apos;ve received your message and will get back to you as soon as
          possible.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="self-start set-text-bodytext underline underline-offset-4 text-primary-blue hover:text-orange transition-colors cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-name" className="text-bodytext   font-albert">
          Name {requiredMark}
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Your full name"
          value={fields.name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-email" className="text-bodytext   font-albert">
          Email {requiredMark}
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="your@email.com"
          value={fields.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-phone" className="text-bodytext   font-albert">
          Phone {requiredMark}
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="+62 xxx xxxx xxxx"
          value={fields.phone}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Company */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-company" className="text-bodytext   font-albert">
          Company {requiredMark}
        </label>
        <input
          id="cf-company"
          name="company"
          type="text"
          autoComplete="organization"
          required
          placeholder="Your company name"
          value={fields.company}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className="text-bodytext   font-albert">
          Message {requiredMark}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          placeholder="Tell us how we can help you…"
          value={fields.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* reCAPTCHA placeholder — mount widget here when integrated */}
      {/* <div id="recaptcha-container" className="mt-2" /> */}

      {error && (
        <p role="alert" className="text-primary-red text-sm font-body">
          {error}
        </p>
      )}

      <div className="mt-2">
        <ButtonBrand type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Submit"}
        </ButtonBrand>
      </div>
    </form>
  );
}
