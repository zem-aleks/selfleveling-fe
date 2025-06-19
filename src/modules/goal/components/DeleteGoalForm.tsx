import { useEffect } from 'react';

import { toast } from 'sonner';

import { deleteGoal } from '@/modules/goal/api/deleteGoal';
import { GoalEntity } from '@/modules/goal/types/goal';
import { Button } from '@/ui/button';
import { notReachable } from '@/utils/notReachable';
import { useLazyLoadableData } from '@/utils/useLazyLoadableData';

export type Msg = { type: 'onGoalDeleted' };

type Props = {
  goal: GoalEntity;
  onMsg: (msg: Msg) => void;
};

export const DeleteGoalForm = ({ goal, onMsg }: Props) => {
  const { state, reset, load } = useLazyLoadableData(deleteGoal);
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
        onMsg({ type: 'onGoalDeleted' });
        reset();
        break;

      default:
        return notReachable(state);
    }
  }, [state]);

  switch (state.type) {
    case 'error':
    case 'not_requested':
      return (
        <Button
          className={'grow bg-red-500'}
          onClick={() => load({ goalId: goal.id })}
        >
          Delete
        </Button>
      );

    case 'loaded':
    case 'loading':
      return (
        <Button className={'grow bg-red-500'} loading={true}>
          Delete
        </Button>
      );

    default:
      return notReachable(state);
  }
};
