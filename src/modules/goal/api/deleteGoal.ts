import { AxiosRequestConfig } from "axios";

import { api } from "@/modules/auth/api/api";
import { GoalEntity } from "@/modules/goal/types/goal";

export const deleteGoal = async (
  { goalId }: { goalId: string },
  config?: AxiosRequestConfig,
): Promise<{ goal: GoalEntity }> => {
  return api.delete(`/goals/${goalId}`, {
    signal: config?.signal,
  });
};
