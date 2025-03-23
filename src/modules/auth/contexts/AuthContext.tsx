"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Session } from "@supabase/auth-js";

import { supabase } from "@/config/supabase";
import { api, setApiAuth } from "@/modules/auth/api/api";
import { AuthLayout } from "@/modules/auth/components/AuthLayout";
import { noOperation, notReachable } from "@/utils/notReachable";

type AuthContextState =
  | { type: "loading" }
  | { type: "signedOut" }
  | { type: "signedIn"; session: Session; user: User }
  | { type: "error"; error: string };

type AuthContextData = {
  state: AuthContextState;
  reload: () => void;
  reloadUser: () => void;
  setUserData: (userData: User) => void;
  signOut: () => void;
};

const emptyContextValue: AuthContextData = {
  state: { type: "signedOut" },
  reload: noOperation,
  reloadUser: noOperation,
  setUserData: noOperation,
  signOut: noOperation,
};

export const AuthContext = createContext<AuthContextData>(emptyContextValue);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<AuthContextState>({ type: "loading" });

  useEffect(() => {
    if (state.type === "error") {
      return;
    }

    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_OUT": {
          setState({ type: "signedOut" });
          break;
        }

        case "PASSWORD_RECOVERY":
        case "USER_UPDATED":
        case "MFA_CHALLENGE_VERIFIED":
          break;

        case "TOKEN_REFRESHED": {
          if (session) {
            setApiAuth(session.access_token);
          }
          break;
        }

        case "INITIAL_SESSION":
        case "SIGNED_IN": {
          if (!session) {
            if (state.type !== "signedOut") {
              setState({ type: "signedOut" });
            }
            break;
          }

          if (state.type === "signedIn") {
            break;
          }

          setApiAuth(session.access_token);
          // TODO: check response properly
          api
            .get("/auth/me")
            .then((res) => {
              setState({
                type: "signedIn",
                session,
                user: res as unknown as User,
              });
            })
            .catch((error) => {
              setState({ type: "error", error: `${error.message}` });
              console.warn(error);
            });

          break;
        }

        default:
          return notReachable(event);
      }
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, [state]);

  const reload = useCallback(() => {
    supabase.auth.signOut().then(() => {
      setState({ type: "loading" });
    });
  }, []);

  const setUserData = useCallback(
    (userData: User) => {
      switch (state.type) {
        case "loading":
        case "signedOut":
        case "error":
          break;

        case "signedIn":
          setState({ ...state, user: userData });
          break;

        default:
          return notReachable(state);
      }
    },
    [state],
  );

  const signOut = useCallback(() => {
    supabase.auth.signOut();
  }, []);

  const reloadUser = useCallback(() => {
    switch (state.type) {
      case "loading":
      case "signedOut":
      case "error":
        break;

      case "signedIn":
        api
          .get("/auth/me")
          .then((res) => {
            setUserData(res as unknown as User);
          })
          .catch((error) => {
            setState({ type: "error", error: `${error.message}` });
            console.warn(error);
          });
        break;

      default:
        return notReachable(state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  switch (state.type) {
    case "loading":
      return <AuthLayout>Loading...</AuthLayout>;

    case "error":
    case "signedOut":
    case "signedIn":
      return (
        <AuthContext.Provider
          value={{
            state,
            reload,
            reloadUser,
            setUserData,
            signOut,
          }}
        >
          {children}
        </AuthContext.Provider>
      );

    default:
      return notReachable(state);
  }
}
