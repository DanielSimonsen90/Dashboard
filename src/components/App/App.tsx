import Dashboard from "~/pages/Dashboard";
import { UserProvider } from "~/providers";
import Spinner from "../Spinner";

export default function App() {
  // The whole "app" is only the dashboard, but could have been more complex with routing and providers.
  // However, a Dashboard could not be visible without a verified User, so the UserProvider is wrapping the Dashboard.

  return (
    <UserProvider userDisplayName="daniel simonsen" 
      fallback={
        <div className="dashboard-loading-container">
          <Spinner />
          <p>Loading your dashboard...</p>
        </div>
      }
    >
      <Dashboard />;
    </UserProvider>
  )
}