import { GoalFormed } from "@/modules/goal/types/goal";

type Props = {
  goal: GoalFormed;
};

export const FormedGoalBlock = ({ goal }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">{goal.title}</h2>
      <p>{goal.description}</p>
      <p>Score: {goal.score}</p>
    </div>
  );
};
