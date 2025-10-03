import { useCallback } from 'react';

import { useStatisticsStore, useUserStore } from '~/stores';
import Suspense from '~/components/Suspense';

import { ButtonPanel, DashboardContent, UserPresentation } from './components';
import Spinner from '~/components/Spinner';
import { ButtonPanelAction } from './components/ButtonPanel';

export default function Dashboard() {
  // Use of zustand-based stores for asynchronous state management
  const UserStore = useUserStore();
  const StatisticsStore = useStatisticsStore();

  // Event handler for button panel actions to handle user interactions like filter, download, etc.
  const onButtonClick = useCallback((action: ButtonPanelAction) => { }, []);

  return (
    <Suspense run={() => UserStore.request('/api/users?displayName=danhosaur').then(users => users[0])}
      loading={
        <div className="user-presentation user-presentation--loading">
          <Spinner />
          <p>Loading your dashboard...</p>
        </div>
      }>
      {user => (
        <div id='dashboard-page'>
          <header className='dashboard__header'>
            <UserPresentation user={user} />
            <ButtonPanel onButtonClick={onButtonClick} />
          </header>
          <main>
            <Suspense run={() => StatisticsStore.request('/api/statistics')}
              loading={<DashboardContent skeletonRender statistics={StatisticsStore.skeleton} />}
            >
              {statistics => <DashboardContent statistics={statistics} />}
            </Suspense>
          </main>
        </div>
      )}
    </Suspense>
  );
}