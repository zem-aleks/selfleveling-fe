"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { supabase } from "@/config/supabase";
import {
  CreateHeroData,
  CreateHeroFormSchema,
} from "@/modules/hero/api/createHero";
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

const languages = [
  { label: "English", value: "en" },
  { label: "Ukrainian", value: "ua" },
  { label: "Polish", value: "pl" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

export function HeroPage() {
  const form = useForm<CreateHeroData>({
    resolver: zodResolver(CreateHeroFormSchema),
    defaultValues: {
      name: "",
      language: "",
    },
  });

  const test = supabase.from("heroes").select("*");
  test.then(({ data: heroes, error }) => {
    console.log(heroes, error);
  });

  const onSubmit = (data: CreateHeroData) => {
    console.log(data);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-screen w-full max-w-md flex-col justify-center gap-4 pb-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
