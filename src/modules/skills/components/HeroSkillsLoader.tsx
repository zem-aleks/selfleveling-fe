import { ReactNode } from "react";

import { getHeroSkills } from "@/modules/skills/api/getHeroSkills";
import { SkillEntity } from "@/modules/skills/types/entity";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { notReachable } from "@/utils/notReachable";
import { useReloadableData } from "@/utils/useReloadableData";

type Props = {
  heroId: string;
  children: (kpis: SkillEntity[]) => ReactNode;
};

export const HeroSkillsLoader = ({ heroId, children }: Props): ReactNode => {
  const { state, reload } = useReloadableData(getHeroSkills, heroId);

  switch (state.type) {
    case "loading":
      return <div>{`Loading skills...`}</div>;

    case "reloading":
    case "loaded":
      return <>{children(state.data)}</>;

    case "error":
      return (
        <div className={"flex flex-col items-center gap-4"}>
          <Label>Something went wrong. Skills are not loaded :(</Label>
          <Button onClick={reload}>Try again</Button>
        </div>
      );

    default:
      return notReachable(state);
  }
};
