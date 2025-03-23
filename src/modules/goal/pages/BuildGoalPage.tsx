"use client";

import { GoalLoader } from "@/modules/goal/components/GoalLoader";
import { H1 } from "@/ui/custom/H1";

type Props = {
  goalId: string;
};

export const BuildGoalPage = ({ goalId }: Props) => {
  return (
    <GoalLoader goalId={goalId}>
      {({ hero, goal }) => (
        <div className="flex flex-col gap-4">
          <H1>Let&apos;s build your new goal {hero.name}!</H1>
          <p>
            This process takes some time to clarify the details. We will start
            with the draft and try to organize them step by step
          </p>
          <div className={"w-full"}>GOAL</div>
        </div>
      )}
    </GoalLoader>
  );
};
