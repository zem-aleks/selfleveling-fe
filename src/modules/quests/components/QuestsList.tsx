import { ReactNode } from 'react';

import { QuestEntity } from '@/modules/quests/types/entity';
import { Card, CardDescription, CardHeader, CardTitle } from '@/ui/card';

type Props = {
  quests: QuestEntity[];
};

export const QuestsList = ({ quests }: Props): ReactNode => {
  if (quests.length === 0) {
    return (
      <div className={'text-muted-foreground pb-2 text-sm'}>
        No active quests yet
      </div>
    );
  }

  return (
    <ul className={'flex w-full flex-col gap-2'}>
      {quests.map((quest) => (
        <li key={quest.id}>
          <Card className={'w-full'}>
            <CardHeader>
              <CardTitle
                className={'flex flex-row items-center justify-between'}
              >
                <div>{quest.title}</div>
              </CardTitle>
              <CardDescription>{quest.description}</CardDescription>

              {/*<div className={'flex flex-col gap-2'}>{quest.description}</div>*/}
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
};
