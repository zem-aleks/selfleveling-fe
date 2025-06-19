import { AxiosRequestConfig } from 'axios';

import { api } from '@/modules/auth/api/api';
import { GoalEnhancedEntity } from '@/modules/goal/types/goal';

export const getHeroGoals = async (
  heroId: string,
  config?: AxiosRequestConfig,
): Promise<GoalEnhancedEntity[]> => {
  return api.get(`/goals/hero/${heroId}/active`, {
    signal: config?.signal,
  });
};
