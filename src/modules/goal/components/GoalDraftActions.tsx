import { ReactNode, useEffect, useState } from "react";

import { AcceptGoalForm } from "@/modules/goal/components/AcceptGoalForm";
import {
  Msg as FollowUpQuestionFormMsg,
  UpdateGoalForm,
} from "@/modules/goal/components/UpdateGoalForm";
import { GoalDraft } from "@/modules/goal/types/goal";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { H2 } from "@/ui/custom/H1";
import { notReachable } from "@/utils/notReachable";

type Msg = FollowUpQuestionFormMsg;

export const GoalDraftActions = ({
  goal,
  onMsg,
}: {
  goal: GoalDraft;
  onMsg: (msg: Msg) => void;
}): ReactNode => {
  const [visible, setVisible] = useState<boolean>(false);
  const isSatisfied = goal.evaluation.overallScore >= 70;
  const isFormHidden = isSatisfied && !visible;

  useEffect(() => {
    setVisible(false);
  }, [goal.goal, goal.targetDate, goal.evaluation.overallScore]);

  return (
    <Card className={"gap-2"}>
      <CardHeader>
        <CardTitle>
          <H2>Actions</H2>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className={"flex flex-row items-center justify-between gap-2"}>
          <div className={"flex flex-row items-center gap-2"}>
            <AcceptGoalForm
              disabled={!isSatisfied}
              goal={goal}
              onMsg={(msg) => {
                switch (msg.type) {
                  case "onGoalAccepted":
                    break;

                  default:
                    return notReachable(msg.type);
                }
              }}
            />
            {isSatisfied && (
              <Button onClick={() => setVisible(!visible)}>
                Edit the goal
              </Button>
            )}
          </div>
          {!isSatisfied && (
            <p className={"text-sm text-red-500"}>
              The goal score must be at least 70!
            </p>
          )}
        </div>
        <hr className={"w-full"} />
        {!isFormHidden && <UpdateGoalForm goal={goal} onMsg={onMsg} />}
      </CardContent>
    </Card>
  );
};
