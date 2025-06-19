import { ReactNode } from 'react';

import dayjs from 'dayjs';

import { GoalFormed, GoalReview } from '@/modules/goal/types/goal';
import { Card, CardHeader, CardTitle } from '@/ui/card';
import { H2, H3 } from '@/ui/custom/H1';

type Props = {
  goal: GoalFormed | GoalReview;
};

export const GoalFormedCard = ({ goal }: Props): ReactNode => {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={'flex flex-row items-start justify-between gap-2'}
        >
          <div className={'flex flex-col gap-2'}>
            <H2>{goal.title}</H2>
            <H3 className={'leading-6 font-normal'}>{goal.goal}</H3>
          </div>
          <div
            className={
              'min-w-[120px] rounded-md border-2 border-blue-300 p-1 px-2'
            }
          >
            <p className={'text-right text-sm'}>Target Date</p>
            <p className={'text-muted-foreground text-right font-medium'}>
              {dayjs(goal.targetDate).format('D MMMM YYYY')}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
