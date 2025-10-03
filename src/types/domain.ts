/**
 * Entities/Models from the backend are usually identifiably by id property.
 * For this assignment, it appears the mock-data does not follow that structure, 
 * however, for good practice, a BaseEntity interface is still defined for scalability.
 */
interface BaseEntity {
  // id: string;
}

/**
 * User model as defined by design requirements
 */
export interface User extends BaseEntity {
  displayName: string;
  avatarUrl: string;
  lastLoginTimestamp: number;
}

/**
 * TypeScript type for chart types supported by Chart.js and custom types
 * Note that "numberProcentage" is intentionally misspelled to match the mock data received - which is a fun detail I didn't want to change 🤣
 */
export type ChartType = 'number' | 'numberProcentage' | 'doughnut' | 'bar' | 'pie' | 'line';

// #region Chart data types from mock-data
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
// #endregion

/**
 * StatisticEntry model as defined by the mock data received from the (mock) backend
 */
export interface StatisticEntry extends BaseEntity {
  title: string;
  subtitle: string;
  type: ChartType;
  options: ChartOptions;
  chartData: ChartData;
}