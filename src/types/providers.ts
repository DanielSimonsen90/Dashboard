import { ChartType, StatisticEntry, User } from "~/types/domain";

export type StoreModelName = 'statistics' | 'users';

/**
 * Mock API endpoints for each store
 */
export type RequestEndpoint<TStoreModelName extends StoreModelName> = (
  TStoreModelName extends 'statistics' ? `/api/statistics` | `/api/statistics?type=${ChartType}`
  : TStoreModelName extends 'users' ? `/api/users?displayName=${string}`
  : never
);

/**
 * Utility type to extract correct return type from the mock API based on the store name
 */
export type MockApiResultMap = {
  statistics: StatisticEntry[];
  users: User;
};

/**
 * Basic filter options which could be a way that statistic data is filtered
 */
export type StatisticsFilterOptions = {
  dateRange?: [number, number]; // The mock data does not support date ranges, but in a real-world scenario, this would be a way to filter statistical data by date range
  type?: ChartType;
};