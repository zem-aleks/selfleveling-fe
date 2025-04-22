import { ReactNode } from "react";

import { SkillEntity } from "@/modules/skills/types/entity";
import { Badge } from "@/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Progress } from "@/ui/progress";

type Props = {
  skill: SkillEntity;
};

export const SkillItem = ({ skill }: Props): ReactNode => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className={"flex flex-row items-center justify-between"}>
            <p>{skill.title}</p>
            <Badge className={"bg-green-500"}>Level {skill.level}</Badge>
          </div>
        </CardTitle>
        <CardDescription>
          <div className={"text-primary"}>{skill.description}</div>
          <div className={"mt-2 flex flex-col gap-2"}>
            <Progress value={skill.levelProgress} />
            <div>
              Experience: {skill.experience} / {skill.experienceToLevelUp}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
