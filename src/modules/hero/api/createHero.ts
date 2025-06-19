import { AxiosRequestConfig } from 'axios';
import { z } from 'zod';

import { api } from '@/modules/auth/api/api';
import { HeroEntity } from '@/modules/hero/types';

export const CreateHeroFormSchema = z.object({
  name: z.string().min(1, 'Please enter a hero name.'),
  language: z.string().min(2, 'Please select a language.'),
});

export type CreateHeroData = z.infer<typeof CreateHeroFormSchema>;

export const createHero = async (
  data: CreateHeroData,
  config?: AxiosRequestConfig,
): Promise<HeroEntity> => {
  return api.post(`/heroes`, data, {
    signal: config?.signal,
  });
};
