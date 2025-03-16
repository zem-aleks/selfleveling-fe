"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  createGoal,
  CreateGoalData,
  CreateGoalFormSchema,
} from "@/modules/goal/api/createGoal";
import { createHero } from "@/modules/hero/api/createHero";
import { HeroLoader } from "@/modules/hero/components/HeroLoader";
import { Button } from "@/ui/button";
import { H1 } from "@/ui/custom/H1";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Textarea } from "@/ui/textarea";
import { noOperation, notReachable } from "@/utils/notReachable";
import { useLazyLoadableData } from "@/utils/useLazyLoadableData";

type Props = {
  heroId: string;
};

export const CreateGoalPage = ({ heroId }: Props) => {
  const form = useForm<CreateGoalData>({
    resolver: zodResolver(CreateGoalFormSchema),
    defaultValues: {
      goal: "",
    },
  });

  const { state, load, reset } = useLazyLoadableData(createGoal);

  useEffect(() => {
    switch (state.type) {
      case "not_requested":
      case "loading":
        break;

      case "error":
        toast.error(state.error.response?.data.message || state.error.message);
        break;

      case "loaded":
        toast.success("Goal was created successfully");
        // onMsg({ type: "onHeroCreated", hero: state.data });
        reset();
        break;

      default:
        return notReachable(state);
    }
  }, [state]);

  return (
    <HeroLoader heroId={heroId}>
      {(hero) => (
        <div className="flex flex-col gap-4">
          <H1>Let&apos;s build your new goal {hero.name}!</H1>
          <p>
            This process takes some time to clarify the details. We will start
            with the draft and try to organize them step by step
          </p>
          <div className={"w-full"}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) =>
                  load({ ...data, heroId }),
                )}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your goal</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What would you like to achieve?"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {`You can enter detailed description of what you would
                        like to achieve. It can be some personal wish or more
                        abstract goal. For example: "I want to learn how to play
                        guitar" or "I want to become a chess master".`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </HeroLoader>
  );
};
