import type { Locale } from "@/i18n/routing";

import { supabase } from "@/lib/supabase";

type ContactType = "address" | "phone" | "email";

type ContactLabel = {
  id: string;
  en: string;
};

type Contact = {
  type: ContactType;
  label: ContactLabel;
  value: string;
};

type ContactsMap = Record<ContactType, Contact>;

/**
 * Fetch all 3 contact rows (address, phone, email) from Supabase.
 *
 * Returns a map keyed by type for easy access:
 * ```ts
 * const contacts = await getContacts();
 * contacts.phone.value          // "+62 21 2255 9897"
 * contacts.phone.label["en"]    // "Jakarta Office"
 * contacts.phone.label["id"]    // "Kantor Jakarta"
 * ```
 */
export async function getContacts(): Promise<ContactsMap> {
  const { data, error } = await supabase
    .from("contacts")
    .select("type, label_id, label_en, value")
    .order("type", { ascending: true });

  if (error) {
    console.error("Failed to fetch contacts:", error);
  }

  const rows = (data ?? []) as Array<{
    type: ContactType;
    label_id: string;
    label_en: string;
    value: string;
  }>;

  // Build map with fallback defaults if rows are missing
  const defaults: ContactsMap = {
    address: { type: "address", label: { id: "", en: "" }, value: "" },
    phone: { type: "phone", label: { id: "", en: "" }, value: "" },
    email: { type: "email", label: { id: "", en: "" }, value: "" },
  };

  for (const row of rows) {
    if (row.type in defaults) {
      defaults[row.type] = {
        type: row.type,
        label: { id: row.label_id, en: row.label_en },
        value: row.value,
      };
    }
  }

  return defaults;
}

/**
 * Helper to get the label string for a given locale.
 */
export function getContactLabel(contact: Contact, locale: Locale): string {
  return contact.label[locale];
}
