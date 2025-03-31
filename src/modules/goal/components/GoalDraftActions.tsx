import { ReactNode } from "react";

import {
  FollowUpQuestionForm,
  Msg as FollowUpQuestionFormMsg,
} from "@/modules/goal/components/FollowUpQuestionForm";
import { KpiBuilder } from "@/modules/goal/components/KpiBuilder";
import { GoalEntity } from "@/modules/goal/types/goal";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { noOperation, notReachable } from "@/utils/notReachable";

type Msg = FollowUpQuestionFormMsg;

type Props = {
  goal: GoalEntity;
  onMsg: (msg: Msg) => void;
};

export const GoalDraftActions = ({ goal, onMsg }: Props): ReactNode => {
  switch (goal.status) {
    case "draft":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Extra Question:</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>{goal.followUpQuestion}</p>
            <FollowUpQuestionForm goalId={goal.id} onMsg={onMsg} />
          </CardContent>
        </Card>
      );

    case "formed":
      return <KpiBuilder goal={goal} onMsg={noOperation} />;

    default:
      return notReachable(goal);
  }
};
