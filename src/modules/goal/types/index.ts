import { ChatMessage } from "@langchain/core/messages";

type GoalCommonFields = {
  id: string;
  userId: string;
  heroId: string;
  threadId: string;
};

export type GoalDraft = GoalCommonFields & {
  goal: string;
  status: "draft";
};

export type GoalEntity = GoalDraft;

export type ExtractGoalResult = {
  type: "followUp";
  score: number;
  followUpQuestion: string;
};

export type GoalExtractionEvent =
  | { extractGoalScore: { score: number } }
  | { prepareFollowUpQuestion: { messages: ChatMessage[] } };
