import Link from 'next/link';

import {
  DeleteGoalForm,
  Msg as DeleteGoalFormMsg,
} from '@/modules/goal/components/DeleteGoalForm';
import { GoalDraft, GoalFormed } from '@/modules/goal/types/goal';
import { Button } from '@/ui/button';
import { Card, CardHeader, CardTitle } from '@/ui/card';

type Msg = DeleteGoalFormMsg;

export const DraftGoalsList = ({
  goals,
  onMsg,
}: {
  goals: Array<GoalDraft | GoalFormed>;
  onMsg: (msg: Msg) => void;
}) => {
  if (goals.length === 0) {
    return (
      <div className={'text-muted-foreground pb-2 text-sm'}>No draft goals</div>
    );
  }

  return (
    <ul className={'flex w-full flex-col gap-2'}>
      {goals.map((goal) => (
        <li key={goal.id}>
          <Card className={'w-full'}>
            <CardHeader>
              <CardTitle
                className={'flex flex-row items-center justify-between'}
              >
                <div>{goal.status === 'draft' ? goal.goal : goal.title}</div>
                <div className={'flex flex-row items-center gap-2'}>
                  <DeleteGoalForm goal={goal} onMsg={onMsg} />
                  <Link href={'/goals/' + goal.id}>
                    <Button>Edit</Button>
                  </Link>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
};
