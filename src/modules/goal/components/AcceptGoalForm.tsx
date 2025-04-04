import { useEffect } from "react";

import { toast } from "sonner";

import { acceptGoal } from "@/modules/goal/api/acceptGoal";
import { GoalFormed } from "@/modules/goal/types/goal";
import { Button } from "@/ui/button";
import { notReachable } from "@/utils/notReachable";
import { useLazyLoadableData } from "@/utils/useLazyLoadableData";

type Msg = { type: "onGoalAccepted" };

type Props = {
  goal: GoalFormed;
  onMsg: (msg: Msg) => void;
};

export const AcceptGoalForm = ({ goal, onMsg }: Props) => {
  const { state, reset, load } = useLazyLoadableData(acceptGoal);
  useEffect(() => {
    switch (state.type) {
      case "not_requested":
      case "loading":
        break;

      case "error":
        toast.error(state.error.response?.data.message || state.error.message);
        break;

      case "loaded":
        toast.success("Goal was created successfully");
        onMsg({ type: "onGoalAccepted" });
        reset();
        break;

      default:
        return notReachable(state);
    }
  }, [state]);

  switch (state.type) {
    case "error":
    case "not_requested":
      return (
        <Button
          className={"grow bg-green-500"}
          onClick={() => load({ goalId: goal.id })}
        >
          Accept
        </Button>
      );

    case "loaded":
    case "loading":
      return (
        <Button className={"grow bg-green-500"} loading={true}>
          Accept
        </Button>
      );

    default:
      return notReachable(state);
  }
};
