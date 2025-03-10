/**
 * Server-side configuration.
 * NOTE: Do not include this variables in client-side code.
 */
import { z } from "zod";

const envSchema = z.object({});

export const ENV = envSchema.parse({});
