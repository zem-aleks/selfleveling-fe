import { ReactNode } from 'react';

import { getHeroGoals } from '@/modules/goal/api/getHeroGoals';
import { GoalEnhancedEntity } from '@/modules/goal/types/goal';
import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { notReachable } from '@/utils/notReachable';
import { useReloadableData } from '@/utils/useReloadableData';

type Props = {
  heroId: string;
  children: (goals: GoalEnhancedEntity[], reload: () => void) => ReactNode;
};

export const HeroGoalsLoader = ({ heroId, children }: Props): ReactNode => {
  const { state, reload } = useReloadableData(getHeroGoals, heroId);

  switch (state.type) {
    case 'loading':
      return <>Loading...</>;

    case 'reloading':
    case 'loaded':
      return <>{children(state.data, reload)}</>;

    case 'error':
      return (
        <div className={'flex flex-col items-center gap-4'}>
          <Label>Something went wrong</Label>
          <Button onClick={reload}>Try again</Button>
        </div>
      );

    default:
      return notReachable(state);
  }
};
