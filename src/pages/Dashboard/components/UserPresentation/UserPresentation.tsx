import { useUser } from "~/providers";

export default function UserPresentation() {
  // Since UserPresentation is wrapped within a UserProvider, the value can be received using the useUser hook.
  const user = useUser();
  
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
