"use client";

import * as React from "react";

import { cn } from "@/ui/lib/utils";

function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return <h1 className={cn("text-2xl font-bold", className)} {...props} />;
}

function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("text-xl font-bold", className)} {...props} />;
}

function H3({ className, ...props }: React.ComponentProps<"h2">) {
  return <h3 className={cn("font-bold", className)} {...props} />;
}

export { H1, H2, H3 };
