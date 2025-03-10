"use client";

import React, { ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { AuthLayout } from "@/modules/auth/components/AuthLayout";
import { AuthContext } from "@/modules/auth/contexts/AuthContext";
import { UserContext } from "@/modules/auth/contexts/UserContext";
import { Button } from "@/ui/button";
import { notReachable } from "@/utils/notReachable";

type Props = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: Props): ReactNode => {
  const { state, reload, setUserData, reloadUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    switch (state.type) {
      case "signedOut":
        router.replace({
          pathname: "/login",
          query: {
            redirectBack: router.asPath,
          },
        });
        break;

      case "error":
      case "loading":
      case "signedIn":
        break;

      default:
        notReachable(state);
    }
  }, [router, state]);

  switch (state.type) {
    case "signedOut":
    case "loading":
      return <AuthLayout>Loading...</AuthLayout>;

    case "error":
      return (
        <AuthLayout>
          Auth error: {state.error}
          <Button onClick={reload}>Retry</Button>
        </AuthLayout>
      );

    case "signedIn":
      return (
        <>
          <UserContext.Provider
            value={{
              user: state.user,
              setUser: setUserData,
              reloadUser,
            }}
          >
            {children}
          </UserContext.Provider>
        </>
      );

    default:
      return notReachable(state);
  }
};
