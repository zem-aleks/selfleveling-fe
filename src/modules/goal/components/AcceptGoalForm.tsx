import { useEffect } from "react";

import { toast } from "sonner";

import { acceptGoal } from "@/modules/goal/api/acceptGoal";
import { GoalDraft, GoalFormed } from "@/modules/goal/types/goal";
import { Button } from "@/ui/button";
import { notReachable } from "@/utils/notReachable";
import { useLazyLoadableData } from "@/utils/useLazyLoadableData";

export type Msg = { type: "onGoalAccepted"; goal: GoalFormed };

type Props = {
  goal: GoalDraft | GoalFormed;
  disabled: boolean;
  onMsg: (msg: Msg) => void;
};

export const AcceptGoalForm = ({ goal, disabled, onMsg }: Props) => {
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
        toast.success("Goal definition was saved");
        onMsg({ type: "onGoalAccepted", goal: state.data as GoalFormed });
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
          disabled={disabled}
        >
          Continue
        </Button>
      );

    case "loaded":
    case "loading":
      return (
        <Button className={"grow bg-green-500"} loading={true}>
          Continue
        </Button>
      );

    default:
      return notReachable(state);
  }
};
