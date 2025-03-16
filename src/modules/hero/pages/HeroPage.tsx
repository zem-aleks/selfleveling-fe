"use client";

import Link from "next/link";

import { HeroLoader } from "@/modules/hero/components/HeroLoader";
import { Button } from "@/ui/button";

type Props = {
  heroId: string;
};

export const HeroPage = ({ heroId }: Props) => {
  return (
    <HeroLoader heroId={heroId}>
      {(hero) => (
        <div className="flex flex-col items-center gap-4">
          Hero {hero.name}
          <Link href={`/heroes/${heroId}/goal`}>
            <Button>Create Goal</Button>
          </Link>
        </div>
      )}
    </HeroLoader>
  );
};
