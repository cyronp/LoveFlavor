import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const createClient = () => {
  if (typeof window !== 'undefined' && supabaseUrl === 'https://placeholder.supabase.co') {
    console.error("Missing Supabase environment variables. Please check your .env.local file.");
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
};
