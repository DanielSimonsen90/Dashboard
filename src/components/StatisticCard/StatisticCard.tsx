import { StatisticEntry } from "~/types/domain";

type Props = {
  entry: StatisticEntry;
}

export default function StatisticCard({ entry }: Props) {
  const { title, subtitle, ...data } = entry;
  
  return (
    <div className="statistic-card">
      <h2 className="statistic-card__title">{title}</h2>
      <p className="statistic-card__subtitle">{subtitle}</p>
      <div className="statistic-card__chart-data">
        <code>
          {JSON.stringify(data, null, 2)}
        </code>
      </div>
    </div>
  );
}