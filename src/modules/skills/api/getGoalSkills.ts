import { AxiosRequestConfig } from 'axios';

import { api } from '@/modules/auth/api/api';
import { SkillEntity } from '@/modules/skills/types/entity';

export const getGoalSkills = async (
  goalId: string,
  config?: AxiosRequestConfig,
): Promise<SkillEntity[]> => {
  return api.get(`/skills?goalId=${goalId}`, {
    signal: config?.signal,
  });
};
