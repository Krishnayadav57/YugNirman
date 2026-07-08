import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Server-only client using the Supabase SERVICE ROLE key. This bypasses Row
// Level Security, so it must never be imported into client components or
// have its key exposed as NEXT_PUBLIC_*. It's used exclusively by lib/db.js
// to read/write site content (services, portfolio, bookings, etc).
export function createAdminClient() {
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
