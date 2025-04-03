import { ReactNode } from "react";

import { getGoalKpis } from "@/modules/kpi/api/getGoalKpis";
import { KpiWithMeasurementsEntity } from "@/modules/kpi/types";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { notReachable } from "@/utils/notReachable";
import { useReloadableData } from "@/utils/useReloadableData";

type Props = {
  goalId: string;
  children: (
    kpis: KpiWithMeasurementsEntity[],
    reload: () => void,
  ) => ReactNode;
};

export const GoalKpisLoader = ({ goalId, children }: Props): ReactNode => {
  const { state, reload } = useReloadableData(getGoalKpis, goalId);

  switch (state.type) {
    case "loading":
      return <>{`Preparing possible KPI's...`}</>;

    case "reloading":
    case "loaded":
      return <>{children(state.data, reload)}</>;

    case "error":
      return (
        <div className={"flex flex-col items-center gap-4"}>
          <Label>Something went wrong</Label>
          <Button onClick={reload}>Try again</Button>
        </div>
      );

    default:
      return notReachable(state);
  }
};
