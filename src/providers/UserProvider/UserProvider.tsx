import { PropsWithChildren } from 'react';
import useMockApi from '../hooks/useMockApi';
import { UserProviderContext } from './UserProviderConstants';


interface Props extends PropsWithChildren {
  userDisplayName: string;
  fallback?: React.ReactNode;
}

export default function UserProviderProvider({ children, userDisplayName, fallback }: Props) {
  // Since there is no official authentication of a user, we simulate fetching user data based on a provided display name instead of a user id or token.
  const [error, user, loading] = useMockApi('users', `/api/users?displayName=${userDisplayName}`);

  if (loading) return fallback ?? <p>Loading your profile...</p>;
  if (error) return (
    <section>
      <h2>Failed to load user profile</h2>
      <p>{error.message}</p>
    </section>
  )

  return (
    <UserProviderContext.Provider value={user}>
      {children}
    </UserProviderContext.Provider>
  );
}