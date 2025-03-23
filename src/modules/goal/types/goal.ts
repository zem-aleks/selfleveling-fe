type GoalCommonFields = {
  id: string;
  userId: string;
  heroId: string;
  threadId: string;
  score: number;
};

export type GoalDraft = GoalCommonFields & {
  goal: string;
  status: "draft";
  followUpQuestion: string;
};

export type GoalFormed = GoalCommonFields & {
  title: string;
  description: string;
  status: "formed";
};

export type GoalEntity = GoalDraft | GoalFormed;
