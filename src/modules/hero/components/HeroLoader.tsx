import { ReactNode } from 'react';

import { getHero } from '@/modules/hero/api/getHero';
import { HeroEntity } from '@/modules/hero/types';
import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { notReachable } from '@/utils/notReachable';
import { useLoadableData } from '@/utils/useLoadableData';

type Props = {
  heroId: string;
  children: (hero: HeroEntity) => ReactNode;
};

export const HeroLoader = ({ heroId, children }: Props): ReactNode => {
  const { state, reload } = useLoadableData(getHero, heroId);

  switch (state.type) {
    case 'loading':
      return <>Loading...</>;

    case 'loaded':
      return <>{children(state.data)}</>;

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
