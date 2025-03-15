"use client";

import React, { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { supabase } from "@/config/supabase";
import { AuthLayout } from "@/modules/auth/components/AuthLayout";
import { AuthContext } from "@/modules/auth/contexts/AuthContext";
import { Label } from "@/ui/label";
import { notReachable } from "@/utils/notReachable";

// TODO: update the auth form. This one is deprecated and doesn't trigger auth.subscription events

export const LoginPage = () => {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectBack = searchParams.get("redirectBack");

  switch (state.type) {
    case "loading":
      return <AuthLayout>Loading...</AuthLayout>;

    case "error":
    case "signedOut":
      return (
        <AuthLayout>
          {state.type === "error" && (
            <Label className={"color w-full text-red-500"}>
              Error: {state.error}
            </Label>
          )}
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
            redirectTo={"/"}
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
