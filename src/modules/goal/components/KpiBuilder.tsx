import { ReactNode } from "react";

import { GoalFormed } from "@/modules/goal/types/goal";
import { DraftKpisLoader } from "@/modules/kpi/components/DraftKpisLoader";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

type Msg = { type: "test" };

type Props = {
  goal: GoalFormed;
  onMsg: (msg: Msg) => void;
};

export const KpiBuilder = ({ goal, onMsg }: Props): ReactNode => {
  // TODO: suggest a few possible KPI's and ask the user to pick one or add personal KPI
  // Altogether with the KPI, the user should be able to add a target value and current value
  return (
    <DraftKpisLoader goalId={goal.id}>
      {(kpis) => (
        <Card>
          <CardHeader>
            <CardTitle>{`Let's make at least one KPI to track the results over the time`}</CardTitle>
            {/*<CardDescription>*/}
            {/*  Now we can go and build a roadmap. Are you ready?*/}
            {/*</CardDescription>*/}
          </CardHeader>
          <CardContent>
            <div className={"flex flex-col gap-4"}>
              {kpis.map((kpi) => (
                <div className={"flex flex-col gap-2"} key={kpi.id}>
                  <Label>{kpi.description}</Label>
                  <div className={"flex flex-row gap-2"}>
                    <Input placeholder="name" value={kpi.title} />
                    <Input placeholder="Current value" />
                    <Input placeholder="targetValue" value={kpi.targetValue} />
                    <Button>Accept</Button>
                  </div>
                </div>
              ))}
            </div>

            {/*<Button type="submit">Start</Button>*/}
          </CardContent>
        </Card>
      )}
    </DraftKpisLoader>
  );
};
