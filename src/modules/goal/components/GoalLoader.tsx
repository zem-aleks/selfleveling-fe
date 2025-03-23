import { ReactNode } from "react";

import { getGoal, GoalData } from "@/modules/goal/api/getGoal";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { notReachable } from "@/utils/notReachable";
import { useReloadableData } from "@/utils/useReloadableData";

type Props = {
  goalId: string;
  children: (data: GoalData, reload: () => void) => ReactNode;
};

export const GoalLoader = ({ goalId, children }: Props): ReactNode => {
  const { state, reload } = useReloadableData(getGoal, goalId);

  switch (state.type) {
    case "loading":
      return <>Loading...</>;

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
