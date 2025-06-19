'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  createGoal,
  CreateGoalData,
  CreateGoalFormSchema,
} from '@/modules/goal/api/createGoal';
import { GoalForm } from '@/modules/goal/components/GoalForm';
import { HeroLoader } from '@/modules/hero/components/HeroLoader';
import { H1 } from '@/ui/custom/H1';
import { notReachable } from '@/utils/notReachable';
import { useLazyLoadableData } from '@/utils/useLazyLoadableData';

type Props = {
  heroId: string;
};

export const CreateGoalPage = ({ heroId }: Props) => {
  const router = useRouter();
  const form = useForm<CreateGoalData>({
    resolver: zodResolver(CreateGoalFormSchema),
    defaultValues: {
      goal: '',
      targetDate: format(new Date(), 'yyyy-MM-dd'),
    },
  });

  const { state, load, reset } = useLazyLoadableData(createGoal);

  useEffect(() => {
    switch (state.type) {
      case 'not_requested':
      case 'loading':
        break;

      case 'error':
        toast.error(state.error.response?.data.message || state.error.message);
        break;

      case 'loaded':
        toast.success('Goal was created successfully');
        router.push(`/goals/${state.data.goal.id}`);
        // onMsg({ type: "onHeroCreated", hero: state.data });
        reset();
        break;

      default:
        return notReachable(state);
    }
  }, [state]);

  return (
    <HeroLoader heroId={heroId}>
      {(hero) => (
        <div className="flex flex-col gap-4">
          <H1>Let&apos;s build your new goal {hero.name}!</H1>
          <p>
            This process takes some time to clarify the details. We will start
            with the draft and try to organize them step by step
          </p>
          <div className={'w-full'}>
            <GoalForm
              form={form}
              isLoading={state.type === 'loading'}
              onSubmit={(data) => load({ ...data, heroId })}
            />
          </div>
        </div>
      )}
    </HeroLoader>
  );
};
