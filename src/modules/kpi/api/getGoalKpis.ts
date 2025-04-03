import { AxiosRequestConfig } from "axios";

import { api } from "@/modules/auth/api/api";
import { KpiWithMeasurementsEntity } from "@/modules/kpi/types";

export const getGoalKpis = async (
  goalId: string,
  config?: AxiosRequestConfig,
): Promise<KpiWithMeasurementsEntity[]> => {
  return api.get(`/kpis/active?goalId=${goalId}`, {
    signal: config?.signal,
  });
};
