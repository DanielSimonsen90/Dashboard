import { useCallback } from 'react';
import { ButtonPanel, UserPresentation } from './components';

export default function Dashboard() {
  const onCreate = useCallback(() => {}, []);
  const onEdit = useCallback(() => {}, []);
  const onDownload = useCallback(() => {}, []);
  const onFilter = useCallback(() => {}, []);
  
  return (
    <div id='dashboard-page'>
      <header className='dashboard__header'>
        <UserPresentation />
        <ButtonPanel {...{ onCreate, onEdit, onDownload, onFilter }} />
      </header>
      <main>
        {/* TODO Loop through mock data */}
      </main>
    </div>
  );
}