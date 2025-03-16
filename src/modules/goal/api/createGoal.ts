import { AxiosRequestConfig } from "axios";
import { z } from "zod";

import { api } from "@/modules/auth/api/api";
import { HeroEntity } from "@/modules/hero/types";

export const CreateGoalFormSchema = z.object({
  goal: z.string().min(1, "Please enter your goal."),
});

export type CreateGoalData = z.infer<typeof CreateGoalFormSchema>;

export const createGoal = async (
  data: CreateGoalData & { heroId: string },
  config?: AxiosRequestConfig,
): Promise<HeroEntity> => {
  return api.post(`/goals`, data, {
    signal: config?.signal,
  });
};
