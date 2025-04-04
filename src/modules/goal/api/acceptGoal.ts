import { AxiosRequestConfig } from "axios";

import { api } from "@/modules/auth/api/api";
import { GoalEntity } from "@/modules/goal/types/goal";

export const acceptGoal = async (
  { goalId }: { goalId: string },
  config?: AxiosRequestConfig,
): Promise<{ goal: GoalEntity }> => {
  return api.patch(
    `/goals/${goalId}`,
    {},
    {
      signal: config?.signal,
    },
  );
};
