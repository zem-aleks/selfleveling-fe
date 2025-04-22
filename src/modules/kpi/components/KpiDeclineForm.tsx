import { ReactNode, useEffect } from "react";

import { toast } from "sonner";

import { GoalFormed } from "@/modules/goal/types/goal";
import { saveKpi } from "@/modules/kpi/api/saveKpi";
import { KpiWithMeasurementsEntity } from "@/modules/kpi/types";
import { Button } from "@/ui/button";
import { notReachable } from "@/utils/notReachable";
import { useLazyLoadableData } from "@/utils/useLazyLoadableData";

export type Msg = { type: "onKpiSaved"; kpi: KpiWithMeasurementsEntity };

type Props = {
  goal: GoalFormed;
  kpi: KpiWithMeasurementsEntity;
  onMsg: (msg: Msg) => void;
};

export const KpiDeclineForm = ({ kpi, onMsg }: Props): ReactNode => {
  const { state, load, reset } = useLazyLoadableData(saveKpi);

  useEffect(() => {
    switch (state.type) {
      case "not_requested":
      case "loading":
        break;

      case "error":
        toast.error(state.error.response?.data.message || state.error.message);
        break;

      case "loaded":
        onMsg({ type: "onKpiSaved", kpi: state.data });
        reset();
        break;

      default:
        return notReachable(state);
    }
  }, [state]);

  return (
    <Button
      className={"bg-red-500"}
      loading={state.type === "loading"}
      onClick={() =>
        load({
          kpiId: kpi.id,
          title: kpi.title,
          targetValue: kpi.targetValue,
          description: kpi.description,
          currentValue:
            kpi.measurements.length > 0 ? kpi.measurements[0].value : "n/a",
          status: "draft",
        })
      }
    >
      Decline
    </Button>
  );
};
