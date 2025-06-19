'use client';

import { useParams } from 'next/navigation';

import { FinishGoalPage } from '@/modules/goal/pages/FinishGoalPage';

export default function Page() {
  const params = useParams<{ goalId: string }>();
  return <FinishGoalPage goalId={params.goalId} />;
}
