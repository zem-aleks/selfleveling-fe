"use client";

import * as React from "react";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@/ui/lib/utils";

function H1({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return <h1 className={cn("text-xl font-bold", className)} {...props} />;
}

export { H1 };
