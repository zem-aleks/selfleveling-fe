'use client';

import { useParams } from 'next/navigation';

import { HeroPage } from '@/modules/hero/pages/HeroPage';

export default function Page() {
  const params = useParams<{ heroId: string }>();
  return <HeroPage heroId={params.heroId} />;
}
