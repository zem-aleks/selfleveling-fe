import { AxiosRequestConfig } from 'axios';

import { api } from '@/modules/auth/api/api';
import { GoalActive, GoalFormed } from '@/modules/goal/types/goal';

export const acceptGoal = async (
  { goalId }: { goalId: string },
  config?: AxiosRequestConfig,
): Promise<GoalFormed | GoalActive> => {
  return api.patch(
    `/goals/${goalId}`,
    {},
    {
      signal: config?.signal,
    },
  );
};
