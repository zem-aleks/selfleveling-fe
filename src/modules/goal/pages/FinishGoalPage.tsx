"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { AcceptGoalForm } from "@/modules/goal/components/AcceptGoalForm";
import { DeleteGoalForm } from "@/modules/goal/components/DeleteGoalForm";
import { GoalLoader } from "@/modules/goal/components/GoalLoader";
import { GoalEntity, GoalFormed } from "@/modules/goal/types/goal";
import { GoalKpisLoader } from "@/modules/kpi/components/GoalKpisLoader";
import { KpiWithMeasurementsEntity } from "@/modules/kpi/types";
import { SkillsLoader } from "@/modules/skills/components/SkillsLoader";
import { H1 } from "@/ui/custom/H1";
import { notReachable } from "@/utils/notReachable";

type Props = {
  goalId: string;
};

export const FinishGoalPage = ({ goalId }: Props) => {
  const router = useRouter();
  return (
    <GoalLoader goalId={goalId}>
      {({ hero, goal }) => (
        <div className="flex flex-col gap-4">
          <H1>Hey {hero.name}!</H1>
          <p>{`Based on our conversation we identified that your goal is:`}</p>
          <GoalKpisLoader goalId={goalId}>
            {(kpis) => (
              <FinishGoalChecker goal={goal} kpis={kpis}>
                {(goal) => (
                  <div className="flex flex-col gap-4">
                    <strong>{goal.title}</strong>
                    <p>{goal.description}</p>

                    <hr />

                    <p>{`You would like to measure it with these KPI's:`}</p>
                    <ul className={""}>
                      {kpis.map((kpi) => (
                        <li key={kpi.id}>
                          <strong>{kpi.title}</strong>
                          <p>{kpi.description}</p>
                          <div className={"flex flex-row gap-4"}>
                            <p>
                              Your target is <b>{kpi.targetValue}</b>
                            </p>
                            <p>
                              Your current value is{" "}
                              <b>
                                {kpi.measurements.length > 0
                                  ? kpi.measurements[0].value
                                  : "Not defined"}
                              </b>
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <hr />

                    <SkillsLoader goalId={goalId}>
                      {(skills) => (
                        <div className="flex flex-col gap-4">
                          <p>{`List of skills that are needed to achieve this goal`}</p>
                          <ul className={"flex flex-col gap-4"}>
                            {skills.map((skill) => (
                              <li
                                key={skill.id}
                                className={"flex flex-col gap-2"}
                              >
                                <strong>{skill.title}</strong>
                                <p>{skill.description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </SkillsLoader>

                    <hr />

                    <div className={"flex flex-row justify-between gap-4"}>
                      <DeleteGoalForm
                        goal={goal}
                        onMsg={() => router.replace(`/heroes/${hero.id}`)}
                      />
                      <AcceptGoalForm
                        goal={goal}
                        onMsg={() => router.replace(`/heroes/${hero.id}`)}
                      />
                    </div>
                  </div>
                )}
              </FinishGoalChecker>
            )}
          </GoalKpisLoader>
        </div>
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
    case "draft":
      return (
        <p>{`You need to answer the extra question to finish your goal`}</p>
      );

    case "formed":
      if (kpis.length === 0) {
        return (
          <p>{`You need to create at least one KPI to finish your goal`}</p>
        );
      }

      return children(goal);

    default:
      return notReachable(goal);
  }
};
