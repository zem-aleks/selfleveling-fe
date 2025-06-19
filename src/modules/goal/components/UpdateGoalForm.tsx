'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  CreateGoalData,
  CreateGoalFormSchema,
} from '@/modules/goal/api/createGoal';
import { updateGoal } from '@/modules/goal/api/updateGoal';
import { GoalForm } from '@/modules/goal/components/GoalForm';
import { GoalDraft, GoalEntity } from '@/modules/goal/types/goal';
import { Button } from '@/ui/button';
import { H3 } from '@/ui/custom/H1';
import { notReachable } from '@/utils/notReachable';
import { useLazyLoadableData } from '@/utils/useLazyLoadableData';

export type Msg = {
  type: 'onGoalUpdated';
  goal: GoalEntity;
};

type Props = {
  goal: GoalDraft;
  onMsg: (msg: Msg) => void;
};

export const UpdateGoalForm = ({ goal, onMsg }: Props) => {
  const form = useForm<CreateGoalData>({
    resolver: zodResolver(CreateGoalFormSchema),
    defaultValues: {
      goal: goal.goal,
      targetDate: dayjs(goal.targetDate).format('YYYY-MM-DD'),
    },
  });

  const { state, load, reset } = useLazyLoadableData(updateGoal);

  useEffect(() => {
    switch (state.type) {
      case 'not_requested':
      case 'loading':
        break;

      case 'error':
        toast.error(state.error.response?.data.message || state.error.message);
        break;

      case 'loaded':
        toast.success('Goal details were updated successfully');
        onMsg({ type: 'onGoalUpdated', goal: state.data.goal });
        reset();
        break;

      default:
        return notReachable(state);
    }
  }, [state]);

  const isLoading = state.type === 'loading' || state.type === 'loaded';

  return (
    <div className={'flex w-full flex-col gap-2'}>
      <div className={'flex flex-row items-center justify-between'}>
        <H3 className={''}>Update goal</H3>
        <Button
          variant={'outline'}
          onClick={() => form.setValue('goal', goal.evaluation.improvedGoal)}
        >
          Copy improved example
        </Button>
      </div>
      <GoalForm
        form={form}
        isLoading={isLoading}
        onSubmit={(data) => load({ ...data, goalId: goal.id })}
      />
    </div>
  );
};
