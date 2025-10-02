import { useCallback } from 'react';

import { useStatisticsStore, useUserStore } from '~/stores';
import Suspense from '~/components/Suspense';

import { ButtonPanel, DashboardContent, UserPresentation } from './components';
import Spinner from '~/components/Spinner';

export default function Dashboard() {
  const UserStore = useUserStore();
  const StatisticsStore = useStatisticsStore();

  const onCreate = useCallback(() => { }, []);
  const onEdit = useCallback(() => { }, []);
  const onDownload = useCallback(() => { }, []);
  const onFilter = useCallback(() => { }, []);

  return (
    <Suspense run={() => UserStore.request('/api/users?displayName=danhosaur').then(users => users[0])}
      loading={
      <div className="user-presentation user-presentation--loading">
        <Spinner />
        <p>Loading your dashboard...</p>
      </div>
    }
    >
      {user => (
        <div id='dashboard-page'>
          <header className='dashboard__header'>
            <UserPresentation user={user} />
            <ButtonPanel {...{ onCreate, onEdit, onDownload, onFilter }} />
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