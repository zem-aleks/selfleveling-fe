import { AxiosRequestConfig } from 'axios';

import { api } from '@/modules/auth/api/api';

export const deleteHero = async (
  { heroId }: { heroId: string },
  config?: AxiosRequestConfig,
) => {
  return api.delete(`/heroes/${heroId}`, {
    signal: config?.signal,
  });
};
