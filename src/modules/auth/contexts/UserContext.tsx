import { createContext } from 'react';

import { User } from '@/modules/auth/types/User';
import { noOperation } from '@/utils/notReachable';

type UserContextData = {
  user: User;
  setUser: (user: User) => void;
  reloadUser: () => void;
};

const emptyContextValue: UserContextData = {
  user: {
    avatarUrl: '',
    email: '',
    role: 'user',
    id: '',
    name: '',
    firstName: '',
    lastName: '',
    bio: '',
    linkedIn: '',
    website: '',
    phone: '',
    newsletter: false,
    decksCount: 0,
  },
  setUser: noOperation,
  reloadUser: noOperation,
};

export const UserContext = createContext<UserContextData>(emptyContextValue);
