import { StatisticEntry } from "~/types/domain";
import * as Charts from 'react-chartjs-2';
import classNames from "classnames";

type Props = {
  entry: StatisticEntry;
}

export default function ChartCanvas({ entry }: Props) {
  const chartKey = Object.keys(Charts).find(key => key.toLowerCase() === entry.type.toLowerCase());
  if (chartKey) {
    const ChartComponent = (Charts as any)[chartKey] as React.FC<Charts.ChartProps>;
    return <ChartComponent data={entry.chartData} type={entry.type as any} options={entry.options} />;
  }

  else if (entry.type === 'number' || entry.type === 'numberProcentage') {
    const { labels, datasets } = entry.chartData;

    return (
      <div className={classNames('chart-canvas', `chart-canvas--${entry.type}`)}>
        <ul className="chart-canvas__list">
          {labels.map((label, index) => {
            const value = datasets[0]?.data[index] ?? '-';
            const secondaryLabel = datasets[0]?.label ?? label;

            return (
              <li key={label} className="number-chart__item">
                <label className="number-chart__label">{entry.type === 'numberProcentage' ? label : secondaryLabel}</label>
                <span className="number-chart__value">{value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="chart-canvas">
      Unsupported chart type <code>{entry.type}</code>
    </div>
  )
}