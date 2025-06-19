import { AxiosRequestConfig } from 'axios';

import { api } from '@/modules/auth/api/api';
import { GoalDraft, GoalFormed } from '@/modules/goal/types/goal';

export const getHeroGoalDrafts = async (
  heroId: string,
  config?: AxiosRequestConfig,
): Promise<Array<GoalDraft | GoalFormed>> => {
  return api.get(`/goals/hero/${heroId}/draft`, {
    signal: config?.signal,
  });
};
