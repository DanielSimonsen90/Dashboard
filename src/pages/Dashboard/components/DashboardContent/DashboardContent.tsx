import { StatisticEntry } from "~/types/domain";

type Props = {
  statistics: Array<StatisticEntry>
}

export default function DashboardContent({ statistics }: Props) {
  return (
    <div>
      {statistics.map(({ title, subtitle, type, options, chartData }) => (
        <section className="statistic-entry-card" key={`${title}-${subtitle}-${type}`}>
          <header>
            <h2 className="statistic-entry-card__title">{title}</h2>
            <p className="statistic-entry-card__subtitle">{subtitle}</p>
          </header>
          <code>
            <pre>{JSON.stringify({ type, options, chartData }, null, 2)}</pre>
          </code>
        </section>
      ))}
    </div>
  );
}