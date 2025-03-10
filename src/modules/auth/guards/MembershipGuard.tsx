import React, { ReactNode } from "react";
import { useRouter } from "next/router";

import { Box } from "@mui/material";

import { AuthLayout } from "@/components/layouts/AuthLayout";
import { useUserPermissions } from "@/modules/auth/hooks/useUserPermissions";
import { MembershipTier } from "@/modules/auth/types/User";
import { getSameOrHigherTiers } from "@/modules/auth/utils/getSameOrHigherTiers";
import { isTierSameOrHigher } from "@/modules/auth/utils/isTierSameOrHigher";
import { MembershipDialog } from "@/modules/user/components/MembershipDialog";
import { notReachable } from "@/utils/notReachable";

type Props = {
  children?: ReactNode;
  tier: MembershipTier; // refactor - make array of needed tiers
  onCloseUrl: string;
};

export const MembershipGuard = ({
  tier,
  onCloseUrl,
  children,
}: Props): ReactNode => {
  const router = useRouter();
  const permissions = useUserPermissions();
  const hasPermissions = isTierSameOrHigher(permissions.tier, tier);
  const tiers = getSameOrHigherTiers(tier);

  if (hasPermissions) {
    return <>{children}</>;
  }

  const WrapperComponent = Boolean(children) ? AuthLayout : Box;

  return (
    <WrapperComponent>
      <MembershipDialog
        tiers={tiers}
        onMsg={(msg) => {
          switch (msg.type) {
            case "onClose":
              router.replace(onCloseUrl);
              break;
            case "onMembershipUpgrade":
              // router.replace('/')
              break;

            default:
              return notReachable(msg);
          }
        }}
      />
    </WrapperComponent>
  );
};
