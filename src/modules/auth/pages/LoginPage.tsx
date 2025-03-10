"use client";

import React, { useContext } from "react";
import { useRouter } from "next/router";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { supabase } from "@/config/supabase";
import { AuthLayout } from "@/modules/auth/components/AuthLayout";
import { AuthContext } from "@/modules/auth/contexts/AuthContext";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { notReachable } from "@/utils/notReachable";

export const LoginPage = () => {
  const { state, reload } = useContext(AuthContext);
  const router = useRouter();
  const redirectBack = router.query.redirectBack as string;

  switch (state.type) {
    case "loading":
      return <AuthLayout>Loading...</AuthLayout>;

    case "error":
      return (
        <AuthLayout>
          Auth error: {state.error}
          <Button onClick={reload}>Retry</Button>
        </AuthLayout>
      );

    case "signedOut":
      return (
        <AuthLayout>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  borderRadius: "5px",
                  borderColor: "rgba(0,0,0,0.2)",
                },
              },
              variables: {
                default: {
                  colors: {
                    brand: "#000",
                    brandAccent: "#cfd1ff",
                  },
                },
              },
            }}
            providers={[]}
          />
        </AuthLayout>
      );

    case "signedIn":
      router.replace(redirectBack || "/");
      return (
        <AuthLayout>
          <Label>Redirecting...</Label>
        </AuthLayout>
      );

    default:
      return notReachable(state);
  }
};
