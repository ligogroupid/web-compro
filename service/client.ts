import { supabase } from "@/lib/supabase";

import type { LocaleText } from "@/service/company";

type ClientType = "industrial" | "horeka";

type Client = {
  id: string;
  name: LocaleText;
  image: string;
  link?: string;
  type: ClientType;
  order: number;
};

export type TClient = Client;

/**
 * Fetch clients filtered by type, ordered by display order.
 */
async function getClientsByType(type: ClientType): Promise<Client[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("id, name_id, name_en, image, link, type, order")
    .eq("type", type)
    .order("order", { ascending: true });

  if (error) {
    console.error(`[clients] Failed to fetch ${type} clients:`, error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: { id: row.name_id, en: row.name_en },
    image: row.image ?? "",
    link: row.link ?? undefined,
    type: row.type as ClientType,
    order: row.order,
  }));
}

/**
 * Fetch all clients grouped by type (industrial & horeka).
 */
export async function getClientsByGroup(): Promise<{
  industrial: Client[];
  horeka: Client[];
}> {
  const [industrial, horeka] = await Promise.all([
    getClientsByType("industrial"),
    getClientsByType("horeka"),
  ]);

  return { industrial, horeka };
}
