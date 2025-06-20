import { ReactNode } from 'react';

import dayjs from 'dayjs';

import { QuestEntity } from '@/modules/quests/types/entity';
import { Card, CardHeader, CardTitle } from '@/ui/card';
import { H2, H3 } from '@/ui/custom/H1';

type Props = {
  quests: QuestEntity[];
};

export const QuestsList = ({ quests }: Props): ReactNode => {
  if (quests.length === 0) {
    return (
      <div className={'text-muted-foreground pb-2 text-sm'}>
        No active quests now
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
                className={'flex flex-row items-start justify-between gap-2'}
              >
                <div className={'flex flex-col gap-2'}>
                  <H2>{quest.title}</H2>
                  <H3 className={'leading-6 font-normal'}>
                    {quest.description}
                  </H3>
                </div>
                <div
                  className={
                    'min-w-[124px] rounded-md border-2 border-blue-300 p-1 px-2'
                  }
                >
                  <p className={'text-right text-sm'}>Deadline</p>
                  <p className={'text-muted-foreground text-right font-medium'}>
                    {dayjs(quest.deadline).format('D MMMM YYYY')}
                  </p>
                </div>
              </CardTitle>

              <hr className={'w-full'} />

              <div className={'flex flex-col gap-2'}>
                <H2 className={'text-emerald-600'}>Bonus</H2>
                <div className={'flex flex-col'}>
                  <p>
                    Experience: <b>+{quest.rewards.experience}xp</b>
                  </p>

                  {Object.entries(quest.rewards.attributesReward).map(
                    ([key, value]) => (
                      <p key={key}>
                        <span className={'capitalize'}>{key}</span>:{' '}
                        <b>+{value} points</b>
                      </p>
                    ),
                  )}

                  {Object.entries(quest.rewards.skillsExperience).map(
                    ([key, value]) => (
                      <p key={key}>
                        <span className={'capitalize'}>{key}</span>:{' '}
                        <b>+{value} skill points</b>
                      </p>
                    ),
                  )}
                </div>
              </div>

              <hr className={'w-full'} />

              <div className={'flex flex-col gap-2'}>
                <H2 className={'text-red-800'}>Penalties</H2>
                <div className={'flex flex-col'}>
                  {Object.entries(quest.penalties.attributesPenalty).map(
                    ([key, value]) => (
                      <p key={key}>
                        <span className={'capitalize'}>{key}</span>:{' '}
                        <b>-{value} points</b>
                      </p>
                    ),
                  )}

                  {Object.entries(quest.penalties.skillsPenalty).map(
                    ([key, value]) => (
                      <p key={key}>
                        <span className={'capitalize'}>{key}</span>:{' '}
                        <b>-{value} skill points</b>
                      </p>
                    ),
                  )}
                </div>
              </div>

              {/*<div className={'flex flex-col gap-2'}>{quest.description}</div>*/}
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
};
