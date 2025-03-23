"use client";

import { GoalDraftActions } from "@/modules/goal/components/GoalDraftActions";
import { GoalDraftCard } from "@/modules/goal/components/GoalDraftCard";
import { GoalLoader } from "@/modules/goal/components/GoalLoader";
import { H1 } from "@/ui/custom/H1";
import { notReachable } from "@/utils/notReachable";

type Props = {
  goalId: string;
};

export const BuildGoalPage = ({ goalId }: Props) => {
  return (
    <GoalLoader goalId={goalId}>
      {({ hero, goal }, reload) => (
        <div className="flex flex-col gap-4">
          <H1>Goal Draft for {hero.name}!</H1>
          <GoalDraftCard goal={goal} />
          <GoalDraftActions
            goal={goal}
            onMsg={(msg) => {
              switch (msg.type) {
                case "onGoalUpdated":
                  reload();
                  break;

                default:
                  return notReachable(msg.type);
              }
            }}
          />
        </div>
      )}
    </GoalLoader>
  );
};
