import { User } from "~/types/domain";

type Props = {
  /**
   * The "logged in" user is passed as a prop instead of received from the store to avoid Suspense boilerplate
   */
  user: User;
};

export default function UserPresentation({ user }: Props) {
  // Last login string formatted based on design text
  const lastLoginDate = new Date(user.lastLoginTimestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const lastLoginTime = new Date(user.lastLoginTimestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const lastLoginString = `on ${lastLoginDate} at ${lastLoginTime}`;

  return (
    <section className="user-presentation">
      <header className="user-presentation__header">
        <img src={user.avatarUrl} alt={`${user.displayName}'s avatar`} className="user-presentation__avatar" />
        <h1 className="user-presentation__display-name">Hi {user.displayName}</h1>
      </header>
      <p className="user-presentation__last-login">Welcome back. Your last login was {lastLoginString}.</p>
    </section>
  );
}
