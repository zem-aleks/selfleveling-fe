"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addGoalDetails } from "@/modules/goal/api/addGoalDetails";
import {
  CreateGoalData,
  CreateGoalFormSchema,
} from "@/modules/goal/api/createGoal";
import { GoalEntity } from "@/modules/goal/types/goal";
import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/ui/form";
import { Textarea } from "@/ui/textarea";
import { notReachable } from "@/utils/notReachable";
import { useLazyLoadableData } from "@/utils/useLazyLoadableData";

export type Msg = {
  type: "onGoalUpdated";
  goal: GoalEntity;
};

type Props = {
  goalId: string;
  onMsg: (msg: Msg) => void;
};

export const FollowUpQuestionForm = ({ goalId, onMsg }: Props) => {
  const form = useForm<CreateGoalData>({
    resolver: zodResolver(CreateGoalFormSchema),
    defaultValues: {
      goal: "",
    },
  });

  const { state, load, reset } = useLazyLoadableData(addGoalDetails);

  useEffect(() => {
    switch (state.type) {
      case "not_requested":
      case "loading":
        break;

      case "error":
        toast.error(state.error.response?.data.message || state.error.message);
        break;

      case "loaded":
        toast.success("Goal details were processed successfully");
        onMsg({ type: "onGoalUpdated", goal: state.data.goal });
        reset();
        break;

      default:
        return notReachable(state);
    }
  }, [state]);

  const isLoading = state.type === "loading" || state.type === "loaded";

  return (
    <div className={"w-full"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => load({ ...data, goalId }))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Your answer..." {...field} />
                </FormControl>
                <FormDescription>
                  {`Please provide as much as possible details about your goal.`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" loading={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
