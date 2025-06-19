import { ReactNode } from 'react';
import Link from 'next/link';

import { HeroEntity } from '@/modules/hero/types';
import { Button } from '@/ui/button';
import { H1 } from '@/ui/custom/H1';

export const BuildGoalLayout = ({
  children,
  hero,
}: {
  children: ReactNode;
  hero: HeroEntity;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={
          'flex w-full flex-row items-center justify-between gap-4 py-2 pt-4'
        }
      >
        <Link href={`/heroes/${hero.id}`}>
          <Button variant={'outline'}>Back</Button>
        </Link>
        <H1>Goal Draft</H1>

        <Button className={'bg-red-500'} onClick={() => alert('Coming soon')}>
          Delete
        </Button>
      </div>

      {children}
    </div>
  );
};
