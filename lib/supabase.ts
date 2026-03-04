import { createClient } from "@supabase/supabase-js"

import type { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Compro Supabase client — uses anon key for read-only public access.
 *
 * RLS policies ensure this client can only SELECT on content tables.
 * Used in server components and API routes for fetching public data.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
