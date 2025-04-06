import { ReactNode } from "react";

import { GoalDraft, GoalFormed } from "@/modules/goal/types/goal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { notReachable } from "@/utils/notReachable";

type Props = {
  goal: GoalDraft | GoalFormed;
};

export const GoalDraftCard = ({ goal }: Props): ReactNode => {
  switch (goal.status) {
    case "draft":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Your initial request</CardTitle>
            <CardDescription>Score: {goal.score}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{goal.goal}</p>
          </CardContent>
        </Card>
      );

    case "formed":
      return (
        <Card>
          <CardHeader>
            <CardTitle>{goal.title}</CardTitle>
            <CardDescription>Score: {goal.score}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{goal.description}</p>
          </CardContent>
        </Card>
      );

    default:
      return notReachable(goal);
  }
};
