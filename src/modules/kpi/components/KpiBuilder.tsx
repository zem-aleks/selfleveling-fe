import { ReactNode } from "react";

import { AcceptGoalForm } from "@/modules/goal/components/AcceptGoalForm";
import { GoalFormed } from "@/modules/goal/types/goal";
import { DraftKpisLoader } from "@/modules/kpi/components/DraftKpisLoader";
import { KpiItemEdit } from "@/modules/kpi/components/KpiItemEdit";
import { KpiWithMeasurementsEntity } from "@/modules/kpi/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { H2 } from "@/ui/custom/H1";
import { notReachable } from "@/utils/notReachable";

type Msg = { type: "onGoalAccepted" };

type Props = {
  goal: GoalFormed;
  onMsg: (msg: Msg) => void;
};

export const KpiBuilder = ({ goal, onMsg }: Props): ReactNode => {
  return (
    <DraftKpisLoader goalId={goal.id}>
      {(kpis, reload) => (
        <Builder kpis={kpis} goal={goal} reload={reload} onMsg={onMsg} />
      )}
    </DraftKpisLoader>
  );
};

const Builder = ({
  goal,
  kpis,
  reload,
  onMsg,
}: {
  goal: GoalFormed;
  kpis: KpiWithMeasurementsEntity[];
  reload: () => void;
  onMsg: (msg: Msg) => void;
}) => {
  const hasActiveKpis =
    kpis.filter((kpi) => kpi.status === "active").length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <H2>{`Goal Key Point Indicators (KPI's)`}</H2>
        </CardTitle>
        <AcceptGoalForm
          goal={goal}
          onMsg={(msg) => {
            switch (msg.type) {
              case "onGoalAccepted":
                onMsg({ type: "onGoalAccepted" });
                break;

              default:
                return notReachable(msg.type);
            }
          }}
          disabled={!hasActiveKpis}
        />

        {!hasActiveKpis && (
          <p className={"text-sm text-gray-500"}>
            At least one KPI has to be defined
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className={"flex flex-col gap-4"}>
          {kpis.map((kpi) => (
            <KpiItemEdit
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
  );
};
