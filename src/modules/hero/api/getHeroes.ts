import { AxiosRequestConfig } from 'axios';

import { api } from '@/modules/auth/api/api';
import { HeroEntity } from '@/modules/hero/types/entity';

export const getHeroes = async (
  params: void,
  config?: AxiosRequestConfig,
): Promise<HeroEntity[]> => {
  return api.get(`/heroes`, {
    signal: config?.signal,
  });
};
