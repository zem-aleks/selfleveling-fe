"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  createHero,
  CreateHeroData,
  CreateHeroFormSchema,
} from "@/modules/hero/api/createHero";
import { HeroEntity } from "@/modules/hero/types";
import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { notReachable } from "@/utils/notReachable";
import { useLazyLoadableData } from "@/utils/useLazyLoadableData";

const languages = [
  { label: "English", value: "en" },
  // { label: "Ukrainian", value: "ua" },
  { label: "Polish", value: "pl" },
  // { label: "French", value: "fr" },
  // { label: "German", value: "de" },
  // { label: "Spanish", value: "es" },
  // { label: "Portuguese", value: "pt" },
  // { label: "Russian", value: "ru" },
  // { label: "Japanese", value: "ja" },
  // { label: "Korean", value: "ko" },
  // { label: "Chinese", value: "zh" },
] as const;

export type Msg = { type: "onHeroCreated"; hero: HeroEntity };

type Props = {
  onMsg: (msg: Msg) => void;
};

export const CreateHeroForm = ({ onMsg }: Props) => {
  const form = useForm<CreateHeroData>({
    resolver: zodResolver(CreateHeroFormSchema),
    defaultValues: {
      name: "",
      language: "",
    },
  });

  const { state, load, reset } = useLazyLoadableData(createHero);

  useEffect(() => {
    switch (state.type) {
      case "not_requested":
      case "loading":
        break;

      case "error":
        toast.error(state.error.response?.data.message || state.error.message);
        break;

      case "loaded":
        toast.success("Hero was created successfully");
        onMsg({ type: "onHeroCreated", hero: state.data });
        reset();
        break;

      default:
        return notReachable(state);
    }
  }, [state]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(load)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormDescription>This is your Hero name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className={"w-full"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Your language</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={state.type === "loading"}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
