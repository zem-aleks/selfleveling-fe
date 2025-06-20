import { AxiosRequestConfig } from 'axios';

import { api } from '@/modules/auth/api/api';

import { QuestEntity, QuestStatus } from '../types/entity';

export const getHeroQuests = async (
  { heroId, status }: { heroId: string; status?: QuestStatus },
  config?: AxiosRequestConfig,
): Promise<QuestEntity[]> => {
  return api.get(`/quests/hero/${heroId}/${status}`, {
    signal: config?.signal,
  });
};
