interface BaseEntity {
  // id: string;
}

export interface User extends BaseEntity {
  displayName: string;
  avatarUrl: string;
  lastLoginTimestamp: number;
}

export type ChartType = 'number' | 'numberProcentage' | 'doughnut' | 'bar' | 'pie' | 'line';

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string;
  fill?: boolean;
  tension?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface DisplayOptions {
  prefix: string;
  suffix: string;
  derivePercentageFromPair?: boolean;
}

export interface ChartOptions {
  responsive: boolean;
  indexAxis?: 'x' | 'y';
  display?: DisplayOptions;
  scales?: {
    x?: {
      beginAtZero?: boolean;
      title?: {
        display: boolean;
        text: string;
      };
    };
    y?: {
      beginAtZero?: boolean;
      min?: number;
      max?: number;
      title?: {
        display: boolean;
        text: string;
      };
    };
  };
  plugins?: {
    legend?: {
      display?: boolean;
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    title?: {
      display: boolean;
      text: string;
    };
  };
}

export interface StatisticEntry extends BaseEntity {
  title: string;
  subtitle: string;
  type: ChartType;
  options: ChartOptions;
  chartData: ChartData;
}