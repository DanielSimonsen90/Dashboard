import { useCallback } from 'react';

import { ButtonPanel, DashboardContent, UserPresentation } from './components';
import { ButtonPanelAction } from './components/ButtonPanel';
import { StatisticsProvider } from '~/providers';

export default function Dashboard() {
  // Event handler for button panel actions to handle user interactions like filter, download, etc.
  const onButtonClick = useCallback((action: ButtonPanelAction) => { }, []);

  return (
    <div id='dashboard-page'>
      <header className='dashboard__header'>
        <UserPresentation />
        <ButtonPanel onButtonClick={onButtonClick} />
      </header>
      <main>
        <StatisticsProvider fallback={skeleton => <DashboardContent skeletonRender statistics={skeleton} />}>
          {statistics => <DashboardContent statistics={statistics} />}
        </StatisticsProvider>
      </main>
    </div>
  );
}