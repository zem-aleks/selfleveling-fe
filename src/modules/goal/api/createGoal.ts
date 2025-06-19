import { AxiosRequestConfig } from 'axios';
import { z } from 'zod';

import { api } from '@/modules/auth/api/api';
import { GoalEntity } from '@/modules/goal/types/goal';

export const CreateGoalFormSchema = z.object({
  goal: z.string().min(1, 'Please enter your goal.'),
  targetDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date must be in YYYY-MM-DD format',
    })
    .refine(
      (val) => {
        const date = new Date(val);
        const [year, month, day] = val.split('-').map(Number);
        return (
          date.getFullYear() === year &&
          date.getMonth() + 1 === month &&
          date.getDate() === day
        );
      },
      {
        message: 'Invalid date',
      },
    ),
});

export type CreateGoalData = z.infer<typeof CreateGoalFormSchema>;

export const createGoal = async (
  data: CreateGoalData & { heroId: string },
  config?: AxiosRequestConfig,
): Promise<{ goal: GoalEntity }> => {
  return api.post(`/goals`, data, {
    signal: config?.signal,
  });
};
