'use client';

import { useParams } from 'next/navigation';

import { CreateGoalPage } from '@/modules/goal/pages/CreateGoalPage';

export default function Page() {
  const params = useParams<{ heroId: string }>();
  return <CreateGoalPage heroId={params.heroId} />;
}
