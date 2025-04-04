"use client";

import Link from "next/link";

import { HeroGoalDraftsLoader } from "@/modules/goal/components/HeroGoalDraftsLoader";
import { HeroGoalsLoader } from "@/modules/goal/components/HeroGoalsLoader";
import { HeroLoader } from "@/modules/hero/components/HeroLoader";
import { HeroSkillsLoader } from "@/modules/skills/components/HeroSkillsLoader";
import { Button } from "@/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { H1, H2 } from "@/ui/custom/H1";
import { Progress } from "@/ui/progress";

type Props = {
  heroId: string;
};

export const HeroPage = ({ heroId }: Props) => {
  return (
    <HeroLoader heroId={heroId}>
      {(hero) => (
        <div className="flex flex-col items-center gap-4">
          <div
            className={
              "flex w-full flex-row items-center justify-between gap-4 py-2 pt-4"
            }
          >
            <H1>Hero {hero.name}</H1>
            <Link href={`/heroes/${heroId}/goal`}>
              <Button>Create Goal</Button>
            </Link>
          </div>

          <hr className={"w-full"} />

          <div className={"flex w-full flex-col items-start gap-4"}>
            <H2>Goals</H2>

            <HeroGoalsLoader heroId={heroId}>
              {(goals) => (
                <ul className={"flex w-full flex-col gap-2"}>
                  {goals.map((goal) => (
                    <li key={goal.id}>
                      <Card className={"w-full"}>
                        <CardHeader>
                          <CardTitle
                            className={
                              "flex flex-row items-center justify-between"
                            }
                          >
                            <div>{goal.title}</div>
                          </CardTitle>
                          <CardDescription>{goal.description}</CardDescription>

                          <div className={"flex flex-col gap-2"}>
                            <ul>
                              {goal.kpis.map((kpi) => (
                                <li key={kpi.id} className={"text-sm"}>
                                  <p className={"font-bold"}>{kpi.title}</p>
                                  <div className={"flex gap-2"}>
                                    <div>
                                      {kpi.currentValue} of {kpi.targetValue}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardHeader>
                      </Card>
                    </li>
                  ))}
                </ul>
              )}
            </HeroGoalsLoader>
          </div>

          <hr className={"w-full"} />

          <div className={"flex w-full flex-col items-start gap-4"}>
            <H2>Goal Drafts</H2>

            <HeroGoalDraftsLoader heroId={heroId}>
              {(goals) => (
                <ul className={"flex w-full flex-col gap-2"}>
                  {goals.map((goal) => (
                    <li key={goal.id}>
                      <Card className={"w-full"}>
                        <CardHeader>
                          <CardTitle
                            className={
                              "flex flex-row items-center justify-between"
                            }
                          >
                            <div>
                              {goal.status === "draft" ? goal.goal : goal.title}
                            </div>
                            <div className={"flex flex-row items-center gap-2"}>
                              <Button>Edit</Button>
                              <Button className={"bg-red-500"}>Delete</Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </li>
                  ))}
                </ul>
              )}
            </HeroGoalDraftsLoader>
          </div>

          <hr className={"w-full"} />

          <div className={"flex w-full flex-col items-start gap-4"}>
            <H2>Skills</H2>

            <HeroSkillsLoader heroId={heroId}>
              {(skills) => (
                <ul className={"flex w-full flex-col gap-2"}>
                  {skills.map((skill) => (
                    <li key={skill.id}>
                      <Card className={"w-full"}>
                        <CardHeader>
                          <CardTitle
                            className={
                              "flex flex-row items-center justify-between"
                            }
                          >
                            <div>{skill.title}</div>
                            <div>Level {skill.level}</div>
                          </CardTitle>
                          <CardDescription>{skill.description}</CardDescription>

                          <div className={"flex flex-col gap-2"}>
                            <Progress value={skill.levelProgress} />
                            <div>
                              Experience: {skill.experience} /{" "}
                              {skill.experienceToLevelUp}
                            </div>
                          </div>

                          <div className={"flex justify-end"}>
                            <Button>Develop</Button>
                          </div>
                        </CardHeader>
                      </Card>
                    </li>
                  ))}
                </ul>
              )}
            </HeroSkillsLoader>
          </div>
        </div>
      )}
    </HeroLoader>
  );
};
