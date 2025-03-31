import { AxiosRequestConfig } from "axios";

import { api } from "@/modules/auth/api/api";
import { KpiEntity } from "@/modules/kpi/types";

export const getKpis = async (
  goalId: string,
  config?: AxiosRequestConfig,
): Promise<KpiEntity[]> => {
  return api.get(`/kpis?goalId=${goalId}`, {
    signal: config?.signal,
  });
};
