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
 * When creating a new Store - all stores already contains this base functionality
 */
export interface BaseStore<TStoreFor extends StoreModelName> {
  __cache: Map<string, MockApiResultMap[TStoreFor]>;


  /**
   * Request data from the mock API
   * @param key Mock-endpoint to request data from
   * @returns The requested data - either from cache or from the mock API
   */
  request(key: RequestEndpoint<TStoreFor>): Promise<MockApiResultMap[TStoreFor]>;
}

/**
 * Utility type to extract correct return type from the mock API based on the store name
 */
export type MockApiResultMap = {
  statistics: StatisticEntry[];
  users: User[];
};