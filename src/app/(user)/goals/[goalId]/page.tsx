"use client";

import { useParams } from "next/navigation";

import { BuildGoalPage } from "@/modules/goal/pages/BuildGoalPage";

export default function Page() {
  const params = useParams<{ goalId: string }>();
  return <BuildGoalPage goalId={params.goalId} />;
}
