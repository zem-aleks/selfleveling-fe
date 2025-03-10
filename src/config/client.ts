/* eslint-disable no-restricted-syntax */
/**
 * Client-side configuration
 * NOTE: Variables are prefixed with NEXT_PUBLIC_ to make them available to the client
 * @see https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
 */
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_ENVIRONMENT: z.enum(["development", "staging", "production"]),
  NEXT_PUBLIC_BACKEND_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
});

export const ENV = envSchema.parse({
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
