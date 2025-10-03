import { ChartType } from "~/types/domain";

/**
 * Basic filter options which could be a way that statistic data is filtered
 */
export type FilterOptions = {
  dateRange?: [number, number]; // The mock data does not support date ranges, but in a real-world scenario, this would be a way to filter statistical data by date range
  type?: ChartType;
}