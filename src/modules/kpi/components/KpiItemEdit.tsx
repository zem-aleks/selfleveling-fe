import { ReactNode, useState } from "react";

import { GoalFormed } from "@/modules/goal/types/goal";
import { KpiDeclineForm } from "@/modules/kpi/components/KpiDeclineForm";
import { KpiForm } from "@/modules/kpi/components/KpiForm";
import { KpiWithMeasurementsEntity } from "@/modules/kpi/types";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { notReachable } from "@/utils/notReachable";

export type Msg = { type: "onKpiSaved"; kpi: KpiWithMeasurementsEntity };

type Props = {
  goal: GoalFormed;
  kpi: KpiWithMeasurementsEntity;
  onMsg: (msg: Msg) => void;
};

type State = { type: "idle" } | { type: "edit" };

export const KpiItemEdit = ({ goal, kpi, onMsg }: Props): ReactNode => {
  const [state, setState] = useState<State>({ type: "idle" });

  switch (state.type) {
    case "idle":
      switch (kpi.status) {
        case "draft":
          return (
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className={"flex flex-row items-center justify-between"}>
                    <p>{kpi.title}</p>
                    <Badge variant={"secondary"}>{kpi.status}</Badge>
                  </div>
                </CardTitle>
                <div className={"pb-2"}>{kpi.description}</div>
                <Button onClick={() => setState({ type: "edit" })}>
                  Review & Accept
                </Button>
              </CardHeader>
            </Card>
          );

        case "active":
          return (
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className={"flex flex-row items-center justify-between"}>
                    <p>{kpi.title}</p>
                    <Badge className={"bg-green-500"}>{kpi.status}</Badge>
                  </div>
                </CardTitle>
                <CardDescription>
                  <div className={"text-primary"}>{kpi.description}</div>
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
                </CardDescription>

                <div className={"flex flex-row gap-4 [&>*]:flex-1"}>
                  <Button
                    className={"border-black"}
                    onClick={() => setState({ type: "edit" })}
                  >
                    Edit
                  </Button>
                  <KpiDeclineForm
                    kpi={kpi}
                    goal={goal}
                    onMsg={(msg) => {
                      switch (msg.type) {
                        case "onKpiSaved":
                          setState({ type: "idle" });
                          onMsg(msg);
                          break;

                        default:
                          return notReachable(msg.type);
                      }
                    }}
                  />
                </div>
              </CardHeader>
            </Card>
          );

        default:
          return notReachable(kpi.status);
      }

    case "edit":
      return (
        <KpiForm
          goal={goal}
          kpi={kpi}
          onMsg={(msg) => {
            switch (msg.type) {
              case "onCancel":
                setState({ type: "idle" });
                break;

              case "onKpiSaved":
                setState({ type: "idle" });
                onMsg(msg);
                break;

              default:
                return notReachable(msg);
            }
          }}
        />
      );

    default:
      return notReachable(state);
  }
};
