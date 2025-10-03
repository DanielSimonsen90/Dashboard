import classNames from "classnames";

import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";

import { StatisticEntry } from "~/types/domain";

import ChartCanvas from "./components/ChartCanvas";

// Since this component is the only place that makes use of chart.js, registration of chart types is done here
// If the app were to grow, this should be moved to a more central place or even a provider
Chart.register(CategoryScale);

type Props = {
  entry: StatisticEntry;

  /**
   * The statistic card will show a gradient skeleton glow effect if true
   */
  skeletonRender?: boolean
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