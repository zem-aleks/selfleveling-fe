import { GoalEnhancedEntity } from "@/modules/goal/types/goal";
import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/card";

export const ActiveGoalsList = ({ goals }: { goals: GoalEnhancedEntity[] }) => {
  if (goals.length === 0) {
    return (
      <div className={"text-muted-foreground pb-2 text-sm"}>
        No active goals yet
      </div>
    );
  }

  return (
    <ul className={"flex w-full flex-col gap-2"}>
      {goals.map((goal) => (
        <li key={goal.id}>
          <Card className={"w-full"}>
            <CardHeader>
              <CardTitle
                className={"flex flex-row items-center justify-between"}
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
  );
};
