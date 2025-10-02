import { User } from "~/types/domain";

export default function UserPresentation() {
  // August 29 at 10:24am CET
  const user: User = {
    id: '1',
    displayName: 'Danhosaur',
    avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/05445498-f2a9-4c31-9007-133e17f65ad2-profile_image-70x70.png",
    lastLoginTimestamp: Date.now(),
  };
  const lastLoginDate = new Date(user.lastLoginTimestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const lastLoginTime = new Date(user.lastLoginTimestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  return (
    <section className="user-presentation">
      <header className="user-presentation__header">
        <img src={user.avatarUrl} alt={`${user.displayName}'s avatar`} className="user-presentation__avatar" />
        <h1 className="user-presentation__display-name">Hi {user.displayName}</h1>
      </header>
      <p className="user-presentation__last-login">Welcome back. Your last login was on {lastLoginDate} at {lastLoginTime}.</p>
    </section>
  );
}