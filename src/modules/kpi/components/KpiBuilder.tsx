import { ReactNode } from "react";
import Link from "next/link";

import { GoalFormed } from "@/modules/goal/types/goal";
import { DraftKpisLoader } from "@/modules/kpi/components/DraftKpisLoader";
import { KpiItem } from "@/modules/kpi/components/KpiItem";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { notReachable } from "@/utils/notReachable";

type Props = {
  goal: GoalFormed;
};

export const KpiBuilder = ({ goal }: Props): ReactNode => {
  return (
    <DraftKpisLoader goalId={goal.id}>
      {(kpis, reload) => (
        <Card>
          <CardHeader>
            <CardTitle>{`Let's make at least one KPI to track the results over the time`}</CardTitle>
            <Link href={`/goals/${goal.id}/finish`}>
              <Button
                className={"mt-2 w-full bg-green-500"}
                onClick={() => console.log("Create KPI")}
                disabled={
                  kpis.filter((kpi) => kpi.status === "active").length === 0
                }
              >
                Continue
              </Button>
            </Link>
            <p className={"text-sm text-gray-500"}>
              At least one KPI has to be defined
            </p>
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
