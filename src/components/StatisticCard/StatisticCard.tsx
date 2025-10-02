import { StatisticEntry } from "~/types/domain";

type Props = {
  entry: StatisticEntry;
}

export default function StatisticCard({ entry }: Props) {
  const { title, subtitle, ...data } = entry;
  
  return (
    <div className="statistic-entry">
      <h2 className="statistic-entry__title">{title}</h2>
      <p className="statistic-entry__subtitle">{subtitle}</p>
      <div className="statistic-entry__chart-data">
        <code>
          {JSON.stringify(data, null, 2)}
        </code>
      </div>
    </div>
  );
}