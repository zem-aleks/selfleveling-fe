import { AxiosRequestConfig } from "axios";

import { api } from "@/modules/auth/api/api";
import { CreateGoalData } from "@/modules/goal/api/createGoal";
import { GoalEntity } from "@/modules/goal/types/goal";

export const updateGoal = async (
  { goalId, ...data }: CreateGoalData & { goalId: string },
  config?: AxiosRequestConfig,
): Promise<{ goal: GoalEntity }> => {
  return api.put(`/goals/${goalId}`, data, {
    signal: config?.signal,
  });
};
