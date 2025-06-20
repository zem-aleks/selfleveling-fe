import { ReactNode } from 'react';

import { getHeroQuests } from '@/modules/quests/api/getHeroQuests';
import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { notReachable } from '@/utils/notReachable';
import { useReloadableData } from '@/utils/useReloadableData';

import { QuestEntity, QuestStatus } from '../types/entity';

type Props = {
  heroId: string;
  status?: QuestStatus;
  children: (quests: QuestEntity[], reload: () => void) => ReactNode;
};

export const HeroQuestsLoader = ({
  heroId,
  status,
  children,
}: Props): ReactNode => {
  const { state, reload } = useReloadableData(getHeroQuests, {
    heroId,
    status,
  });

  switch (state.type) {
    case 'loading':
      return <>Loading...</>;

    case 'reloading':
    case 'loaded':
      return <>{children(state.data, reload)}</>;

    case 'error':
      return (
        <div className={'flex w-full flex-col items-center gap-4'}>
          <Label>Something went wrong</Label>
          <Button onClick={reload}>Try again</Button>
        </div>
      );

    default:
      return notReachable(state);
  }
};
