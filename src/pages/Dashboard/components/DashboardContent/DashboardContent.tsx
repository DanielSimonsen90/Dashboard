import StatisticCard from "~/components/StatisticCard";
import { StatisticEntry } from "~/types/domain";

type Props = {
  statistics: Array<StatisticEntry>
  skeletonRender?: boolean
}

export default function DashboardContent({ statistics, skeletonRender }: Props) {
  return (
    <ul className="dashboard-content">
      {statistics.map((entry, i) => (
        <li key={`${entry.title}-${entry.subtitle}-${entry.type}-${i}`}>
          <StatisticCard {...{ entry, skeletonRender }} />
        </li>
      ))}
    </ul>
  );
}