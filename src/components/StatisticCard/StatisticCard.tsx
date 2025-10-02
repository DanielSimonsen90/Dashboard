import { StatisticEntry } from "~/types/domain";

import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import ChartCanvas from "./components/ChartCanvas";

Chart.register(CategoryScale);

type Props = {
  entry: StatisticEntry;
};

export default function StatisticCard({ entry }: Props) {
  const { title, subtitle } = entry;

  return (
    <div className="statistic-card">
      <h2 className="statistic-card__title">{title}</h2>
      <p className="statistic-card__subtitle">{subtitle}</p>
      <div className="statistic-card__chart-data">
        <ChartCanvas entry={entry} />
      </div>
    </div>
  );
}