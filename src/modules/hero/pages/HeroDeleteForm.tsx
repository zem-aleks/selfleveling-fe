import React, { ReactNode, useEffect } from 'react';

import { toast } from 'sonner';

import { deleteHero } from '@/modules/hero/api/deleteHero';
import { Button } from '@/ui/button';
import { notReachable } from '@/utils/notReachable';
import { useLazyLoadableData } from '@/utils/useLazyLoadableData';

type Msg = {
  type: 'onHeroDeleted';
};

type Props = {
  heroId: string;
  onMsg: (msg: Msg) => void;
};

export const HeroDeleteForm = ({ heroId, onMsg }: Props): ReactNode => {
  const { state, load, reset } = useLazyLoadableData(deleteHero);

  useEffect(() => {
    switch (state.type) {
      case 'not_requested':
      case 'loading':
        break;

      case 'error':
        toast.error(`Hero deletion error: ${state.error.message}`);
        break;

      case 'loaded':
        onMsg({ type: 'onHeroDeleted' });
        reset();
        break;

      default:
        return notReachable(state);
    }
  }, [state, reset]);

  return (
    <Button
      loading={state.type === 'loading'}
      className={'bg-red-500'}
      onClick={() => load({ heroId })}
    >
      Delete
    </Button>
  );
};
