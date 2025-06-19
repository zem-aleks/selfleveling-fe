import { SkillEntity } from '@/modules/skills/types/entity';
import { Button } from '@/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Progress } from '@/ui/progress';

export const SkillsList = ({ skills }: { skills: SkillEntity[] }) => {
  if (skills.length === 0) {
    return (
      <div className={'text-muted-foreground pb-2 text-sm'}>No skills yet</div>
    );
  }

  return (
    <ul className={'flex w-full flex-col gap-2'}>
      {skills.map((skill) => (
        <li key={skill.id}>
          <Card className={'w-full'}>
            <CardHeader>
              <CardTitle
                className={'flex flex-row items-center justify-between'}
              >
                <div>{skill.title}</div>
                <div>Level {skill.level}</div>
              </CardTitle>
              <CardDescription>{skill.description}</CardDescription>

              <div className={'flex flex-col gap-2'}>
                <Progress value={skill.levelProgress} />
                <div>
                  Experience: {skill.experience} / {skill.experienceToLevelUp}
                </div>
              </div>

              <div className={'flex justify-end'}>
                <Button>Develop</Button>
              </div>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
};
