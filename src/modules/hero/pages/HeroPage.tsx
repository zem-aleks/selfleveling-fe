'use client';

import Link from 'next/link';

import { ActiveGoalsList } from '@/modules/goal/components/ActiveGoalsList';
import { DraftGoalsList } from '@/modules/goal/components/DraftGoalsList';
import { HeroGoalDraftsLoader } from '@/modules/goal/components/HeroGoalDraftsLoader';
import { HeroGoalsLoader } from '@/modules/goal/components/HeroGoalsLoader';
import { HeroAttributes } from '@/modules/hero/components/HeroAttributes';
import { HeroLoader } from '@/modules/hero/components/HeroLoader';
import { HeroQuestsLoader } from '@/modules/quests/components/HeroQuestsLoader';
import { QuestsList } from '@/modules/quests/components/QuestsList';
import { HeroSkillsLoader } from '@/modules/skills/components/HeroSkillsLoader';
import { SkillsList } from '@/modules/skills/components/SkillsList';
import { Button } from '@/ui/button';
import { H1, H2 } from '@/ui/custom/H1';
import { Progress } from '@/ui/progress';
import { notReachable } from '@/utils/notReachable';

type Props = {
  heroId: string;
};

export const HeroPage = ({ heroId }: Props) => {
  return (
    <HeroLoader heroId={heroId}>
      {(hero) => (
        <div className="flex flex-col items-center gap-4">
          <div
            className={'flex w-full flex-row justify-between gap-4 py-2 pt-4'}
          >
            <Link href={`/`}>
              <Button variant={'outline'}>Back</Button>
            </Link>
            <div
              className={
                'flex w-full max-w-[240px] flex-col items-center gap-1'
              }
            >
              <H1>Hero {hero.name}</H1>
              <p className={'text-muted-foreground'}>
                Level {hero.level} ({hero.experience} /{' '}
                {hero.experienceToLevelUp} EXP)
              </p>
              <Progress value={hero.levelProgress} />
            </div>
            <Link href={`/heroes/${heroId}/goal`}>
              <Button>Create Goal</Button>
            </Link>
          </div>

          <hr className={'w-full'} />

          <HeroAttributes hero={hero} />

          <hr className={'w-full'} />

          <div className={'flex w-full flex-col items-start gap-4'}>
            <H2>Quests</H2>
            <HeroQuestsLoader heroId={heroId} status={'active'}>
              {(quests) => <QuestsList quests={quests} />}
            </HeroQuestsLoader>
          </div>

          <hr className={'w-full'} />

          <div className={'flex w-full flex-col items-start gap-4'}>
            <H2>Goals</H2>
            <HeroGoalsLoader heroId={heroId}>
              {(goals) => <ActiveGoalsList goals={goals} />}
            </HeroGoalsLoader>
          </div>

          <hr className={'w-full'} />

          <div className={'flex w-full flex-col items-start gap-4'}>
            <H2>Goal Drafts</H2>
            <HeroGoalDraftsLoader heroId={heroId}>
              {(goals, reload) => (
                <DraftGoalsList
                  goals={goals}
                  onMsg={(msg) => {
                    switch (msg.type) {
                      case 'onGoalDeleted':
                        reload();
                        break;

                      default:
                        return notReachable(msg.type);
                    }
                  }}
                />
              )}
            </HeroGoalDraftsLoader>
          </div>

          <hr className={'w-full'} />

          <div className={'flex w-full flex-col items-start gap-4'}>
            <H2>Skills</H2>

            <HeroSkillsLoader heroId={heroId}>
              {(skills) => <SkillsList skills={skills} />}
            </HeroSkillsLoader>
          </div>
        </div>
      )}
    </HeroLoader>
  );
};
