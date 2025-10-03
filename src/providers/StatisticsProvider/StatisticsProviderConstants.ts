import { createContext, Dispatch, SetStateAction } from "react";
import { StatisticEntry } from "~/types/domain";
import { StatisticsFilterOptions } from "~/types/providers";

export const StatisticsProviderContext = createContext<{
  statistics: Array<StatisticEntry>;
  setFilter: Dispatch<SetStateAction<StatisticsFilterOptions | undefined>>;
}>({
  statistics: [],
  setFilter: () => {}
});

/**
 * Number of skeleton items to generate until later replaced by mocked data
 */
const SKELETON_SIZE = 6;
export const SKELETON = Array.from({ length: SKELETON_SIZE }, () => ({
  title: 'Loading...',
  subtitle: 'Your data is on its way!',
  type: 'number',
  chartData: {
    labels: ['Loading...'],
    datasets: [{ label: 'Loading...', data: [0] }]
  },
  options: { responsive: true }
} satisfies StatisticEntry));