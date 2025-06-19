import { createClient } from '@supabase/supabase-js';

import { ENV } from '@/config/client';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  ENV.NEXT_PUBLIC_SUPABASE_URL,
  ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
