import { StatisticEntry } from "~/types/domain";
import createBaseStore, { BaseStore } from "../BaseStore";

/**
 * Number of skeleton items to generate until later replaced by mocked data
 */
const SKELETON_SIZE = 6;

interface StatisticsStore extends BaseStore<'statistics'> {
  skeleton: Array<StatisticEntry>;
}

/**
 * ### StatisticsStore hook
 * Upon calling request function (that will either check cache or request mock api), the statistics data is provided.
 * This forces the data to be async to avoid manual check if data is loaded.
 * For that reason, the custom component, "Suspense", is used as a wrapper to ensure the data is loaded before using its data.
 * 
 * @uses Suspense from ~/components/Suspense
 */
export const useStatisticsStore = createBaseStore<StatisticsStore, 'statistics'>('statistics', () => ({
  skeleton: Array.from({ length: SKELETON_SIZE }, () => ({
    title: 'Loading...',
    subtitle: 'Your data is on its way!',
    type: 'number',
    chartData: {
      labels: ['Loading...'],
      datasets: [{ label: 'Loading...', data: [0] }]
    },
    options: { responsive: true }
  } satisfies StatisticsStore['skeleton'][number]))
}));