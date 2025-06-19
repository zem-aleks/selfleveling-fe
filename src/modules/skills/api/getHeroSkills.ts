import { AxiosRequestConfig } from 'axios';

import { api } from '@/modules/auth/api/api';
import { SkillEntity } from '@/modules/skills/types/entity';

export const getHeroSkills = async (
  heroId: string,
  config?: AxiosRequestConfig,
): Promise<SkillEntity[]> => {
  return api.get(`/skills/hero?heroId=${heroId}`, {
    signal: config?.signal,
  });
};
