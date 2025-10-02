import { StatisticEntry } from "~/types/domain";
import createBaseStore, { BaseStore } from "../BaseStore";

interface StatisticsStore extends BaseStore<'statistics'> {
  skeleton: Array<StatisticEntry>;
}

export const useStatisticsStore = createBaseStore<StatisticsStore, 'statistics'>('statistics', () => ({
  skeleton: Array.from({ length: 6 }, () => ({
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