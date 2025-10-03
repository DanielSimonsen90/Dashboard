import { useContext } from "react";
import { StatisticsProviderContext } from "./StatisticsProviderConstants";
import { StatisticEntry } from "~/types/domain";
import { StatisticsFilterOptions } from "~/types/providers";

/**
 * @param filter Optional filter to apply when retrieving statistics. If provided, it will update the filter in the context.
 */
export function useStatistics(filter?: StatisticsFilterOptions): Array<StatisticEntry> {
  const context = useContext(StatisticsProviderContext);
  if (!context) throw new Error('useStatistics must be used within a StatisticsProvider');

  const { statistics, setFilter } = context;
  if (filter) setFilter(filter);
  return statistics;
}