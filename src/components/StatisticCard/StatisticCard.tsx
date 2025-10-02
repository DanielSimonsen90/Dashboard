import { StatisticEntry } from "~/types/domain";

import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import ChartCanvas from "./components/ChartCanvas";
import classNames from "classnames";

Chart.register(CategoryScale);

type Props = {
  entry: StatisticEntry;
  skeletonRender: boolean
};

export default function StatisticCard({ entry, skeletonRender }: Props) {
  const { title, subtitle } = entry;

  return (
    <div className={classNames('statistic-card', { 'statistic-card--skeleton': skeletonRender })}>
      <h2 className="statistic-card__title">{title}</h2>
      <p className="statistic-card__subtitle">{subtitle}</p>
      <div className="statistic-card__chart-data">
        <ChartCanvas entry={entry} />
      </div>
    </div>
  );
}