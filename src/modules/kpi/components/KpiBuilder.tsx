import { ReactNode } from "react";

import { GoalFormed } from "@/modules/goal/types/goal";
import { DraftKpisLoader } from "@/modules/kpi/components/DraftKpisLoader";
import { KpiItem } from "@/modules/kpi/components/KpiItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { notReachable } from "@/utils/notReachable";

type Msg = { type: "test" };

type Props = {
  goal: GoalFormed;
  onMsg: (msg: Msg) => void;
};

export const KpiBuilder = ({ goal, onMsg }: Props): ReactNode => {
  return (
    <DraftKpisLoader goalId={goal.id}>
      {(kpis, reload) => (
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
                <KpiItem
                  key={kpi.id}
                  goal={goal}
                  kpi={kpi}
                  onMsg={(msg) => {
                    switch (msg.type) {
                      case "onKpiSaved":
                        reload();
                        break;

                      default:
                        return notReachable(msg.type);
                    }
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </DraftKpisLoader>
  );
};
