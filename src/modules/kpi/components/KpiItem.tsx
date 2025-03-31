import { ReactNode, useState } from "react";

import { GoalFormed } from "@/modules/goal/types/goal";
import { KpiDeclineForm } from "@/modules/kpi/components/KpiDeclineForm";
import { KpiForm } from "@/modules/kpi/components/KpiForm";
import { KpiWithMeasurementsEntity } from "@/modules/kpi/types";
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

export const KpiItem = ({ goal, kpi, onMsg }: Props): ReactNode => {
  const [state, setState] = useState<State>({ type: "idle" });

  switch (state.type) {
    case "idle":
      switch (kpi.status) {
        case "draft":
          return (
            <Card>
              <CardHeader>
                <CardTitle>{kpi.title}</CardTitle>
                <CardDescription>{kpi.status}</CardDescription>
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
                <CardTitle>{kpi.title}</CardTitle>
                <CardDescription>{kpi.status}</CardDescription>
                <div className={"pb-2"}>{kpi.description}</div>
                <Button onClick={() => setState({ type: "edit" })}>Edit</Button>
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
