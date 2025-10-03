import classNames from "classnames";
import * as Charts from 'react-chartjs-2';

import { StatisticEntry } from "~/types/domain";

type Props = {
  entry: StatisticEntry;
}

/**
 * Internal Chart component for the StatisticCard component.
 * Since the chart type from mock data does not directly map to the chart components from react-chartjs-2, extended mapping is done here.
 */
export default function ChartCanvas({ entry }: Props) {
  const chartKey = Object.keys(Charts).find(key => key.toLowerCase() === entry.type.toLowerCase());
  if (chartKey) {
    const ChartComponent = (Charts as any)[chartKey] as React.FC<Charts.ChartProps>;
    return <ChartComponent data={entry.chartData} type={entry.type as any} options={entry.options} />;
  }

  // ChartType "number" and "numberProcentage" share enough similarities to be handled the same way
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
                <label className="number-chart__label">
                  {/* Preferred label appears to be different depending on the chart type */}
                  {entry.type === 'numberProcentage' ? label : secondaryLabel}
                  {/* Note: percentage sign in "numberProcentage" type is appended in a pseudo element, thanks to the class modifier "chart-canvas--numberProcentage" */}
                </label>
                <span className="number-chart__value">{value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // In instance of unsupported chart type, show a simple fallback markup
  return (
    <div className="chart-canvas">
      Unsupported chart type <code>{entry.type}</code>
    </div>
  )
}