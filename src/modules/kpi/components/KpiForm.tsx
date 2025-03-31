import { ReactNode, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { GoalFormed } from "@/modules/goal/types/goal";
import {
  saveKpi,
  SaveKpiData,
  SaveKpiFormSchema,
} from "@/modules/kpi/api/saveKpi";
import { KpiWithMeasurementsEntity } from "@/modules/kpi/types";
import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { notReachable } from "@/utils/notReachable";
import { useLazyLoadableData } from "@/utils/useLazyLoadableData";

export type Msg =
  | { type: "onKpiSaved"; kpi: KpiWithMeasurementsEntity }
  | { type: "onCancel" };

type Props = {
  goal: GoalFormed;
  kpi: KpiWithMeasurementsEntity;
  onMsg: (msg: Msg) => void;
};

export const KpiForm = ({ kpi, onMsg }: Props): ReactNode => {
  const form = useForm<SaveKpiData>({
    resolver: zodResolver(SaveKpiFormSchema),
    defaultValues: {
      title: kpi.title,
      description: kpi.description,
      targetValue: kpi.targetValue,
      currentValue: kpi.measurements.length ? kpi.measurements[0].value : "",
      status: kpi.status,
    },
  });

  const { state, load, reset } = useLazyLoadableData(saveKpi);

  useEffect(() => {
    switch (state.type) {
      case "not_requested":
      case "loading":
        break;

      case "error":
        toast.error(state.error.response?.data.message || state.error.message);
        break;

      case "loaded":
        toast.success("Saved!");
        onMsg({ type: "onKpiSaved", kpi: state.data });
        reset();
        break;

      default:
        return notReachable(state);
    }
  }, [state]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => load({ ...data, kpiId: kpi.id }))}
      >
        <div className={"flex flex-col gap-3"} key={kpi.id}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>KPI title</FormLabel>
                <FormControl>
                  <Input placeholder="KPI title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>KPI description</FormLabel>
                <FormControl>
                  <Textarea placeholder="KPI description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current value</FormLabel>
                <FormControl>
                  <Input placeholder="Current value" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target value</FormLabel>
                <FormControl>
                  <Input placeholder="Target value" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={"flex w-full flex-row gap-3"}>
            <Button
              className={"grow"}
              onClick={() => onMsg({ type: "onCancel" })}
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button
              className={"grow"}
              onClick={() => {
                form.setValue("status", "active");
              }}
              type={"submit"}
              loading={state.type === "loading"}
            >
              Accept
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
