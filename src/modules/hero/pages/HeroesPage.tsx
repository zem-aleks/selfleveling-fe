"use client";

import Link from "next/link";

import { getHeroes } from "@/modules/hero/api/getHeroes";
import {
  HeroesHeader,
  Msg as HeroesHeaderMsg,
} from "@/modules/hero/components/HeroesHeader";
import { Avatar, AvatarFallback } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { notReachable } from "@/utils/notReachable";
import { useReloadableData } from "@/utils/useReloadableData";

export const HeroesPage = () => {
  const { state, reload } = useReloadableData(getHeroes, undefined);

  const onHeaderMsg = (msg: HeroesHeaderMsg) => {
    switch (msg.type) {
      case "onHeroCreated":
        reload();
        break;

      default:
        return notReachable(msg.type);
    }
  };

  switch (state.type) {
    case "loading":
      return (
        <>
          <HeroesHeader onMsg={onHeaderMsg} />
          Loading...
        </>
      );

    case "reloading":
    case "loaded":
      return (
        <>
          <HeroesHeader onMsg={onHeaderMsg} />
          <div className="flex flex-col gap-2">
            {state.data.map((hero) => (
              <Link href={`/heroes/${hero.id}`} key={hero.id}>
                <Card className="cursor-pointer p-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-12">
                      <AvatarFallback>{hero.name.at(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-lg font-semibold">{hero.name}</h1>
                      <p className="text-sm text-gray-500">{hero.language}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </>
      );

    case "error":
      return (
        <>
          <HeroesHeader onMsg={onHeaderMsg} />
          <div className={"flex"}>
            Something went wrong
            <Button onClick={reload}>Try again</Button>
          </div>
        </>
      );

    default:
      return notReachable(state);
  }
};
