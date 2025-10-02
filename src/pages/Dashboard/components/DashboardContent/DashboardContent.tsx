import StatisticCard from "~/components/StatisticCard";
import { StatisticEntry } from "~/types/domain";

type Props = {
  statistics: Array<StatisticEntry>
}

export default function DashboardContent({ statistics }: Props) {
  return (
    <ul className="dashboard-content">
      {statistics.map(entry => (
        <li key={`${entry.title}-${entry.subtitle}-${entry.type}`}>
          <StatisticCard entry={entry} />
        </li>
      ))}
    </ul>
  );
}