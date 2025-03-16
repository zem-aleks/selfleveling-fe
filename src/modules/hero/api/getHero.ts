import { AxiosRequestConfig } from "axios";

import { api } from "@/modules/auth/api/api";
import { HeroEntity } from "@/modules/hero/types";

export const getHero = async (
  heroId: string,
  config?: AxiosRequestConfig,
): Promise<HeroEntity> => {
  return api.get(`/heroes/${heroId}`, {
    signal: config?.signal,
  });
};
