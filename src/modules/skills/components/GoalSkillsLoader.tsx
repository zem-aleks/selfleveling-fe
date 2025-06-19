import { ReactNode } from 'react';

import { getGoalSkills } from '@/modules/skills/api/getGoalSkills';
import { SkillEntity } from '@/modules/skills/types/entity';
import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { notReachable } from '@/utils/notReachable';
import { useReloadableData } from '@/utils/useReloadableData';

type Props = {
  goalId: string;
  children: (kpis: SkillEntity[]) => ReactNode;
};

export const GoalSkillsLoader = ({ goalId, children }: Props): ReactNode => {
  const { state, reload } = useReloadableData(getGoalSkills, goalId);

  switch (state.type) {
    case 'loading':
      return <div>{`Checking what skills are needed to make it...`}</div>;

    case 'reloading':
    case 'loaded':
      return <>{children(state.data)}</>;

    case 'error':
      return (
        <div className={'flex flex-col items-center gap-4'}>
          <Label>Something went wrong. Skills are not defined :(</Label>
          <Button onClick={reload}>Try again</Button>
        </div>
      );

    default:
      return notReachable(state);
  }
};
