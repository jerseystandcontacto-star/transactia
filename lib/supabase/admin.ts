import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Lazy singleton — avoids crashing at module load when env vars are absent (e.g. Vercel build)
let _client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('Missing Supabase admin env vars');
    _client = createClient(url, key);
  }
  return _client;
}
