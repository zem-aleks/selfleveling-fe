import { ReactNode } from "react";

import {
  FollowUpQuestionForm,
  Msg as FollowUpQuestionFormMsg,
} from "@/modules/goal/components/FollowUpQuestionForm";
import { GoalEntity } from "@/modules/goal/types/goal";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { notReachable } from "@/utils/notReachable";

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
      return (
        <Card>
          <CardHeader>
            <CardTitle>{`Great job! Fantastic goal :)`}</CardTitle>
            <CardDescription>
              Now we can go and build a roadmap. Are you ready?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button type="submit">Start</Button>
          </CardContent>
        </Card>
      );

    default:
      return notReachable(goal);
  }
};
