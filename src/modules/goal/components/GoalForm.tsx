import React from 'react';

import { UseFormReturn } from 'react-hook-form';

import { CreateGoalData } from '@/modules/goal/api/createGoal';
import { Button } from '@/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';

type Props = {
  form: UseFormReturn<CreateGoalData>;
  onSubmit: (data: CreateGoalData) => void;
  isLoading: boolean;
};

export const GoalForm = ({ form, onSubmit, isLoading }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="targetDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>To be achieved at</FormLabel>
              <FormControl>
                <Input {...field} placeholder="YYYY-MM-DD" />
              </FormControl>
              <FormDescription>
                Enter date in format YYYY-MM-DD. For example: 2040-12-31
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your goal</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="What would you like to achieve?"
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

        <Button type="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
