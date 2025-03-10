import React, { ReactNode, useContext } from 'react';

import { useRouter } from 'next/router';

import { Button, Typography } from '@mui/material';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import { UserContext } from '@/modules/auth/contexts/UserContext';
import { AuthGuard } from '@/modules/auth/guards/AuthGuard';
import { UserRole } from '@/modules/auth/types/User';

type Props = {
  roles: UserRole[];
  children: ReactNode;
};

export const RoleGuard = ({ roles, children }: Props): ReactNode => {
  return (
    <AuthGuard>
      <RoleGuardCheck roles={roles}>{children}</RoleGuardCheck>
    </AuthGuard>
  );
};

const RoleGuardCheck = ({ roles, children }: Props) => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  if (roles.includes(user.role)) {
    return <>{children}</>;
  }

  return (
    <AuthLayout>
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
        Something went wrong
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        Permissions denied. Please contact app administrator
      </Typography>
      <Button variant={'contained'} onClick={() => router.back()}>
        Back
      </Button>
    </AuthLayout>
  );
};
