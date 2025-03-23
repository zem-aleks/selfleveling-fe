import { AxiosRequestConfig } from "axios";

import { api } from "@/modules/auth/api/api";
import { GoalEntity } from "@/modules/goal/types/goal";
import { HeroEntity } from "@/modules/hero/types";

export type GoalData = {
  hero: HeroEntity;
  goal: GoalEntity;
};

export const getGoal = async (
  goalId: string,
  config?: AxiosRequestConfig,
): Promise<GoalData> => {
  return api.get(`/goals/${goalId}`, {
    signal: config?.signal,
  });
};
