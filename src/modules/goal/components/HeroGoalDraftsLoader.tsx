import { ReactNode } from "react";

import { getHeroGoalDrafts } from "@/modules/goal/api/getHeroGoalDrafts";
import { GoalDraft, GoalFormed } from "@/modules/goal/types/goal";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { notReachable } from "@/utils/notReachable";
import { useReloadableData } from "@/utils/useReloadableData";

type Props = {
  heroId: string;
  children: (
    goals: (GoalDraft | GoalFormed)[],
    reload: () => void,
  ) => ReactNode;
};

export const HeroGoalDraftsLoader = ({
  heroId,
  children,
}: Props): ReactNode => {
  const { state, reload } = useReloadableData(getHeroGoalDrafts, heroId);

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
