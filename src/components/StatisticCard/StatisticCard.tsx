import { StatisticEntry } from "~/types/domain";
import { useMemo } from "react";

import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import * as Charts from 'react-chartjs-2';

Chart.register(CategoryScale);

type Props = {
  entry: StatisticEntry;
}

export default function StatisticCard({ entry }: Props) {
  const { title, subtitle, ...data } = entry;

  const ChartComponent = useMemo<React.FC<Charts.ChartProps>>(() => {
    const chartKey = Object.keys(Charts).find(key => key.toLowerCase() === entry.type.toLowerCase());
    if (!chartKey) return () => <div>Unsupported chart type <code>{entry.type}</code></div>;
    return (Charts as any)[chartKey];
  }, [entry.type]);
  
  return (
    <div className="statistic-card">
      <h2 className="statistic-card__title">{title}</h2>
      <p className="statistic-card__subtitle">{subtitle}</p>
      <ChartComponent data={data.chartData} type={data.type as any} options={data.options} />
    </div>
  );
}