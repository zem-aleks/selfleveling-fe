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
import { H1 } from "@/ui/custom/H1";
import { Label } from "@/ui/label";
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
              <Card key={hero.id} className="p-2 px-4">
                <div className="flex items-center gap-4">
                  <Avatar className="size-12">
                    <AvatarFallback>{hero.name.at(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grow">
                    <H1>{hero.name}</H1>
                    <p className="text-sm text-gray-500">{hero.language}</p>
                  </div>
                  <div className={"flex items-center gap-2"}>
                    <Button className={"bg-red-500"}>Delete</Button>
                    <Link href={`/heroes/${hero.id}`}>
                      <Button>Select</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      );

    case "error":
      return (
        <>
          <HeroesHeader onMsg={onHeaderMsg} />
          <div className={"flex flex-col items-center gap-4"}>
            <Label>Something went wrong</Label>
            <Button onClick={reload}>Try again</Button>
          </div>
        </>
      );

    default:
      return notReachable(state);
  }
};
