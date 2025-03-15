"use client";

import React, { ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthLayout } from "@/modules/auth/components/AuthLayout";
import { AuthContext } from "@/modules/auth/contexts/AuthContext";
import { notReachable } from "@/utils/notReachable";

type Props = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: Props): ReactNode => {
  const { state } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    switch (state.type) {
      case "error":
      case "signedOut":
        router.replace("/login");
        break;

      case "loading":
      case "signedIn":
        break;

      default:
        notReachable(state);
    }
  }, [router, state]);

  switch (state.type) {
    case "error":
    case "signedOut":
    case "loading":
      return <AuthLayout>Loading...</AuthLayout>;

    case "signedIn":
      return <>{children}</>;

    default:
      return notReachable(state);
  }
};
