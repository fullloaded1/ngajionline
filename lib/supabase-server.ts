import { createClient } from "@supabase/supabase-js";

// Client untuk digunakan di Server Actions (menggunakan publishable key)
export function createSupabaseServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
