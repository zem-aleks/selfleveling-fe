"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ heroId: string }>();
  return <>HERO PAGE {params.heroId}</>;
}
