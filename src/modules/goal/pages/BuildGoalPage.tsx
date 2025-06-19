'use client';

import { useRouter } from 'next/navigation';

import { AcceptGoalForm } from '@/modules/goal/components/AcceptGoalForm';
import { GoalDraftActions } from '@/modules/goal/components/GoalDraftActions';
import { GoalDraftCard } from '@/modules/goal/components/GoalDraftCard';
import { GoalFormedCard } from '@/modules/goal/components/GoalFormedCard';
import { GoalLoader } from '@/modules/goal/components/GoalLoader';
import { BuildGoalLayout } from '@/modules/goal/layouts/BuildGoalLayout';
import { GoalEntity } from '@/modules/goal/types/goal';
import { HeroEntity } from '@/modules/hero/types';
import { GoalKpisLoader } from '@/modules/kpi/components/GoalKpisLoader';
import { KpiBuilder } from '@/modules/kpi/components/KpiBuilder';
import { KpiItem } from '@/modules/kpi/components/KpiItem';
import { GoalSkillsLoader } from '@/modules/skills/components/GoalSkillsLoader';
import { SkillItem } from '@/modules/skills/components/SkillItem';
import { H2 } from '@/ui/custom/H1';
import { notReachable } from '@/utils/notReachable';

type Props = {
  goalId: string;
};

export const BuildGoalPage = ({ goalId }: Props) => {
  return (
    <GoalLoader goalId={goalId}>
      {({ hero, goal }, reload) => (
        <Page goal={goal} hero={hero} reload={reload} />
      )}
    </GoalLoader>
  );
};

const Page = ({
  goal,
  hero,
  reload,
}: {
  goal: GoalEntity;
  hero: HeroEntity;
  reload: () => void;
}) => {
  const router = useRouter();
  switch (goal.status) {
    // TODO: show error block
    case 'active':
      throw new Error('Goal is already active');

    case 'draft':
      return (
        <BuildGoalLayout hero={hero}>
          <GoalDraftCard goal={goal} />
          <GoalDraftActions
            goal={goal}
            onMsg={(msg) => {
              switch (msg.type) {
                case 'onGoalAccepted':
                case 'onGoalUpdated':
                  reload();
                  break;

                default:
                  return notReachable(msg);
              }
            }}
          />
        </BuildGoalLayout>
      );

    case 'formed':
      return (
        <BuildGoalLayout hero={hero}>
          <GoalFormedCard goal={goal} />
          <KpiBuilder
            goal={goal}
            onMsg={(msg) => {
              switch (msg.type) {
                case 'onGoalAccepted':
                  reload();
                  break;

                default:
                  return notReachable(msg.type);
              }
            }}
          />
        </BuildGoalLayout>
      );

    case 'review':
      return (
        <BuildGoalLayout hero={hero}>
          <GoalFormedCard goal={goal} />
          <AcceptGoalForm
            goal={goal}
            onMsg={() => router.replace(`/heroes/${hero.id}`)}
            disabled={false}
          />
          <div className="flex flex-col gap-2">
            <H2>{`KPI's`}</H2>
            <GoalKpisLoader goalId={goal.id}>
              {(kpis) => kpis.map((kpi) => <KpiItem key={kpi.id} kpi={kpi} />)}
            </GoalKpisLoader>
          </div>

          <div className="flex flex-col gap-4">
            <H2>{`Skills that needed to achieve this goal`}</H2>
            <GoalSkillsLoader goalId={goal.id}>
              {(skills) =>
                skills.map((skill) => (
                  <SkillItem key={skill.id} skill={skill} />
                ))
              }
            </GoalSkillsLoader>
          </div>
        </BuildGoalLayout>
      );

    default:
      return notReachable(goal);
  }
};
