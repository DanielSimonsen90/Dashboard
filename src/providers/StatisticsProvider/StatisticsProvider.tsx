import { useMemo, useState } from 'react';
import useMockApi from '../hooks/useMockApi';
import { SKELETON, StatisticsProviderContext } from './StatisticsProviderConstants';
import { StatisticsFilterOptions } from '~/types/providers';
import { StatisticEntry } from '~/types/domain';

interface Props {
  children: React.ReactNode | ((statistics: Array<StatisticEntry>) => React.ReactNode);
  fallback?: React.ReactNode | ((skeleton: Array<StatisticEntry>) => React.ReactNode);
  defaultFilter?: StatisticsFilterOptions;
}

export default function StatisticsProvider({ children, defaultFilter, fallback }: Props) {
  const [filter, setFilter] = useState<StatisticsFilterOptions | undefined>(defaultFilter);

  const [error, statistics, loading] = useMockApi(
    'statistics',
    // Depending on whether a filter is set, adjust the "endpoint" to simulate different requests
    filter?.type
      ? `/api/statistics?type=${filter.type}`
      : '/api/statistics'
  );

  // Because fallback and children support callbacks for direct use of statistics or skeleton data, the resolved JSX element is necessary to ensure proper rendering
  const resolvedFallback = useMemo(() => typeof fallback === 'function' ? fallback(SKELETON) : fallback, [fallback]);
  const resolvedChildren = useMemo(() => typeof children === 'function' ? children(statistics) : children, [children, statistics]);

  if (loading) return resolvedFallback ?? <p>Loading statistics...</p>;
  if (error) return (
    <section>
      <h2>Failed to load statistics</h2>
      <p>{error.message}</p>
    </section>
  );

  return (
    <StatisticsProviderContext.Provider value={{ statistics, setFilter }}>
      {resolvedChildren}
    </StatisticsProviderContext.Provider>
  );
}