import { supabase } from "@/lib/supabase";

export type LocaleText = {
  id: string;
  en: string;
};

type Certificate = {
  id: string;
  name: string;
  image: string;
};

type ProvenStrength = {
  title: LocaleText;
  description: LocaleText;
};

type Product = {
  id: string;
  name: LocaleText;
  image: string;
};

type Brand = {
  name: string;
  image: string;
  featured?: boolean;
};

type CoverSection = {
  images: string[];
};

type VisitLocation = {
  name: LocaleText;
  location: LocaleText;
  displayType: string;
  embedUrl?: string;
  latitude?: number;
  longitude?: number;
};

type Company = {
  order: number;
  slug: string;
  name: LocaleText;
  initial_name: LocaleText;
  thumbnail: string;
  logo: string;
  description: LocaleText;
  full_description: LocaleText;
  certifications: Certificate[];
  provens: ProvenStrength[];
  strengths_bg_image?: string;
  strengths_bg_color?: string;
  strengths_image?: string;
  products: Product[];
  brands: Brand[];
  cover_sections: CoverSection[];
  locations: VisitLocation[];
  location_display_type?: string;
  cover_image: string[];
  hero_image: string[];
};

export type TCompany = Company;

type CompanyListItem = Pick<
  Company,
  | "order"
  | "slug"
  | "name"
  | "initial_name"
  | "logo"
  | "description"
  | "thumbnail"
>;

export type TCompanyListItem = CompanyListItem;

export async function getCompanyList(): Promise<CompanyListItem[]> {
  const { data, error } = await supabase
    .from("companies")
    .select(
      "order, slug, name_id, name_en, initial_name_id, initial_name_en, logo, description_id, description_en, thumbnail",
    )
    .order("order", { ascending: true });

  if (error) {
    console.error("Failed to fetch company list:", error);
    return [];
  }

  return data.map((row) => ({
    order: row.order,
    slug: row.slug,
    name: { id: row.name_id, en: row.name_en },
    initial_name: { id: row.initial_name_id, en: row.initial_name_en },
    logo: row.logo ?? "",
    description: {
      id: row.description_id ?? "",
      en: row.description_en ?? "",
    },
    thumbnail: row.thumbnail ?? "",
  }));
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  // Fetch company base data
  const { data: companyRow, error: companyError } = await supabase
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (companyError || !companyRow) {
    console.error("Failed to fetch company by slug:", companyError);
    return null;
  }

  // Fetch all sub-models in parallel
  const [
    { data: certRows },
    { data: provenRows },
    { data: productRows },
    { data: brandRows },
    { data: coverRows },
    { data: locationRows },
  ] = await Promise.all([
    supabase
      .from("company_certifications")
      .select("order, certifications(id, name, image)")
      .eq("company_id", companyRow.id)
      .order("order", { ascending: true }),
    supabase
      .from("proven_strengths")
      .select("*")
      .eq("company_id", companyRow.id)
      .order("order", { ascending: true }),
    supabase
      .from("products")
      .select("*")
      .eq("company_id", companyRow.id)
      .order("order", { ascending: true }),
    supabase
      .from("brands")
      .select("*")
      .eq("company_id", companyRow.id)
      .order("order", { ascending: true }),
    supabase
      .from("cover_sections")
      .select("*")
      .eq("company_id", companyRow.id)
      .order("order", { ascending: true }),
    supabase
      .from("visit_locations")
      .select("*")
      .eq("company_id", companyRow.id)
      .order("order", { ascending: true }),
  ]);

  // Transform certifications (joined via company_certifications → certifications)
  const certifications: Certificate[] = (certRows ?? []).map((row) => {
    // Supabase returns the joined relation as an object (single) or null
    const cert = row.certifications as unknown as {
      id: string;
      name: string;
      image: string | null;
    } | null;
    return {
      id: cert?.id ?? "",
      name: cert?.name ?? "",
      image: cert?.image ?? "",
    };
  });

  // Transform proven strengths
  const provens: ProvenStrength[] = (provenRows ?? []).map((row) => ({
    title: { id: row.title_id, en: row.title_en },
    description: {
      id: row.description_id ?? "",
      en: row.description_en ?? "",
    },
  }));

  // Transform products
  const products: Product[] = (productRows ?? []).map((row) => ({
    id: row.id,
    name: { id: row.name_id, en: row.name_en },
    image: row.image ?? "",
  }));

  // Transform brands
  const brands: Brand[] = (brandRows ?? []).map((row) => ({
    name: row.name,
    image: row.image ?? "",
    featured: row.featured ?? false,
  }));

  // Transform cover sections
  const cover_sections: CoverSection[] = (coverRows ?? []).map((row) => ({
    images: row.images ?? [],
  }));

  // Transform visit locations
  const locations: VisitLocation[] = (locationRows ?? []).map((row) => ({
    name: { id: row.name_id, en: row.name_en },
    location: {
      id: row.location_id ?? "",
      en: row.location_en ?? "",
    },
    displayType: row.display_type ?? "legacy",
    embedUrl: row.embed_url ?? undefined,
    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,
  }));

  return {
    order: companyRow.order,
    slug: companyRow.slug,
    name: { id: companyRow.name_id, en: companyRow.name_en },
    initial_name: {
      id: companyRow.initial_name_id,
      en: companyRow.initial_name_en,
    },
    thumbnail: companyRow.thumbnail ?? "",
    logo: companyRow.logo ?? "",
    description: {
      id: companyRow.description_id ?? "",
      en: companyRow.description_en ?? "",
    },
    full_description: {
      id: companyRow.full_description_id ?? "",
      en: companyRow.full_description_en ?? "",
    },
    certifications,
    provens,
    strengths_bg_image: companyRow.strengths_bg_image ?? undefined,
    strengths_bg_color: companyRow.strengths_bg_color ?? undefined,
    strengths_image: companyRow.strengths_image ?? undefined,
    products,
    brands,
    cover_sections,
    locations,
    location_display_type: companyRow.location_display_type ?? undefined,
    cover_image: companyRow.cover_image ?? [],
    hero_image: companyRow.hero_image ?? [],
  };
}

export type FeaturedBrand = Brand & { companyName: string };

export async function getFeaturedBrands(): Promise<FeaturedBrand[]> {
  const { data, error } = await supabase
    .from("brands")
    .select("name, image, featured, companies(name_en, order)")
    .eq("featured", true)
    .order("order", { ascending: true });

  if (error) {
    console.error("Failed to fetch featured brands:", error);
    return [];
  }

  return (data ?? [])
    .map((row) => {
      // Supabase returns the joined relation as a single object for many-to-one
      const company = row.companies as unknown as {
        name_en: string;
        order: number;
      } | null;
      return {
        name: row.name,
        image: row.image ?? "",
        featured: row.featured ?? true,
        companyName: company?.name_en ?? "",
        _companyOrder: company?.order ?? 0,
      };
    })
    .sort((a, b) => a._companyOrder - b._companyOrder)
    .map(({ _companyOrder: _, ...brand }) => brand);
}
