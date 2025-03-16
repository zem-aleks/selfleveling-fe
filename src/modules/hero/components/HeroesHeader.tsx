import { useState } from "react";

import {
  CreateHeroForm,
  Msg as CreateHeroFormMsg,
} from "@/modules/hero/components/CreateHeroForm";
import { Button } from "@/ui/button";
import { H1 } from "@/ui/custom/H1";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { notReachable } from "@/utils/notReachable";

export type Msg = CreateHeroFormMsg;

type Props = {
  onMsg: (msg: Msg) => void;
};

export const HeroesHeader = ({ onMsg }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={"flex flex-row items-center justify-between"}>
      <H1>Heroes</H1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setOpen(true)}>
            +Add
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add hero</DialogTitle>
          </DialogHeader>
          <CreateHeroForm
            onMsg={(msg) => {
              switch (msg.type) {
                case "onHeroCreated":
                  setOpen(false);
                  onMsg(msg);
                  break;

                default:
                  return notReachable(msg.type);
              }
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
