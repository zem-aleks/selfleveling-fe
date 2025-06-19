'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { AcceptGoalForm } from '@/modules/goal/components/AcceptGoalForm';
import { DeleteGoalForm } from '@/modules/goal/components/DeleteGoalForm';
import { GoalFormedCard } from '@/modules/goal/components/GoalFormedCard';
import { GoalLoader } from '@/modules/goal/components/GoalLoader';
import { BuildGoalLayout } from '@/modules/goal/layouts/BuildGoalLayout';
import { GoalEntity, GoalFormed } from '@/modules/goal/types/goal';
import { GoalKpisLoader } from '@/modules/kpi/components/GoalKpisLoader';
import { KpiWithMeasurementsEntity } from '@/modules/kpi/types';
import { GoalSkillsLoader } from '@/modules/skills/components/GoalSkillsLoader';
import { notReachable } from '@/utils/notReachable';

type Props = {
  goalId: string;
};

export const FinishGoalPage = ({ goalId }: Props) => {
  const router = useRouter();
  return (
    <GoalLoader goalId={goalId}>
      {({ hero, goal }) => (
        <BuildGoalLayout hero={hero}>
          <>
            <GoalFormedCard goal={goal as GoalFormed} />
            <GoalKpisLoader goalId={goalId}>
              {(kpis) => (
                <FinishGoalChecker goal={goal} kpis={kpis}>
                  {(goal) => (
                    <div className="flex flex-col gap-4">
                      <p>{`You would like to measure it with these KPI's:`}</p>
                      <ul className={''}>
                        {kpis.map((kpi) => (
                          <li key={kpi.id}>
                            <strong>{kpi.title}</strong>
                            <p>{kpi.description}</p>
                            <div className={'flex flex-row gap-4'}>
                              <p>
                                Your target is <b>{kpi.targetValue}</b>
                              </p>
                              <p>
                                Your current value is{' '}
                                <b>
                                  {kpi.measurements.length > 0
                                    ? kpi.measurements[0].value
                                    : 'Not defined'}
                                </b>
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <hr />

                      <GoalSkillsLoader goalId={goalId}>
                        {(skills) => (
                          <div className="flex flex-col gap-4">
                            <p>{`List of skills that are needed to achieve this goal`}</p>
                            <ul className={'flex flex-col gap-4'}>
                              {skills.map((skill) => (
                                <li
                                  key={skill.id}
                                  className={'flex flex-col gap-2'}
                                >
                                  <strong>{skill.title}</strong>
                                  <p>{skill.description}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </GoalSkillsLoader>

                      <hr />

                      <div className={'flex flex-row justify-between gap-4'}>
                        <DeleteGoalForm
                          goal={goal}
                          onMsg={() => router.replace(`/heroes/${hero.id}`)}
                        />
                        <AcceptGoalForm
                          goal={goal}
                          onMsg={() => router.replace(`/heroes/${hero.id}`)}
                          disabled={false}
                        />
                      </div>
                    </div>
                  )}
                </FinishGoalChecker>
              )}
            </GoalKpisLoader>
          </>
        </BuildGoalLayout>
      )}
    </GoalLoader>
  );
};

const FinishGoalChecker = ({
  goal,
  kpis,
  children,
}: {
  goal: GoalEntity;
  kpis: KpiWithMeasurementsEntity[];
  children: (goal: GoalFormed) => ReactNode;
}) => {
  switch (goal.status) {
    case 'draft':
      return (
        <p>{`You need to answer the extra question to finish your goal`}</p>
      );

    case 'formed':
      if (kpis.length === 0) {
        return (
          <p>{`You need to create at least one KPI to finish your goal`}</p>
        );
      }

      return children(goal);

    case 'review':
    case 'active':
      throw new Error('Goal is already finished!');

    default:
      return notReachable(goal);
  }
};
